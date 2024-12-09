import { MeetingParticipantModel } from "../../models/MeetingParticipantModel";
import { useContext, useEffect, useState } from "react";
import { useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { DyteAppContext } from "../../store/Dyte/dyte.context";
type MeetingProps = {
  roomJoined: boolean;
  meetName: string;
  token: string;
  participants: MeetingParticipantModel[];
};

const Meeting: React.FC<MeetingProps> = ({
  roomJoined,
  meetName,
  token,
  participants,
}): JSX.Element => {
  const { meeting } = useDyteMeeting();
  const messages = useDyteSelector(meeting => meeting.chat.messages);
  const activeParticipants = useDyteSelector(
    meeting => meeting.participants.active
  );
  //   console.log("messages", messages);
  //   console.log("activeParticipants", activeParticipants);
  console.log("roomJoined", roomJoined);
  //   useEffect(() => {
  //     meeting.self.on("roomLeft", () => {
  //       alert("You've left the room");
  //     });
  //     meeting.self.on("roomJoined", () => {
  //       alert("You've joined the room");
  //     });
  //   }, [meeting]);
  //   useEffect(() => {
  //     if (authToken !== "") {
  //       roomJoined === false;
  //     }
  //   }, [authToken]);
  return (
    <>
      <div style={{ height: "720px", position: "absolute" }}>
        <DyteMeeting mode="fill" meeting={meeting} />
      </div>
    </>
  );
};

export default Meeting;
