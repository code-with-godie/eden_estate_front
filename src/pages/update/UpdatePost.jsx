import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DropZone from '../new/DropZone';
import FileViewer from '../new/FileViewer';
// import { toast } from 'react-toastify';
import { postData } from '../../api/apiCalls';
import { useAppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
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
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  @media screen and (min-width: 768px) {
    max-width: 400px;
  }
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
  :disabled {
    cursor: not-allowed;
    color: gray;
    background-color: #00000068;
  }
`;
const Select = styled.select``;
const Option = styled.option``;
const UpdatePost = () => {
  const [images, setImages] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { token } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    title: '',
    price: '',
    address: '',
    city: '',
    bedrooms: 1,
    bathrooms: 1,
    longitude: '',
    latitude: '',
    income: '',
    size: '',
    school: '',
    bus: '',
    restaurant: '',
    property: 'apartment',
    utilities: 'Owner is responsible',
    pet: 'pet are allowed',
    type: 'rent',
    desc: '',
    images,
  });

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await postData('/posts', { ...post, images }, token);
      if (res.success) {
        navigate('/profile');
      }
      console.log(res);
    } catch (error) {
      // const messege = 'Something went wrong';
      // toast.error(messege);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      !post.title ||
      !post.price ||
      !post.address ||
      !post.city ||
      !post.longitude ||
      images.length < 3 ||
      !post.latitude
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [post, images]);
  return (
    <Wrapper>
      <Left>
        <Container onSubmit={handleSubmit}>
          <Item>
            <InputWrapper>
              <Label>title*</Label>
              <Input
                name='title'
                value={post.title}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>price*</Label>
              <Input
                name='price'
                type='number'
                value={post.price}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>address*</Label>
              <Input
                name='address'
                value={post.address}
                onChange={onChange}
              />
            </InputWrapper>
          </Item>
          <TextArea
            name='desc'
            value={post.desc}
            onChange={onChange}
            placeholder='description'
          />
          <Item className='small'>
            <InputWrapper>
              <Label>city*</Label>
              <Input
                name='city'
                value={post.city}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>bedroom number*</Label>
              <Input
                name='bedrooms'
                type='number'
                value={post.bedrooms}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>bathroom number*</Label>
              <Input
                name='bathrooms'
                type='number'
                value={post.bathrooms}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>latitude*</Label>
              <Input
                name='latitude'
                type='number'
                value={post.latitude}
                onChange={onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>longitude*</Label>
              <Input
                name='longitude'
                type='number'
                value={post.longitude}
                onChange={onChange}
              />
            </InputWrapper>
          </Item>
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
              <Label>property*</Label>
              <Select
                name='property'
                value={post.property}
                onChange={onChange}
              >
                <Option>apartment</Option>
                <Option>house</Option>
                <Option>condo</Option>
                <Option>land</Option>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>utility policies</Label>
              <Select
                name='utilities'
                value={post.utilities}
                onChange={onChange}
              >
                <Option>Owner is responsible</Option>
                <Option>Tenant are responsible</Option>
                <Option>shared</Option>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>pet policies</Label>
              <Select
                name='pet'
                value={post.pet}
                onChange={onChange}
              >
                <Option>pet are allowed</Option>
                <Option>pet are not allowed</Option>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>Type</Label>
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
            <Button disabled={disabled || loading}>
              {' '}
              {loading ? 'loading' : 'submit'}{' '}
            </Button>
          </InputWrapper>
        </Container>
      </Left>
      <Right>
        <DropZone
          description='drag and drop (3) files here or'
          setFiles={setImages}
        />
        <FileViewer images={images} />
      </Right>
    </Wrapper>
  );
};

export default UpdatePost;
