import { Close, Send } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContextProvider';
import { appwriteService } from '../../appWrite/appwriteService';
import LoadingAnimation from '../loading/LoadingAnimation';
import MesssegeSkeleton from '../skeletons/MesssegeSkeleton';
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
  &.mine {
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
const Chats = () => {
  const { conversation, setConversation, user, chats, setChats } =
    useAppContext();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const handleConversation = () => {
    setConversation(null);
  };
  const getMesseges = useCallback(async () => {
    try {
      setLoading(true);
      const sms = await appwriteService.getRoomMesseges(conversation?.roomID);
      setChats(sms);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  }, [conversation, setChats]);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!text) return;

    try {
      const messege = {
        body: text,
        sender: user?._id,
        receiver: conversation?._id,
        room: conversation?.roomID,
      };
      const newMessege = await appwriteService.sendMessage(messege);
      setChats(prev => [...prev, newMessege]);
      setText('');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMesseges();
  }, [getMesseges]);
  return (
    <Container
      variants={variants}
      initial='initial'
      animate={conversation ? 'animate' : 'initial'}
    >
      <Header>
        <ProfileContainer>
          <Avatar
            src={conversation?.avatar}
            alt={conversation?.username}
          />
          <UserName>{conversation?.username} </UserName>
        </ProfileContainer>
        <IconButton onClick={handleConversation}>
          <Close />
        </IconButton>
      </Header>
      {loading ? (
        <MesssegeSkeleton />
      ) : error ? (
        <ChatsContainer>
          <p> {error} </p>
        </ChatsContainer>
      ) : (
        <ChatsContainer>
          {chats.length === 0 ? (
            <Messege>be the first to send a messege</Messege>
          ) : (
            <>
              {chats.map(item => (
                <Messege
                  className={item?.sender === user?._id && 'mine'}
                  key={item?.$id}
                >
                  {' '}
                  {item?.body}{' '}
                </Messege>
              ))}
            </>
          )}
        </ChatsContainer>
      )}
      <Footer onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='write messege'
          />
          <Button>
            <Send />
          </Button>
        </InputContainer>
      </Footer>
    </Container>
  );
};

export default Chats;
