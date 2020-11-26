import styled from 'styled-components';
import React, { useState } from 'react';

import firebase from '@/firebase';

import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import Modal, { ModalProps } from '@/components/Modal';
import Alert from '../Alert';

const S = {
  Divider: styled.div`
    margin: 16px 0;
    display: flex;
    align-items: center;
  `,
  DividerLine: styled.div`
    flex: 1;
    height: 1px;
    background-color: ${p => p.theme.mainNav.dividerColor};
  `,
  DividerLabel: styled.span`
    margin: 0 8px;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
  `,
  AlertContainer: styled.div`
    margin-bottom: 12px;
  `,
  ContinueButton: styled(Button)`
    width: 100%;

    margin: 0;
    margin-top: 22px;
    padding: 10px 14px;

    font-size: 15px;
  `,
  Button: styled(Button)`
    width: 100%;
    margin: 0;

    & + & {
      margin-top: 12px;
    }
  `,
};

const Divider: React.FC = () => (
  <S.Divider>
    <S.DividerLine />
    <S.DividerLabel>or</S.DividerLabel>
    <S.DividerLine />
  </S.Divider>
);

const continueWithProvider = async (
  provider: firebase.auth.AuthProvider,
  onClose: () => void,
  setError: (message: string) => void,
) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      onClose();
      setError('');
    })
    .catch(({ message }) => setError(message));
};

export type AuthModalProps = Omit<ModalProps, 'title'>;

export const SignInModal: React.FC<AuthModalProps> = ({ onClose, ...props }) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmail = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        onClose();
        setError('');
      })
      .catch(({ message }) => setError(message));
  };

  const continueWithGoogle = () =>
    continueWithProvider(new firebase.auth.GoogleAuthProvider(), onClose, setError);

  const continueWithGitHub = () =>
    continueWithProvider(new firebase.auth.GithubAuthProvider(), onClose, setError);

  const continueWithFacebook = () =>
    continueWithProvider(new firebase.auth.FacebookAuthProvider(), onClose, setError);

  return (
    <Modal
      title='Sign in'
      onClose={() => {
        setError('');
        onClose();
      }}
      {...props}
    >
      {error && (
        <S.AlertContainer>
          <Alert message={error} />
        </S.AlertContainer>
      )}
      <Input
        onChange={value => setEmail(value)}
        label='E-mail'
        placeholder='generic@email.com'
      />
      <Input
        onChange={value => setPassword(value)}
        label='Password'
        placeholder='********'
      />
      <S.ContinueButton onClick={signInWithEmail}>Continue</S.ContinueButton>
      <Divider />
      <S.Button type='secondary' onClick={continueWithGoogle}>
        Continue with Google
      </S.Button>
      <S.Button type='secondary' onClick={continueWithGitHub}>
        Continue with GitHub
      </S.Button>
      <S.Button type='secondary' onClick={continueWithFacebook}>
        Continue with Facebook
      </S.Button>
    </Modal>
  );
};

export const SignUpModal: React.FC<AuthModalProps> = ({ onClose, ...props }) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUpWithEmail = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user != null) {
          user.updateProfile({
            displayName: username,
          });

          onClose();
          setError('');
        }
      })
      .catch(({ message }) => setError(message));
  };

  const continueWithGoogle = () =>
    continueWithProvider(new firebase.auth.GoogleAuthProvider(), onClose, setError);

  const continueWithGitHub = () =>
    continueWithProvider(new firebase.auth.GithubAuthProvider(), onClose, setError);

  const continueWithFacebook = () =>
    continueWithProvider(new firebase.auth.FacebookAuthProvider(), onClose, setError);

  return (
    <Modal
      title='Sign up'
      onClose={() => {
        setError('');
        onClose();
      }}
      {...props}
    >
      {error && (
        <S.AlertContainer>
          <Alert message={error} />
        </S.AlertContainer>
      )}
      <Input
        onChange={value => setUsername(value)}
        label='Username'
        placeholder='John Doe'
      />
      <Input
        onChange={value => setEmail(value)}
        label='E-mail'
        placeholder='generic@email.com'
      />
      <Input
        onChange={value => setPassword(value)}
        label='Password'
        placeholder='********'
      />
      <S.ContinueButton onClick={signUpWithEmail}>Continue</S.ContinueButton>
      <Divider />
      <S.Button type='secondary' onClick={continueWithGoogle}>
        Continue with Google
      </S.Button>
      <S.Button type='secondary' onClick={continueWithGitHub}>
        Continue with GitHub
      </S.Button>
      <S.Button type='secondary' onClick={continueWithFacebook}>
        Continue with Facebook
      </S.Button>
    </Modal>
  );
};
