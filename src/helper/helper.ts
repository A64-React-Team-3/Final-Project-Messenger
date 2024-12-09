import { ChannelModel } from "../models/ChannelModel";
import { MessageModel } from "../models/MessageModel";
import { TeamModel } from "../models/Team/TeamModel";
import { UserModel } from "../models/UserModel";
import { defaultUserAvatarPath } from "../common/constants";

/**
 * Transforms a Firebase DataSnapshot into a User object.
 *
 * @function transformUser
 * @param {import('firebase/database').DataSnapshot} user - The Firebase DataSnapshot containing user data.
 * @returns {Promise<User | null>} A promise that resolves to the User object or null if not found.
 */
export const transformUser = (
  user: import("firebase/database").DataSnapshot
): UserModel => {
  console.log("user", user.val());
  const userData = user.val()[Object.keys(user.val())[0]];
  console.log("userData", userData);
  return {
    username: userData.username,
    uid: userData.uid,
    email: userData.email,
    displayName: userData.displayName,
    phoneNumber: userData.phoneNumber || null,
    avatarUrl: userData.avatarUrl || defaultUserAvatarPath,
    status: userData.status || null,
    teams: userData.teams ? Object.values(userData.teams) : null,
    channels: userData.channels ? Object.values(userData.channels) : null,
    friends: userData.friends ? Object.values(userData.friends) : null,
    blocked: userData.blocked ? Object.values(userData.blocked) : null,
    createdOn: userData.createdOn,
  } as UserModel;
};

export const transformUserFromSnapshotVal = (users: import("firebase/database").DataSnapshot): UserModel[] => {
  const tUsers = Object.values(users).map((user: any): UserModel => {
    return {
      username: user.username,
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber || null,
      avatarUrl: user.avatarUrl || defaultUserAvatarPath,
      status: user.status || null,
      teams: user.teams ? Object.values(user.teams) : null,
      channels: user.channels ? Object.values(user.channels) : null,
      friends: user.friends ? Object.values(user.friends) : null,
      blocked: user.blocked ? Object.values(user.blocked) : null,
      createdOn: user.createdOn,
    } as UserModel;
  });

  return tUsers;
};

export const transformUserFromSnapshot = (user: import("firebase/database").DataSnapshot): UserModel => {
  const userData = user.val();
  return {
    username: userData.username,
    uid: userData.uid,
    email: userData.email,
    displayName: userData.displayName,
    phoneNumber: userData.phoneNumber || null,
    avatarUrl: userData.avatarUrl || defaultUserAvatarPath,
    status: userData.status || null,
    teams: userData.teams ? Object.values(userData.teams) : null,
    channels: userData.channels ? Object.values(userData.channels) : null,
    friends: userData.friends ? Object.values(userData.friends) : null,
    blocked: userData.blocked ? Object.values(userData.blocked) : null,
    createdOn: userData.createdOn,
  } as UserModel;
}




export const transformChannelsFromSnapshot = (
  channels: import("firebase/database").DataSnapshot
): ChannelModel[] => {
  const tChannels = Object.values(channels.val()).map(
    (channel: any): ChannelModel => {
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
    }
  );

  return tChannels;
};

export const transformChannelFromSnapshotVal = (
  channels: any[]
): ChannelModel[] => {
  const tChannels = channels.map((channel: any): ChannelModel => {
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

export const transformTeams = (
  teams: import("firebase/database").DataSnapshot
): TeamModel[] => {
  const transformedTeams = Object.values(teams.val()).map(
    (team: any): TeamModel => {
      return {
        teamId: team.id,
        name: team.name,
        // creator: team.creator,
        creator: team.creator && Object.keys(team.creator),
        members: team.members && Object.keys(team.members),
        private: team.private,
        createdOn: team.createdOn,
        avatarUrl: team.avatarUrl ? team.avatarUrl : null,
        joinRequests: team.joinRequests
          ? Object.values(team.joinRequests)
          : null,
        channels: team.channels ? Object.keys(team.channels) : null,
      } as TeamModel;
    }
  );

  return transformedTeams;
};
export const transformMessages = (
  messages: import("firebase/database").DataSnapshot
): MessageModel[] => {
  const tMessages = Object.values(messages.val()).map(
    (message: any): MessageModel => {
      return {
        id: message.id,
        channelId: message.channelId,
        message: message.message,
        sender: message.sender,
        senderName: message.senderName,
        timestamp: message.timestamp,
        imageUrl: message.imageUrl ? Object.values(message.imageUrl) : null,
        reactions: Object.values(message.reactions || []),
      } as MessageModel;
    }
  );

  return tMessages;
};
export const transformDate = (timestamp: number): string => {
  const today = new Date();
  const date = new Date(timestamp);
  const daysAgo = today.getDate() - date.getDate();
  const day =
    daysAgo === 0
      ? "Today"
      : daysAgo === 1
        ? "Yesterday"
        : date.toLocaleDateString();

  return `${day} ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}` as string;
};
