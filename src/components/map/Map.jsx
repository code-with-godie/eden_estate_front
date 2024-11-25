import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  @media screen and (min-width: 768px) {
    min-width: 300px;
    min-height: auto;
  }
  .map {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }
`;
const Map = ({ posts, single }) => {
  return (
    <Container>
      <MapContainer
        className='map'
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {posts?.map(item => (
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default Map;
