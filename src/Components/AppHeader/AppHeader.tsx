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
      {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
      {user ? (
        <button className="App-header--Button" onClick={signOut}>
          Sign out
        </button>
      ) : (
        <button className="App-header--Button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      )}
    </header>
  );
};
