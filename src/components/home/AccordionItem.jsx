import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { HiShieldCheck } from 'react-icons/hi';
import { MdAnalytics, MdCancel } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px 3px ${props => (props.mode ? '#7b7b7b13' : '#ebeeff')};
  padding: 0.5rem;
`;
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  .btn {
    background-color: #ededff;
    border-radius: 0.5rem;
    :hover {
      background-color: #ededffd6;
    }
    .icon {
      font-size: 1.3rem;
      color: var(--faded_blue);
    }
  }
`;
const Title = styled.h4`
  ::first-letter {
    text-transform: capitalize;
  }
`;
const Description = styled.p`
  height: 0;
  overflow: hidden;
  transition: height 300ms ease-in-out;
  &.show {
    height: auto !important;
  }
`;
const AccordionItem = ({
  title,
  description,
  currentIndex,
  index,
  setCurrentIndex,
}) => {
  const { darkMode } = useAppContext();
  return (
    <Container mode={darkMode}>
      <ItemHeader>
        <IconButton className='btn'>
          {index === 0 && <HiShieldCheck className='icon' />}
          {index === 1 && <MdCancel className='icon' />}
          {index === 2 && <MdAnalytics className='icon' />}
        </IconButton>
        <Title> {title} </Title>
        <IconButton
          className='btn'
          onClick={() => setCurrentIndex(index)}
        >
          {currentIndex === index ? (
            <KeyboardArrowUp className='icon' />
          ) : (
            <KeyboardArrowDown className='icon' />
          )}
        </IconButton>
      </ItemHeader>
      <Description className={currentIndex === index && 'show'}>
        {' '}
        {description}{' '}
      </Description>
    </Container>
  );
};

export default AccordionItem;
