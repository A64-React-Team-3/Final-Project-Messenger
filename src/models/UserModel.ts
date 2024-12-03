import { FriendModel } from "./User/FriendModel";
import { UserChannel } from "./User/UserChannel";
import { UserTeam } from "./User/UserTeam";

export type UserModel = {
  email: string;
  uid: string;
  username: string;
  displayName: string;
  createdOn: number;
  teams: UserTeam[] | null;
  channels: UserChannel[] | null;
  friends: FriendModel[] | null;
  blocked: FriendModel[] | null;
  avatarUrl: string | null;
  status: "online" | "idle" | "offline";
};
