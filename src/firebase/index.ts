import firebase from 'firebase/app';
import firebaseConfig from '@/config/firebase';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export default firebase;
