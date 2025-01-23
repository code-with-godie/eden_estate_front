import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900000000;
`;

const ModalContent = styled.div`
  background-color: ${props =>
    props.darkMode ? 'var(--color_faded_dark)' : '#fff'};
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  color: ${props => (props.darkMode ? '#fff' : '#000')};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => (props.darkMode ? '#fff' : '#000')};
`;

const Modal = ({ isOpen, onClose, children }) => {
  const { darkMode } = useAppContext();
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContent darkMode={darkMode}>
        <CloseButton
          darkMode={darkMode}
          onClick={onClose}
        >
          &times;
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
