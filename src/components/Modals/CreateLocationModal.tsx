import styled from 'styled-components';
import { rgba } from 'polished';
import React, { useState } from 'react';
import { Plus } from 'react-feather';

import firebase from '@/firebase';

import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import Modal, { ModalProps } from '@/components/Modal';
import { LocationDoc } from '~/src/types';

const S = {
  InputLabel: styled.h5`
    margin: 10px 0;
    color: ${p => rgba(p.theme.text.color, 0.8)};
    font-family: 'Poppins', sans-serif;
  `,
  SmallLabel: styled.h6`
    margin: 8px 0;
    color: ${p => rgba(p.theme.text.color, 0.6)};
    font-family: 'Poppins', sans-serif;
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: center;

    button {
      display: flex;
      height: 100%;
      margin-left: 8px;
      padding: 10px;
    }
  `,
  TagContainer: styled.div`
    margin: 0 -4px;
    margin-top: -4px;
    margin-bottom: 8px;
    display: flex;
    flex-wrap: wrap;
  `,
  Tag: styled.div`
    margin: 4px;

    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid ${p => p.theme.mainNav.dividerColor};

    font-size: 12px;
    font-family: 'Poppins', sans-serif;
  `,
  Icon: styled.span<{ size: number }>``,
  ImageUpload: styled.div`
    margin-bottom: 10px;
    margin-top: -10px;
  `,
  ImagePreview: styled.img`
    width: 100%;
    height: 240px;
    border: none;
    outline: none;

    border-radius: 4px;
    object-fit: cover;
  `,
  ImageUploadInput: styled.input`
    display: none;
  `,
  ImageText: styled.p`
    color: ${p => p.theme.text.color};
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
  `,
  ImageUploadButton: styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 240px;
    border-radius: 4px;
    background-color: ${p => p.theme.mainNav.dividerColor};

    border: none;
    outline: none;

    &:hover {
      opacity: 0.8;
    }
  `,
  DoubleInputContainer: styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;

    & > *:last-child {
      margin-top: 0;
      margin-left: 8px;
    }
  `,
  ModalFooter: styled.div`
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
  `,
};

export type UpdateProfileModalProps = Omit<ModalProps, 'title'>;

const ImageUpload: React.FC<{ onUpload: (file: File) => void }> = ({ onUpload }) => {
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
    <S.ImageUpload>
      <S.InputLabel>Thumbnail</S.InputLabel>
      <S.ImageUploadInput
        ref={inputRef}
        onChange={handleChange}
        type='file'
        accept='image/*'
      />
      <S.ImageUploadButton onClick={() => inputRef.current && inputRef.current.click()}>
        {!image && <S.ImageText>Click to upload an image</S.ImageText>}
        {image && <S.ImagePreview src={image} />}
      </S.ImageUploadButton>
    </S.ImageUpload>
  );
};

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ ...props }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [address, setAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [newTag, setNewTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [fields, setFields] = useState<string[][]>([]);

  const onClose = () => {
    props.onClose();
    setTitle('');
    setDescription('');
    setNewTag('');
    setTags([]);
  };

  const submit = async () => {
    try {
      const db = firebase.firestore().collection('locations');

      const docRef = await db.add({
        title,
        description,
        tags,
        address,
        coordinates: {
          latitude,
          longitude,
        },
        thumbnailURL: '',
      } as LocationDoc);

      if (thumbnail) {
        const storageRef = firebase
          .storage()
          .ref(`location/${docRef.id}/thumbnail/${thumbnail.name.replace('.', '_')}`);

        storageRef.put(thumbnail).then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            console.log(url);
            db.doc(docRef.id).update({
              thumbnailURL: url,
            });
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addTag = () => {
    if (newTag != '' && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  return (
    <Modal title='Request a new location' {...props} onClose={onClose}>
      <ImageUpload onUpload={setThumbnail} />
      <Input label='Title' placeholder='The perfect place' onChange={setTitle} />
      <Input
        label='Description'
        placeholder='Nostrud sunt do minim id anim.'
        onChange={setDescription}
      />

      <Input label='Address' onChange={setAddress} />
      <S.DoubleInputContainer>
        <Input label='Latitude' onChange={v => setLatitude(parseInt(v))} />
        <Input label='Longitude' onChange={v => setLongitude(parseInt(v))} />
      </S.DoubleInputContainer>

      <S.InputLabel>Tags</S.InputLabel>
      <S.InputContainer>
        <Input
          value={newTag}
          placeholder='#pizza'
          onChange={setNewTag}
          onEnter={addTag}
        />
        <Button onClick={addTag}>
          <S.Icon as={Plus} size={18} />
        </Button>
      </S.InputContainer>
      <S.SmallLabel>{tags.length}/10 tags</S.SmallLabel>
      <S.TagContainer>
        {tags.map(tag => (
          <S.Tag>#{tag}</S.Tag>
        ))}
      </S.TagContainer>

      <S.ModalFooter>
        <Button onClick={submit}>Submit</Button>
      </S.ModalFooter>
    </Modal>
  );
};

export default UpdateProfileModal;
