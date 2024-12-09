import { get, push, ref, update } from "firebase/database";
import { db } from "../config/firebase-config";
import { MeetingParticipantModel } from "../models/MeetingParticipantModel";
import { encodedApiKey } from "../common/constants";
import { MeetingModel } from "../models/MeetingModel";

const checkForActiveMeeting = async (teamId: string): Promise<boolean> => {
  const teamActiveMeetingRef = ref(db, `teams/${teamId}/activeMeeting`);

  try {
    const snapshot = await get(teamActiveMeetingRef);
    if (snapshot.exists()) {
      console.log("Active meeting exists:", snapshot.val());
      return true;
    } else {
      console.log("No active meeting found.");
      return false;
    }
  } catch (error) {
    console.error("Error checking active meeting:", error);
    return false;
  }
};
export type createMeetingProps = {
  meetingName: string;
  teamId: string;
  participant: MeetingParticipantModel;
};
export const createMeeting = async ({
  meetingName,
  teamId,
  participant,
}: createMeetingProps): Promise<string | null> => {
  const url = "https://api.dyte.io/v2/meetings";
  console.log("encodedApiKey", encodedApiKey);
  console.log("meetingName", meetingName);
  const check = await checkForActiveMeeting(teamId);
  console.log("check", check);

  if (!check) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${encodedApiKey}`,
        },
        body: JSON.stringify({
          title: `${meetingName}`,
          preferred_region: "eu-central-1",
          record_on_start: false,
          live_stream_on_start: false,
          recording_config: {
            max_seconds: 60,
            file_name_prefix: `rec_${meetingName}_`,
            video_config: {
              codec: "H264",
              width: 1280,
              height: 720,
              watermark: {
                url: "https://firebasestorage.googleapis.com/v0/b/final-project-messenger-7b4c2.firebasestorage.app/o/avatars%2Fcommunity.png?alt=media&token=b878f52c-d4a3-483d-996a-4196a2fc3bd4",
                size: { width: 1, height: 1 },
                position: "left top",
              },
              export_file: true,
            },
            audio_config: {
              codec: "AAC",
              channel: "stereo",
              export_file: true,
            },
            storage_config: {
              type: "aws",
              access_key: "string",
              secret: "string",
              bucket: "string",
              region: "us-east-1",
              path: "string",
              auth_method: "KEY",
              username: "string",
              password: "string",
              host: "string",
              port: 0,
              private_key: "string",
            },
            dyte_bucket_config: {
              enabled: true,
            },
          },
          ai_config: {
            transcription: {
              keywords: ["string"],
              language: "en-US",
              profanity_filter: false,
            },
            summarization: {
              word_limit: 500,
              text_format: "markdown",
              summary_type: "general",
            },
          },
          persist_chat: false,
          summarize_on_end: false,
        }),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      console.log("Meeting created successfully:", data);
      console.log("Meeting id:", data.data.id);
      const meeting = {
        meetingId: data.data.id,
        name: data.data.title,
        createdOn: data.data.created_at,
        status: data.data.status,
      };

      try {
        const result = await push(ref(db, `meetings/`), meeting);
        const id = result.key || "String";
        const activeTeamMeeting = {
          id: id,
          meetingId: data.data.id,
        };
        await update(ref(db), { [`meetings/${id}/id`]: id });
        await update(ref(db), {
          [`teams/${teamId}/activeMeeting`]: activeTeamMeeting,
        });
        try {
          const authTokenRes = await addParticipant(
            id,
            data.data.id,
            participant
          );
          //add to team activeMeeting
          const updatedParticipant = await get(
            ref(db, `meetings/${id}/participants/${participant.username}`)
          );
          console.log("updatedParticipant", updatedParticipant.val());
          await update(ref(db), {
            [`teams/${teamId}/activeMeeting/participants`]:
              updatedParticipant.val(),
          });
          return authTokenRes;
        } catch (error) {
          console.error("Failed to add participant to meeting:", error);
          return null;
        }
      } catch (error) {
        console.error("Error adding meeting to database", error);
        return null;
      }
    } catch (error) {
      console.error("Failed to create meeting:", error);
      return null;
    }
  } else {
    console.log("Active meeting already exists in", meetingName);
    const teamActiveMeetingRef = ref(db, `teams/${teamId}/activeMeeting`);
    const meeting = await get(teamActiveMeetingRef);
    try {
      if (meeting) {
        const authTokenRes = await addParticipant(
          meeting.val().id,
          meeting.val().meetingId,
          participant
        );
        return authTokenRes;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to add participant to meeting:", error);
      return null;
    }
  }
};
const addParticipant = async (
  meetingId: string,
  dyteMeetingId: string,
  participant: MeetingParticipantModel
): Promise<string | null> => {
  const url = `https://api.dyte.io/v2/meetings/${dyteMeetingId}/participants`;
  const body = {
    name: participant.name,
    picture: participant.pictureUrl,
    preset_name: "new",
    custom_participant_id: participant.username,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${encodedApiKey}`,
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);
    const participantData = await response.json();
    console.log("participantData", participantData);
    const transformedData = {
      username: participant.username,
      customParticipantId: participantData.data.id,
      name: participant.name,
      pictureUrl: participant.pictureUrl,
      createdAt: participantData.data.created_at,
      token: participantData.data.token,
    } as MeetingParticipantModel;
    console.log("transformedData", transformedData);

    try {
      await push(
        ref(db, `meetings/${meetingId}/participants/${participant.username}`),
        transformedData
      );
      return participantData.data.token;
    } catch (error) {
      console.error("Error adding participant to meeting in database", error);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMeetingById = async (
  id: string
): Promise<MeetingModel | null> => {
  try {
    const result = await get(ref(db, `meetings/${id}`));
    return result.val() as MeetingModel;
  } catch (error) {
    console.error("Error getting meeting: ", error);
    return null;
  }
};
