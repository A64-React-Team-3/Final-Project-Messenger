import { NotificationStatus } from "../common/constants";

export type TeamInviteModel = {
  from: string;
  to: string;
  teamId: string;
  createdOn: number;
  status: NotificationStatus;
};