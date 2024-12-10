import { NotificationType } from "../common/constants";
import { FriendRequestModel } from "./FriendRequestModel";
import { TeamRequestModel } from "./TeamRequestModel";

export type NotificationModel = {
  id?: string;
  type: NotificationType;
  friendRequest?: FriendRequestModel;
  teamRequest?: TeamRequestModel;
  teamInvite?: TeamRequestModel;
};