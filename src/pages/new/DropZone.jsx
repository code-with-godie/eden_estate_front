import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 0.5rem;
  height: 200px;
  @media screen and (max-width: 768px) {
    height: 120px;
  }
`;
const Container = styled.div`
  padding: 0.5rem;
  flex: 1;
  border: 1px dotted gray;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
const Select = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: var(--faded_blue);
  cursor: pointer;
`;
const DropZone = ({ setFiles, single, description }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (single) {
            setFiles(reader.result);
          } else {
            setFiles(prev => [...prev, reader.result]);
          }
        };
      });
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop,
  });
  return (
    <Wrapper>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p> {description} </p>
            <Select>click to select a file</Select>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default DropZone;
