import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { User } from "../models/user";
interface UserAppContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  // error: string | null;
}

export const UserAppContext = createContext<UserAppContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  // error: null,
});
