import firebase from 'firebase';

export enum Theme {
  DEFAULT,
  DARK,
}

export type LocationDoc = {
  id?: string;
  title: string;
  description: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  tags: string[];
  fields: { [k: string]: string };
  thumbnailURL: string;
};

export type UserDoc = {
  displayName: string;
  photoURL: string | null;
};

export type CommentDoc = {
  author: {
    id: string;
    displayName: string;
    photoURL: string;
  };
  message: string;
  timestamp: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  replies: CommentDoc[];
};
