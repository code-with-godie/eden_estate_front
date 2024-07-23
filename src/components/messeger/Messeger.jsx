import React, { useState } from 'react';
import styled from 'styled-components';
import Rooms from './Rooms';
import Chats from './Chats';
const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;
const Messeger = () => {
  const [showChats, setShowChats] = useState(false);
  return (
    <Container>
      <Rooms setShowChats={setShowChats} />
      <Chats
        showChats={showChats}
        setShowChats={setShowChats}
      />
    </Container>
  );
};

export default Messeger;
