import React from 'react';
import './App.css';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { PaidAccessContainer } from './Containers/PaidAccesContainer';
import { FreeAccessContainer } from './Containers/FreeAccessContainer';
import { FireBaseProps } from './FireBase.types';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const App: React.FC<FireBaseProps> = ({ user, signOut, signInWithGoogle }) => {
  return (
    <div className="App">
      <header className="App-header">
        {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
        {user ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </header>
      {user ? <PaidAccessContainer /> : <FreeAccessContainer />}
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
