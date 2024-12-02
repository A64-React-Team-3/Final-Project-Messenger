import React, { useState, useEffect } from "react";
import { TeamAppContext } from "./team.context";
import { getTeamById } from "../services/team.service";
import { TeamModel } from "../models/Team/TeamModel";
interface TeamAppProviderProps {
  children: React.ReactNode;
}

export const TeamAppProvider: React.FC<TeamAppProviderProps> = ({
  children,
}) => {
  const [team, setTeam] = useState<TeamModel | null>(null);
  return (
    <TeamAppContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamAppContext.Provider>
  );
};
