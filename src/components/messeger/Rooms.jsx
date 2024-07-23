import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Close } from '@mui/icons-material';
import { useAppContext } from '../../context/AppContextProvider';
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
const RoomContainer = styled(motion.div)`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #aaaaaa28;
  cursor: pointer;
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
const UserName = styled.h4``;
const Messege = styled.p``;
const Title = styled.h1`
  flex: 1;
`;
const Rooms = ({ setShowChats }) => {
  const [rooms, setRooms] = useState([1, 2, 3, 4, 5, 6, 7]);
  const { closeChat } = useAppContext();
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 1 } },
  };
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
      {rooms.map((item, index) => (
        <RoomContainer
          onClick={() => setShowChats(true)}
          key={index}
          variants={variants}
        >
          <Avatar />
          <UserName>username</UserName>
          <Messege>hello my friend</Messege>
        </RoomContainer>
      ))}
    </Container>
  );
};

export default Rooms;
