import { NotificationStatus } from "../common/constants";

export type TeamRequestModel = {
  from: string;
  to: string;
  teamId: string;
  createdOn: number;
  status: NotificationStatus;
};