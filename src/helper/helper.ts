import { User } from "../models/User";


/**
 * Transforms a Firebase DataSnapshot into a User object.
 * 
 * @function transformUser
 * @param {import('firebase/database').DataSnapshot} user - The Firebase DataSnapshot containing user data.
 * @returns {Promise<User | null>} A promise that resolves to the User object or null if not found.
 */
export const transformUser = (user: import('firebase/database').DataSnapshot): Promise<User | null> => {
  const userData = user.val()[Object.keys(user.val())[0]];
  return userData;
};