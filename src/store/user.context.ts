import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { UserModel } from "../models/UserModel";
interface UserAppContextType {
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<UserModel | null>>;
  loading: boolean;
  // error: string | null;
}

export const UserAppContext = createContext<UserAppContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  // error: null,
});
