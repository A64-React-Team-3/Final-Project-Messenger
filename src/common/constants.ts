// Regular expressions for email, username and password validation
export const validEmailRegex = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
export const validUsernameRegex = RegExp(/^[a-zA-Z0-9._%+-]{5,35}$/);
export const validPasswordRegex = RegExp(/^[a-zA-Z0-9._%+-]{5,15}$/);