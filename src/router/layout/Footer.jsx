import React from 'react';
import styled from 'styled-components';
const Container = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 0.5rem;

  @media screen and (min-width: 768px) {
    padding: 1rem 1rem 2rem 1rem;
  }
`;
const FooterItem = styled.div`
  padding: 1rem;
  background-color: #a4a3a315;
`;
const TextWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const TextTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--color-golden);
`;
const Text = styled.p`
  text-transform: capitalize;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
const Image = styled.img`
  object-fit: contain;
  border-radius: 0.5rem;
  cursor: pointer;
  :hover {
    outline: 1px solid white;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem 0;
`;
const Footer = () => {
  return (
    <Container>
      <FooterItem>
        <TextTitle>Discover Fresh grub</TextTitle>
        <TextWrapper>
          <Text>Investors</Text>
          <Text>About Us</Text>
          <Text>Newsroom</Text>
          <Text>Engineering blog</Text>
          <Text>Design blog</Text>
          <Text>Gift Cards </Text>
          <Text>Fast Food Student</Text>
          <Text>Careers</Text>
          <Text>Restaurant signup</Text>
          <Text>Become a rider</Text>
        </TextWrapper>
      </FooterItem>
      <FooterItem>
        <TextTitle>Legal</TextTitle>
        <TextWrapper>
          <Text>Privacy</Text>
          <Text>cookies</Text>
          <Text>modern slavry statement</Text>
          <Text>text strategy</Text>
          <Text>section 172 statement</Text>
          <Text>public authority requests</Text>
        </TextWrapper>
      </FooterItem>
      <FooterItem>
        <TextTitle>Help</TextTitle>
        <TextWrapper>
          <Text>Investors</Text>
          <Text>Contact</Text>
          <Text>FAQs</Text>
          <Text>Cuisines</Text>
          <Text>Brands</Text>
        </TextWrapper>
      </FooterItem>
    </Container>
  );
};

export default Footer;
