import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Container = styled(motion.div)`
  height: 100%;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  margin: 0 auto;
  max-width: 300px;
  object-fit: cover;
  border-radius: 1rem;
`;
const Price = styled.h2`
  font-size: 1.5rem;
`;
const Title = styled.h4`
  color: var(--faded_blue);
`;
const Description = styled.p`
  /* font-weight: 100; */
  font-size: 0.95em;
  font-style: italic;
`;
const Slide = ({ images, desc, price, title, _id }) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => navigate(`/p/${_id}`)}
      initial={{ scale: 1, trasition: { duration: 0.2 } }}
      whileHover={{
        scale: 1.02,
        y: [0, -10, 10, -10],
        trasition: { duration: 0.2 },
      }}
    >
      <ImageContainer>
        <Image src={images[0]} />
      </ImageContainer>
      <DescriptionContainer>
        <Price>Kshs. {price} </Price>
        <Title> {title} </Title>
        <Description>
          {' '}
          {desc?.length > 100 ? `${desc?.substring(0, 100)}...` : desc}{' '}
        </Description>
      </DescriptionContainer>
    </Container>
  );
};

export default Slide;
