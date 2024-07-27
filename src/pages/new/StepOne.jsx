import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
const Select = styled.select`
  padding: 0.5rem;
  background: transparent;
  outline: none;
  border: none;
  flex: 1;
  min-width: 0 !important;
  font-size: 1rem;
  color: ${props => props.theme.color_primary};
  border: 1px solid #a6a5a5bf;
  border-radius: 0.5rem;
`;
const Option = styled.option``;
const StepOne = ({ post, setPost, setIndex, setDescription }) => {
  const [disabled, setDisabled] = useState(false);
  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (
      !post.title ||
      !post.price ||
      !post.country ||
      !post.state ||
      !post.city ||
      !post.location
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [post]);
  useEffect(() => {
    setDescription('Estate name and location details');
  }, [setDescription]);
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
              <Input
                name='country'
                value={post.country}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>estate state*</Label>
              <LabelSmall>
                which state/county is your estate located?
              </LabelSmall>
              <Input
                name='state'
                value={post.state}
                onChange={onChange}
              />
            </InputWrapper>
          </Item>
          <Item className='small'>
            <InputWrapper>
              <Label>estate city*</Label>
              <LabelSmall>city location of this estate?</LabelSmall>
              <Input
                name='city'
                value={post.city}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>estate location/town*</Label>
              <LabelSmall>nearest town for your estate?</LabelSmall>
              <Input
                name='location'
                value={post.location}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Type</Label>
              <LabelSmall>are you buying or renting?</LabelSmall>
              <Select
                name='type'
                value={post.type}
                onChange={onChange}
              >
                <Option>rent</Option>
                <Option>buy</Option>
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
