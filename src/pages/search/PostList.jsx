import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { motion } from 'framer-motion';
import saved from '../../assets/saved.png';
const PostContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: auto;
  flex-shrink: 0;
  &.scroll {
    overflow: auto;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  gap: 1rem;
`;
const Image = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: contain;
`;
const Message = styled.p``;
const PostList = ({ posts, scroll, handleMessege, message }) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 1 } },
  };
  if (posts?.length === 0)
    return (
      <Wrapper>
        <Image src={saved} />
        <Message> {message} </Message>
      </Wrapper>
    );
  return (
    <PostContainer
      variants={variants}
      initial='initial'
      animate='animate'
      className={scroll && 'scroll'}
    >
      {posts.map(item => (
        <Post
          handleMessege={handleMessege}
          variants={variants}
          key={item._id}
          {...item}
        />
      ))}
    </PostContainer>
  );
};

export default PostList;
