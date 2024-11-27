import React, { useContext, useEffect, useState } from 'react';
import { UserAppContext } from '../../../store/app-context';
import { createChannel } from '../../../services/channel.service';



const CreateChannel: React.FC = (): JSX.Element => {
  const [isChannelPrivate, setIsChannelPrivate] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [teamId, setTeamId] = useState('personal');
  const { user } = useContext(UserAppContext);

  const updateChannelName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value);
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChannelPrivate(event.target.value === 'private');
  };

  const handleCreateChannel = async () => {
    if (channelName.length === 0) {
      alert('Channel name cannot be empty');
      return;
    }
    try {
      await createChannel(user, channelName, isChannelPrivate, teamId);
    } catch (error) {
      console.error("Error creating channel", error);
    }
  }


  return (
    <div>
      <div>
        <label className="label">Channel Name</label>
        <input value={channelName} onChange={updateChannelName} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Private</span>
          <input value="private" type="radio" name="radio-10" className="radio checked:bg-red-500" checked={isChannelPrivate}
            onChange={handleRadioChange} />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Public</span>
          <input value="public" type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={!isChannelPrivate}
            onChange={handleRadioChange} />
        </label>
      </div>
      <div>
        <button onClick={handleCreateChannel} className="btn btn-primary">Create Channel</button>
      </div>

    </div>
  );
};

export default CreateChannel;