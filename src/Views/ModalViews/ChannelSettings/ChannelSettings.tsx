import React, { useEffect, useRef } from "react";
import { ChannelModel } from "../../../models/ChannelModel";
import { useState } from "react";
import { updateChannel } from "../../../services/channel.service";


type ChannelSettingsProps = {
  currentChannel: ChannelModel | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsChannelEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChannelSettings: React.FC<ChannelSettingsProps> = ({ currentChannel, setIsModalOpen, isModalOpen, setIsChannelEditing }): JSX.Element => {
  const [isChannelPrivate, setIsChannelPrivate] = useState(false);
  const [channelName, setChannelName] = useState<string>(currentChannel?.name || "");

  const handlePrivacySwitch = () => {
    setIsChannelPrivate(!isChannelPrivate);
  }

  const handleSave = () => {
    if (currentChannel?.id) {
      updateChannel(currentChannel.id, channelName, isChannelPrivate);
      setIsChannelEditing(preValue => !preValue);
      setIsModalOpen(false);
    } else {
      console.error("No channel id found");
    }
  }


  useEffect(() => {
    if (isModalOpen) {
      setChannelName(currentChannel?.name || "");
    }
  }, [isModalOpen]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p>Edit name and privacy</p>
      </div>
      <div className="w-full mb-4">
        <label className="label">Change channel Name:</label>
        <div className="flex justify-between w-full">
          <input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-sm w-full "
          />
        </div>
      </div>
      <div className="w-full mb-4">
        <p>Channel Privacy:</p>
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">public</span>
            <input type="checkbox" className="toggle toggle-secondary" onChange={handlePrivacySwitch} checked={isChannelPrivate} />
            <span className="label-text">private</span>
          </label>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <button className="btn btn-sm btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-sm btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default ChannelSettings;