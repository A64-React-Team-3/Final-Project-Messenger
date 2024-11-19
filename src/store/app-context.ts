import { createContext } from "react";


export const UserAppContext = createContext({
  user: null,
  userData: null,
  setUserAppState: () => { },
});