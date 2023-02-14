/* eslint-disable */
import React, { useRef } from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';
import {
  CButton,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from '@coreui/react';

import GooglePlaceAutocomplete from 'src/components/GooglePlaceAutocomplete';

const containerStyle = {
  width: '600px',
  height: '600px',
};

const options = {
  strokeColor: '#3b4c8a',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#3b4c8a',
  fillOpacity: 0.35,
  clickable: false,
  editable: false,
  visible: true,
  // radius: 1000,
  // radius is by meter
  zIndex: 1,
};

const circleOption = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  editable: true,
  visible: true,
  // radius: parseFloat(driverZone.radius),
  // radius is by meter
  zIndex: 1,
};

function MyComponent(props) {
  const {
    action = () => {},
    coordinateList = [],
    driverZone = {},
    setDriverZone = () => {},
  } = props;

  const [defaultCoordinate, setDefaultCoordinate] = React.useState({
    lat: 3.129875692467692,
    lng: 101.68851994613041,
  });

  const onRightClick = (event) => {
    setDriverZone({ ...driverZone, lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  function updateRadius() {
    setDriverZone({ ...driverZone, radius: this.getRadius() });
  }

  function updateCenter() {
    const newPos = this.getCenter().toJSON();
    // do coordinate update only when the coordinate is changed in order to avoid react render issue
    if (newPos.lat !== driverZone.lat || newPos.lng !== driverZone.lng) {
      setDriverZone({ ...driverZone, lat: newPos.lat, lng: newPos.lng });
    }
  }

  const selectAddressHandler = (googlePlaceObject) => {
    const { address, coordinate, addressline } = googlePlaceObject;

    console.log('show lat: ' + coordinate.lat + 'show lng: ' + coordinate.lng);
    // setDriverZone(...driverZone,  {
    //   lat: coordinate.lat,
    //   lng: coordinate.lng,
    // });

    setDefaultCoordinate({
      lat: coordinate.lat,
      lng: coordinate.lng,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDriverZone({ ...driverZone, [name]: value });
  };

  return (
    <div>
      <div className="float-left px-2">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCoordinate}
          zoom={13}
          onRightClick={onRightClick}
          // componentDidMount={driverZone}
          // clickableIcons={true}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          <Marker position={driverZone} center={driverZone} />
          <Circle
            center={driverZone}
            options={circleOption}
            radius={parseFloat(driverZone.radius)}
            onRadiusChanged={updateRadius}
            onCenterChanged={updateCenter}
          />

          {coordinateList.map((coordinateObject) => (
            <div key={coordinateObject.id}>
              <Circle
                center={{
                  lat: parseFloat(coordinateObject.lat),
                  lng: parseFloat(coordinateObject.lng),
                }}
                radius={parseFloat(coordinateObject.radius)}
                options={options}
              />
            </div>
          ))}
        </GoogleMap>
      </div>
      <div className="float-left px-2">
        <CForm>
          <h1>Zone Details</h1>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>Name</CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              placeholder="name"
              name="name"
              value={driverZone.name}
              onChange={handleChange}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <GooglePlaceAutocomplete onSelectPlace={selectAddressHandler} />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>Latitude</CInputGroupText>
            </CInputGroupPrepend>
            <CInput type="text" name="lat" placeholder="latitude" value={driverZone.lat} disabled />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>Longtitude</CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              name="lng"
              placeholder="longtitude"
              value={driverZone.lng}
              disabled
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>Radius</CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              name="radius"
              placeholder="radius"
              value={driverZone.radius}
              disabled
            />
          </CInputGroup>
        </CForm>
        <CButton
          size="sm"
          color="success"
          onClick={() => {
            action(driverZone);
          }}>
          Submit
        </CButton>
      </div>
    </div>
  );
}
export default React.memo(MyComponent);
/* eslint-enable */
