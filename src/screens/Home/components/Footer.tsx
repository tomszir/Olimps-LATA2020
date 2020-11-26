import styled, { css } from 'styled-components';
import React from 'react';

import { Twitter, Facebook, Instagram, GitHub } from 'react-feather';
import { mobile } from '@/utils/breakpoints';

const S_Footer = styled.div`
  border-top: 1px solid ${p => p.theme.mainNav.dividerColor};
  width: 100%;
`;

const S_Content = styled.div`
  padding: 16px;
  margin: 0 auto;
  max-width: ${p => p.theme.containerWidth};
  width: 100%;
  display: flex;
  align-items: center;

  ${mobile(css`
    flex-direction: column;
  `)}
`;

const S_SocialLinks = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  ${mobile(css`
    margin-top: 12px;
  `)}
`;

const S_SocialLink = styled.a`
  padding: 4px 8px;
  color: ${p => p.theme.text.color};

  transition: all 0.125s ease-in-out;

  &:hover {
    transition: all 0.125s ease-in-out;
    color: ${p => p.theme.primaryColorContrast};
  }
`;

const S_Text = styled.p`
  color: ${p => p.theme.text.color};
  font-family: 'Poppins', sans-serif;
`;

const S_Link = styled.a`
  color: ${p => p.theme.primaryColorContrast};
  text-decoration: none;
  font-family: 'Poppins', sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  return (
    <S_Footer>
      <S_Content>
        <S_Text>
          Made for <S_Link href='#'>LATA2020</S_Link> by team{' '}
          <S_Link href='#'>Olimps</S_Link>
        </S_Text>
        <S_SocialLinks>
          <S_SocialLink href='https://twitter.com/'>
            <Twitter size={24} />
          </S_SocialLink>
          <S_SocialLink href='https://twitter.com/'>
            <Facebook size={24} />
          </S_SocialLink>
          <S_SocialLink href='https://twitter.com/'>
            <Instagram size={24} />
          </S_SocialLink>
          <S_SocialLink href='https://twitter.com/'>
            <GitHub size={24} />
          </S_SocialLink>
        </S_SocialLinks>
      </S_Content>
    </S_Footer>
  );
};

export default Footer;
