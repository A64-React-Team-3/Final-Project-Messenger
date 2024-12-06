export type TeamJoinRequestModel = {
  username: string;
  status: "pending" | "accepted" | "rejected";
};
