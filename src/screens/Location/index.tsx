import styled from 'styled-components';
import { rgba } from 'polished';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';

import firebase from '@/firebase';
import { LocationDoc, CommentDoc } from '@/types';

import Spinner from '@/components/Spinner';

import CommentBox from './components/CommentBox';
import CommentInput from './components/CommentInput';
import LeafletMap from './components/LeafletMap';

const S_Thumbnail = styled.div`
  width: 100%;
  min-height: 120px;
  max-height: 360px;
  height: 40vh;
  background-color: ${p => p.theme.input.backgroundColor};
  border-radius: 4px;
`;

const S_Divider = styled.div`
  margin: 16px 0;
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.mainNav.dividerColor};
`;

const S = {
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 16px;
  `,
  Screen: styled.div`
    width: 100%;
    max-width: ${p => p.theme.containerWidth};
    margin: 0 auto;
  `,
  Map: styled.div`
    position: relative;
    width: 100%;
    min-height: 120px;
    max-height: 360px;
    height: 40vh;
    background-color: ${p => p.theme.input.backgroundColor};
    border-radius: 4px;
  `,
  Title: styled.h2`
    margin: 6px 0;
    font-family: 'Poppins', sans-serif;
    color: ${p => p.theme.primaryColorContrast};
  `,
  Subtitle: styled.h4`
    margin: 6px 0;
    font-family: 'Poppins', sans-serif;
    color: ${p => p.theme.primaryColorContrast};
  `,
  Description: styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: ${p => p.theme.text.color};
  `,
  LoadingContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Comments: styled.div`
    margin-top: 12px;
    border-top: 1px solid ${p => p.theme.mainNav.dividerColor};
  `,
  CommentSection: styled.div`
    width: 100%;
    margin-bottom: 16px;
  `,
  TagList: styled.div`
    display: flex;
    margin: 0 -4px;
    margin-top: 12px;
  `,
  Tag: styled.div`
    margin: 2px 4px;

    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid ${p => p.theme.mainNav.dividerColor};

    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    color: ${p => p.theme.text.color};
  `,
  Address: styled.p`
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    color: ${p => rgba(p.theme.text.color, 0.8)};
  `,
};

const Location: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [comments, setComments] = React.useState<CommentDoc[]>([]);
  const [location, setLocation] = React.useState<LocationDoc | null>(null);

  const onComment = (comment: CommentDoc) => {
    console.log(comment);
    firebase
      .firestore()
      .collection('locations')
      .doc(id)
      .collection('comments')
      .add(comment);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const snapshot = await firebase.firestore().collection('locations').doc(id).get();

        if (snapshot.exists) {
          setLocation(snapshot.data() as LocationDoc);
        }

        setLoading(false);
      } catch (err) {
        history.push('/404');
      }
    };

    const cleanUpComments = firebase
      .firestore()
      .collection('locations')
      .doc(id)
      .collection('comments')
      .onSnapshot(snapshot => {
        setComments(
          snapshot.docs
            .map(doc => {
              return doc.data() as CommentDoc;
            })
            .reverse(),
        );
      });

    fetchLocation();

    return () => {
      cleanUpComments();
    };
  }, []);

  if (loading || !location) {
    return (
      <S.LoadingContainer>
        <Spinner />
      </S.LoadingContainer>
    );
  }

  function replaceJSX(str: string, find: string | RegExp, replace: any) {
    const result = [];
    let parts = str.split(find);

    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      result.push(replace);
    }

    return <>{result}</>;
  }

  return (
    <S.Wrapper>
      <S.Screen>
        <Helmet>
          <title>Tripoo - {location.title}</title>
          <meta name='description' content={location.description} />
        </Helmet>
        <S.Map>
          <LeafletMap location={location} id={id} />
        </S.Map>
        <S.TagList>
          {location.tags.map(t => (
            <S.Tag key={t}>#{t}</S.Tag>
          ))}
        </S.TagList>
        <S.Title>{location.title}</S.Title>
        <S.Address>{location.address}</S.Address>
        <S_Divider />
        {Object.keys(location.fields).map(k => {
          const v = location.fields[k];
          return (
            <>
              <S.Subtitle>{k}:</S.Subtitle>
              <S.Description>
                {v.split('').map(c => {
                  if (c === ';') {
                    return <br />;
                  }
                  return c;
                })}
              </S.Description>
            </>
          );
        })}
        <S_Divider />
        <S.CommentSection>
          <CommentInput onSubmit={onComment} />
          <S.Comments>
            {comments.map(comment => (
              <CommentBox comment={comment} />
            ))}
          </S.Comments>
        </S.CommentSection>
      </S.Screen>
    </S.Wrapper>
  );
};

export default Location;
