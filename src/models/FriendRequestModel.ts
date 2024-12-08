import { NotificationStatus } from "../common/constants";

export type FriendRequestModel = {
  from: string;
  fromAvatarUrl?: string;
  to: string;
  createdOn: number;
  status: NotificationStatus;
};