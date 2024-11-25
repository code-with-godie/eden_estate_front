import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Email, Fingerprint, RemoveRedEye } from '@mui/icons-material';
import { postData, updateData } from '../../api/apiCalls';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { useAppContext } from '../../context/AppContextProvider';
import DropZone from '../new/DropZone';
import noavatatr from '../../assets/noavatar.jpg';
const Container = styled.section`
  height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    flex-direction: row-reverse;
  }
`;
const Left = styled(motion.div)`
  display: none;
  @media screen and (min-width: 768px) {
    flex: 1;
    display: block;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* align-items: center; */
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .desc {
    color: gray;
    font-size: 0.9rem;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #aaaaaa;
`;
const Input = styled.input`
  flex: 1;
  color: ${props => props.theme.color_primary};
  font-size: 1rem;
  min-width: 0 !important;
  background-color: transparent;
  border: none;
  outline: none;
`;
const SubmitButton = styled.button`
  border: 1px solid #aaaaaa;
  color: ${props => props.theme.color_primary};
  background-color: transparent;
  outline: none;
  font-size: 1rem;
  background-color: var(--faded_blue);
  text-transform: capitalize;
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  border: none;
  /* border: 1px solid #aaaaaa; */
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    color: gray;
    background-color: #00000068;
  }
`;
const Profile = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  max-height: 300px;
  @media screen and (min-width: 768px) {
    max-height: 250px;
    max-width: 300px;
  }
`;
const ImageConatiner = styled.div`
  display: grid;
  place-content: center;
`;
const UpdateDetails = () => {
  const { user: currentUser, updateUser, token } = useAppContext();

  const [image, setImage] = useState(currentUser?.avatar);
  const [user, setUser] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateData(
        '/users/update-details',
        {
          ...user,
          avatar: image,
        },
        token
      );
      if (res) {
        const { user } = res;
        updateUser(user);
        setImage('');
        setUser({ username: '', email: '' });
        navigate(`/profile/@${user?.username}`, {
          state: { userID: user?._id },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length < 2 || !user.username) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);
  return (
    <Container>
      <Left
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
      ></Left>
      <Right>
        <DropZone
          single
          setFiles={setImage}
          description='drag and drop a profile here or'
        />
        <ImageConatiner>
          <Profile src={image ? image : noavatatr} />
        </ImageConatiner>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Email />
              <Input
                name='username'
                value={user.username}
                onChange={e =>
                  setUser(prev => ({ ...prev, username: e.target.value }))
                }
                placeholder='username*'
              />
            </InputContainer>
            <InputContainer>
              <Fingerprint />
              <Input
                name='email'
                type='email'
                value={user.email}
                onChange={e =>
                  setUser(prev => ({ ...prev, email: e.target.value }))
                }
                placeholder='email address*'
              />
            </InputContainer>
            {/* <InputContainer>
              <Input
                name='password'
                type={showPasword ? 'text' : 'password'}
                value={user.password}
                onChange={e =>
                  setUser(prev => ({ ...prev, password: e.target.value }))
                }
                placeholder='**********'
              />
              <RemoveRedEye
                onClick={() => setShowPassword(prev => !prev)}
                className='eye'
              />
            </InputContainer> */}
            {/* <span className='desc'>
              password must be more than 8 characters long*
            </span> */}
            <SubmitButton disabled={disabled}>
              {' '}
              {loading ? <LoadingAnimation /> : 'Update'}{' '}
            </SubmitButton>
          </Form>
        </Wrapper>
      </Right>
    </Container>
  );
};

export default UpdateDetails;
