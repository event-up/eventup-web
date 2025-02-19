import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './configs';

export const adminSignIn = async (email: string, password: string) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredentials.user;
  return user;
};
