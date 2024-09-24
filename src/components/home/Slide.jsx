import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LocationOnOutlined } from '@mui/icons-material';
const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  margin: 0 auto;
  max-width: 300px;
  object-fit: cover;
  border-radius: 1rem;
`;
const Price = styled.h2`
  font-size: 1.5rem;
  color: var(--faded_blue);
`;
const Title = styled.h4`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Description = styled.p`
  /* font-weight: 100; */
  font-size: 0.95em;
  font-style: italic;
`;
const Slide = ({ image, desc, location, city, state, country, title, _id }) => {
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
        <Image src={image} />
      </ImageContainer>
      <DescriptionContainer>
        <Price>{title} </Price>
        <Title>
          {' '}
          <LocationOnOutlined className='icon' />
          {`${city === state ? state : `${city},${state}`},${country}`}{' '}
        </Title>
        <Description>
          {' '}
          {desc?.length > 100 ? `${desc?.substring(0, 100)}...` : desc}{' '}
        </Description>
      </DescriptionContainer>
    </Container>
  );
};

export default Slide;
