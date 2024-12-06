// Regular expressions for email, username and password validation
export const validEmailRegex = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
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