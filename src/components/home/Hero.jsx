import React from 'react';
import styled from 'styled-components';
import image from '../../assets/bg3.jpeg';
import Search from './Search';
import Counts from './Counts';
const Container = styled.article`
  min-height: 90vh;
  display: flex;
  position: relative;
  z-index: 1;
  flex-direction: column;
  gap: 0.5rem;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 100;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
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
  border: 3px solid var(--faded_blue);
  @media screen and (min-width: 768px) {
    flex-direction: row;
    max-width: 450px;
    max-height: 500px;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  position: relative;
  z-index: 10;
  text-align: center;
  text-transform: capitalize;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
    text-align: start;
  }
`;
const Description = styled.p`
  text-align: center;
  /* font-weight: 100; */
  position: relative;
  z-index: 10;
  font-style: oblique;
  @media screen and (min-width: 768px) {
    text-align: start;
  }
`;
const TitleBackground = styled.div`
  position: absolute;
  padding: 3rem;
  top: -1rem;
  right: 5rem;
  z-index: -1;
  filter: blur(5px);
  background-color: ${props => props.theme.bg_title};
  border-radius: 50%;
`;
const WhiteBackground = styled.div`
  position: absolute;
  width: 100vw;
  top: 50%;
  left: 30%;
  transform: translate(-30%, -50%);
  height: 100vh;
  max-width: 100px;
  z-index: 10;
  max-height: 100px;
  filter: blur(70px);
  background-color: ${props => props.theme.bg_ovarlay};
  border-radius: 50%;
`;
const Hero = () => {
  return (
    <Container>
      <WhiteBackground />
      <Left>
        <Title>
          Discover most suitable property
          <TitleBackground />
        </Title>
        <Description>
          Find a variety of properties that suits you very easily.forget all
          difficulties in finding a residence for ypu
        </Description>
        <Search />
        <Counts />
      </Left>
      <Right>
        <Image
          src={image}
          alt='display photo'
        />
      </Right>
    </Container>
  );
};

export default Hero;
