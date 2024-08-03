import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContextProvider';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
const Container = styled(motion.div)`
  position: absolute;
  top: 4rem;
  right: 1rem;
  z-index: 100000;
  padding: 1rem;
  background: ${props => props.theme.bg_primary};
  box-shadow: 0px 0px 5px 3px ${props => (props.dark ? '#282727b6' : '#dad7d7')};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media screen and (min-width: 768px) {
    right: 20rem;
    top: 3rem;
  }
  .icon {
    color: white;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Title = styled.h3``;
const LogoutButton = styled.button`
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  color: white;
  background-color: var(--faded_blue);
  cursor: pointer;
`;
const variants = {
  initial: { y: -300, opacity: 0, transition: { duration: 1 } },
  animate: { y: 0, opacity: 1, transition: { duration: 1 } },
};
const LogoutModel = ({ showModel, setShowModel }) => {
  const { logout, darkMode } = useAppContext();
  const handleLogout = () => {
    setShowModel(false);
    logout();
  };
  return (
    <Container
      dark={darkMode}
      variants={variants}
      initial='initial'
      animate={showModel ? 'animate' : 'initial'}
    >
      <TitleContainer>
        <Title>Confirm Logout? </Title>
        <IconButton onClick={() => setShowModel(false)}>
          <Close className='icon' />
        </IconButton>
      </TitleContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default LogoutModel;
