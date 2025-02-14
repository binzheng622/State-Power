import React from 'react';
import { useDispatch } from 'react-redux';
import { updateHover } from '../reducers/stateReducer';
import { MapContainer, Polygon } from 'react-leaflet';
import StateCoordinate from '../assets/stateCoordinates';
import 'leaflet/dist/leaflet.css';

const StateMap = () => {
  const dispatch = useDispatch();

  //fetch database for state data on hover
  const fetchData = (state: string) => {
    fetch(`/api/data/${state}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateHover(data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <MapContainer
      center={[40.63463151377654, -97.89969605983609]}
      zoom={4}
      style={{
        width: '70%',
        height: '50vh',
        borderRadius: '1em',
      }}
      attributionControl={false}
    >
      {StateCoordinate.features.map((state: any) => {
        const coordinates = state.geometry.coordinates[0].map((item: any) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              color: 'white',
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e: any) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 5,
                  color: '#666',
                });
                //envoke fetch on mouse over
                fetchData(state.properties.name);
              },
              mouseout: (e: any) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                });
              },
            }}
          ></Polygon>
        );
      })}
    </MapContainer>
  );
};

export default StateMap;
