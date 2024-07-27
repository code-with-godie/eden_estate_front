import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { Avatar } from '@mui/material';
import PostList from '../search/PostList';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import Messeger from '../../components/messeger/Messeger';
const Container = styled.div`
  display: flex;
  overflow: auto;
  gap: 0.5rem;
  height: 91.5vh;
  flex-direction: column;
  .profile {
    width: 70px;
    height: 70px;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Right = styled.div`
  flex: 1;
  max-width: 400px;
  position: sticky;
  top: 0;
  @media screen and (max-width: 768px) {
    position: absolute;
    max-width: none;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateX(100%);
    transition: all 350ms;
    background: ${props => props.theme.bg_primary};
    &.show {
      transform: translateX(0);
    }
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0 0.5rem 0;
  justify-content: space-between;
`;
const Title = styled.h3`
  text-transform: capitalize;
  font-size: 100;
  font-size: 1.5rem;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  background: var(--faded_blue);
  cursor: pointer;
  font-size: 1rem;
  text-transform: capitalize;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Label = styled.p`
  &:first-child {
    font-weight: 500;
    text-transform: capitalize;
  }
`;

const Profile = () => {
  const { user, logout, showChat } = useAppContext();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const { data, loading, error } = useFetch('/posts');
  const {
    data: savedData,
    loading: savedLoading,
    error: savedError,
  } = useFetch('/posts/saved');

  useEffect(() => {
    data && setPosts(data?.posts);
  }, [data]);
  useEffect(() => {
    savedData && setSavedPosts(savedData?.posts);
  }, [savedData]);
  return (
    <Container>
      <Left>
        <Header>
          <Title>user information</Title>
          <Button onClick={() => navigate('/update/details')}>update</Button>
        </Header>
        <UserInfo>
          <UserItem>
            <Label>Avatar:</Label>
            <Label>
              {' '}
              <Avatar
                className='profile'
                src={user?.avatar}
                alt={user?.username}
              />{' '}
            </Label>
          </UserItem>
          <UserItem>
            <Label>username:</Label>
            <Label> {user?.username} </Label>
          </UserItem>
          <UserItem>
            <Label>emial:</Label>
            <Label> {user?.email} </Label>
          </UserItem>
          <UserItem>
            <Button onClick={logout}>logout</Button>
          </UserItem>
        </UserInfo>
        <Header>
          <Title>my list</Title>
          <Button onClick={() => navigate('/new/post')}>create new post</Button>
        </Header>
        {error ? (
          <p>could not load posts</p>
        ) : loading ? (
          <LoadingAnimation />
        ) : (
          <PostList posts={posts} />
        )}
        <Header>
          <Title>saved places</Title>
        </Header>
        {savedError ? (
          <p>could not load saved places </p>
        ) : savedLoading ? (
          <LoadingAnimation />
        ) : (
          <PostList posts={savedPosts} />
        )}
      </Left>
      <Right className={showChat && 'show'}>
        <Messeger />
      </Right>
    </Container>
  );
};

export default Profile;
