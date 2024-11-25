import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from '../../hooks/useLocation';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useAppContext } from '../../context/AppContextProvider';
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

const Container = styled.div`
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
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: inherit;
  gap: 0.3rem;
`;
const Label = styled.p``;
const LabelSmall = styled.p`
  font-size: 0.8rem;
  color: #aaaaaa;
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
const StepOne = ({ post, setPost, setIndex, setDescription }) => {
  const { countries, getCountryStates, getStatesCities } = useLocation();
  const [states, setState] = useState([]);
  const [cities, setCities] = useState([]);
  const { darkMode } = useAppContext();
  const [disabled, setDisabled] = useState(false);

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleCountry = e => {
    const value = e.target.value;
    setPost(prev => ({ ...prev, country: { ISOCode: value } }));
    // Ensure states are reset when a new country is selected
    setState([]); // Clear previous states
    setCities([]); // Clear cities as well
  };

  const handleState = e => {
    const value = e.target.value;
    setPost(prev => ({ ...prev, state: { ISOCode: value } }));
  };

  useEffect(() => {
    // Disable button if required fields are missing
    if (
      !post.title ||
      !post.price ||
      !post.country?.ISOCode ||
      !post.state?.ISOCode ||
      !post.city
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [post]);

  useEffect(() => {
    setDescription('Estate name and location details');
  }, [setDescription]);

  useEffect(() => {
    // Fetch states when the country is selected
    if (post?.country) {
      const fetchedStates = getCountryStates(post?.country);
      if (fetchedStates) {
        setState(fetchedStates);
      }
    }
  }, [post?.country, getCountryStates]);

  useEffect(() => {
    // Fetch cities when the state is selected
    if (post?.state) {
      const fetchedCities = getStatesCities(post?.country, post?.state);
      if (fetchedCities) {
        setCities(fetchedCities);
      }
    }
  }, [post?.state, post?.country, getStatesCities]);

  return (
    <Wrapper>
      <Left>
        <Container>
          <Item>
            <InputWrapper>
              <Label>estate title*</Label>
              <LabelSmall>This is the name of your estate</LabelSmall>
              <Input
                name='title'
                value={post.title}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>estate price*</Label>
              <LabelSmall>This is the net worth of your estate</LabelSmall>
              <Input
                name='price'
                type='number'
                value={post.price}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>estate country*</Label>
              <LabelSmall>which country is your estate located?</LabelSmall>
              <FormControl fullWidth>
                <Select
                  name='country'
                  value={post?.country?.ISOCode}
                  onChange={handleCountry}
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
                  {countries?.map(country => (
                    <MenuItem
                      key={country.isoCode}
                      value={country.isoCode}
                    >
                      {' '}
                      {country.name}{' '}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputWrapper>
            <InputWrapper>
              <Label>estate state*</Label>
              <LabelSmall>
                which state/county is your estate located?
              </LabelSmall>
              <Select
                name='state'
                disabled={states.length <= 0}
                value={post?.state?.ISOCode}
                onChange={handleState}
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
                {states?.map(state => (
                  <MenuItem
                    key={state.isoCode}
                    value={state.isoCode}
                  >
                    {' '}
                    {state.name}{' '}
                  </MenuItem>
                ))}
              </Select>
            </InputWrapper>
          </Item>
          <Item className='small'>
            <InputWrapper>
              <Label>estate city*</Label>
              <LabelSmall>city location of this estate?</LabelSmall>
              <Select
                name='city'
                disabled={cities.length <= 0}
                value={post?.city}
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
                {cities?.map(city => (
                  <MenuItem
                    key={city.name}
                    value={city.name}
                  >
                    {' '}
                    {city.name}{' '}
                  </MenuItem>
                ))}
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>Type</Label>
              <LabelSmall>are you buying or renting?</LabelSmall>
              <Select
                name='type'
                value={post.type}
                defaultValue='rent'
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
                <MenuItem value='rent'>rent</MenuItem>
                <MenuItem value='buy'>buy</MenuItem>
              </Select>
            </InputWrapper>
          </Item>
          <InputWrapper>
            <Button
              type='button'
              onClick={() => setIndex(1)}
              disabled={disabled}
            >
              next
            </Button>
          </InputWrapper>
        </Container>
      </Left>
    </Wrapper>
  );
};

export default StepOne;
