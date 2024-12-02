import { push, ref, update } from "firebase/database";
import { UserModel } from "../models/UserModel";
import { db } from "../config/firebase-config";

type CreateTeamProps = {
  user: UserModel;
  teamName: string;
  privacy: "public" | "private";
  avatarUrl: string | null;
};
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
    members: [{ [user.username]: user.uid, role: "owner" }],
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
