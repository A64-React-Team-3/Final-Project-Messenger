import { ChannelModel } from "../models/ChannelModel";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";


/**
 * Transforms a Firebase DataSnapshot into a User object.
 * 
 * @function transformUser
 * @param {import('firebase/database').DataSnapshot} user - The Firebase DataSnapshot containing user data.
 * @returns {Promise<User | null>} A promise that resolves to the User object or null if not found.
 */
export const transformUser = (user: import('firebase/database').DataSnapshot): Promise<UserModel | null> => {
  const userData = user.val()[Object.keys(user.val())[0]];
  return userData;
};

export const transformChannels = (channels: import('firebase/database').DataSnapshot): ChannelModel[] => {

  const tChannels = Object.values(channels.val()).map((channel: any): ChannelModel => {
    return {
      id: channel.id,
      name: channel.name,
      members: Object.keys(channel.members || {}),
      messages: channel.messages ? Object.values(channel.messages) : null,
      creator: channel.creator,
      teamId: channel.teamId,
      private: channel.private,
      createdOn: channel.createdOn,
    } as ChannelModel;
  });

  return tChannels;
};

export const transformMessages = (messages: import('firebase/database').DataSnapshot): MessageModel[] => {

  const tMessages = Object.values(messages.val()).map((message: any): MessageModel => {
    return {
      id: message.id,
      message: message.message,
      senderName: message.senderName,
      sender: message.sender,
      channelId: message.channelId,
      timestamp: message.timestamp,
      imageUrl: message.imageUrl || null,
    } as MessageModel;
  });

  return tMessages;
};

export const transformDate = (timestamp: number): string => {
  const today = new Date();
  const date = new Date(timestamp);
  const daysAgo = today.getDate() - date.getDate();
  const day = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : date.toLocaleDateString();


  return `${day} ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}` as string;
}