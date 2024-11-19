import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { onValue } from 'firebase/database';

export const getUserByHandle = async (handle: string) => {
  console.log('getUserByHandle', handle);
  return get(ref(db, `users/${handle}`));
};

export const createUser = async (handle: string, email: string, username: string, uid: string) => {
  console.log('createUser', handle, email, username);
  const user = {
    email,
    username,
    displayName: username,
    uid,
    createdOn: Date.now().toString(),
  }
  await set(ref(db, `users/${handle}`), user);
};