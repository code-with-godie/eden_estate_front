import React from 'react';
import styled from 'styled-components';
import utilitiesImage from '../../assets/utility.png';
import petImage from '../../assets/pet.png';
import incomeImage from '../../assets/fee.png';
import squareImage from '../../assets/size.png';
import bedImage from '../../assets/bed.png';
import bathroomImage from '../../assets/bath.png';
import schoolImage from '../../assets/school.png';
import busImage from '../../assets/bus.png';
import resImage from '../../assets/restaurant.png';
import chat from '../../assets/chat.png';
import save from '../../assets/save.png';
import { useAppContext } from '../../context/AppContextProvider';
import Map from '../../components/Map';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Title = styled.h3``;
const Label = styled.p`
  font-size: 0.8rem;
  &.title {
    font-size: 1.1rem;
    text-transform: capitalize;
  }
`;
const Icon = styled.img`
  max-width: 25px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Wrapper = styled.div`
  border-radius: 0.5rem;
  color: #000000da;
  padding: 0.5rem;
  background-color: ${props => props.darkMode && 'var(--faded_blue)'};
  border: ${props => !props.darkMode && '1px solid gray'};
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  &.first {
    flex-direction: column;
  }
`;
const MapContainer = styled.div`
  height: 150px;
  .map {
    width: 100%;
    height: 100%;
  }
`;
const Control = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: black;
  justify-content: space-between;
  background-color: ${props => props.darkMode && 'var(--faded_blue)'};
  border: ${props => !props.darkMode && '1px solid gray'};
`;
const SingleDescription = ({
  utilities,
  pet,
  income,
  size,
  bus,
  school,
  restaurant,
  bedrooms,
  bathrooms,
}) => {
  const { darkMode } = useAppContext();
  return (
    <Container>
      <Title>General</Title>
      <Wrapper
        darkMode={darkMode}
        className='first'
      >
        <Item>
          <Icon src={utilitiesImage} />
          <ItemWrapper>
            <Label className='title'>utilities</Label>
            <Label> {utilities} </Label>
          </ItemWrapper>
        </Item>
        <Item>
          <Icon src={petImage} />
          <ItemWrapper>
            <Label className='title'>pet policy</Label>
            <Label> {pet} </Label>
          </ItemWrapper>
        </Item>
        <Item>
          <Icon src={incomeImage} />
          <ItemWrapper>
            <Label className='title'>income policy</Label>
            <Label> {income} </Label>
          </ItemWrapper>
        </Item>
      </Wrapper>
      <Title>sizes</Title>
      <Wrapper darkMode={darkMode}>
        <Item>
          <Icon src={squareImage} />
          <Label> {size} sqft</Label>
        </Item>
        <Item>
          <Icon src={bedImage} />
          <Label> {bedrooms} beds</Label>
        </Item>
        <Item>
          <Icon src={bathroomImage} />
          <Label> {bathrooms} bathroom</Label>
        </Item>
      </Wrapper>

      <Title>Nearby places</Title>
      <Wrapper darkMode={darkMode}>
        <Item>
          <Icon src={schoolImage} />
          <ItemWrapper>
            <Label className='title'>School</Label>
            <Label>{school} m away</Label>
          </ItemWrapper>
        </Item>
        <Item>
          <Icon src={busImage} />
          <ItemWrapper>
            <Label className='title'>Bus Stop</Label>
            <Label>{bus} m away</Label>
          </ItemWrapper>
        </Item>
        <Item>
          <Icon src={resImage} />
          <ItemWrapper>
            <Label className='title'>Restaurant</Label>
            <Label> {restaurant}m away</Label>
          </ItemWrapper>
        </Item>
      </Wrapper>
      <Title>Location</Title>
      <Wrapper darkMode={darkMode}>
        <MapContainer>
          <Map />
        </MapContainer>
      </Wrapper>
      <Control darkMode={darkMode}>
        <Item>
          <Icon src={chat} />
          <Label>send a message</Label>
        </Item>
        <Item>
          <Icon src={save} />
          <Label>save the place</Label>
        </Item>
      </Control>
    </Container>
  );
};

export default SingleDescription;