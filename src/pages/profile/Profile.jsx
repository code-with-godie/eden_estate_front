import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { Avatar } from '@mui/material';
import PostList from '../search/PostList';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import SearchSkeleton from '../../components/skeletons/SearchSkelton';
import Messeger from '../../components/messeger/Messeger';
import { appwriteService } from '../../appWrite/appwriteService';
import saved from '../../assets/saved.png';
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
  height: 100%;
  overflow: auto;
`;
const Right = styled.div`
  max-width: 400px;
  position: sticky;
  top: 0;
  flex: 1;
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

const Wrapper = styled.div`
  height: 100vh;
  position: sticky;
  top: 50px;
  overflow: hidden;
  display: grid;
  place-content: center;
  gap: 1rem;
`;
const Image = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: contain;
`;

const Profile = () => {
  const { user: loggedInUser, logout, showChat, setRooms } = useAppContext();
  const [user, setUser] = useState({});

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigate = useNavigate();
  const {
    state: { userID },
  } = useLocation();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch(`/users/single/${userID}`);

  const [posts, setPosts] = useState([]);
  const [creating, setCreating] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const { data, loading, error } = useFetch(`/posts/profile/${userID}`);
  const {
    data: savedData,
    loading: savedLoading,
    error: savedError,
  } = useFetch(`/posts/saved/${userID}`);
  const handleMessege = async e => {
    e.stopPropagation();
    try {
      if (!loggedInUser) {
        navigate('/login');
        return;
      }

      setCreating(true);
      const room = await appwriteService.createRoom([
        loggedInUser?._id,
        userID,
      ]);
      setRooms(prev => [room, ...prev?.filter(item => item.$id !== room?.$id)]);
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    data && setPosts(data?.posts);
  }, [data]);
  useEffect(() => {
    savedData && setSavedPosts(savedData?.posts);
  }, [savedData]);
  useEffect(() => {
    userData && setUser(userData?.user);
  }, [userData]);

  if (userLoading) {
    return <LoadingAnimation />;
  }
  if (userError) {
    return <p> {error?.message} </p>;
  }
  return (
    <Container>
      <Left>
        <Header>
          <Title>user information</Title>
          {loggedInUser?._id === userID && (
            <Button onClick={() => navigate('/update/details')}>update</Button>
          )}
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
            <Label>email:</Label>
            <Label> {user?.email} </Label>
          </UserItem>
          <UserItem>
            {loggedInUser?._id === userID && (
              <Button onClick={handleLogout}>logout</Button>
            )}
          </UserItem>
        </UserInfo>
        <Header>
          <Title>
            {' '}
            {loggedInUser?._id === userID
              ? 'my list'
              : ` ${user?.username} estate lists`}
          </Title>
          {loggedInUser?._id === userID ? (
            <Button onClick={() => navigate('/new/post')}>
              create new post
            </Button>
          ) : (
            <Button onClick={handleMessege}>
              {' '}
              {creating ? <LoadingAnimation /> : 'message'}{' '}
            </Button>
          )}
        </Header>
        {error ? (
          <p>could not load posts</p>
        ) : loading ? (
          <SearchSkeleton />
        ) : (
          <PostList
            message='you have not posted any estate yet'
            handleMessege={handleMessege}
            posts={posts}
          />
        )}
        <Header>
          <Title>saved places</Title>
        </Header>
        {savedError ? (
          <p>could not load saved places </p>
        ) : savedLoading ? (
          <SearchSkeleton />
        ) : (
          <PostList
            message={
              loggedInUser?._id === userID
                ? 'your saved posts will appear here'
                : `${user?.username} have no saved posts`
            }
            posts={savedPosts}
          />
        )}
      </Left>
      <Right className={showChat && 'show'}>
        {loggedInUser ? (
          <Messeger />
        ) : (
          <Wrapper>
            <Image src={saved} />
            <p>login to see conversation</p>
          </Wrapper>
        )}
      </Right>
    </Container>
  );
};

export default Profile;
