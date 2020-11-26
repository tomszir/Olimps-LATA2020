import styled, { css } from 'styled-components';
import React from 'react';
import { rgba } from 'polished';

import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from '@/firebase';
import { mobile } from '@/utils/breakpoints';

import Button from '@/components/Button';
import Input from '@/components/Forms/Input';

import { useModal } from '@/components/Modal';
import UpdateProfileModal from '@/components/Modals/UpdateProfileModal';
import { SignInModal, SignUpModal } from '@/components/Modals/AuthModals';

const S_TopNav = styled.nav`
  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;

  padding: 10px 16px;

  background-color: ${p => p.theme.mainNav.backgroundColor};
  border-bottom: 1px solid ${p => p.theme.mainNav.dividerColor};
`;

const S_Search = styled.div`
  display: flex;

  margin: 0 auto;

  width: 40%;
  height: 40px;

  min-width: 320px;
  max-width: 760px;

  ${mobile(css`
    flex: 1;
    min-width: 0;
    max-width: 100%;
  `)}
`;

const S_Desktop = styled.div`
  display: flex;

  ${mobile(css`
    display: none;
  `)}
`;

const S_Mobile = styled.div`
  display: none;

  ${mobile(css`
    display: flex;
    margin-left: 4px;
    align-items: center;
  `)}
`;

const S_Avatar = styled.img`
  border: none;
  outline: none;
  background-color: ${p => p.theme.mainNav.dividerColor};
  height: 40px;
  width: 40px;
  border-radius: 100%;

  ${mobile(css`
    margin-left: 12px;
  `)}
`;

const S_UserName = styled.span`
  font-size: 14px;
  margin-right: 12px;
  font-family: 'Poppins', sans-serif;
  color: ${p => p.theme.text.color};

  ${mobile(css`
    display: none;
  `)}
`;

const S_User = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: transparent;

  &:hover {
    ${S_UserName} {
      color: ${p => rgba(p.theme.text.color, 0.8)};
    }
    ${S_Avatar} {
      opacity: 0.8;
    }
  }
`;

const TopNavBar = () => {
  const [user] = useAuthState(firebase.auth());

  const signInModal = useModal();
  const signUpModal = useModal();
  const updateProfileModal = useModal();

  return (
    <>
      <SignInModal {...signInModal.handlers} />
      <SignUpModal {...signUpModal.handlers} />
      <UpdateProfileModal {...updateProfileModal.handlers} />
      <S_TopNav>
        <S_Search>
          <Input placeholder='Search...' />
        </S_Search>
        {!user ? (
          <>
            <S_Desktop>
              <Button onClick={() => signInModal.open()}>Sign in</Button>
              <Button onClick={() => signUpModal.open()} type='secondary'>
                Sign up
              </Button>
            </S_Desktop>
            <S_Mobile>
              <Button onClick={() => signInModal.open()}>Sign in</Button>
            </S_Mobile>
          </>
        ) : (
          <S_User onClick={() => updateProfileModal.open()}>
            <S_UserName>{user.displayName}</S_UserName>
            <S_Avatar src={user.photoURL} />
          </S_User>
        )}
      </S_TopNav>
    </>
  );
};

export default TopNavBar;
