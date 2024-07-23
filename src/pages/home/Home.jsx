import styled from 'styled-components';
import Hero from '../../components/home/Hero';
import OurValues from '../../components/home/OurValues';
import FeaturedPlaces from '../../components/home/FeaturedPlaces';

const Container = styled.section`
  min-height: 100vh;
  overflow: auto;
`;
const Home = () => {
  return (
    <Container>
      <Hero />
      <FeaturedPlaces />
      <OurValues />
    </Container>
  );
};

export default Home;
