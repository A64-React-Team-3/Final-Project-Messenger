import { Channel } from "../models/Channel";
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

export const transformChannels = (channels: import('firebase/database').DataSnapshot): Channel[] => {

  const tChannels = Object.values(channels.val()).map((channel: any): Channel => {
    return {
      id: channel.id,
      name: channel.name,
      members: Object.keys(channel.members || {}),
      messages: Object.values(channel.messages),
      creator: channel.creator,
      teamId: channel.teamId,
      private: channel.private,
      createdOn: channel.createdOn,
    };
  });

  return tChannels;
};

