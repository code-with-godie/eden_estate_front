import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import {
  Bathroom,
  Bed,
  BookOnline,
  People,
  Tv,
  Wifi,
} from '@mui/icons-material';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
const Container = styled.section`
  padding: 0.5rem;
  &.dark {
    background-color: var(--color_faded_dark);
  }
  &.light {
    box-shadow: 0px 0px 5px 3px #f2f1f1;
  }
`;
const Section = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  :not(:last-child) {
    border-bottom: 1px solid gray;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 150px;
  border-radius: 0.5rem;
  object-fit: cover;
`;
const Utilities = styled.div`
  columns: 2;
  column-gap: 0.5rem;
`;
const Utility = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Label = styled.p`
  font-size: 0.9rem;
  &.bold {
    font-weight: bold;
    font-size: 1rem;
    color: var(--faded_blue);
  }
`;
const Button = styled.div`
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--faded_blue);
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: capitalize;
`;
const Room = ({
  image,
  home,
  kingSize,
  queenSize,
  wifi,
  guests,
  breakFast,
  price,
  conditional,
  mountain,
  forest,
  ocean,
  balcony,
  tv,
  bathrooms,
}) => {
  const { darkMode } = useAppContext();
  return (
    <Container className={darkMode ? 'dark' : 'light'}>
      <Section>
        <Wrapper>
          <Image src={image} />
        </Wrapper>
        <Utilities>
          {balcony && (
            <Utility>
              <Bed />
              <Label> Balcony</Label>
            </Utility>
          )}
          <Utility>
            <Bathroom />
            <Label> {bathrooms} bathroom(s)</Label>
          </Utility>
          <Utility>
            <People />
            <Label>{guests} guest (s)</Label>
          </Utility>
          {wifi && (
            <Utility>
              <Wifi />
              <Label>free wifi</Label>
            </Utility>
          )}
          {conditional && (
            <Utility>
              <Wifi />
              <Label>air conditional</Label>
            </Utility>
          )}
          <Utility>
            <Wifi />
            <Label> {kingSize} king size</Label>
          </Utility>
          <Utility>
            <Wifi />
            <Label> {queenSize} queen size</Label>
          </Utility>
          {tv && (
            <Utility>
              <Tv />
              <Label>TV</Label>
            </Utility>
          )}
          {ocean && (
            <Utility>
              <Tv />
              <Label>ocean view</Label>
            </Utility>
          )}
          {mountain && (
            <Utility>
              <Tv />
              <Label>mountain view</Label>
            </Utility>
          )}
          {forest && (
            <Utility>
              <Tv />
              <Label>forest view</Label>
            </Utility>
          )}
        </Utilities>
      </Section>
      <Section>
        <Wrapper>
          <Utility>
            <Label className='bold'>price Kshs</Label>
            <Label> {price} /24hrs</Label>
          </Utility>
          {breakFast > 0 && (
            <Utility>
              <Label className='bold'>breakfast price</Label>
              <Label>kshs {breakFast} </Label>
            </Utility>
          )}
        </Wrapper>
      </Section>
      <Section>
        {!home && <Label>date picker </Label>}
        {breakFast > 0 && (
          <Wrapper>
            <Label>do you want to be served breafast each day?</Label>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label='include breakfast'
              />
            </FormGroup>
          </Wrapper>
        )}
        <Utility>
          <Label className='bold'>total price :</Label>
          <Label>200 for 2 days</Label>
        </Utility>
        {!home && (
          <Wrapper>
            <Button>
              {' '}
              <BookOnline /> reserve room
            </Button>
          </Wrapper>
        )}
      </Section>
    </Container>
  );
};

export default Room;
