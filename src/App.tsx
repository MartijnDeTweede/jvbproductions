import React, { useState } from 'react';
import './App.css';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import { firebaseAppAuth } from './firebaseConfig';

import { FireBaseProps } from './FireBase.types';
import { AppHeader } from './Components/AppHeader/AppHeader';
import { Switch, Route } from 'react-router-dom';
import { HomePageContainer } from './Containers/HomePageContainer';
import { LessonContainer } from './Containers/LessonContainer';
import { UserInfo } from './Components/userInfo.types';

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
        <Route exact path='/lessen' component={() =>  <LessonContainer user={user} signInWithGoogle={signInWithGoogle} setUserInfo={setUserInfo} />} />
    </Switch>
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
