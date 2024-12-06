import { get, push, ref, update } from "firebase/database";
import { UserModel } from "../models/UserModel";
import { db } from "../config/firebase-config";
import { TeamModel } from "../models/Team/TeamModel";

export const createTeam = async (
  user: UserModel,
  teamName: string,
  privacy: "public" | "private",
  avatarUrl: string | null
): Promise<void> => {
  if (!user) {
    console.error("User is not authenticated");
    return;
  }
  console.log("user", user);
  console.log("teamName", teamName);
  console.log("privacy", privacy);
  console.log("avatarUrl", avatarUrl);

  const team = {
    name: teamName,
    privacy: privacy,
    avatarUrl: avatarUrl || null,
    creator: { id: user.uid, username: user.username },
    members: { [user.username]: "owner" },
    createdOn: Date.now(),
  };
  console.log("team", team);
  try {
    const result = await push(ref(db, `teams/`), team);
    const id = result.key;
    await update(ref(db), { [`teams/${id}/id`]: id });
  } catch (error) {
    console.error("Error creating team (service fn): ", error);
  }
};

export const getTeams = async (): Promise<TeamModel[] | null> => {
  const teamsRef = ref(db, "teams/");
  try {
    const teams = await get(teamsRef);
    if (teams.exists()) {
      const data = teams.val();
      return Object.values(data);
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    console.error("Error getting teams: ", error);
    return null;
  }
};
export const getTeamById = async (
  teamId: string
): Promise<TeamModel | null> => {
  const teamsRef = ref(db, `teams/${teamId}`);
  try {
    const teams = await get(teamsRef);
    if (teams.exists()) {
      const data = teams.val();
      return data;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    console.error("Error getting team: ", error);
    return null;
  }
};
