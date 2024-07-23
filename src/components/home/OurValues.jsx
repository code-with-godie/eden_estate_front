import React from 'react';
import styled from 'styled-components';
import image from '../../assets/bg3.jpeg';
import Accordion from './Accordion';
const Container = styled.article`
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  gap: 0.5rem;
  @media screen and (min-width: 768px) {
    min-height: 90vh;
    flex-direction: row;
    align-items: center;
  }
`;
const Right = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    flex: 1;
    display: flex;
    position: relative;
    z-index: 100;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  margin-top: 3rem;
  @media screen and (min-width: 768px) {
    margin-top: 0 !important;
  }
`;
const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 50% 50% 0 0;
  border: 5px solid #a6a5a5bf;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    max-width: 450px;
    max-height: 500px;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-size: 1.5rem;
  position: relative;
  text-align: start;
  text-transform: capitalize;
  color: #0a7ede;
`;
const Description = styled.p`
  position: relative;
  z-index: 10;
  font-size: 1rem;
  &:first-child {
    font-size: 1.2rem;
    color: #2a70e0;
  }
`;
const OurValues = () => {
  return (
    <Container>
      <Right>
        <Image
          src={image}
          alt='display photo'
        />
      </Right>
      <Left>
        <Description>our values</Description>
        <Title>Values we give to you</Title>
        <Description>
          we are always ready to help by providing the best service for you. we
          believe a good place to live can make your life better
        </Description>
        <Accordion />
      </Left>
    </Container>
  );
};

export default OurValues;
