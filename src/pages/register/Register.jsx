import { useEffect, useState } from 'react';
import styled from 'styled-components';
import google from '../../assets/google.png';
import { IconButton } from '@mui/material';
import { Email, Fingerprint, RemoveRedEye } from '@mui/icons-material';
import { postData } from '../../api/apiCalls';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useAppContext } from '../../context/AppContextProvider';
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
const Register = () => {
  const [showPasword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useAppContext();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await postData('/users/register', user);
      navigate('/login');
    } catch (error) {
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
    if (user.email.length < 2 || user.password.length < 8 || !user.username) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);
  return (
    <Container>
      <Title>create account with us</Title>
      <Description>
        discover millions of affordable housing around you and across the world
      </Description>
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
        <InputContainer>
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
        </InputContainer>
        <span className='desc'>
          password must be more than 8 characters long*
        </span>
        <SubmitButton disabled={disabled}>
          {' '}
          {loading ? <LoadingAnimation /> : 'register'}{' '}
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

export default Register;
