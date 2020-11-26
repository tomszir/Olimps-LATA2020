import styled from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet';

const S_Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  * {
    color: ${p => p.theme.text.color};
    font-family: 'Poppins', sans-serif;
  }
`;

const PageNotFound: React.FC = () => {
  return (
    <S_Container>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name='description' content='Page Not Found' />
        <link rel='canonical' href='/404' />
      </Helmet>
      <h1>404</h1>
      <p>Page Not Found 😔</p>
    </S_Container>
  );
};

export default PageNotFound;
