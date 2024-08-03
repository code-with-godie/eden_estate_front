import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContextProvider';
const Container = styled(motion.div)`
  padding: 1rem;
  &.dark {
    background-color: var(--color_faded_dark);
  }
  &.light {
    box-shadow: 0px 0px 5px 3px #f2f1f1;
  }
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
  const { darkMode } = useAppContext();
  return (
    <Container
      dark={darkMode}
      variants={variants}
      className={center && 'center'}
    >
      {' '}
      {children}{' '}
    </Container>
  );
};

export default Card;
