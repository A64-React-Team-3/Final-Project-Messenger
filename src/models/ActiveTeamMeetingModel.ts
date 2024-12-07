import { MeetingParticipantModel } from "./MeetingParticipantModel";

export type ActiveTeamMeetingModel = {
  id: string;
  meetingId: string;
  participants?: MeetingParticipantModel[];
};
