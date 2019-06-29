export interface FireBaseProps {
  user?: firebase.User;
  signOut: () => void;
  signInWithGoogle: () => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signInWithFacebook: () => void;
  signInWithGithub: () => void;
  signInWithTwitter: () => void;
  signInAnonymously: () => void;
  setError: (error: any) => void;
}
