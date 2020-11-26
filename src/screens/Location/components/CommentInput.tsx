import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from '@/firebase';
import Button from '@/components/Button';
import { CommentDoc, LocationDoc } from '@/types';
import Alert from '@/components/Alert';

const S = {
  Container: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  Footer: styled.div`
    margin: 0 -4px;
    margin-top: 12px;
  `,
  TextArea: styled.textarea`
    outline: none;

    padding: 8px 10px;
    width: 100%;
    min-width: 100%;

    color: ${p => p.theme.input.contentColor};

    border-radius: 4px;
    border: 1px solid ${p => p.theme.input.borderColor};
    background-color: ${p => p.theme.input.backgroundColor};

    font-size: 14px;
    font-family: 'Poppins', sans-serif;

    &:hover,
    &:focus {
      border-color: ${p => p.theme.input.borderColorActive};
      background-color: ${p => p.theme.input.backgroundColorActive};
    }

    &:focus {
      box-shadow: 0 0 0 4px ${p => p.theme.primaryColor + '3f'};
    }
  `,
};

type CommentInputProps = {
  onSubmit: (comment: CommentDoc) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const [user] = useAuthState(firebase.auth());
  const [value, setValue] = useState<string>('');

  if (!user) {
    return <Alert message='Please log in if you wish to comment' />;
  }

  const onComment = () => {
    onSubmit({
      author: {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      message: value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      replies: [],
    });
  };

  return (
    <S.Container>
      <S.TextArea
        placeholder='Enter your comment here...'
        onChange={({ target: { value } }) => setValue(value)}
      />
      <S.Footer>
        <Button onClick={onComment}>Submit</Button>
      </S.Footer>
    </S.Container>
  );
};

export default CommentInput;
