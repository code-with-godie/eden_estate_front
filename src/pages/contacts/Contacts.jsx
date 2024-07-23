import styled from 'styled-components';
import { Typewriter } from 'react-simple-typewriter';
import Card from '../../components/styled/Card';
import Form from '../../components/contacts/Form';
import { Email, LocationOn, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';
const Container = styled.section`
  flex: 1;
  padding-top: 8rem;
  display: flex;
  overflow: hidden;

  flex-direction: column;
  gap: 1.5rem;
  @media screen and (min-width: 768px) {
    gap: 3.5rem;
    flex-direction: row;
    align-items: center;
  }
`;
const Left = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    flex: 1;
  }
`;
const Right = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 2rem;
  @media screen and (min-width: 768px) {
    flex: 1;
  }
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  .icon {
    color: var(--color_primary);
    font-size: 2rem;
  }
`;
const InfoDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ImageContainer = styled.div`
  padding: 1rem;
  background-color: #27262d;
`;
const Label = styled.p`
  text-transform: capitalize;
  font-size: 0.9rem;
  color: var(--color_gray);
`;
const Info = styled.p`
  color: var(--color_primary);
`;
const Introduction = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;
const Description = styled.p`
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 1.5px;
  color: var(--color_white-faded);
`;
const variants = {
  start: { x: '-100vh', opacity: 0 },

  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5 },
  },
};
const textVariants = {
  start: { x: '50vw', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5 },
  },
};
const Contacts = () => {
  const words = ['Get Started'];

  return (
    <Container>
      <Left
        variants={variants}
        initial='start'
        animate='animate'
      >
        <Card>
          <Introduction>
            <Typewriter
              loop={5}
              cursor
              cursorBlinking
              typeSpeed={150}
              deleteSpeed={70}
              words={words}
            />
          </Introduction>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem aut
            sed rem sit eos
          </Description>
          <Form />
        </Card>
      </Left>
      <Right
        variants={textVariants}
        initial='start'
        animate='animate'
      >
        <InfoContainer>
          <ImageContainer>
            <Phone className='icon' />
          </ImageContainer>
          <InfoDescription>
            <Label>Phone</Label>
            <Info>(+254) 112 483 569</Info>
          </InfoDescription>
        </InfoContainer>
        <InfoContainer>
          <ImageContainer>
            <Email className='icon' />
          </ImageContainer>
          <InfoDescription>
            <Label>email</Label>
            <Info>ngugimaina2019@gmail.com</Info>
          </InfoDescription>
        </InfoContainer>
        <InfoContainer>
          <ImageContainer>
            <LocationOn className='icon' />
          </ImageContainer>
          <InfoDescription>
            <Label>address</Label>
            <Info>10205,Nairobi Kenya</Info>
          </InfoDescription>
        </InfoContainer>
      </Right>
    </Container>
  );
};

export default Contacts;
