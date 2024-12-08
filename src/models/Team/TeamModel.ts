import { TeamChannelModel } from "./TeamChannelModel";
import { TeamJoinRequestModel } from "./TeamJoinRequestModel";
import { TeamMemberModel } from "./TeamMemberModel";

export type TeamModel = {
  teamId: string;
  name: string;
  creator: string;
  createdOn: number;
  private: boolean;
  members: TeamMemberModel[];
  channels?: string[];
  avatarUrl?: string;
};
