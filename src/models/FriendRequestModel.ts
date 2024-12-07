import { NotificationStatus } from "../common/constants";

export type FriendRequestModel = {
  from: string;
  to: string;
  createdOn: number;
  status: NotificationStatus;
};