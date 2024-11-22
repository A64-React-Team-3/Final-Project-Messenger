import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
export interface User {
  email: string | null;
  uid: string | null;
  userData: {
    username: string | null;
    displayName: string | null;
    createdOn: string | null;
    email: string | null;
    uid: string | null;
  } | null;
}
interface UserAppContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserAppContext = createContext<UserAppContextType>({
  user: null,
  setUser: () => {},
});
