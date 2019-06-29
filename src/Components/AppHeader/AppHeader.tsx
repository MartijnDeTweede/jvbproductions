import { FireBaseProps } from '../../FireBase.types';

interface AppHeaderProps extends FireBaseProps {}

export const AppHeader: React.FC<AppHeaderProps> = ({
  user,
  signOut,
  signInWithGoogle,
}) => {
  return (
    <header className="App-header">
      {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </header>
  );
};
