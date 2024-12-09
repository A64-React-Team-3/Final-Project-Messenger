import { MeetingParticipantModel } from "../../models/MeetingParticipantModel";
import React, { useContext, useEffect, useState } from "react";
import { useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import Meeting from "../Meeting/Meeting";
import { DyteAppContext } from "../../store/Dyte/dyte.context";
import { toast } from "react-toastify";
type MeetingRoomProps = {
  meetName: string;
  token: string;
  participants: MeetingParticipantModel[];
};

const MeetingRoom: React.FC<MeetingRoomProps> = ({
  meetName,
  token,
  participants,
}): JSX.Element => {
  const { meeting } = useDyteMeeting();
  const roomJoined = useDyteSelector(meeting => meeting.self.roomJoined);
  const { authToken } = useContext(DyteAppContext);
  console.log("participants", participants);
  console.log("participants", Object.values(participants));
  const messages = useDyteSelector(meeting => meeting.chat.messages);
  const activeParticipants = useDyteSelector(
    meeting => meeting.participants.active
  );
  console.log("messages", messages);
  console.log("activeParticipants", activeParticipants);
  console.log("roomJoined", roomJoined);
  useEffect(() => {
    meeting.self.on("roomLeft", () => {
      toast.info("You've left the room");
    });
    meeting.self.on("roomJoined", () => {
      toast.info("You've joined the room");
    });
  }, [meeting]);
  useEffect(() => {
    if (authToken === "" && !roomJoined) {
      meeting.leaveRoom();
    }
  }, [authToken, roomJoined, meeting]);
  return (
    <Meeting
      roomJoined={roomJoined}
      meetName={meetName}
      token={token}
      participants={participants}
    ></Meeting>
  );
};

export default MeetingRoom;
