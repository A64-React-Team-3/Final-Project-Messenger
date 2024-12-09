import { get, push, ref, update } from "firebase/database";
import { UserModel } from "../models/UserModel";
import { db } from "../config/firebase-config";
import { TeamModel } from "../models/Team/TeamModel";
import { toast } from "react-toastify";
import { TeamMemberModel } from "../models/Team/TeamMemberModel";
import { UserTeam } from "../models/User/UserTeam";

export const createTeam = async (
  user: UserModel,
  teamName: string,
  privacy: "public" | "private",
  avatarUrl: string | null
): Promise<void> => {
  if (!user) {
    console.error("User is not authenticated");
    toast.error("User is not authenticated");
    return;
  }

  const teamMember: TeamMemberModel = {
    username: user.username,
    role: "owner",
  };

  const team = {
    name: teamName,
    privacy: privacy,
    avatarUrl: avatarUrl || null,
    creator: { id: user.uid, username: user.username },
    members: { [user.username]: teamMember },
    createdOn: Date.now(),
  };

  try {
    const result = await push(ref(db, `teams/`), team);
    const id = result.key;

    const userTeam: UserTeam = {
      teamId: id,
      teamName: teamName,
      teamAvatarUrl: avatarUrl || null,
    }

    await update(ref(db), { [`teams/${id}/id`]: id });
    await update(ref(db), { [`users/${user.username}/teams/${id}`]: userTeam });
  } catch (error) {
    console.error("Error creating team (service fn): ", error);
    toast.error("Error creating team");
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
    toast.error("Error getting teams ");
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
    toast.error("Error getting team");
    return null;
  }
};

export const inviteToTeam = async (
  username: string,
  teamId: string
): Promise<void> => {
  try {
    await update(ref(db), {
      [`teams/${teamId}/members/${username}`]: "member",
    });
  } catch (error) {
    console.error("Error inviting the user to team", error);
    toast.error("Error inviting the user to team");
  }
  try {
    await update(ref(db), {
      [`users/${username}/teams/${teamId}`]: true,
    });
  } catch (error) {
    console.error("Error inviting the user to team", error);
    toast.error("Error inviting the user to team");
  }
};
