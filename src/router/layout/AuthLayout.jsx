import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import image from '../../assets/bg5.png';
import { motion } from 'framer-motion';
const Container = styled.section`
  height: 90vh;
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
`;
const Left = styled(motion.div)`
  display: none;
  clip-path: polygon(
    1% 0%,
    0% 99%,
    100% 99%,
    100% 70%,
    89% 69%,
    89% 15%,
    100% 15%,
    100% 0
  );
  /* clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 15%,
    63% 47%,
    99% 74%,
    100% 100%,
    1% 99%
  ); */
  @media screen and (min-width: 768px) {
    display: block;
    background: url(${props => props.bg}) no-repeat top;
    background-size: cover;
    flex: 1;
    border-radius: 0.5rem;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AuthLayout = () => {
  return (
    <Container>
      <Left
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
        bg={image}
      />
      <Right>
        <Outlet />
      </Right>
    </Container>
  );
};

export default AuthLayout;
