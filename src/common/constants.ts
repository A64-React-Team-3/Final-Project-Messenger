// Regular expressions for email, username and password validation
export const validEmailRegex = RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
export const validUsernameRegex = RegExp(/^[a-zA-Z0-9._%+-]{5,35}$/);
export const validPasswordRegex = RegExp(/^[a-zA-Z0-9._%+-]{6,15}$/);

export enum Themes {
  LIGHT = "light",
  DARK = "dark",
  CUPCAKE = "cupcake",
  SYNTHWAVE = "synthwave",
  EMERALD = "emerald",
  CORPORATE = "corporate",
  FOREST = "forest",
}

export const defaultUserAvatarPath =
  "https://firebasestorage.googleapis.com/v0/b/final-project-messenger-7b4c2.firebasestorage.app/o/avatars%2FdefaultUserAvatar.png?alt=media&token=a8e0c487-596d-49a2-aefd-f6cae2562870";

//default team image
// export const defaultTeamImgUrl =
//   "https://firebasestorage.googleapis.com/v0/b/final-project-messenger-7b4c2.firebasestorage.app/o/avatars%2Fcommunity.png?alt=media&token=b878f52c-d4a3-483d-996a-4196a2fc3bd4";
export const defaultTeamImgUrl =
  "https://firebasestorage.googleapis.com/v0/b/final-project-messenger-7b4c2.firebasestorage.app/o/avatars%2Ffinal_logo.png?alt=media&token=2196915b-2bb2-4eac-8dc7-cf83605ed9d8";

export const reactionEmoji = ["👍", "❤️", "😂", "😢", "😲"];

export enum ChannelType {
  TEAM = "team",
  PERSONAL = "personal",
}

export enum NotificationType {
  FRIEND_REQUEST = "friendRequest",
  TEAM_REQUEST = "teamRequest",
  TEAM_INVITE = "teamInvite",
  MESSAGE = "message",
}

export enum NotificationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum Status {
  ONLINE = "online",
  OFFLINE = "offline",
}
export enum MeetingStatus {
  active = "ACTIVE",
  inactive = "INACTIVE ",
}
const apiString = `
${import.meta.env.VITE_DYTE_ORG_ID}:${import.meta.env.VITE_DYTE_API_KEY}
`;
export const encodedApiKey = btoa(apiString);
