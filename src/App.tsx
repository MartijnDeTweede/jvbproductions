import React from 'react';
import './App.css';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import { firebaseAppAuth } from './firebaseConfig';

import { PaidAccessContainer } from './Containers/PaidAccesContainer';
import { FreeAccessContainer } from './Containers/FreeAccessContainer';
import { FireBaseProps } from './FireBase.types';
import { AppHeader } from './Components/AppHeader/AppHeader';
import { Switch, Route } from 'react-router-dom';
import { HomePageContainer } from './Containers/HomePageContainer';
import { LoginContainer } from './Containers/LoginContainer';

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
      <Switch> 
        <Route path="/" exact component={HomePageContainer} />
        <Route exact path='/premium-lessen' component={user ?  PaidAccessContainer : LoginContainer} />
        <Route exact path='/gratis-lessen' component={FreeAccessContainer} />
    </Switch>
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
