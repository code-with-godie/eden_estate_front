import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Home, Login, Phone, SignpostOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: all 300ms;
  overflow: hidden;
  display: flex;
  justify-content: end;
  align-items: start;
  padding: 3.5rem 1rem 0 0;
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
`;
const Container = styled(motion.div)`
  background: ${props => props.theme.bg_primary};
  box-shadow: 0px 0px 5px 3px ${props => (props.dark ? '#2f2e2eb6' : '#dad7d7')};
  width: 100%;
  max-width: 200px;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .link {
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
    font-size: 1rem;
    text-transform: capitalize;
    transition: transform 150ms ease-in;
  }
  .link.active {
    font-size: 1.2rem;
    background: var(--faded_blue);
  }
  .link:hover {
    transform: scale(1.05);
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &.profile {
    cursor: pointer;
  }
`;
const Label = styled.p``;
const variants = {
  hidden: { opacity: 0, x: '40vh', scale: 0, transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 360,
    transition: { duration: 0.5 },
  },
};

const UserDetails = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Sidenav = ({ setShowModel }) => {
  const { darkMode, isDrawerOpen, closeDrawer, toggleTheme } = useAppContext();
  const { user } = useAppContext();
  const handleProfile = () => {
    navigate(`/profile/@${user?.username}`, {
      state: { userID: user?._id },
    });
    closeDrawer();
  };
  const handleClick = () => {
    toggleTheme();
    closeDrawer();
  };
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={closeDrawer}
      open={isDrawerOpen}
    >
      <Container
        variants={variants}
        animate={isDrawerOpen ? 'visible' : 'hidden'}
        dark={darkMode}
      >
        <NavLink
          onClick={closeDrawer}
          className='link'
          to='/'
        >
          <Item>
            <Home />
            <Label>Home</Label>
          </Item>
        </NavLink>
        <NavLink
          onClick={closeDrawer}
          className='link'
          to='/search'
        >
          <Item>
            <Home />
            <Label>Estate</Label>
          </Item>
        </NavLink>
        <NavLink
          className='link'
          to='/contacts'
          onClick={closeDrawer}
        >
          <Item>
            <Phone />
            <Label>Contacts</Label>
          </Item>
        </NavLink>
        <div
          style={{ cursor: 'pointer', padding: '.5rem' }}
          className='icon'
          onClick={handleClick}
        >
          <Item>
            {darkMode ? <FaMoon /> : <FaSun />}
            <Label> {darkMode ? 'Dark mode' : 'Light Mode'} </Label>
          </Item>
        </div>
        {user ? (
          <UserDetails>
            <Item
              className='profile'
              onClick={handleProfile}
            >
              <Avatar
                src={user?.avatar}
                alt={user?.username}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.3rem',
                  flex: '1',
                  overflow: 'hidden',
                }}
              >
                <Label>welcome </Label>
                <Label>{user?.username} </Label>
              </div>
            </Item>
          </UserDetails>
        ) : (
          <>
            <NavLink
              className='link'
              to='/login'
              onClick={closeDrawer}
            >
              <Item>
                <Login />
                <Label>sign in</Label>
              </Item>
            </NavLink>
            <NavLink
              className='link'
              to='/register'
              onClick={closeDrawer}
            >
              <Item>
                <SignpostOutlined />
                <Label>sign up</Label>
              </Item>
            </NavLink>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Sidenav;
