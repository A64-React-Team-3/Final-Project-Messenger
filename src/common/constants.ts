// Regular expressions for email, username and password validation
export const validEmailRegex = RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
export const validUsernameRegex = RegExp(/^[a-zA-Z0-9._%+-]{5,35}$/);
export const validPasswordRegex = RegExp(/^[a-zA-Z0-9._%+-]{6,15}$/);

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
  CUPCAKE = 'cupcake',
  SYNTHWAVE = 'synthwave',
  EMERALD = 'emerald',
  CORPORATE = 'corporate',
  FOREST = 'forest',
}

//default team image
export const defaultTeamImgUrl =
  " https://firebasestorage.googleapis.com/v0/b/final-project-messenger-7b4c2.firebasestorage.app/o/avatars%2Fcommunity.png?alt=media&token=b878f52c-d4a3-483d-996a-4196a2fc3bd4";

export const reactionEmoji = ["👍", "❤️", "😂", "😢", "😲"];

export enum Status {
  ONLINE = "online",
  IDLE = "idle",
  OFFLINE = "offline",
}
