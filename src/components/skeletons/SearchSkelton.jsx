import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';

const Container = styled.div`
  display: flex;
  /* height: 90vh; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 170px;
  gap: 0.5rem;
  .dark {
    background: #2a2929;
  }
  .img {
    width: 200px;
    height: 100%;
  }
  .desc {
    height: 100%;
    flex: 1;
  }
  .footer {
    flex: 1;
    height: 100%;
  }
`;
const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 100%;
  width: 100px;
  height: 20%;
`;
const SearchSkelton = () => {
  const { darkMode } = useAppContext();

  return (
    <Container>
      {Array(6).fill(
        <Wrapper>
          <Skeleton
            variant='rectangular'
            className={`img ${darkMode && 'dark'}`}
          />
          <Skeleton
            variant='rectangular'
            className={`desc ${darkMode && 'dark'}`}
          />
          <Controls>
            <Skeleton
              variant='rounded'
              className={`footer ${darkMode && 'dark'}`}
            />
            <Skeleton
              variant='rounded'
              className={`footer ${darkMode && 'dark'}`}
            />
          </Controls>
        </Wrapper>
      )}
    </Container>
  );
};

export default SearchSkelton;
