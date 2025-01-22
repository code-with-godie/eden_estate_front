import React, { useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Message = styled.p`
  margin-bottom: 2rem;
  &.small {
    font-size: 0.9rem;
    color: gray;
  }
`;

const SuccessPage = () => {
  const navigate = useNavigate();

  navigate('/');

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, [5000]);
  }, [navigate]);

  return (
    <Container>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
      />
      <Title>Payment Successful!</Title>
      <Message>Thank you for your booking. Enjoy your stay!</Message>
      <Message>Wait for a redirect...!</Message>
    </Container>
  );
};

export default SuccessPage;
