import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from '@/firebase';

import Modal, { ModalProps } from '@/components/Modal';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import Alert from '@/components/Alert';

const S_Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  margin: 0 -16px;
  margin-top: 16px;
  padding: 0 16px;
  padding-top: 16px;

  border-top: 1px solid ${p => p.theme.mainNav.dividerColor};

  & *:not(:last-child) {
    margin-right: 8px;
  }
`;

const S_AvatarPreview = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 100%;
  background-color: ${p => p.theme.mainNav.dividerColor};
`;

const S_Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    ${S_AvatarPreview} {
      opacity: 0.8;
    }
  }
`;

const S_AvatarUpload = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const S_Input = styled.input`
  display: none;
`;

const AvatarUpload: React.FC<{ user: any; onUpload: (file: File) => void }> = ({
  user,
  onUpload,
}) => {
  const [image, setImage] = useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    if (currentTarget.files) {
      const image = currentTarget.files[0];

      if (image) {
        onUpload(image);
        setImage(URL.createObjectURL(image));
      }
    }
  };

  return (
    <S_AvatarUpload>
      <S_Input ref={inputRef} onChange={handleChange} type='file' accept='image/*' />
      <S_Button onClick={() => inputRef.current && inputRef.current.click()}>
        <S_AvatarPreview src={image ? image : user.photoURL} />
      </S_Button>
    </S_AvatarUpload>
  );
};

const UpdateProfileModal: React.FC<Omit<ModalProps, 'title'>> = ({
  onClose,
  ...props
}) => {
  const [user] = useAuthState(firebase.auth());

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [username, setUsername] = useState('');

  const update = () => {
    if (avatarImage) {
      const storageRef = firebase
        .storage()
        .ref(user.uid + '/profilePicture/' + avatarImage.name);

      storageRef.put(avatarImage).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          user.updateProfile({
            photoURL: url,
          });
        });
      });
    }

    if (username) {
      user.updateProfile({
        displayName: username,
      });
    }
  };

  const signOut = () => {
    firebase.auth().signOut();
    setError('');
    onClose();
  };

  if (!user) {
    return null;
  }

  return (
    <Modal
      title='Update Profile'
      onClose={() => {
        setError('');
        onClose();
      }}
      {...props}
    >
      {error !== '' && <Alert message={error} />}
      <AvatarUpload user={user} onUpload={file => setAvatarImage(file)} />
      <Input
        onChange={value => setUsername(value)}
        label='Display Name'
        placeholder={user.displayName}
      />
      <Input
        onChange={value => setEmail(value)}
        label='E-mail'
        placeholder={user.email}
      />
      <S_Buttons>
        <Button onClick={signOut} type='secondary'>
          Log out
        </Button>
        <Button onClick={update}>Update</Button>
      </S_Buttons>
    </Modal>
  );
};

export default UpdateProfileModal;
