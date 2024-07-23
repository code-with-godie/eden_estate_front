import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccordionItem from './AccordionItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Accordion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([
    {
      title: 'best interest rate in the market',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore expedita quidem delectus perferendis nisi, sunt fuga eligendi a qui assumenda deserunt id corporis, porro nemo',
    },
    {
      title: 'prevent unstable prices',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore expedita quidem delectus perferendis nisi, sunt fuga eligendi a qui assumenda deserunt id corporis, porro nemo',
    },
    {
      title: 'best prices in the market',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore expedita quidem delectus perferendis nisi, sunt fuga eligendi a qui assumenda deserunt id corporis, porro nemo',
    },
  ]);

  useEffect(() => {}, [currentIndex]);
  return (
    <Container>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          index={index}
          {...item}
        />
      ))}
    </Container>
  );
};

export default Accordion;
