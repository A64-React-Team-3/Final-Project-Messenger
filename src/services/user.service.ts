import { get, set, ref, query, equalTo, orderByChild, update } from "firebase/database";
import { db } from "../config/firebase-config";
import { transformUser, transformUserFromSnapshot, transformUserFromSnapshotVal } from "../helper/helper";
import { UserModel } from "../models/UserModel";
import { FriendModel } from "../models/User/FriendModel";
import { Status } from "../common/constants";
import { TeamMemberModel } from "../models/Team/TeamMemberModel";
import { toast } from "react-toastify";
import { defaultUserAvatarPath } from "../common/constants";

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
  try {
    const userRef = ref(db, `users/${handle}`);
    const userSnapshot = await get(userRef);
    return userSnapshot;

  } catch (error) {
    console.error("Error getting user by handle:", error);
    throw new Error("Failed to get user by handle");
  }
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
): Promise<UserModel | null> => {
  console.log("createUser", handle, email, username);
  const user: UserModel = {
    email,
    username,
    displayName: username,
    uid,
    status: Status.ONLINE,
    createdOn: Date.now(),
    avatarUrl: defaultUserAvatarPath,
  };
  await set(ref(db, `users/${handle}`), user);
  const result = await getUserByHandle(handle);

  if (result.exists()) {
    return transformUserFromSnapshot(result);
  } else {
    return null;
  }

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

export const updateUser = async (userName: string, displayName: string, phoneNumber: string, avatarUrl?: string): Promise<void> => {
  try {
    await update(ref(db, `users/${userName}`), {
      displayName,
      phoneNumber,
      avatarUrl,
    });
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

export const setUserStatusOffline = async (userName: string): Promise<void> => {
  try {
    await set(ref(db, `users/${userName}/status`), Status.OFFLINE);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export const setUserStatusOnline = async (userName: string): Promise<void> => {
  console.log("setUserStatusOnline", userName);
  try {
    await set(ref(db, `users/${userName}/status`), Status.ONLINE);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

