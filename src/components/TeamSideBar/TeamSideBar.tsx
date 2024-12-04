import { Dispatch, SetStateAction } from "react";
import { ChannelModel } from "../../models/ChannelModel";
import { TeamChannelModel } from "../../models/Team/TeamChannelModel";

type TeamSideBarProps = {
  // channels: ChannelModel[] | TeamChannelModel[];
  channels: any[];
  // setChannel: Dispatch<SetStateAction<ChannelModel | TeamChannelModel | null>>;
  setChannel: any;
};

const TeamSideBar: React.FC<TeamSideBarProps> = ({
  channels,
  setChannel,
}): JSX.Element => {
  return (
    <div className="border-base-300 flex-col justify-center px-4 bg-slate-600 text-slate-50 h-full w-60">
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title z-0 text-xl font-medium">
          Text Channels
        </div>
        <div className="collapse-content">
          {channels.map((channel, idx) => (
            <div key={channel.id}>
              <a
                onClick={() => setChannel(channel)}
                key={idx}
                className="text-sm"
              >
                {channel.name}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Voice Channels</div>
        <div className="collapse-content">
          <p>Channel 1</p>
          <p>Channel 2</p>
          <p>Channel 3</p>
          <p>Channel 4</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSideBar;
