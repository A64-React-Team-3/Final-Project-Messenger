// Regular expressions for email, username and password validation
export const validEmailRegex = RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
export const validUsernameRegex = RegExp(/^[a-zA-Z0-9._%+-]{5,35}$/);
export const validPasswordRegex = RegExp(/^[a-zA-Z0-9._%+-]{6,15}$/);
//default team image
export const defaultTeamImgUrl =
  "https://firebasestorage.googleapis.com/v0/b/final-project-messenger-7b4c2.firebasestorage.app/o/avatars%2Fcommunity.png?alt=media&token=5397e237-077b-4a01-996f-bd5aaf9851a7";



export const reactionEmoji = [
  "👍",
  "❤️",
  "😂",
  "😢",
  "😲"
]