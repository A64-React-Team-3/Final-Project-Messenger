import { MeetingStatus } from "../common/constants";
import { MeetingParticipantModel } from "./MeetingParticipantModel";

export type MeetingModel = {
  id: string;
  meetingId: string;
  name: string;
  createdAt: string;
  status: MeetingStatus;
  participants?: MeetingParticipantModel[];
};
