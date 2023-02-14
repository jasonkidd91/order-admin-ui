/* eslint-disable */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker, Circle, InfoWindow, Polygon } from '@react-google-maps/api';

import {
  CButton,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from '@coreui/react';

const mapContainerStyle = {
  height: '400px',
  width: '800px',
};

const center = {
  lat: 3.129875692467692,
  lng: 101.68851994613041,
};

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  // radius: parseFloat(driverZone.radius),
  // radius is by meter
  zIndex: 99,
};

function MyComponent(props) {
  const {
    driverZoneList = [],
    action = () => {},
    driverZone = {},
    setDriverZone = () => {},
  } = props;
  // Store Polygon path in state
  const [path, setPath] = useState(driverZone.coordinate_list);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      // setDriverZone(nextPath);
      setDriverZone({ ...driverZone, coordinate_list: nextPath });
    }
  });

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', onEdit),
      );
    },
    [onEdit],
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDriverZone({ ...driverZone, [name]: value });
  };

  return (
    <div>
      <div className="float-left px-2">
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}>
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={driverZone.coordinate_list}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={options}
          />

          {driverZoneList.map((driverZoneObject) => (
            <Polygon
              // Make the Polygon editable / draggable
              // editable
              // draggable
              path={driverZoneObject.coordinate_list}
              // Event used when manipulating and adding points
              // onMouseUp={onEdit}
              // // Event used when dragging the whole Polygon
              // onDragEnd={onEdit}
              // onLoad={onLoad}
              // onUnmount={onUnmount}
            />
          ))}
        </GoogleMap>
      </div>
      <div className="float-left px-2">
        <h1>Zone Name</h1>
        <CInputGroup className="mb-3">
          <CInput
            type="text"
            placeholder="name"
            name="name"
            value={driverZone.name}
            onChange={handleChange}
          />
        </CInputGroup>
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
