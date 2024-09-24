import { Outlet } from 'react-router-dom';
import Topnav from '../../components/nav/Topnav';
import Sidenav from '../../components/nav/Sidenav';
import styled from 'styled-components';
import { useState } from 'react';
import LogoutModel from '../../components/nav/LogoutModel';
import Footer from './Footer';
import AccountModel from '../../components/nav/AccountModel';

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  /* height: 100vh; */
  width: 100%;
  position: relative;
  /* overflow: auto; */
  /* overflow-x: hidden; */
  color: ${props => props.theme.color_primary};
  background: ${props => props.theme.bg_primary};
`;
const Container = styled.section`
  flex: 1;
  max-width: 1200px;
  padding: 0.5rem;
  overflow-x: hidden;
`;
const RootLayout = () => {
  const [showModel, setShowModel] = useState(false);
  const [showAccountModel, setShowAccountModel] = useState(false);
  return (
    <Wrapper>
      {/* <WhiteBackground /> */}
      <Container>
        <Topnav setShowModel={setShowAccountModel} />
        <Sidenav setShowModel={setShowModel} />
        <Outlet />
        <Footer />
      </Container>
      <LogoutModel
        setShowModel={setShowModel}
        showModel={showModel}
      />
      <AccountModel
        setShowModel={setShowAccountModel}
        showModel={showAccountModel}
        setLogoutModel={setShowModel}
      />
    </Wrapper>
  );
};

export default RootLayout;
