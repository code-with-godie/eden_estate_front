import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const Container = styled(motion.div)`
  padding: 1rem;
  background-color: #222229;
  border-radius: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  min-height: 150px;
  &.center {
    min-height: 100px;
    justify-content: center;
  }
`;
const Card = ({ children, center, variants }) => {
  return (
    <Container
      variants={variants}
      className={center && 'center'}
    >
      {' '}
      {children}{' '}
    </Container>
  );
};

export default Card;
