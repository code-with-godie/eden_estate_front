import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Room from './Room';
import { useFetch } from '../../api/useFetch';
import RoomsSkelton from '../../components/skeletons/RoomsSkeleton';
import saved from '../../assets/not-found.png';
const Wrapper = styled.section`
  &.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;
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
const Image = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: contain;
`;
const Message = styled.p``;
const Rooms = ({ title, estateID, single }) => {
  const [rooms, setRooms] = useState(null);
  const { data, loading, error } = useFetch(`/rooms/${estateID}`);

  useEffect(() => {
    data && setRooms(data?.rooms);
  }, [data]);
  if (loading) return <RoomsSkelton />;
  if (error) return <p> {error?.message} </p>;
  if (rooms?.length === 0)
    return (
      <Wrapper className='center'>
        <Image src={saved} />
        <Message> no rooms for this estate </Message>
      </Wrapper>
    );
  return (
    <Wrapper>
      <Title>{title} rooms</Title>
      <Container>
        {rooms?.map(item => (
          <Room
            single
            key={item?._id}
            {...item}
          />
        ))}
      </Container>
    </Wrapper>
  );
};

export default Rooms;
