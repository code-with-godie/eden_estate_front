import { IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Close } from '@mui/icons-material';
import { useAppContext } from '../../context/AppContextProvider';
import Room from './Room';
import { appwriteService } from '../../appWrite/appwriteService';
import LoadingAnimation from '../loading/LoadingAnimation';
import { useNavigate } from 'react-router-dom';
const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #aaaaaa1b;
  padding: 0.5rem;
  .close {
    display: none;
  }
  @media screen and (max-width: 768px) {
    .close {
      display: block;
    }
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .btn {
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
`;

const Title = styled.h1`
  flex: 1;
`;
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 1 } },
};
const Rooms = () => {
  const { rooms, closeChat, user, setRooms } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRooms = useCallback(async () => {
    try {
      setLoading(true);
      const rooms = await appwriteService.getUserRooms(user?._id);
      setRooms(rooms);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  }, [user, setRooms]);

  useEffect(() => {
    getRooms();
  }, [getRooms]);
  if (loading) {
    return <LoadingAnimation />;
  }
  if (error) {
    return <p> {error?.message} </p>;
  }
  if (rooms.length === 0) {
    return (
      <Container
        variants={variants}
        initial='initial'
        animate='animate'
      >
        <p>you messeges wil appear here</p>
      </Container>
    );
  }
  return (
    <Container
      variants={variants}
      initial='initial'
      animate='animate'
    >
      <Header>
        <Title variants={variants}>Messeges</Title>
        <IconButton
          className='btn'
          onClick={() => closeChat()}
        >
          {' '}
          <Close />{' '}
        </IconButton>
      </Header>
      {rooms.map(item => (
        <Room
          variants={variants}
          key={item?.$id}
          {...item}
        />
      ))}
    </Container>
  );
};

export default Rooms;
