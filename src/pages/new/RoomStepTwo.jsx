import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData, updateData } from '../../api/apiCalls';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column-reverse;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const Left = styled.div`
  flex: 1;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: inherit;
  gap: 0.3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  background: var(--faded_blue);
  cursor: pointer;
  font-size: 1rem;
  text-transform: capitalize;
  :disabled {
    cursor: not-allowed;
    color: gray;
    background-color: #00000068;
  }
`;

// Styled Checkbox that changes based on darkMode
const StyledCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: ${props => (props.darkMode ? 'white' : 'gray')} !important;
  }

  &.MuiCheckbox-root {
    color: ${props => (props.darkMode ? 'white' : 'gray')} !important;
  }
`;

const RoomStepTwo = ({
  post,
  setPost,
  setIndex,
  setDescription,
  image,
  edit,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, darkMode } = useAppContext();
  const navigate = useNavigate();

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.checked;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!image) {
        toast.error('room image is required', {
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
        return;
      }
      if (edit) {
        const res = await updateData(
          `/room/update/${post?._id}`,
          { ...post, url: image },
          token
        );
        if (res.success) {
          toast.success('estate successfully updated', {
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
          setTimeout(() => {
            navigate(`/p/${res?.post?._id}`);
          }, 3300);
        }
        return;
      }

      setLoading(true);
      const res = await postData('/rooms', { ...post, url: image }, token);
      if (res.success) {
        navigate(`/p/${post?.estateID}`);
      }
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
    if (!post.desc) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [post]);

  useEffect(() => {
    setDescription(
      'choose room amenities(optional)',
      'what makes this room a good choice?'
    );
  }, [setDescription]);

  return (
    <Wrapper>
      <Left>
        <Container onSubmit={handleSubmit}>
          <Item>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.wifi}
                  />
                }
                name='wifi'
                onChange={onChange}
                label='free wifi'
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.conditional}
                  />
                }
                name='conditional'
                onChange={onChange}
                label='air conditional'
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.roomService}
                  />
                }
                name='roomService'
                onChange={onChange}
                label='room services'
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.breakFast}
                  />
                }
                name='breakFast'
                onChange={onChange}
                label='breakfast'
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.tv}
                  />
                }
                name='tv'
                onChange={onChange}
                label='Tv'
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.balcony}
                  />
                }
                name='balcony'
                onChange={onChange}
                label='balcony'
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.ocean}
                  />
                }
                label='ocean view'
                name='ocean'
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.forest}
                  />
                }
                name='forest'
                onChange={onChange}
                label='forest view'
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.mountain}
                  />
                }
                label='mountain view'
                name='mountain'
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledCheckbox
                    darkMode={darkMode}
                    value={post?.soundProve}
                  />
                }
                label='sound proof'
                name='soundProve'
                onChange={onChange}
              />
            </FormGroup>
          </Item>
          <ButtonWrapper>
            <Button
              type='button'
              onClick={() => setIndex(0)}
            >
              prev
            </Button>
            <Button disabled={disabled || loading}>
              {' '}
              {loading ? (
                <LoadingAnimation />
              ) : edit ? (
                'update room'
              ) : (
                'register room'
              )}{' '}
            </Button>
          </ButtonWrapper>
        </Container>
      </Left>
    </Wrapper>
  );
};

export default RoomStepTwo;
