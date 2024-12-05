import { Dispatch, SetStateAction } from "react";
import { ChannelModel } from "../../models/ChannelModel";
import { FaRocketchat } from "react-icons/fa";
import { MdOutlineVoiceChat } from "react-icons/md";
type TeamSideBarProps = {
  setChannel: Dispatch<SetStateAction<ChannelModel | null>>;
  teamChannels: ChannelModel[];
};

const TeamSideBar: React.FC<TeamSideBarProps> = ({
  setChannel,
  teamChannels,
}): JSX.Element => {
  return (
    <div className="border-base-300 flex-col justify-center px-4 bg-base-100 h-full w-60 ">
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title z-0 text-xl font-medium">
          Text Channels
        </div>
        <div className="collapse-content">
          {teamChannels.map((channel, idx) => (
            <div key={channel?.id}>
              <div className="flex flex-row">
                <button
                  onClick={() => setChannel(channel)}
                  className="btn btn-ghost btn-sm items-center"
                >
                  <span className="icon">
                    <FaRocketchat />
                  </span>
                  <span>{channel.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Voice Channel</div>
        <div className="collapse-content flex flex-row">
          <button className="btn btn-sm btn-outline btn-primary  text-sm hover:bg-gray-700 mb-3">
            <span className="mr-2 text-lg">
              <MdOutlineVoiceChat className="text-secondary" />
            </span>
            Audio/Video Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamSideBar;
