import styled from 'styled-components';
import Hero from '../../components/home/Hero';
import OurValues from '../../components/home/OurValues';
import FeaturedPlaces from '../../components/home/FeaturedPlaces';
import FeaturedRooms from '../../components/home/FeaturedRooms';

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
      <FeaturedRooms />
    </Container>
  );
};

export default Home;
