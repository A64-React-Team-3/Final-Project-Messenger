import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";
import { transformUser, transformUserFromSnapshotVal } from "../helper/helper";
import { UserModel } from "../models/UserModel";
import { FriendModel } from "../models/User/FriendModel";
import { Status } from "../common/constants";
import { TeamMemberModel } from "../models/Team/TeamMemberModel";
import { toast } from "react-toastify";

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
  try {
    const userSnapshot = await get(
      query(ref(db, "users"), orderByChild("uid"), equalTo(uid))
    );
    const user = transformUser(userSnapshot);
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
};

export const getByUserName = async (
  username: Partial<TeamMemberModel>
): Promise<UserModel | null> => {
  const userSnapshot = await get(query(ref(db, `users/${username}`)));
  if (!userSnapshot.exists()) {
    console.error(`No user found with username: ${username}`);
    toast.error(`No user found with username: ${username}`);
    return null;
  } else {
    const user = userSnapshot.val() as UserModel;
    return user;
  }
};

export const getAllUsers = async (): Promise<UserModel[]> => {
  const snapshot = await get(query(ref(db, "users")));
  const users = transformUserFromSnapshotVal(snapshot.val());
  return users;
};

export const getAllFriends = async (
  username: string
): Promise<FriendModel[]> => {
  const snapshot = await get(query(ref(db, `users/${username}friends`)));
  const friends = snapshot.val();
  return friends;
};

export const updateUser = async (userId: string, displayName: string, phoneNumber: string, avatarUrl?: string): Promise<void> => {
  try {
    const userRef = query(ref(db, "users"), orderByChild("uid"), equalTo(userId));
    const userSnapshot = await get(userRef);
    const user = transformUser(userSnapshot);
    user.displayName = displayName;
    user.phoneNumber = phoneNumber;
    if (avatarUrl) {
      user.avatarUrl = avatarUrl;
    }
    await set(ref(db, `users/${user.username}`), user);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

export const serchUser = async (search: string): Promise<UserModel[]> => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("username"),));
  const users = snapshot.val();
  return users;
};

