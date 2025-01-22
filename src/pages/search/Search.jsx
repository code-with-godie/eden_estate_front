import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import Map from '../../components/map/Map';
import PostList from './PostList';
import { useFetch } from '../../api/useFetch';
import SearchSkelton from '../../components/skeletons/SearchSkelton';
import { useAppContext } from '../../context/AppContextProvider';
import { useDebounce } from 'use-debounce';
import { FormControl, MenuItem, Select } from '@mui/material';

const Container = styled.div`
  display: flex;
  overflow: auto;
  gap: 0.5rem;
  padding: 1rem 0 0 0;
  flex-direction: column;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    height: 91.5vh;
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
  position: sticky;
  top: 0px;
  .map {
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 768px) {
    max-width: 500px;
  }
`;

const Introduction = styled.p`
  font-size: 1.2rem;
`;

const Label = styled.p``;

const InputContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  border: 1px solid #a6a5a5bf;
  border-radius: 0.3rem;
  &.container {
    padding: 0;
    border: none;
    flex: 1;
  }
`;

const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  flex: 1;
  min-width: 0 !important;
  font-size: 1rem;
  color: ${props => props.theme.color_primary};
`;

// const Select = styled.select`
//   padding: 0.5rem;
//   background: transparent;
//   color: ${props => (props.dark ? '#fff' : '#000')};
//   outline: none;
//   border: 1px solid #a6a5a5bf; /* Match the border with other inputs */
//   border-radius: 0.3rem;
//   flex: 1;
//   min-width: 0 !important;
//   font-size: 1rem;

//   /* Styling for options */
//   option {
//     background-color: transparent; /* Transparent background for options */
//     color: ${props =>
//       props.theme?.darkMode ? '#fff' : '#000'}; /* Text color for options */
//     padding: 0.5rem;
//   }

//   /* Remove blue hover and focus on option elements */
//   option:hover {
//     background-color: ${props =>
//       props.theme.darkMode ? '#555' : '#ddd'}; /* Change background on hover */
//     color: ${props =>
//       props.dark ? '#fff' : '#000'}; /* Change text color on hover */
//   }
// `;

const Option = styled.option`
  background-color: transparent;
  appearance: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SearchIcon = styled(SearchOutlined)`
  font-size: 1.5rem;
  color: var(--faded_blue);
`;

const Search = () => {
  const { darkMode } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || 0,
    maxPrice: searchParams.get('maxPrice') || 1000000,
    property: searchParams.get('property') || 'apartment',
  });
  const [debouncedQuery] = useDebounce(query, 500);
  const [posts, setPosts] = useState([]);
  const { data, loading, error } = useFetch(
    `/posts/search?location=${debouncedQuery.location}&type=${debouncedQuery.type}&property=${debouncedQuery.property}&minPrice=${debouncedQuery.minPrice}&maxPrice=${debouncedQuery.maxPrice}`
  );

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setSearchParams(debouncedQuery);
  }, [debouncedQuery, setSearchParams]);

  useEffect(() => {
    data && setPosts(data?.posts);
  }, [data]);

  if (error) {
    console.log(error);
  }

  return (
    <Container>
      <Left>
        {searchParams.get('location') && (
          <Introduction>
            Search results for <strong> {searchParams.get('location')} </strong>
          </Introduction>
        )}
        <Label>Location</Label>
        <InputContainer>
          <Input
            onChange={onChange}
            name='location'
            value={query.location}
            placeholder='Location'
          />
          <SearchIcon />
        </InputContainer>
        <Form>
          <InputContainer className='container'>
            <InputWrapper>
              <Label>Type</Label>
              {/* <Select
                onChange={onChange}
                name='type'
                dark={darkMode}
                value={query.type}
              >
                <Option>rent</Option>
                <Option>buy</Option>
              </Select> */}
              <FormControl fullWidth>
                <Select
                  name='type'
                  value={query.type}
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
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='buy'>Buy</MenuItem>
                  <MenuItem value='rent'>Rent</MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>
            <InputWrapper>
              <Label>Property</Label>

              <FormControl fullWidth>
                <Select
                  onChange={onChange}
                  name='property'
                  value={query.property}
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
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='apartment'>apartment</MenuItem>
                  <MenuItem value='house'>house</MenuItem>
                  <MenuItem value='condo'>condo</MenuItem>
                  <MenuItem value='land'>land</MenuItem>
                </Select>
              </FormControl>
            </InputWrapper>
          </InputContainer>
          <InputContainer className='container'>
            <InputWrapper>
              <Label>Min Price</Label>
              <InputContainer>
                <Input
                  placeholder='0'
                  type='number'
                  onChange={onChange}
                  name='minPrice'
                  value={query.minPrice}
                />
              </InputContainer>
            </InputWrapper>
            <InputWrapper>
              <Label>Max Price</Label>
              <InputContainer>
                <Input
                  placeholder='0'
                  type='number'
                  onChange={onChange}
                  name='maxPrice'
                  value={query.maxPrice}
                />
              </InputContainer>
            </InputWrapper>
          </InputContainer>
        </Form>
        {error ? (
          <p>Could not load posts</p>
        ) : loading ? (
          <SearchSkelton />
        ) : (
          <PostList
            message={`No results for your search ${
              searchParams.get('location')
                ? 'in' + searchParams.get('location')
                : 'query'
            }`}
            posts={posts}
          />
        )}
      </Left>
      <Right>{posts && <Map posts={posts} />}</Right>
    </Container>
  );
};

export default Search;
