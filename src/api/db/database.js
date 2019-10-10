import * as firebase from 'firebase';
import { FIREBASE_API } from 'react-native-dotenv';
import 'firebase/firestore';

const config = {
  apiKey: `${FIREBASE_API}`,
  authDomain: 'ingredia-dc183.firebaseapp.com',
  databaseURL: 'https://ingredia-dc183.firebaseapp.com',
  projectId: 'ingredia-dc183',
  storageBucket: 'ingredia-dc183.appspot.com',
  messagingSenderId: '1083112709962',
};

const app = firebase.initializeApp(config);
const db = firebase.firestore(app);

export default db;
