import React, { useState } from 'react';
import styled from 'styled-components';
import Room from './Room';
const Wrapper = styled.section``;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  /* &.small {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  } */
`;
const Title = styled.h2`
  text-transform: capitalize;
  font-size: 1.5rem;
  color: var(--faded_blue);
  padding-bottom: 0.6rem;
`;
const Rooms = ({ title, estateID }) => {
  const [rooms, setRooms] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  return (
    <Wrapper>
      <Title>{title} rooms</Title>
      <Container>
        {rooms?.map(item => (
          <Room
            key={item}
            {...item}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Rooms;
