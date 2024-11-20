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

/**
 * Signs in a user with the provided email and password.
 * 
 * @async
 * @function loginUser
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<import('firebase/auth').UserCredential>} The user credentials.
 * @throws {import('firebase/auth').AuthError} If sign-in fails.
 */
export const loginUser = async (email: string, password: string): Promise<import('firebase/auth').UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Signs out the currently authenticated user.
 * 
 * @async
 * @function signOutUser
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 * @throws {import('firebase/auth').AuthError} If sign-out fails.
 */
export const signOutUser = async (): Promise<void> => {
  return signOut(auth);
}