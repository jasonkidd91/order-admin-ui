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
  height: '800px',
  width: '1200px',
};

const center = {
  lat: 3.129875692467692,
  lng: 101.68851994613041,
};

// const [zoneState, setZoneState] = React.useState({
//   zone_id_list: [],
// });

function MyComponent(props) {
  const { driverZoneList = [], orderList = [], action1 = () => {}, action2 = () => {} } = props;

  const [infoList, setInfoList] = React.useState([]);

  const cloneDriverZoneList = JSON.parse(JSON.stringify(driverZoneList));
  // setDynamicAttr(cloneDriverZoneList);

  const isShowInfo = (id) => {
    return !!infoList.find((i) => i.id === id)?.showInfo;
  };

  const toggleShowInfo = (driver_zone_object, open) => {
    if (open) {
      action1(driver_zone_object);
    }
    const idx = infoList.findIndex((i) => i.id === driver_zone_object.id);
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

  const clickPolygonAction = (driver_zone_object, ev) => {
    toggleShowInfo(driver_zone_object, true);
  };

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
                  toggleShowInfo(driverZoneObject, true);
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
                    onCloseClick={() => toggleShowInfo(driverZoneObject, false)}
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
                // ref={this.polygonRef}
                // onClick={handleClick}
                options={driverZoneObject.polygonOption}
                onClick={(ev) => {
                  // action(true);
                  // action(driverZoneObject.id);
                  clickPolygonAction(driverZoneObject, ev);
                }}
                // onClick={clickPolygonAction(driverZoneObject)}
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
