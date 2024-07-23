import { Outlet } from 'react-router-dom';
import Topnav from '../../components/nav/Topnav';
import Sidenav from '../../components/nav/Sidenav';
import styled from 'styled-components';
import { useState } from 'react';
import LogoutModel from '../../components/nav/LogoutModel';
import Footer from './Footer';

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: auto;
  overflow-x: hidden;
  color: ${props => props.theme.color_primary};
  background: ${props => props.theme.bg_primary};
`;
const Container = styled.section`
  flex: 1;
  max-width: 1000px;
  padding: 0.5rem;
  overflow-x: hidden;
`;
const WhiteBackground = styled.div`
  position: absolute;
  width: 100vw;
  top: 4rem;
  left: 3rem;
  height: 100vh;
  max-width: 300px;
  z-index: 10;
  max-height: 300px;
  filter: blur(150px);
  background-color: ${props => props.theme.bg_ovarlay};
  border-radius: 50%;
`;
const RootLayout = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <Wrapper>
      {/* <WhiteBackground /> */}
      <Container>
        <Topnav setShowModel={setShowModel} />
        <Sidenav setShowModel={setShowModel} />
        <Outlet />
        <Footer />
      </Container>
      <LogoutModel
        setShowModel={setShowModel}
        showModel={showModel}
      />
    </Wrapper>
  );
};

export default RootLayout;
