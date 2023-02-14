import React, { ChangeEvent } from 'react';

import usePlacesAutocomplete, { getDetails, getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import './styles.scss';
// import { getCombinedModifierFlags } from "typescript";

export default function App() {
  const {
    // ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'my' },
      // types: ["address"],
    },
  });
  // console.log("status is " , status);
  // console.log(data);

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  const submit = () => {
    const parameter = {
      // Use the "place_id" of suggestion from the dropdown (object), here just taking first suggestion for brevity
      placeId: data[0].place_id, //.suggestions[0].place_id,
      // Specify the return data that you want (optional)
      fields: ['name', 'address_component'],
    };

    getDetails(parameter)
      .then((details) => {
        console.log('Details: ', details);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const handleSelect = (val: string): void => {
    getGeocode({ address: val })
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const { lat, lng } = latLng;
        console.log('Coordinates: ', latLng);
      });

    console.log('handle select:', val);
    setValue(val, true);
  };

  const renderSuggestions = (): JSX.Element => {
    // console.log(data)
    const suggestions = data.map(({ place_id, description }: any) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return <>{[suggestions]}</>;
  };

  return (
    <div className="App">
      <h1 className="title">Please insert address</h1>
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          style={{ width: 300, maxWidth: '90%' }}
          value={value}
          onChange={handleInput}
          //== disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>{status === 'OK' && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <button onClick={submit}>Submit Suggestion</button>
    </div>
  );
}
