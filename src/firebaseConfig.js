import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBivZiHRkBW0YmarL-1-GQ90EKN6MXKntU',
  authDomain: 'jvbproductions-b7cb7.firebaseapp.com',
  databaseURL: 'https://jvbproductions-b7cb7.firebaseio.com',
  projectId: 'jvbproductions-b7cb7',
  storageBucket: 'jvbproductions-b7cb7.appspot.com',
  messagingSenderId: '808887170743',
  appId: '1:808887170743:web:7c0a19f831680717',
};

firebase.initializeApp(firebaseConfig);
export const firebaseAppAuth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage().ref();

export default firebaseConfig;

