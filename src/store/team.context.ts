import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { TeamModel } from "../models/Team/TeamModel";

interface TeamAppContextType {
  team: TeamModel | null;
  setTeam: Dispatch<SetStateAction<TeamModel | null>>;
}

export const TeamAppContext = createContext<TeamAppContextType>({
  team: null,
  setTeam: () => {},
});
