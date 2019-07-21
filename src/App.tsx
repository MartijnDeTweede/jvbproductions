import React from 'react';
import './App.css';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import { firebaseAppAuth } from './firebaseConfig';

import { PaidAccessContainer } from './Containers/PaidAccesContainer';
import { FreeAccessContainer } from './Containers/FreeAccessContainer';
import { FireBaseProps } from './FireBase.types';
import { AppHeader } from './Components/AppHeader/AppHeader';


const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const App: React.FC<FireBaseProps> = ({ user, signOut, signInWithGoogle }) => {
  return (
    <div className="App">
      <AppHeader
        user={user}
        signOut={signOut}
        signInWithGoogle={signInWithGoogle}
      />
      {user ? <PaidAccessContainer /> : <FreeAccessContainer />}
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
