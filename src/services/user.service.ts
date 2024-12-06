import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";
import { transformUser } from "../helper/helper";
import { UserModel } from "../models/UserModel";
import { FriendModel } from "../models/User/FriendModel";
import { Status } from "../common/constants";

/**
 * Retrieves a user by their handle.
 *
 * @async
 * @function getUserByHandle
 * @param {string} handle - The handle of the user.
 * @returns {Promise<import('firebase/database').DataSnapshot>} A promise that resolves to the user's data snapshot.
 * @throws {import('firebase/database').DatabaseError} If retrieval fails.
 */
export const getUserByHandle = async (
  handle: string
): Promise<import("firebase/database").DataSnapshot> => {
  console.log("getUserByHandle", handle);
  return get(ref(db, `users/${handle}`));
};

/**
 * Creates a new user with the provided handle, email, username, and uid.
 *
 * @async
 * @function createUser
 * @param {string} handle - The handle of the user.
 * @param {string} email - The email address of the user.
 * @param {string} username - The username of the user.
 * @param {string} uid - The unique identifier of the user.
 * @returns {Promise<void>} A promise that resolves when the user is created.
 * @throws {import('firebase/database').DatabaseError} If creation fails.
 */
export const createUser = async (
  handle: string,
  email: string,
  username: string,
  uid: string
): Promise<void> => {
  console.log("createUser", handle, email, username);
  const user: UserModel = {
    email,
    username,
    displayName: username,
    uid,
    status: Status.ONLINE,
    createdOn: Date.now(),
  };
  await set(ref(db, `users/${handle}`), user);
};

/**
 * Retrieves a user by their unique identifier (uid).
 *
 * @async
 * @function getUser
 * @param {string} uid - The unique identifier of the user.
 * @returns {Promise<User | null>} A promise that resolves to the user object or null if not found.
 * @throws {import('firebase/database').DatabaseError} If retrieval fails.
 */
export const getUser = async (uid: string): Promise<UserModel | null> => {
  const userSnapshot = await get(
    query(ref(db, "users"), orderByChild("uid"), equalTo(uid))
  );
  const user = transformUser(userSnapshot);
  return user;
};

export const getAllUsers = async (): Promise<UserModel[]> => {
  const snapshot = await get(query(ref(db, "users")));
  const users = snapshot.val();
  return users;
};
export const getAllFriends = async (
  username: string
): Promise<FriendModel[]> => {
  const snapshot = await get(query(ref(db, `users/${username}friends`)));
  const friends = snapshot.val();
  return friends;
};
