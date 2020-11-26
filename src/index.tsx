import firebase from './firebase';

import styled, { css } from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';

import store from './context';
import { mobile } from './utils/breakpoints';

import { GlobalStyle } from './styles';
import StyledThemeProvider from './styles/theme';

import SideNav from './components/Navigation/SideNav';
import TopNavBar from './components/Navigation/MainNav';

import Screens from './screens';
import Spinner from './components/Spinner';

const S = {
  App: styled.div`
    overflow: hidden;
    position: relative;

    height: 100%;
    display: flex;
  `,
  Content: styled.div`
    overflow: auto;

    flex: 1;
    display: flex;
    flex-direction: column;

    background-color: ${p => p.theme.backgroundColor};

    ${mobile(css`
      padding-bottom: 60px;
    `)};
  `,
  LoadingContainer: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  `,
};

const App: React.FC = () => {
  const [user, loading] = useAuthState(firebase.auth());

  return (
    <S.App>
      <Helmet>
        <title>Tripoo</title>
      </Helmet>
      <SideNav />
      <S.Content>
        {!loading ? (
          <>
            <TopNavBar />
            <Screens />
          </>
        ) : (
          <S.LoadingContainer>
            <Spinner />
          </S.LoadingContainer>
        )}
      </S.Content>
    </S.App>
  );
};

ReactDOM.render(
  <>
    <GlobalStyle />
    <ReduxProvider store={store}>
      <StyledThemeProvider>
        <Router>
          <App />
        </Router>
      </StyledThemeProvider>
    </ReduxProvider>
  </>,
  document.getElementById('root'),
);
