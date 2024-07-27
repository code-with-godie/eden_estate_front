import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LocationOnOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import SingleDescription from './SingleDescription';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import Rooms from './Rooms';
import { useAppContext } from '../../context/AppContextProvider';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  @media screen and (min-width: 768px) {
    height: 100%;
    flex-direction: row;
  }
`;
const Right = styled.div`
  flex: 1;
  /* position: sticky; */
  top: 50px;
  @media screen and (min-width: 768px) {
    max-width: 400px;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`;
const Top = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;
const Bottom = styled.div``;
const ImageContainer = styled.div`
  flex: 1;
  padding: 0.5rem;
`;
const OtherImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 1rem;
  @media screen and (min-width: 480px) {
    flex-direction: column;
  }
`;
const Images = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
`;
const OtherImages = styled.img`
  width: 150px;
  /* max-width: 300px; */
  height: auto;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
`;
const TitleWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;
const UserContainer = styled.div`
  align-self: flex-start;
`;
const Title = styled.h1`
  color: var(--faded_blue);
`;
const Address = styled.p`
  display: flex;
  align-items: center;
`;
const LableContainer = styled.ul``;
const Label = styled.li`
  padding: 0.3rem;
  /* background-color: var(--faded_blue); */
  align-self: flex-start;
`;
const Description = styled.p`
  padding: 0.3rem;
  letter-spacing: 1px;
`;
const User = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  cursor: pointer;
  align-items: center;
  &.dark {
    background-color: var(--color_faded_dark);
  }
  &.light {
    box-shadow: 0px 0px 5px 3px #f2f1f1;
  }
  /* background-color: var(--faded_blue); */
  .profile {
    width: 50px;
    height: 50px;
  }
`;
const Name = styled.p`
  color: var(--faded_blue);
`;
const SinglePost = () => {
  const [post, setPost] = useState();
  const { postID } = useParams();
  const { darkMode } = useAppContext();
  const { data, loading, error } = useFetch(`/posts/find/${postID}`);
  const navigate = useNavigate();

  useEffect(() => {
    data && setPost(data?.post);
  }, [data]);
  if (loading) return <LoadingAnimation large />;
  if (error) return <p>could not load a post</p>;

  return (
    <Container>
      <Left>
        <Top>
          <ImageContainer>
            <Images src={post?.image} />
          </ImageContainer>
          <OtherImagesContainer>
            {post?.images?.slice(1)?.map((item, index) => (
              <OtherImages
                key={index}
                src={item}
              />
            ))}
          </OtherImagesContainer>
        </Top>
        <Bottom>
          <TitleWrapper>
            <TitleContainer>
              <Title> {post?.title} </Title>
              <Address>
                {' '}
                <LocationOnOutlined className='icon' />
                {`${post?.location}, ${
                  post?.city === post?.state
                    ? post?.state
                    : `${post?.city},${post?.state}`
                },${post?.country}`}
              </Address>
              <LableContainer>
                <Label> available for : {post?.type} </Label>
                <Label> property type : {post?.property} </Label>
              </LableContainer>
            </TitleContainer>
            <UserContainer>
              <User
                className={darkMode ? 'dark' : 'light'}
                onClick={() =>
                  navigate(`/profile/@${post?.user?.username}`, {
                    state: { userID: post?.user?._id },
                  })
                }
              >
                <Avatar
                  src={post?.user?.avatar}
                  alt={post?.user?.username}
                  className='profile'
                />
                <Name> {post?.user?.username} </Name>
              </User>
            </UserContainer>
          </TitleWrapper>
          <Description>{post?.desc}</Description>
          <Rooms
            title={post?.title}
            estateID={post?._id}
          />
        </Bottom>
      </Left>
      <Right>
        <SingleDescription {...post} />
      </Right>
    </Container>
  );
};

export default SinglePost;
