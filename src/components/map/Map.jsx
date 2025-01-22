import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import Pin from './Pin';
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
const Map = ({ posts }) => {
  // Default center and zoom level
  let latitude = 52.4797;
  let longitude = -1.90269;
  let zoom = 7;

  if (posts.length > 0) {
    const latitudes = posts.map(post => post?.coodinates?.latitude);
    const longitudes = posts.map(post => post?.coodinates?.longitude);

    latitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    longitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

    // Optionally adjust zoom level depending on the number of posts
    zoom = posts.length === 1 ? 13 : 7; // Adjust zoom level if only one marker
  }

  return (
    <Container>
      <MapContainer
        className='map'
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {posts.map(item => (
          <Pin
            key={item.id}
            item={item}
          />
        ))}
      </MapContainer>
    </Container>
  );
};

export default Map;
