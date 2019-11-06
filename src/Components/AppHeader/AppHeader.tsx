import React, {  useEffect, useCallback } from 'react';
import './AppHeader.css';
import { Link } from 'react-router-dom';
import { fetchUserInfo } from '../../Helpers/ApiHelpers';
import {UserInfo } from '../userInfo.types';

import guitarImage from './gitaar.png';
import homeImage from './home.jpg';

const UserInformation: React.FC<{
  userInfo?: UserInfo,
  name?: string | null
}> = ({
  userInfo,
  name
}) =>{
  return (
    <div className="App-Header-Profile__Border">
      <div className="App-Header-Profile__Name" >{name}</div>
      {
        userInfo &&
        <div className="App-header-Profile__Credits">{userInfo.credits} Credits</div>}
    </div>
  )
}

export const AppHeader: React.FC<{
  user?: firebase.User;
  signOut: () => void;
  signInWithGoogle: () => void | {
    user: firebase.User;
  };
  userInfo: UserInfo| undefined;
  setUserInfo: (userInfo: UserInfo | undefined) => void;
}> = ({
  user,
  signOut,
  signInWithGoogle,
  userInfo,
  setUserInfo
}) => {

  const getUserInfo = useCallback(async (userId: string) => {
    const userInfo: UserInfo = await fetchUserInfo(userId);
    setUserInfo(userInfo);
  }, [setUserInfo])

  useEffect(() =>{
    user && getUserInfo(user.uid)
  }, [getUserInfo, user]);

  return (
    <header className="App-header">
      <div className="App-Header-links">
      <span className="App-Header-Link">
        <Link to="/">
          <span className="App-Header-Link--desktop">Home</span>
          <div className="App-Header-Link--mobile"><img src={homeImage} alt="Homepage"/></div>
        </Link>
      </span>
      <span className="App-Header-Link">
        <Link to="/lessen">
          <span className="App-Header-Link--desktop">Lessen</span>
          <div className="App-Header-Link--mobile"><img src={guitarImage} alt="Lessen"/></div>
        </Link>
        </span>
        <span className="App-Header-Link">
        <Link to="/admin">
          <span className="App-Header-Link--desktop">Admin</span>
          <div className="App-Header-Link--mobile"><img src={guitarImage} alt="Admin"/></div>
        </Link>
        </span>
      </div>
      <div className="App-Header-Profile">
        {user ? < UserInformation name={user.displayName} userInfo={userInfo} /> : <p>Niet ingelogd</p>}
      </div>
      <div className="App-Header-Menu">
        {user ? (
          <button className="App-header--Button" onClick={() => {
            setUserInfo(undefined);
            signOut();
          }}>
            Uitloggen
          </button>
        ) : (
          <button className="App-header--Button" onClick={ async () => {
            const result = await signInWithGoogle();            
            if(result && result.user) {
              getUserInfo(result.user.uid);
            }
          }}>
            Login met Google
          </button>
        )}
      </div>
    </header>
  );
};
