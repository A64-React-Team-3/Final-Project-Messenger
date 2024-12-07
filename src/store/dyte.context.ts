import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

interface DyteAppContextType {
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
}

export const DyteAppContext = createContext<DyteAppContextType>({
  authToken: null,
  setAuthToken: () => {},
});
