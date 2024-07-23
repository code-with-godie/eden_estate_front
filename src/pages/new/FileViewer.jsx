import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
`;
const Image = styled.img`
  object-fit: contain;
  &:first-child {
    max-width: 300px;
    max-height: 200px;
  }
  max-width: 100px;
  max-height: 70px;
  border-radius: 0.5rem;
`;
const Empty = styled.p`
  text-align: center;
`;
const FileViewer = ({ images = [] }) => {
  if (images.length === 0)
    return <Empty>select atleast (3) file to view</Empty>;
  return (
    <Container>
      {images?.map((item, index) => (
        <Image
          key={index}
          src={item}
        />
      ))}
    </Container>
  );
};

export default FileViewer;
