import React, { useState, useEffect } from 'react';
import './AppHeader.css';
import { Link } from 'react-router-dom';
import { fetchUserInfo } from '../../Helpers/ApiHelpers';

interface AppHeaderProps {
  user?: firebase.User;
  signOut: () => void;
  signInWithGoogle: () => void | {
    user: firebase.User;
  };
}

interface UserInfo {
  credits: number;
}

const UserInfo: React.FC<{
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

export const AppHeader: React.FC<AppHeaderProps> = ({
  user,
  signOut,
  signInWithGoogle,
}) => {

  const getUserInfo = async (userId: string) => {
    const userInfo: UserInfo = await fetchUserInfo(userId);
    console.log('userInfo: ', userInfo);
    setUserInfo(userInfo);
  }

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  useEffect(() =>{
    user && getUserInfo(user.uid)
  }, [user]);

  return (
    <header className="App-header">
      <div className="App-Header-links">
      <span className="App-Header-Link"><Link to="/">Home</Link></span>
      <span className="App-Header-Link"><Link to="/lessen">Lessen</Link></span>
      </div>
      <div className="App-Header-Profile">
        {user ? < UserInfo name={user.displayName} userInfo={userInfo} /> : <p>Niet ingelogd</p>}
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
