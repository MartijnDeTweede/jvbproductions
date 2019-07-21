import React from 'react';
import './AppHeader.css';
import { Link } from 'react-router-dom';

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
      <div>
      <Link to="/">Home</Link>
      <Link to="/gratis-lessen">Gratis lessen</Link>
      <Link to="/premium-lessen">Premium lessen</Link>
      </div>
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
