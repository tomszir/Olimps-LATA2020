import styled from 'styled-components';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as timeago from 'timeago.js';

import firebase from '@/firebase';
import { CommentDoc } from '@/types';
import { rgba } from 'polished';

const S = {
  Container: styled.div`
    display: flex;
    padding: 12px 0;
  `,
  Left: styled.div`
    display: flex;
    align-items: flex-start;
    margin-right: 16px;
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  Message: styled.p`
    color: ${p => p.theme.text.color};
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    margin: 4px 0;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Timestamp: styled.div`
    color: ${p => rgba(p.theme.text.color, 0.7)};
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
  `,
  Link: styled(RouterLink)`
    color: ${p => p.theme.primaryColorContrast};
    font-family: 'Poppins', sans-serif;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
  AvatarImage: styled.img`
    width: 48px;
    height: 48px;
    border-radius: 48px;
  `,
  AvatarImagePlaceholder: styled.div``,
};

type CommentBoxProps = {
  comment: CommentDoc;
};

const CommentBox: React.FC<CommentBoxProps> = ({ comment }) => {
  const getFormattedDate = () => {
    const timestamp = comment.timestamp as firebase.firestore.Timestamp;

    if (!timestamp) {
      return '';
    }

    return timeago.format(timestamp.toDate());
  };

  return (
    <S.Container>
      <S.Left>
        <S.AvatarImage src={comment.author.photoURL} />
      </S.Left>
      <S.Content>
        <S.Header>
          <S.Link to='/'>{comment.author.displayName}</S.Link>
          <S.Timestamp>{getFormattedDate()}</S.Timestamp>
        </S.Header>
        <S.Message>{comment.message}</S.Message>
      </S.Content>
    </S.Container>
  );
};

export default CommentBox;
