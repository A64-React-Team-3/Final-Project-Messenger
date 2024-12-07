export type TeamInviteModel = {
  from: string;
  to: string;
  teamId: string;
  createdOn: number;
  status: "pending" | "accepted" | "rejected";
};