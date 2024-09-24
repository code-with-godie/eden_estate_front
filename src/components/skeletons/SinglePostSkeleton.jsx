import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';

const Container = styled.div`
  display: flex;
  height: 90vh;
  gap: 1rem;
  padding: 1rem;
`;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .dark {
    background: #2a2929;
  }
  .banner {
    background: ${props => props.dark && '#626262'};
    width: 100%;
    flex: 1;
  }
  .desc {
    background-color: ${props => props.dark && '#626262'};
    width: 100%;
    height: 200px;
  }
  .content {
    background-color: ${props => props.dark && '#626262'};
    width: 100%;
    height: 50px;
  }
  .size {
    height: 70px;
  }
  .place {
    height: 100px;
  }
  .map {
    flex: 1;
  }
`;
const SinglePostSkelton = () => {
  const { darkMode } = useAppContext();

  return (
    <Container>
      <Wrapper>
        <Skeleton
          variant='rectangular'
          className={`banner ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content ${darkMode && 'dark'}`}
        />
      </Wrapper>
      <Wrapper>
        <Skeleton
          variant='rectangular'
          className={`desc ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content size ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content place ${darkMode && 'dark'}`}
        />
        <Skeleton
          variant='rectangular'
          className={`content map ${darkMode && 'dark'}`}
        />
      </Wrapper>
    </Container>
  );
};

export default SinglePostSkelton;
