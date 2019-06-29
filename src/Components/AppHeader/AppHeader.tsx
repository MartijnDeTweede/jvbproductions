import React from 'react';
import './AppHeader.css';

interface AppHeaderProps {
  user?: firebase.User;
  signOut: () => void;
  signInWithGoogle: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  user,
  signOut,
  signInWithGoogle,
}) => {
  return (
    <header className="App-header">
      <div className="App-Header-Profile">
        {user ? <p>Hallo, {user.displayName}</p> : <p>Log alsjeblieft in</p>}
      </div>
      <div className="App-Header-Menu">
        {user ? (
          <button className="App-header--Button" onClick={signOut}>
            Uitloggen
          </button>
        ) : (
          <button className="App-header--Button" onClick={signInWithGoogle}>
            Login met Google
          </button>
        )}
      </div>
    </header>
  );
};
