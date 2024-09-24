import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContextProvider';
import { useFetch } from '../../api/useFetch';
const RoomContainer = styled(motion.div)`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #aaaaaa28;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const UserName = styled.h4``;
const Messege = styled.p``;
const Room = ({ variants, last_messege, members, $id, messeges }) => {
  const { setConversation, user } = useAppContext();
  const otherUserID = members?.find(item => item !== user?._id);
  const [otherUser, setOtherUser] = useState(null);
  const { data, loading, error } = useFetch(`/users/single/${otherUserID}`);

  const handleConversation = () => {
    const con = { roomID: $id, ...otherUser, messeges };
    localStorage.setItem('eden_estate_conversation', JSON.stringify(con));
    setConversation(con);
  };

  useEffect(() => {
    data && setOtherUser(data?.user);
  }, [data]);
  if (loading)
    return (
      <Wrapper>
        <Skeleton
          variant='circular'
          width={50}
          height={50}
        />
        <Skeleton
          variant='rounded'
          width='100%'
          height={50}
        />
      </Wrapper>
    );
  if (error) return <p> {error.message} </p>;
  return (
    <RoomContainer
      onClick={handleConversation}
      variants={variants}
    >
      <Avatar
        src={otherUser?.avatar}
        alt={otherUser?.username}
      />
      <UserName> {otherUser?.username} </UserName>
      {last_messege ? (
        <Messege> {last_messege} </Messege>
      ) : (
        <Messege>say hi</Messege>
      )}
    </RoomContainer>
  );
};

export default Room;
