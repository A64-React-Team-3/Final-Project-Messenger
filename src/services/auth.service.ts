import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config.js';


export const registerUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
}