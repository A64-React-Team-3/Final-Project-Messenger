import { FriendRequestModel } from "./FriendRequestModel";
import { TeamRequestModel } from "./TeamRequestModel";

export type NotificationModel = {
  type: "friendRequest" | "teamRequest" | "teamInvite" | "message";
  friendRequest?: FriendRequestModel;
  teamRequest?: TeamRequestModel;
  teamInvite?: TeamRequestModel;
};