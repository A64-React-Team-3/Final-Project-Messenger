import { TeamChannelModel } from "./TeamChannelModel";
import { TeamJoinRequestModel } from "./TeamJoinRequestModel";
import { TeamMemberModel } from "./TeamMemberModel";

export type TeamModel = {
  teamId: string;
  name: string;
  creator: string;
  createdOn: number;
  private: boolean;
  members: string[];
  channels?: string[];
  avatarUrl?: string;
};
