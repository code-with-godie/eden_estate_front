import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';

const Container = styled.div`
  display: flex;
  height: 50vh;
  display: flex;
  overflow: auto;
  gap: 0.5rem;
  padding: 0.5rem;
  .dark {
    background: #2a2929;
  }
  .desc {
    background-color: ${props => props.dark && '#626262'};
    height: 100%;
    flex: 1 0 200px;
  }
`;
const FeaturedPlaceSkelton = () => {
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

export default FeaturedPlaceSkelton;
