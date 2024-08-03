import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { FaMoon, FaSun } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import bar from '../../assets/menu.png';
import { motion } from 'framer-motion';
import { Home, Phone, SignpostOutlined } from '@mui/icons-material';
const Container = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  .link {
    color: inherit;
    text-decoration: none;
    padding-bottom: 0.5rem;
    font-size: 1rem;
    transition: transform 150ms ease-in;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .link.active {
    color: var(--faded_blue);
    font-size: 1.2rem;
    border-bottom: 2px solid var(--faded_blue);
  }
  .link:hover {
    transform: scale(1.05);
  }
  .icon {
    color: inherit;
    /* color: var(--color_primary); */
  }

  @media screen and (min-width: 768px) {
    .menu {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .large {
      display: none;
    }
  }
`;
const Left = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Center = styled(motion.div)`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 0.7rem;
    align-items: center;
  }
`;
const Right = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const UserDetailsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  cursor: pointer;
  align-items: center;
`;
const AuthContainer = styled(motion.div)`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
`;
const UserName = styled(motion.h3)``;
const LogoImage = styled(motion.img)`
  max-width: 40px;
  cursor: pointer;
  object-fit: contain;
  height: auto;
  &.small {
    max-width: 30px;
  }
`;
const LogoNameContainer = styled.div`
  position: relative;
`;
const LogoName = styled(motion.h2)`
  text-transform: capitalize;
  position: relative;
  z-index: 100;
  cursor: pointer;
`;
const LogoModel = styled.div`
  background-color: var(--faded_blue);
  border-radius: 50%;
  position: absolute;
  right: -1rem;
  top: 0;
  padding: 0.7rem;
  filter: blur(3px);
`;
const ThemeContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 1 },
  },
};
const Topnav = ({ setShowModel }) => {
  const { user, darkMode, toggleTheme, toggleDrawer } = useAppContext();
  const navigate = useNavigate();
  return (
    <Container
      variants={variants}
      initial='initial'
      animate='animate'
    >
      <Left
        onClick={() => navigate('/')}
        initial='initial'
        animate='animate'
      >
        <LogoImage
          initial='initial'
          animate='animate'
          src={logo}
          alt='logo picture'
        />
        <LogoNameContainer>
          <LogoName
            initial='initial'
            animate='animate'
          >
            eden estate
          </LogoName>
          <LogoModel />
        </LogoNameContainer>
      </Left>
      <Center
        initial='initial'
        animate='animate'
      >
        <NavLink
          initial='initial'
          animate='animate'
          className='link'
          to='/'
        >
          <Home />
          Home
        </NavLink>
        <NavLink
          initial='initial'
          animate='animate'
          className='link'
          to='/about'
        >
          <Phone />
          About
        </NavLink>
        <NavLink
          initial='initial'
          animate='animate'
          className='link'
          to='/contacts'
        >
          <Phone />
          Contacts
        </NavLink>
      </Center>
      <Right
        initial='initial'
        animate='animate'
      >
        {user ? (
          <>
            <UserDetailsContainer
              initial='initial'
              animate='animate'
              onClick={() => setShowModel(prev => !prev)}
            >
              <Avatar
                initial='initial'
                animate='animate'
                src={user?.avatar}
                alt={user?.username}
              />
              <UserName
                initial='initial'
                animate='animate'
              >
                {/* {user?.username} */}
              </UserName>
            </UserDetailsContainer>
          </>
        ) : (
          <AuthContainer
            initial='initial'
            animate='animate'
          >
            <NavLink
              initial='initial'
              animate='animate'
              className='link'
              to='/login'
            >
              <SignpostOutlined />
              Sign In
            </NavLink>
            <NavLink
              initial='initial'
              animate='animate'
              className='link'
              to='/register'
            >
              <SignpostOutlined />
              Sing up
            </NavLink>
          </AuthContainer>
        )}
        <ThemeContainer>
          <Tooltip
            initial='initial'
            animate='animate'
            arrow
            title='change theme'
          >
            <IconButton
              className='icon'
              onClick={toggleTheme}
            >
              {darkMode ? <FaMoon /> : <FaSun />}
            </IconButton>
          </Tooltip>
        </ThemeContainer>
        <IconButton
          className='menu'
          onClick={toggleDrawer}
        >
          <LogoImage
            className='small'
            src={bar}
          />
        </IconButton>
      </Right>
    </Container>
  );
};

export default Topnav;
