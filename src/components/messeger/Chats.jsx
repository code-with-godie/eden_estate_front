import { Close, Send } from '@mui/icons-material';
import { Avatar, duration, IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  z-index: 200;
  display: flex;
  flex-direction: column;
  background-color: #303030;
`;
const Header = styled.div`
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  background-color: #aaaaaa1b;
`;
const ChatsContainer = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;
const UserName = styled.h4``;
const Footer = styled.form`
  background-color: #aaaaaa1b;
  padding: 0.5rem;
`;
const Messege = styled.p`
  padding: 0.5rem;
  border-radius: 0.3rem;
  max-width: 50%;
  align-self: flex-start;
  background-color: #aaaaaa1b;
  :nth-child(even) {
    background-color: #0d0d0d52;
    align-self: flex-end;
    color: white;
  }
`;
const InputContainer = styled.div`
  background-color: #0d0d0d52;
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
`;
const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  flex: 1;
  color: inherit;
`;
const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
`;
const variants = {
  initial: { opacity: 0, y: '100%', transition: { duration: 1 } },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
};
const Chats = ({ showChats, setShowChats }) => {
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <Container
      variants={variants}
      initial='initial'
      animate={showChats ? 'animate' : 'initial'}
    >
      <Header>
        <ProfileContainer>
          <Avatar />
          <UserName>john doe</UserName>
        </ProfileContainer>
        <IconButton onClick={() => setShowChats(false)}>
          <Close />
        </IconButton>
      </Header>
      <ChatsContainer>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
        <Messege>test messege</Messege>
      </ChatsContainer>
      <Footer onSubmit={handleSubmit}>
        <InputContainer>
          <Input placeholder='write messege' />
          <Button>
            <Send />
          </Button>
        </InputContainer>
      </Footer>
    </Container>
  );
};

export default Chats;
