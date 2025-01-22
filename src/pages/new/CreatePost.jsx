import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DropZone from './DropZone';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useLocation } from 'react-router-dom';
const Wrapper = styled.div`
  display: flex;
  overflow: auto;
  gap: 0.5rem;
  flex-direction: column-reverse;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;
const Right = styled.div`
  display: none;
  &.small {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
  }
  @media screen and (min-width: 768px) {
    &.small {
      display: none;
    }
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    max-width: 400px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-transform: capitalize;
  font-size: 1.5rem;
  color: var(--faded_blue);
  padding-bottom: 0.6rem;
`;
const SmallTitle = styled.h4`
  text-transform: capitalize;
  font-size: 1rem;
  color: var(--faded_blue);
`;
const Description = styled.p`
  color: #a6a5a5bf;
  font-style: oblique;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  .btn {
    position: absolute;
    z-index: 100;
    right: 10px;
    top: 10px;
    background-color: white;
    :hover {
      background-color: #ffffffcd;
    }
  }
`;
const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
  /* max-width: 300px; */
  max-height: 50vh;
  border-radius: 0.5rem;
`;
const CreatePost = () => {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const [edit, setEdit] = useState(false);
  const [desc, setDescription] = useState('Estate name and location details');
  const [index, setIndex] = useState(0);
  const [post, setPost] = useState({
    title: '',
    price: '',
    country: '',
    state: '',
    breakfast: {
      offered: false,
      price: '',
    },
    city: '',
    location: '',
    type: '',
    coodinates: {
      longitude: -12.877473,
      latitude: 13.66432442,
    },
    income: '',
    size: '',
    school: '',
    bus: '',
    restaurant: '',
    property: 'apartment',
    utilities: 'Owner is responsible',
    pet: 'pet are allowed',
    desc: '',
    image,
  });

  useEffect(() => {
    if (location?.state?.post) {
      let { post, update } = location.state;
      const { user, ...tempPost } = post;
      post = { ...tempPost };
      setEdit(update);
      setPost(() => {
        if (typeof post?.country === 'string') {
          console.log('found post', post);

          return post;
        } else {
          const newPost = {
            ...post,
            country: post?.country?.ISOCode,
            state: post?.state?.ISOCode,
          };
          console.log('found new post', newPost);

          return newPost;
        }
      });
      setImage(post?.image);
    }
  }, [location]);
  return (
    <Wrapper>
      <Left>
        <Title>
          {' '}
          {edit
            ? `Update ${post?.title} estate`
            : 'Bring your estate online'}{' '}
        </Title>
        <Description>
          {edit
            ? `This estate is located at ${post.state?.name}, ${post?.country?.name}`
            : ' just a few step and you join million of lardlords all across th globe'}
        </Description>
        <SmallTitle> {desc} </SmallTitle>
        <Right className='small'>
          {image ? (
            <ImageContainer>
              <Image
                src={image}
                alt='hotel image'
              />
              <IconButton
                onClick={() => setImage(null)}
                className='btn'
              >
                <Close />
              </IconButton>
            </ImageContainer>
          ) : (
            <DropZone
              description='drag and drop a file here or'
              single
              setFiles={setImage}
            />
          )}
        </Right>
        <Container>
          {index === 0 ? (
            <StepOne
              post={post}
              setPost={setPost}
              setDescription={setDescription}
              setIndex={setIndex}
            />
          ) : (
            <StepTwo
              post={post}
              setDescription={setDescription}
              setPost={setPost}
              image={image}
              edit={edit}
              setIndex={setIndex}
            />
          )}
        </Container>
      </Left>
      <Right>
        {image ? (
          <ImageContainer>
            <Image
              src={image}
              alt='hotel image'
            />
            <IconButton
              onClick={() => setImage(null)}
              className='btn'
            >
              <Close />
            </IconButton>
          </ImageContainer>
        ) : (
          <DropZone
            description='drag and drop a file here or'
            single
            setFiles={setImage}
          />
        )}
        {/* <FileViewer images={image} /> */}
      </Right>
      <ToastContainer />
    </Wrapper>
  );
};

export default CreatePost;
