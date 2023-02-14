import React from 'react';
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
  getZipCode,
} from 'use-places-autocomplete';
import Autocomplete from '../Autocomplete';

export interface Props {
  onSelectPlace?: Function;
}

const GooglePlaceAutocomplete = (props: Props) => {
  const { value, setValue, suggestions } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ['my'] },
    },
    debounce: 300,
  });
  const { onSelectPlace = () => {} } = props;
  const { data } = suggestions;

  const selectPlaceHandler = async (place: google.maps.places.AutocompletePrediction) => {
    setValue(place.description);

    // get additional information from google apis
    const [geocode] = await getGeocode({ address: place.description });
    const [details, coordinate, zipcode] = await Promise.all([
      getDetails({ placeId: place.place_id, fields: ['name', 'address_component'] }),
      getLatLng(geocode),
      getZipCode(geocode, false),
    ]);

    // extract customer address info
    let address: any = {};
    if (typeof details === 'object') {
      const address_raws = details.address_components;
      const extract = (types: string[]) =>
        address_raws?.find((raw) => types.some((r) => raw.types.includes(r)));

      address = {
        building: details.name,
        street_number: extract(['street_number'])?.long_name || '',
        route: extract(['route'])?.long_name || '',
        sublocality: extract(['sublocality_level_1', 'sublocality'])?.long_name || '',
        city: extract(['locality'])?.long_name || '',
        state: extract(['administrative_area_level_1'])?.long_name || '',
        country: extract(['country'])?.long_name || '',
        postal_code: extract(['postal_code'])?.long_name || '',
      };
    }

    // alternative way to extract address line from google api
    let addressline = '';
    let idx = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (let term of place.terms) {
      if (
        [address?.postal_code, address?.city, address?.state, address?.country].includes(term.value)
      ) {
        break;
      }
      if (idx > 0 && !(term.value.startsWith(',') || term.value.endsWith(','))) {
        addressline += ', ';
      }
      addressline += term.value;
      idx += 1;
    }

    // return payload
    const response = {
      place,
      details,
      geocode,
      coordinate,
      zipcode,
      address,
      addressline,
    };
    console.log(response);
    onSelectPlace(response);
  };

  return (
    <Autocomplete
      type="search"
      placeholder="Search place"
      iconPrepend="cil-location-pin"
      value={value}
      onChange={(ev: any) => setValue(ev.target.value)}
      suggestions={data}
      renderItem={(place: google.maps.places.AutocompletePrediction) => (
        <div onClick={() => selectPlaceHandler(place)}>
          {place.description}
          <span className="float-right">{place.id}</span>
        </div>
      )}
    />
  );
};

export default React.memo(GooglePlaceAutocomplete);

/**
 * **************************************
 * Use Case:
 * **************************************
 * import GooglePlaceAutocomplete from 'src/components/GooglePlaceAutocomplete';
 *
 * ...
 * <GooglePlaceAutocomplete
 *   onSelectPlace={() => { ... do something ... }}
 * />
 * ...
 */
