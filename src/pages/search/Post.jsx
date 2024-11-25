import {
  Bathroom,
  Bed,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  Chat,
  Edit,
  LocationOnOutlined,
  Pets,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { updateData } from '../../api/apiCalls';
import { motion } from 'framer-motion';
const Container = styled(motion.div)`
  display: flex;
  cursor: pointer;
  gap: 0.5rem;
`;
const Left = styled.div`
  flex: 1;
  max-width: 200px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .icon {
    color: #6d6d6d;
    font-size: 1.3rem;
  }
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 150px;
  border-radius: 1rem;
`;
const Title = styled.h3``;
const Address = styled.p`
  display: flex;
  align-items: center;
`;
const Price = styled.h3`
  padding: 0.3rem;
  color: var(--faded_blue);
  align-self: flex-start;
`;
const Desc = styled.p`
  padding: 0.3rem;
  font-size: 0.9rem;
`;
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 480px) {
    align-items: center;
    flex-direction: row;
  }
`;
const FooterLeft = styled.div`
  flex: 1;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  @media screen and (min-width: 480px) {
    align-items: center;
    flex-direction: row;
  }
`;
const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  @media screen and (min-width: 480px) {
  }
`;
const IconWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  &.icon-btn {
    padding: 0.2rem;
    border: 1px solid gray;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;
const Post = ({ variants, ...post }) => {
  const navigate = useNavigate();
  const {
    state,
    user: postUser,
    country,
    title,
    _id,
    image,
    property,
    pet,
    city,
    type,
  } = post;
  const [bookmarked, setBookmarked] = useState(false);

  const { user, token, updateUser } = useAppContext();
  const handleMessege = async e => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/profile/@${postUser?.username}`, {
      state: { userID: postUser?._id },
    });
  };
  const handleBookmark = async e => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    const res = await updateData(`/users/bookmark/${_id}`, {}, token);
    updateUser(res.user);
  };
  useEffect(() => {
    if (user) {
      if (user?.bookmarked?.includes(_id)) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    }
  }, [user, _id]);
  return (
    <Container
      variants={variants}
      onClick={() => navigate(`/p/${_id}`)}
    >
      <Left>
        <Image src={image} />
      </Left>
      <Right>
        <Title> {title} </Title>
        <Address>
          <LocationOnOutlined className='icon' />
          {`${city === state ? state : `${city},${state}`},${country}`}
        </Address>
        <Price> available for {type} </Price>
        <Desc> click to book a room here </Desc>
        <FooterContainer>
          <FooterLeft>
            <IconWrapper>
              <Bed className='icon' />
              {property}
            </IconWrapper>
            <IconWrapper>
              <Pets className='icon' />
              {pet}
            </IconWrapper>
          </FooterLeft>
          <FooterRight>
            <IconWrapper
              className='icon-btn'
              onClick={handleBookmark}
            >
              {bookmarked ? (
                <BookmarkOutlined className='icon' />
              ) : (
                <BookmarkBorderOutlined className='icon' />
              )}
            </IconWrapper>

            {postUser?._id === user?._id ? (
              <IconWrapper
                onClick={() =>
                  navigate('/new/post', { state: { update: true, post } })
                }
                className='icon-btn'
              >
                <Edit className='icon' />
              </IconWrapper>
            ) : (
              <IconWrapper
                onClick={handleMessege}
                className='icon-btn'
              >
                <Chat className='icon' />
              </IconWrapper>
            )}
          </FooterRight>
        </FooterContainer>
      </Right>
    </Container>
  );
};

export default Post;
