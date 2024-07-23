import React from 'react';
import logo from '../../assets/logo.png';
import styled from 'styled-components';
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: grid;
  place-content: center;
`;
const Image = styled.img`
  width: 100%;
  max-width: 100px;
  height: auto;
  animation: animate ease-in 500ms infinite alternate;
  @media screen and (min-width: 768px) {
    max-width: 200px;
  }
  @keyframes animate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
`;
const FirstLoading = () => {
  return (
    <Wrapper>
      <Image src={logo} />
    </Wrapper>
  );
};

export default FirstLoading;
