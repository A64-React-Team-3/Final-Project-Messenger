import { ActiveTeamMeetingModel } from "../ActiveTeamMeetingModel";
import { TeamChannelModel } from "./TeamChannelModel";
import { TeamJoinRequestModel } from "./TeamJoinRequestModel";
import { TeamMemberModel } from "./TeamMemberModel";

export type TeamModel = {
  teamId: string;
  name: string;
  creator: string;
  createdOn: number;
  private: boolean;
  members: Partial<TeamMemberModel>[];
  channels?: string[];
  joinRequests?: TeamJoinRequestModel[];
  avatarUrl?: string;
  activeMeeting?: ActiveTeamMeetingModel;
};
