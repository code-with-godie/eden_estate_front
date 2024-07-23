import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { motion } from 'framer-motion';
const PostContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  &.scroll {
    overflow: auto;
  }
`;
const PostList = ({ posts, scroll }) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 1 } },
  };
  return (
    <PostContainer
      variants={variants}
      initial='initial'
      animate='animate'
      className={scroll && 'scroll'}
    >
      {posts.map(item => (
        <Post
          variants={variants}
          key={item._id}
          {...item}
        />
      ))}
    </PostContainer>
  );
};

export default PostList;
