export type FriendRequestModel = {
  from: string;
  to: string;
  createdOn: number;
  status: "pending" | "accepted" | "rejected";
};