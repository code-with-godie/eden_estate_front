import React from 'react';
import styled from 'styled-components';

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
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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

  gap: 0.3rem;
`;
const Label = styled.p``;
const TextArea = styled.textarea`
  flex: 1;
  border-radius: 0.3rem;
  outline: none;
  background: transparent;
  border: 1px solid #aaaaaa;
  color: inherit;
  min-height: 200px;
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
`;
const Select = styled.select``;
const Option = styled.option``;
const StepOne = () => {
  return (
    <Container>
      <Item>
        <InputWrapper>
          <Label>tittle*</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>price*</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>address*</Label>
          <Input />
        </InputWrapper>
      </Item>
      <TextArea placeholder='description' />
      <Item className='small'>
        <InputWrapper>
          <Label>city*</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>bedroom number*</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>bathroom number*</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>latitude*</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>longitude*</Label>
          <Input />
        </InputWrapper>
      </Item>
      <Item className='small'>
        <InputWrapper>
          <Label>income policy</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>total size(sqrt)</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>School (distance)</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>Bus(distance) </Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>Restaraunt(distance) </Label>
          <Input />
        </InputWrapper>
      </Item>
      <Item className='small'>
        <InputWrapper>
          <Label>property*</Label>
          <Select>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>utility policies</Label>
          <Select>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>pet policies</Label>
          <Select>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label>Type</Label>
          <Select>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
            <Option>options</Option>
          </Select>
        </InputWrapper>
      </Item>
      <InputWrapper>
        <Button>submit</Button>
      </InputWrapper>
    </Container>
  );
};

export default StepOne;
