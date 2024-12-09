import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

interface DyteAppContextType {
  authToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
}

export const DyteAppContext = createContext<DyteAppContextType>({
  authToken: "",
  setAuthToken: () => {},
});
