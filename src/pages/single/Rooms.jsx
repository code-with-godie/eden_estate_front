import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Room from './Room';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
const Wrapper = styled.section``;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  const [rooms, setRooms] = useState([]);
  const { loading, data, error } = useFetch(`/rooms/${estateID}`);

  useEffect(() => {
    data && setRooms(data?.rooms);
  }, [data]);
  if (loading) return <LoadingAnimation />;
  if (error) return <p> {error?.message} </p>;
  if (rooms.length === 0) return null;
  return (
    <Wrapper>
      <Title>{title} rooms</Title>
      <Container>
        {rooms?.map(item => (
          <Room
            key={item?._id}
            {...item}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Rooms;
