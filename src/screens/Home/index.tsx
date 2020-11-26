import { rgba } from 'polished';
import styled, { css } from 'styled-components';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';

import firebase from '@/firebase';
import { LocationDoc } from '@/types';
import { mobile } from '@/utils/breakpoints';

import Alert from '@/components/Alert';
import Footer from './components/Footer';
import Button from '@/components/Button';
import { useModal } from '@/components/Modal';
import CreateLocationModal from '@/components/Modals/CreateLocationModal';
import Spinner from '@/components/Spinner';
import LocationItem from './components/LocationItem';

const S_Home = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const S_Content = styled.div`
  padding: 16px;
  margin: 0 auto;
  max-width: ${p => p.theme.containerWidth};
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const S_Label = styled.h3`
  margin: 12px 0;

  color: ${p => p.theme.text.color};
  font-family: 'Poppins', sans-serif;
`;

const S_Section = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: -8px;

  ${mobile(css`
    flex-direction: column;
  `)}
`;

const S_Items = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const S_Loading = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home: React.FC = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('locations'),
  );

  return (
    <>
      <Helmet>
        <title>Tripoo - Home</title>
        <meta name='description' content='Homepage' />
      </Helmet>
      {/* <CreateLocationModal {...locationModal.handlers} /> */}
      <S_Home>
        <S_Content>
          {/* <Button onClick={locationModal.open}>Request a new location</Button>
          <Alert message='Information about the newest COVID-19 measures' /> */}
          {loading && (
            <S_Loading>
              <Spinner />
            </S_Loading>
          )}
          <S_Section>
            {value &&
              value.docs.map((document: any, i: number) => {
                return (
                  <LocationItem
                    sponsored={i < 4}
                    location={document.data()}
                    id={document.id}
                  />
                );
              })}
          </S_Section>
        </S_Content>
      </S_Home>
    </>
  );
};

export default Home;
