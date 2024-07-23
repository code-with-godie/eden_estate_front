import { useEffect, useState } from 'react';
import styled from 'styled-components';
import google from '../../assets/google.png';
import { IconButton } from '@mui/material';
import {} from 'react-icons';
import { Email, Fingerprint } from '@mui/icons-material';
import { postData } from '../../api/apiCalls';
import { useAppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import { IoIosEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .desc {
    color: gray;
    font-size: 0.9rem;
  }
`;
const Title = styled.h2`
  text-transform: capitalize;
  font-size: 2rem;
  text-align: center;
`;
const Description = styled.p`
  text-align: center;
  letter-spacing: 2px;
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
  .eye {
    cursor: pointer;
    font-size: 1.5rem;
  }
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

const Divider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;
const DividerText = styled.p`
  position: absolute;
  z-index: 10;
  padding: 0.2rem;
  background-color: #808080;
  border-radius: 50%;
  font-size: 0.9rem;
`;
const DividerLine = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  border: 1px solid #808080;
`;
const OAuthContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const Image = styled.img`
  object-fit: contain;
  max-width: 70px;
  flex: 1;
  cursor: pointer;
`;
const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [showPasword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login, user: loggedInUser, darkMode } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await postData('/users/login', user);
      if (res.success) {
        const { user, token } = res;
        setUser({ email: '', password: '' });
        login(user, token);
      }
    } catch (error) {
      setUser({ email: '', password: '' });
      const message = error?.response?.data?.message || 'Something went wrong';
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${darkMode ? 'dark' : 'light'}`,
        transition: Bounce,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length < 2 || user.password.length < 8) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);
  useEffect(() => {
    if (loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser, navigate]);
  return (
    <Container>
      <Title>login into eden state</Title>
      <Description>
        discover millions of affordble housing around you and across the world
      </Description>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Email />
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
        <InputContainer>
          <Fingerprint />
          <Input
            name='password'
            type={showPasword ? 'text' : 'password'}
            value={user.password}
            onChange={e =>
              setUser(prev => ({ ...prev, password: e.target.value }))
            }
            placeholder='**********'
          />
          {showPasword ? (
            <IoIosEyeOff
              onClick={() => setShowPassword(false)}
              className='eye'
            />
          ) : (
            <IoMdEye
              onClick={() => setShowPassword(true)}
              className='eye'
            />
          )}
        </InputContainer>
        <span className='desc'>
          password must be more than 8 characters long*
        </span>
        <SubmitButton disabled={disabled}>
          {' '}
          {loading ? <LoadingAnimation /> : 'login'}{' '}
        </SubmitButton>
      </Form>
      <Divider>
        <DividerText>Or</DividerText>
        <DividerLine />
      </Divider>
      <OAuthContainer>
        <IconButton>
          <Image src={google} />
        </IconButton>
        <IconButton>
          <Image src={google} />
        </IconButton>
        <IconButton>
          <Image src={google} />
        </IconButton>
      </OAuthContainer>
      <span
        className='desc'
        style={{ textAlign: 'center' }}
      >
        All right reserved. &copy; 2023 - {new Date().getFullYear()}-godie
      </span>
      <ToastContainer />
    </Container>
  );
};

export default Login;
