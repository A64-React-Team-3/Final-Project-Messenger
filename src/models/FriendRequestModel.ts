import { NotificationStatus } from "../common/constants";

export type FriendRequestModel = {
  from: string;
  fromAvatarUrl?: string;
  to: string;
  toAvatarUrl?: string;
  createdOn: number;
  status: NotificationStatus;
};