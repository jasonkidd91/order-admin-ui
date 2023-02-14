import React from 'react';
import { GoogleMap, Marker, Circle, InfoWindow } from '@react-google-maps/api';

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

function MyComponent(props) {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: '<<GoogleMapKey>>',
  // });

  const { coordinateList = [] } = props;
  console.log('initial ', coordinateList);
  const [coordinate, setCoordinate] = React.useState({
    lat: 3.15916,
    lng: 101.71366,
  });

  const [infoList, setInfoList] = React.useState([]);

  React.useEffect(() => {
    if (coordinateList && coordinateList.length) {
      // default all coordinates to not show info
      const _infoList = coordinateList.map((coord) => ({ ...coord, showInfo: false }));
      setInfoList(_infoList);
    }
  }, [coordinateList]);

  const toggleShowInfo = (id) => {
    const idx = infoList.findIndex((i) => i.id === id);
    if (idx >= 0) {
      infoList[idx].showInfo = !infoList[idx].showInfo;
      setInfoList([...infoList]);
    }
  };

  const isShowInfo = (id) => {
    return !!infoList.find((i) => i.id === id)?.showInfo;
  };

  // const [coordinate1, setCoordinate1] = React.useState({
  //   lat: 4.15916,
  //   lng: 104.71366,
  // });
  // const [map, setMap] = React.useState(null);

  // const coordinateList = [{ lat: '3.15916', lng: '101.71366' }, { lat: 3.129875692467692, lng: 101.68851994613041 }]

  React.useEffect(() => {
    console.log('js he ', coordinateList);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div>
      <center>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinate}
          zoom={13}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {coordinateList.map((coordinateObject) => (
            <div key={coordinateObject.id}>
              <Marker
                key={`marker-${coordinateObject.id}`}
                onClick={() => {
                  toggleShowInfo(coordinateObject.id);
                }}
                position={{
                  lat: parseFloat(coordinateObject.lat),
                  lng: parseFloat(coordinateObject.lng),
                }}
                center={{
                  lat: parseFloat(coordinateObject.lat),
                  lng: parseFloat(coordinateObject.lng),
                }}>
                {isShowInfo(coordinateObject.id) && (
                  <InfoWindow
                    onCloseClick={() => toggleShowInfo(coordinateObject.id)}
                    position={{
                      lat: parseFloat(coordinateObject.lat),
                      lng: parseFloat(coordinateObject.lng),
                    }}
                    center={{
                      lat: parseFloat(coordinateObject.lat),
                      lng: parseFloat(coordinateObject.lng),
                    }}>
                    <h4>{coordinateObject.name}</h4>
                  </InfoWindow>
                )}
              </Marker>
              <Circle
                key={`circle-${coordinateObject.id}`}
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
      </center>
    </div>
  );
}

export default React.memo(MyComponent);
