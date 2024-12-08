import { NotificationStatus } from "../common/constants";

export type TeamRequestModel = {
  from: string;
  fromAvatarUrl: string;
  to: string;
  teamId: string;
  teamName: string;
  teamAvatarUrl: string;
  createdOn: number;
  status: NotificationStatus;
};