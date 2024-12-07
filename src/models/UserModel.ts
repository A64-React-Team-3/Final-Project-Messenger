import { Status } from "../common/constants";
import { FriendModel } from "./User/FriendModel";
import { UserChannel } from "./User/UserChannel";
import { UserTeam } from "./User/UserTeam";
import { NotificationModel } from "./NotificationModel";

export type UserModel = {
  email: string;
  uid: string;
  username: string;
  displayName: string;
  createdOn: number;
  phoneNumber?: string;
  teams?: UserTeam[];
  channels?: UserChannel[];
  friends?: FriendModel[];
  blocked?: FriendModel[];
  avatarUrl?: string;
  notifications?: NotificationModel[];
  status: Status;
};
