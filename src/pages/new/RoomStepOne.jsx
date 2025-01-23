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
  gap: 0.5rem;
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
const TextArea = styled.textarea`
  flex: 1;
  border-radius: 0.3rem;
  outline: none;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #aaaaaa;
  color: inherit;
  min-height: 150px;
  resize: vertical;
`;
const RoomStepOne = ({ post, setPost, setIndex, setDescription }) => {
  const [disabled, setDisabled] = useState(false);
  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (
      !post.title ||
      !post.desc ||
      !post?.bathrooms ||
      !post?.guests ||
      !post?.kingSize ||
      !post?.price ||
      !post?.queenSize
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [post]);
  return (
    <Wrapper>
      <Left>
        <Container>
          <Item>
            <InputWrapper>
              <Label>room title*</Label>
              <LabelSmall>provide a room name</LabelSmall>
              <Input
                name='title'
                value={post.title}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>bathroom number* </Label>
              <LabelSmall>how many bathrooms does it have?</LabelSmall>
              <Input
                name='bathrooms'
                value={post.bathrooms}
                type='number'
                onChange={onChange}
              />
            </InputWrapper>
          </Item>

          <Item className='small'>
            <InputWrapper>
              <Label>guest number* </Label>
              <LabelSmall>how many guest can it hold?</LabelSmall>
              <Input
                name='guests'
                value={post.guests}
                type='number'
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>price* </Label>
              <LabelSmall>how much for one day (USD)?</LabelSmall>
              <Input
                name='price'
                value={post.price}
                type='number'
                onChange={onChange}
              />
            </InputWrapper>
          </Item>
          <Item className='small'>
            <InputWrapper>
              <Label>number of King size*</Label>
              <LabelSmall>does the room have a king size bed?</LabelSmall>
              <Input
                name='kingSize'
                min={0}
                value={post.kingSize}
                onChange={onChange}
                type='number'
              />
            </InputWrapper>
            <InputWrapper>
              <Label>number of queen size bed*</Label>
              <LabelSmall>does it have a queen size bed</LabelSmall>
              <Input
                name='queenSize'
                min={0}
                value={post.queenSize}
                type='number'
                onChange={onChange}
              />
            </InputWrapper>
          </Item>
          <InputWrapper>
            <Label>room description *</Label>
            <LabelSmall>anything special about this room</LabelSmall>
            <TextArea
              name='desc'
              value={post.desc}
              onChange={onChange}
              placeholder='estate description'
            />
          </InputWrapper>
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

export default RoomStepOne;
