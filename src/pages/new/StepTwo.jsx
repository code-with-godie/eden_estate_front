import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData, updateData } from '../../api/apiCalls';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { useLocation } from '../../hooks/useLocation';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
} from '@mui/material';

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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  &.small {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
`;
const Input = styled.input`
  min-width: 0 !important ;
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.3rem;
  outline: none;
  background: transparent;
  border: 1px solid #aaaaaa;
  color: inherit;
  :disabled {
    background-color: #808080a5;
    cursor: not-allowed;
  }
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
const Label = styled.p``;
const LabelSmall = styled.p`
  font-size: 0.8rem;
  color: #aaaaaa;
`;
const TextArea = styled.textarea`
  flex: 1;
  border-radius: 0.3rem;
  outline: none;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #aaaaaa;
  color: inherit;
  min-height: 100px;
  resize: vertical;
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
const StyledCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: ${props => (props.darkMode ? 'white' : 'gray')} !important;
  }

  &.MuiCheckbox-root {
    color: ${props => (props.darkMode ? 'white' : 'gray')} !important;
  }
`;
const Option = styled.option``;
const StepTwo = ({ post, setPost, setIndex, setDescription, image, edit }) => {
  const [disabled, setDisabled] = useState(false);
  const { getCountryByCode, getStateByCode, getCityByName } = useLocation();
  const [loading, setLoading] = useState(false);
  const { token } = useAppContext();
  const { darkMode } = useAppContext();
  const navigate = useNavigate();
  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  const handleBreakfast = e => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPost(prev => {
      const breakfast = {
        ...prev.breakfast,
        [name]: value,
      };
      return {
        ...prev,
        breakfast,
      };
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(post);
      const country = getCountryByCode(post?.country);
      const state = getStateByCode(post?.country, post?.state);
      const city = getCityByName(post?.country, post?.state, post?.city);
      if (city) {
        const { longitude, latitude } = city;
        post.coodinates = { longitude, latitude };
      }
      if (country && state) {
        post.country = {
          ISOCode: country?.isoCode,
          name: country?.name,
        };
        post.state = {
          ISOCode: state?.isoCode,
          name: state?.name,
        };
      }
      if (!image) {
        toast.error('estate image is required', {
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
      setLoading(true);

      if (edit) {
        const res = await updateData(
          `/posts/update/${post?._id}`,
          {
            ...post,
            url: image,
          },
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

      const res = await postData(
        '/posts',
        {
          ...post,
          url: image,
        },
        token
      );
      if (res.success) {
        navigate(`/p/${res?.post?._id}`);
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
    setDescription('Estate ammedities and services');
  }, [setDescription]);
  return (
    <Wrapper>
      <Left>
        <Container onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>estate description*</Label>
            <LabelSmall>short description of the area?</LabelSmall>
            <TextArea
              name='desc'
              value={post.desc}
              onChange={onChange}
              placeholder='estate description'
            />
          </InputWrapper>
          <Item className='small'>
            <InputWrapper>
              <Label>income policy</Label>
              <Input
                name='income'
                value={post.income}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>property*</Label>
              <FormControl fullWidth>
                <Select
                  name='property'
                  value={post.property}
                  onChange={onChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    color: () => (darkMode ? 'white' : 'black'),
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    '& .MuiSelect-icon': {
                      color: () => (darkMode ? 'white' : 'black'),
                    },
                    '& .MuiMenuItem-root': {
                      backgroundColor: darkMode ? 'black' : '#fff',
                      color: () => (darkMode ? 'white' : 'black'),
                    },
                    '&.Mui-disabled': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9797973f',
                      },
                      backgroundColor: ' #9797973f',
                      color: '#bfbebe',
                      cursor: 'not-allowed',
                      '& .MuiSelect-icon': {
                        color: '#bfbebe60',
                      },
                    },
                  }}
                >
                  <MenuItem value='apartment'>apartment</MenuItem>
                  <MenuItem value='house'>house</MenuItem>
                  <MenuItem value='condo'>condo</MenuItem>
                  <MenuItem value='land'>land</MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>
          </Item>
          <Item>
            <InputWrapper>
              <Label>total size(sqrt)</Label>
              <Input
                name='size'
                type='number'
                value={post.size}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>School (distance)</Label>
              <Input
                name='school'
                type='number'
                value={post.school}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Bus(distance) </Label>
              <Input
                name='bus'
                type='number'
                value={post.bus}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Restaraunt(distance) </Label>
              <Input
                name='restaurant'
                type='number'
                value={post.restaurant}
                onChange={onChange}
              />
            </InputWrapper>
          </Item>
          <Item className='small'>
            <InputWrapper>
              <Label>utility policies</Label>
              <FormControl fullWidth>
                <Select
                  name='utilities'
                  value={post.utilities}
                  onChange={onChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    color: () => (darkMode ? 'white' : 'black'),
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    '& .MuiSelect-icon': {
                      color: () => (darkMode ? 'white' : 'black'),
                    },
                    '& .MuiMenuItem-root': {
                      backgroundColor: darkMode ? 'black' : '#fff',
                      color: () => (darkMode ? 'white' : 'black'),
                    },
                    '&.Mui-disabled': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9797973f',
                      },
                      backgroundColor: ' #9797973f',
                      color: '#bfbebe',
                      cursor: 'not-allowed',
                      '& .MuiSelect-icon': {
                        color: '#bfbebe60',
                      },
                    },
                  }}
                >
                  <MenuItem value='Tenant are responsible'>
                    Tenant are responsible
                  </MenuItem>
                  <MenuItem value='Owner is responsible'>
                    Owner is responsible
                  </MenuItem>
                  <MenuItem value='shared cost'>shared cost</MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>
            <InputWrapper>
              <Label>pet policies</Label>
              <FormControl fullWidth>
                <Select
                  name='pet'
                  value={post.pet}
                  onChange={onChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    color: () => (darkMode ? 'white' : 'black'),
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: () => (darkMode ? 'white' : 'gray'),
                    },
                    '& .MuiSelect-icon': {
                      color: () => (darkMode ? 'white' : 'black'),
                    },
                    '& .MuiMenuItem-root': {
                      backgroundColor: darkMode ? 'black' : '#fff',
                      color: () => (darkMode ? 'white' : 'black'),
                    },
                    '&.Mui-disabled': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9797973f',
                      },
                      backgroundColor: ' #9797973f',
                      color: '#bfbebe',
                      cursor: 'not-allowed',
                      '& .MuiSelect-icon': {
                        color: '#bfbebe60',
                      },
                    },
                  }}
                >
                  <MenuItem value='pet are allowed'>pet are allowed</MenuItem>
                  <MenuItem value='pet are not allowed'>
                    pet are not allowed
                  </MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>
            <InputWrapper>
              <FormGroup>
                <FormControlLabel
                  control={
                    <StyledCheckbox
                      checked={post?.breakfast?.offered}
                      darkMode={darkMode}
                      value={post?.breakfast?.offered}
                    />
                  }
                  name='offered'
                  onChange={handleBreakfast}
                  label='breakfast available'
                />
              </FormGroup>
              <Input
                name='price'
                type='number'
                min={0}
                disabled={!post?.breakfast?.offered}
                value={post.breakfast?.price}
                onChange={handleBreakfast}
                placeholder='breakfast price'
              />
            </InputWrapper>
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
                'update estate'
              ) : (
                'register estate'
              )}{' '}
            </Button>
          </ButtonWrapper>
        </Container>
      </Left>
    </Wrapper>
  );
};

export default StepTwo;
