import { Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
  .sms:nth-child(even) {
    align-self: flex-end;
    width: 50%;
  }
  .sms:nth-child(odd) {
    align-self: flex-start;
    width: 50%;
  }
`;
const MesssegeSkeleton = () => {
  return (
    <Container>
      {Array(15).fill(
        <Skeleton
          height={150}
          className='sms'
          variant='text'
        />
      )}
    </Container>
  );
};

export default MesssegeSkeleton;
