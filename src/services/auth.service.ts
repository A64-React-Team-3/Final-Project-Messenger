import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config.js';

/**
 * Registers a new user with the provided email and password.
 * 
 * @async
 * @function registerUser
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<import('firebase/auth').UserCredential>} The user credentials.
 * @throws {import('firebase/auth').AuthError} If registration fails.
 */
export const registerUser = async (email: string, password: string): Promise<import('firebase/auth').UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
}