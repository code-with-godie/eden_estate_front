import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for custom icons
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 64px;
  height: 48px;
  object-fit: cover;
  border-radius: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Pin({ item }) {
  console.log('marker', item);

  // Check if the image URL is valid before setting the marker icon
  const imageUrl = item.image?.secure_url || item.image;

  // Set custom icon if the image is valid
  const customIcon = L.icon({
    iconUrl: imageUrl, // Use image URL as the icon
    iconSize: [32, 32], // Adjust icon size
    iconAnchor: [16, 32], // Adjust anchor point
    popupAnchor: [0, -32], // Adjust popup anchor
  });

  return (
    <Marker
      position={[item?.coodinates?.latitude, item?.coodinates?.longitude]}
      icon={customIcon} // Apply the custom icon here
    >
      <Popup>
        <Container>
          <Image
            src={item.image?.secure_url || item.image}
            alt=''
          />
          <TextContainer>
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>
              location:{' '}
              {typeof country === 'string' && typeof state === 'string'
                ? `${`${item?.state}`},${item?.country}`
                : `${`${item?.state?.name}`},${item?.country?.name}`}
            </span>
            <b>$ {item.price}</b>
          </TextContainer>
        </Container>
      </Popup>
    </Marker>
  );
}

export default Pin;
