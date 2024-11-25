import {
  FavoriteBorderOutlined,
  Logout,
  Person2Outlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContextProvider';
const Container = styled(motion.div)`
  position: absolute;
  z-index: 1000000;
  top: 70px;
  right: 50px;
  border-radius: 0.3rem;
  background: ${props => props.theme.bg_primary};
  box-shadow: 0px 0px 5px 3px ${props => (props.dark ? '#2f2e2eb6' : '#dad7d7')};
  width: 200px;
  transition: all 100ms ease-in-out;
  @media screen and (max-width: 768px) {
    right: 0;
  }
`;
const Item = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  .icon {
    font-size: 1.7rem;
  }
  :hover {
    background-color: ${props => props.theme.bg_primary_2};
  }
`;
const ItemLabel = styled.p`
  flex: 1;
  font-weight: 100;
  text-transform: capitalize;
  font-size: 1rem;
`;

const variants = {
  initial: { y: -300, opacity: 0, transition: { duration: 1 } },
  animate: { y: 0, opacity: 1, transition: { duration: 1 } },
};
const AccountModel = ({ showModel, setLogoutModel, setShowModel }) => {
  const { darkMode, user } = useAppContext();
  const navigate = useNavigate();
  const handleNavigate = to => {
    navigate(to);
    setShowModel(false);
  };
  const handleProfile = to => {
    navigate(`/profile/@${user?.username}`, {
      state: { userID: user?._id },
    });
    setShowModel(false);
  };
  const handleLogout = () => {
    setLogoutModel(true);
    setShowModel(false);
  };

  return (
    <Container
      dark={darkMode}
      variants={variants}
      initial='initial'
      animate={showModel ? 'animate' : 'initial'}
    >
      <Item onClick={handleProfile}>
        <Person2Outlined className='icon' />
        <ItemLabel>my profile</ItemLabel>
      </Item>
      <Item onClick={() => handleNavigate('/new/post')}>
        <FavoriteBorderOutlined className='icon' />
        <ItemLabel>create an estate</ItemLabel>
      </Item>
      <Item onClick={handleLogout}>
        <Logout className='icon' />
        <ItemLabel>logout</ItemLabel>
      </Item>
    </Container>
  );
};

export default AccountModel;
