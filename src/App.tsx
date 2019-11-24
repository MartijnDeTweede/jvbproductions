import React, { useState } from 'react';
import './App.css';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import { firebaseAppAuth } from './firebaseConfig';

import { FireBaseProps } from './FireBase.types';
import { AppHeader } from './Components/AppHeader/AppHeader';
import { Switch, Route } from 'react-router-dom';
import { HomePageContainer } from './Containers/HomePageContainer';
import { PackageContainer } from './Containers/PackageContainer';
import { UserInfo } from './Components/userInfo.types';
import { AdminContainer } from './Containers/AdminContainer';
import { WebshopContainer } from './Containers/WebshopContainer';

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const App: React.FC<FireBaseProps> = ({ user, signOut, signInWithGoogle }) => {

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)

  return (
    <div className="App">
      <AppHeader
        user={user}
        signOut={signOut}
        signInWithGoogle={signInWithGoogle}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <Switch> 
        <Route path="/" exact component={HomePageContainer} />
        <Route exact path='/lessen' component={() =>  <PackageContainer user={user} signInWithGoogle={signInWithGoogle} setUserInfo={setUserInfo} />} />
        <Route exact path='/webshop' component={() =>  <WebshopContainer user={user} signInWithGoogle={signInWithGoogle} />} />
        {
          userInfo && userInfo.isAdmin && <Route exact path='/admin' component={() =>  <AdminContainer user={user} />} />
        }
    </Switch>
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
