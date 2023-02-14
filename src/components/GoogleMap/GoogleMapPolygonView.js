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

function MyComponent(props) {
  const { driverZoneList = [] } = props;

  // Store Polygon path in state
  const [path, setPath] = useState([
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 },
  ]);

  const [driverZone, setDriverZone] = useState({
    name: 'default',
    coordinate_list: path,
  });

  const [infoList, setInfoList] = React.useState([]);

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
  }, [setDriverZone]);

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

  const isShowInfo = (id) => {
    return !!infoList.find((i) => i.id === id)?.showInfo;
  };

  const toggleShowInfo = (id) => {
    const idx = infoList.findIndex((i) => i.id === id);
    if (idx >= 0) {
      infoList[idx].showInfo = !infoList[idx].showInfo;
      setInfoList([...infoList]);
    }
  };

  React.useEffect(() => {
    if (driverZoneList && driverZoneList.length) {
      // default all coordinates to not show info
      const _infoList = driverZoneList.map((coord) => ({ ...coord, showInfo: false }));
      setInfoList(_infoList);
    }
  }, [driverZoneList]);

  return (
    <div>
      <center>
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}>
          {driverZoneList.map((driverZoneObject) => (
            <>
              <Marker
                key={`marker-${driverZoneObject.id}`}
                onClick={() => {
                  toggleShowInfo(driverZoneObject.id);
                }}
                position={{
                  lat: parseFloat(driverZoneObject.polygon_center.lat),
                  lng: parseFloat(driverZoneObject.polygon_center.lng),
                }}
                center={{
                  lat: parseFloat(driverZoneObject.polygon_center.lat),
                  lng: parseFloat(driverZoneObject.polygon_center.lng),
                }}>
                {isShowInfo(driverZoneObject.id) && (
                  <InfoWindow
                    onCloseClick={() => toggleShowInfo(driverZoneObject.id)}
                    position={{
                      lat: parseFloat(driverZoneObject.polygon_center.lat),
                      lng: parseFloat(driverZoneObject.polygon_center.lng),
                    }}
                    center={{
                      lat: parseFloat(driverZoneObject.polygon_center.lat),
                      lng: parseFloat(driverZoneObject.polygon_center.lng),
                    }}>
                    <h4>{driverZoneObject.name}</h4>
                  </InfoWindow>
                )}
              </Marker>
              <Polygon
                // Make the Polygon editable / draggable
                // editable
                // draggable
                path={driverZoneObject.coordinate_list}
              />
            </>
          ))}
        </GoogleMap>
      </center>
      {/* <CButton
        size="sm"
        color="success"
        onClick={() => {
          action(driverZone);
        }}>
        Submit
      </CButton> */}
    </div>
  );
}

export default React.memo(MyComponent);
/* eslint-enable */
