export type TeamRequestModel = {
  from: string;
  to: string;
  teamId: string;
  createdOn: number;
  status: "pending" | "accepted" | "rejected";
};