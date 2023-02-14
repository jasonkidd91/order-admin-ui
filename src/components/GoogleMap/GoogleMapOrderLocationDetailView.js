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

function MyComponent(props) {
  const { driverZoneList = [], orderList = [], action1 = () => {} } = props;

  const isShowInfo = (id) => {
    return !!infoList.find((i) => i.id === id)?.showInfo;
  };

  const [infoList, setInfoList] = React.useState([]);
  const [center, setCenter] = React.useState({
    lat: 3.129875692467692,
    lng: 101.68851994613041,
  });

  React.useEffect(() => {
    if (orderList && orderList.length) {
      // default all coordinates to not show info
      const _infoList = orderList.map((coord) => ({ ...coord, showInfo: false }));
      setInfoList(_infoList);
    }
  }, [orderList]);

  const mapContainerStyle = {
    height: '800px',
    width: '1100px',
  };

  const toggleShowInfo = (object, lat, lng, open) => {
    if (open) {
      action1(object);
    }
    const idx = infoList.findIndex((i) => i.id === object.id);

    if (idx >= 0) {
      infoList[idx].showInfo = !infoList[idx].showInfo;
      setInfoList([...infoList]);
    }

    // setCenter({
    //   lat,
    //   lng,
    // });
  };

  return (
    <div>
      <center>
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}>
          {orderList.map((orderObject) => (
            <>
              <Marker
                key={`marker-${orderObject.id}`}
                onClick={() => {
                  toggleShowInfo(orderObject, orderObject.latitude, orderObject.longitude, true);
                }}
                icon={
                  orderObject.flag_colour
                    ? process.env.REACT_APP_BASE_URL + '/images/' + orderObject.flag_colour
                    : 'https://maps.google.com/mapfiles/ms/icons/red.png'
                }
                position={{
                  lat: parseFloat(orderObject.latitude),
                  lng: parseFloat(orderObject.longitude),
                }}>
                {isShowInfo(orderObject.id) && (
                  <InfoWindow
                    onCloseClick={() =>
                      toggleShowInfo(
                        orderObject,
                        orderObject.latitude,
                        orderObject.longitude,
                        false,
                      )
                    }
                    position={{
                      lat: parseFloat(orderObject.latitude),
                      lng: parseFloat(orderObject.longitude),
                    }}
                    center={{
                      lat: parseFloat(orderObject.latitude),
                      lng: parseFloat(orderObject.longitude),
                    }}>
                    <h4>{orderObject.map_label}</h4>
                  </InfoWindow>
                )}
              </Marker>
            </>
          ))}
          {driverZoneList.map((driverZoneObject) => (
            <>
              <Polygon
                onClick={() => {
                  // toggleShowInfo(driverZoneObject.id);
                }}
                // Make the Polygon editable / draggable
                // editable
                // draggable
                path={driverZoneObject.zone.coordinate_list}
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
