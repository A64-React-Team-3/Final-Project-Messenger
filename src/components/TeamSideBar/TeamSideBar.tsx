import { Dispatch, SetStateAction, useEffect } from "react";
import { ChannelModel } from "../../models/ChannelModel";
import { useState } from "react";
import { TeamModel } from "../../models/Team/TeamModel";
import { get, ref, onValue, DataSnapshot, set } from "firebase/database";
import { db } from "../../config/firebase-config";
import { getChannelsByIds } from "../../services/channel.service";
import { transformChannelFromSnapshotVal } from "../../helper/helper";
import { FaRocketchat } from "react-icons/fa6";
import { MdOutlineVoiceChat } from "react-icons/md";

type TeamSideBarProps = {
  team: TeamModel | null;
  setChannel: Dispatch<SetStateAction<ChannelModel | null>>;
};

const TeamSideBar: React.FC<TeamSideBarProps> = ({
  team,
  setChannel,
}): JSX.Element => {
  const [channels, setChannels] = useState<ChannelModel[]>([]);

  useEffect(() => {
    const teamChannelsRef = ref(db, `teams/${team?.teamId}/channels`);
    get(teamChannelsRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const unsubscribe = onValue(teamChannelsRef, snapshot => {
            const channelsData = Object.keys(snapshot.val());
            getChannelsByIds(channelsData).then(channels => {
              setChannels(transformChannelFromSnapshotVal(channels));
            });
          });

          return () => unsubscribe();
        } else {
          setChannels([]);
        }
      })
      .catch(error => {
        console.error("Error getting channels", error);
      });
  }, [team]);

  return (
    <div className="border-base-300 flex-col justify-center px-4 bg-slate-600 text-slate-50 h-full w-60 ">
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title z-0 text-xl font-medium">
          Text Channels
        </div>
        <div className="collapse-content">
          {channels.map((channel, idx) => (
            <div key={channel?.id}>
              <button
                onClick={() => setChannel(channel ? channel : null)}
                key={idx}
                className="btn btn-sm btn-outline btn-primary  text-sm hover:bg-gray-700 mb-3"
              >
                <span className="mr-2 text-lg">
                  <FaRocketchat className="text-secondary" />
                </span>
                {channel?.name}
              </button>
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
