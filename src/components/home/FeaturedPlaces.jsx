import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from './Slide';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import { IconButton } from '@mui/material';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../loading/LoadingAnimation';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 100;
  padding: 0.5rem 0 0 0;
  gap: 0.5rem;
  @media screen and (min-width: 768px) {
    height: 70vh;
  }
`;
const SubTittle = styled.h4`
  font-size: 1.3rem;
  font-weight: 200;
  text-transform: capitalize;
  color: var(--faded_blue);
`;
const Title = styled.h1`
  color: #0a7ede;
  text-transform: capitalize;
  font-size: 2rem;
`;
const Wrapper = styled.div`
  position: relative;
  flex: 1;
  /* overflow: hidden; */
  .swiper {
    /* background-color: red; */
    width: 100%;
    height: 100%;
    padding: 0.5rem;
  }
  .btn {
    position: absolute;
    z-index: 1000;
    top: 20%;
    background: var(--faded_blue);
    :hover {
      opacity: 0.8;
    }
  }
  .btn.right {
    right: 1rem;
  }
  .btn.left {
    left: 1rem;
  }
`;
const FeaturedPlaces = () => {
  const [featured, setFeatured] = useState([]);
  const { data, loading, error } = useFetch('/posts/featured');
  useEffect(() => {
    data && setFeatured(data.posts);
  }, [data]);
  if (loading) return <LoadingAnimation large />;
  if (error) return <p>could not load a post</p>;
  return (
    <Container>
      <SubTittle>best choices</SubTittle>
      <Title>Featured estates</Title>
      <Wrapper>
        <Swiper
          autoplay={{ delay: 2000 }}
          loop={true}
          modules={[Autoplay]}
          spaceBetween={10}
          breakpoints={{
            480: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
          }}
          className='swiper'
        >
          {featured.map(item => (
            <SwiperSlide key={item._id}>
              <Slide {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton
          className='btn left'
          // onClick={() => swiper.slidePrev()}
        >
          {' '}
          <MdKeyboardArrowLeft />{' '}
        </IconButton>
        <IconButton
          className='btn right'
          // onClick={() => swiper.slideNext()}
        >
          {' '}
          <MdKeyboardArrowRight />{' '}
        </IconButton>
      </Wrapper>
    </Container>
  );
};

export default FeaturedPlaces;
