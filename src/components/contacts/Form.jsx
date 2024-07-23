import React from 'react';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  padding: 0.5rem 0;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--color_white-faded);
  color: var(--color_primary);
`;
const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem;
  color: inherit;
`;
const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const InputContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: #1b1b22;
`;
const TextArea = styled.textarea`
  flex: 1;
  resize: vertical;
  min-height: 150px;
  border-radius: 0.5rem;
  background-color: #1b1b22;
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  color: inherit;
`;
const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--faded_blue);
  border-radius: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
`;
const Form = () => {
  return (
    <Container>
      <InputWrapper>
        <InputContainer>
          <Input placeholder='first name' />
        </InputContainer>
        <InputContainer>
          <Input placeholder='Last Name' />
        </InputContainer>
      </InputWrapper>
      <InputWrapper>
        <InputContainer>
          <Input placeholder='email address' />
        </InputContainer>
        <InputContainer>
          <Input placeholder='phone number' />
        </InputContainer>
      </InputWrapper>
      <InputWrapper></InputWrapper>
      <InputWrapper>
        <TextArea placeholder='messege...' />
      </InputWrapper>
      <InputWrapper>
        <SubmitButton>send messege</SubmitButton>
      </InputWrapper>
    </Container>
  );
};

export default Form;
