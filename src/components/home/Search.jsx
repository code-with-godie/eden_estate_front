import { LocationOn, Search as Find } from '@mui/icons-material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
const Wrapper = styled.div`
  border-radius: 0.5rem;
  align-self: stretch;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    padding: 1rem;
  }
`;
const ButtonContainer = styled.div``;
const Button = styled.button`
  padding: 0.5em 1rem;
  outline: none;
  border: none;
  border-top: 2px solid var(--faded_blue);
  border-left: 2px solid var(--faded_blue);
  border-right: 2px solid var(--faded_blue);
  /* border-top: 1px solid var(--faded_blue); */
  font-size: 1rem;
  text-transform: capitalize;
  background: white;
  color: black;
  cursor: pointer;
  &.active {
    background-color: var(--faded_blue);
    color: white;
  }
  &:first-child {
    border-radius: 0.5rem 0 0 0;
  }
  &:last-child {
    border-radius: 0 0.5rem 0 0;
  }
`;
const Form = styled.form`
  flex: 1;
  background-color: white;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  display: flex;
  border: 2px solid var(--faded_blue);
  /* border: ${props => props.dark && '5px solid var(---faded_blue)'}; */
  align-items: center;
  gap: 0.5rem;
  .location {
    color: var(--faded_blue);
    cursor: pointer;
    font-size: 1.7rem;
  }
  @media screen and (min-width: 768px) {
    padding: 0.2rem;
  }
`;
const Input = styled.input`
  padding: 0.5rem;
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 1rem;
  min-width: 0 !important;
`;
const Submit = styled.button`
  background-color: var(--faded_blue);
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  text-transform: capitalize;
  color: white;
  .search {
    color: white;
    font-size: 1.7rem;
  }
  @media screen and (min-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;
const Search = () => {
  const [type, setType] = useState('rent');
  const { darkMode } = useAppContext();
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (location.length <= 0) return;
    navigate(`/search?type=${type}&location=${location}`);
  };
  return (
    <Wrapper>
      <ButtonContainer>
        <Button
          className={type === 'rent' && 'active'}
          onClick={() => setType('rent')}
        >
          {' '}
          rent
        </Button>
        <Button
          className={type === 'buy' && 'active'}
          onClick={() => setType('buy')}
        >
          buy
        </Button>
      </ButtonContainer>
      <Form
        dark={darkMode}
        onSubmit={handleSubmit}
      >
        <LocationOn className='location' />
        <Input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder='Enter location'
        />
        {/* <Select
          value={location}
          onChange={option => setLocation(option)}
          options={options}
          placeholder='Select an option'
          isClearable
        /> */}
        <Submit>
          submit <Find className='search' />
        </Submit>
      </Form>
    </Wrapper>
  );
};

export default Search;
