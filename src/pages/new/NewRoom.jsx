import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DropZone from './DropZone';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useLocation, useParams } from 'react-router-dom';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import RoomStepOne from './RoomStepOne';
import RoomStepTwo from './RoomStepTwo';
import CloudinaryUpload from '../../components/widget/CloudinaryUploadWidget';
const Wrapper = styled.div`
  display: flex;
  overflow: auto;
  gap: 0.5rem;
  flex-direction: column-reverse;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    height: 100vh;
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
  max-height: 50vh;
  border-radius: 0.5rem;
`;
const LabelSmall = styled.p`
  font-size: 0.8rem;
  color: #aaaaaa;
`;
const NewRoom = () => {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const { hotelId } = useParams();
  const [title, setTitle] = useState(null);
  const { data, loading, error } = useFetch(`/posts/find/${hotelId}`);
  const [edit, setEdit] = useState(false);
  const [desc, setDescription] = useState(null);
  const [shortDesc, setShortDescription] = useState(
    'short description about the room in you estate'
  );
  const handleDescription = (desc, short) => {
    setDescription(desc);
    setShortDescription(short);
  };
  const [index, setIndex] = useState(0);
  const [post, setPost] = useState({
    title: '',
    estateID: hotelId,
    price: '',
    bathrooms: '',
    guests: '',
    kingSize: '',
    queenSize: '',
    tv: false,
    wifi: false,
    mountain: false,
    ocean: false,
    forest: false,
    roomService: false,
    conditional: false,
    balcony: false,
    soundProve: false,
    breakFast: false,
  });

  useEffect(() => {
    console.log(location);
    if (location?.state?.post) {
      let { post, update } = location.state;
      const { user, ...tempPost } = post;
      post = { ...tempPost };
      setEdit(update);
      setPost(post);
      setImage(post?.image);
    }
  }, [location]);
  useEffect(() => {
    data && setTitle(data?.post?.title);
  }, [data]);
  useEffect(() => {
    console.log(image);
  }, [image]);
  return (
    <Wrapper>
      <Left>
        <Title>
          {' '}
          {loading ? <LoadingAnimation /> : error ? error?.message : title}{' '}
        </Title>
        {desc && <SmallTitle> {desc} </SmallTitle>}
        <LabelSmall> {shortDesc} </LabelSmall>

        <Right className='small'>
          {image ? (
            <ImageContainer>
              <Image
                src={image?.secure_url}
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
            <RoomStepOne
              post={post}
              setPost={setPost}
              setDescription={setDescription}
              setIndex={setIndex}
            />
          ) : (
            <RoomStepTwo
              post={post}
              setDescription={handleDescription}
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
              src={image?.secure_url}
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
          <CloudinaryUpload
            rooms
            setImage={setImage}
          />
          // <DropZone
          //   description='drag and drop a file here or'
          //   single
          //   setFiles={setImage}
          // />
        )}
        {/* <FileViewer images={image} /> */}
      </Right>
      <ToastContainer />
    </Wrapper>
  );
};
export default NewRoom;
