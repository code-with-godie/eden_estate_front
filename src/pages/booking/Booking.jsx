import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LocationOnOutlined } from '@mui/icons-material';
import { Avatar, Skeleton } from '@mui/material';
// import SingleDescription from './SingleDescription';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../api/useFetch';
import { useAppContext } from '../../context/AppContextProvider';
import Map from '../../components/map/Map';
import Room from '../single/Room';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 70vh;
  .dark {
    background: #2a2929;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const Right = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  position: relative;
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
  text-transform: capitalize;
`;
const Address = styled.p`
  display: flex;
  align-items: center;
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
  .profile {
    width: 50px;
    height: 50px;
  }
`;
const Name = styled.p`
  color: var(--faded_blue);
`;
const MapContainer = styled.div`
  width: 100%;
  height: 250px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const Booking = () => {
  const [post, setPost] = useState(null);
  const [room, setRoom] = useState(null);
  const { postID, roomID } = useParams();
  const { darkMode } = useAppContext();
  const { data, error, loading } = useFetch(`/posts/find/${postID}`);
  const {
    data: roomData,
    loading: roomLoading,
    // error: roomError,
  } = useFetch(`/rooms/single/${roomID}`);

  const navigate = useNavigate();

  useEffect(() => {
    data && setPost(data?.post);
  }, [data]);
  useEffect(() => {
    roomData && setRoom(roomData?.room);
  }, [roomData]);
  // if (loading) return <SinglePostSkelton />;
  if (error) return <p>could not load a post</p>;

  return (
    <Container>
      <Right>
        {roomLoading ? (
          <Skeleton
            variant='rounded'
            width='100%'
            height='100%'
            className={darkMode && 'dark'}
          />
        ) : (
          <>
            {room && (
              <Room
                showPicker
                {...room}
              />
            )}
            <p> {post?.desc} </p>
          </>
        )}
      </Right>
      <Left>
        {loading ? (
          <>
            <Skeleton
              variant='rounded'
              width='100%'
              height={200}
              className={darkMode && 'dark'}
            />
            <Wrapper>
              <Skeleton
                variant='rounded'
                width={100}
                height={100}
                className={darkMode && 'dark'}
              />
              <Skeleton
                variant='rounded'
                width={100}
                height={100}
                className={darkMode && 'dark'}
              />
            </Wrapper>
            <Skeleton
              variant='rounded'
              width='100%'
              height={250}
              className={darkMode && 'dark'}
            />
          </>
        ) : (
          <>
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
                    {`${
                      post?.city === post?.state
                        ? post?.state
                        : `${post?.city},${post?.state}`
                    },${post?.country}`}
                  </Address>
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
              <MapContainer>
                {post && (
                  <Map
                    posts={[
                      {
                        image: post?.image,
                        country: post?.country,
                        state: post?.state,
                        coodinates: post?.coodinates,
                      },
                    ]}
                  />
                )}
              </MapContainer>
            </Bottom>
          </>
        )}
      </Left>
    </Container>
  );
};

export default Booking;
