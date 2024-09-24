import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';

const Container = styled.div`
  display: flex;
  /* height: 90vh; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 1rem;
  padding: 1rem;
  .dark {
    background: #2a2929;
  }
  .desc {
    background-color: ${props => props.dark && '#626262'};
    /* width: 100%;
    height: 200px; */
    height: 100%;
  }
`;
const RoomsSkelton = () => {
  const { darkMode } = useAppContext();

  return (
    <Container>
      {Array(6).fill(
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
      )}
    </Container>
  );
};

export default RoomsSkelton;
