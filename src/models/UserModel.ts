import { Status } from "../common/constants";
import { FriendModel } from "./User/FriendModel";
import { UserChannel } from "./User/UserChannel";
import { UserTeam } from "./User/UserTeam";

export type UserModel = {
  email: string;
  uid: string;
  username: string;
  displayName: string;
  createdOn: number;
  teams?: UserTeam[];
  channels?: UserChannel[];
  friends?: FriendModel[];
  blocked?: FriendModel[];
  avatarUrl?: string;
  status: Status;
};
