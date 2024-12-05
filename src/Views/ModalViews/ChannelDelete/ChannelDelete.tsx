import React, { useContext } from "react";
import { ChannelModel } from "../../../models/ChannelModel";
import { deleteChannel } from "../../../services/channel.service";
import { TeamAppContext } from "../../../store/team.context";


type ChannelDeleteProps = {
  currentChannel: ChannelModel | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChannelDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChannelDelete: React.FC<ChannelDeleteProps> = ({ currentChannel, setIsModalOpen, setIsChannelDeleting }): JSX.Element => {
  const { team } = useContext(TeamAppContext);

  const handleDeleteChannel = () => {
    if (currentChannel?.id && team?.teamId) {
      deleteChannel(currentChannel.id, team.teamId);
      setIsChannelDeleting(preValue => !preValue);
      setIsModalOpen(false);
    } else {
      console.error("No channel id and team id found");
    }
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">Delete Channel</p>
      <p className="font-bold text-red-600">Are you sure you want to delete this Channel?</p>
      <div className="flex w-full justify-between mt-2">
        <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Cancel</button>
        <button className="btn btn-error" onClick={handleDeleteChannel}>Delete</button>
      </div>
    </div>
  );
}

export default ChannelDelete;