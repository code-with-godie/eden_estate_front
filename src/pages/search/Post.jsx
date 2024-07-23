import {
  Bathroom,
  Bed,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  Chat,
  LocationOnOutlined,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { updateData } from '../../api/apiCalls';
import { motion } from 'framer-motion';
const Container = styled(motion.div)`
  display: flex;
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
  background-color: var(--faded_blue);
  align-self: flex-start;
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
const Post = ({
  images,
  bedrooms,
  bathrooms,
  address,
  title,
  price,
  _id,
  variants,
}) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const { user, token, updateUser, openChat } = useAppContext();

  const handleBookmark = async e => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    const res = await updateData(`/users/bookmark/${_id}`, {}, token);
    updateUser(res.user);
  };
  const handleMessage = e => {
    e.stopPropagation();
    openChat();
    navigate('/profile');
  };
  useEffect(() => {
    if (user) {
      if (user?.bookmarked?.includes(_id)) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    }
    // console.log('user changed');
  }, [user, _id]);
  return (
    <Container
      variants={variants}
      onClick={() => navigate(`/p/${_id}`)}
    >
      <Left>
        <Image src={images[0]} />
      </Left>
      <Right>
        <Title> {title} </Title>
        <Address>
          {' '}
          <LocationOnOutlined className='icon' />
          {address}
        </Address>
        <Price> Kshs. {price} </Price>
        <FooterContainer>
          <FooterLeft>
            <IconWrapper>
              <Bed className='icon' />
              {bedrooms ? `${bedrooms} bedrooms` : `1 bedrooms`}
            </IconWrapper>
            <IconWrapper>
              <Bathroom className='icon' />
              {bathrooms ? `${bathrooms} bathrooms` : `1 bathrooms`}
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
            <IconWrapper
              onClick={handleMessage}
              className='icon-btn'
            >
              <Chat className='icon' />
            </IconWrapper>
          </FooterRight>
        </FooterContainer>
      </Right>
    </Container>
  );
};

export default Post;
