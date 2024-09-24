import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  gap: 0.5rem;
  padding: 0.5rem;
  .dark {
    background: #2a2929;
  }
  .desc {
    background-color: ${props => props.dark && '#626262'};
    height: 100px;
    width: 100%;
  }
`;
const SmsRoomsSkelton = () => {
  const { darkMode } = useAppContext();

  return (
    <Container>
      {Array(10).fill(
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
      )}
    </Container>
  );
};

export default SmsRoomsSkelton;
