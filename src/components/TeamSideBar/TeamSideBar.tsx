import { Dispatch, SetStateAction, useEffect } from "react";
import { ChannelModel } from "../../models/ChannelModel";
import { useState } from "react";
import { TeamModel } from "../../models/Team/TeamModel";
import { get, ref, onValue, DataSnapshot, set } from "firebase/database";
import { db } from "../../config/firebase-config";
import { getChannelsByIds } from "../../services/channel.service";
import { transformChannelFromSnapshotVal } from "../../helper/helper";


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
      .then((snapshot) => {
        if (snapshot.exists()) {
          const unsubscribe = onValue(teamChannelsRef, (snapshot) => {
            const channelsData = Object.keys(snapshot.val());
            getChannelsByIds(channelsData).then((channels) => {
              setChannels(transformChannelFromSnapshotVal(channels));
            });
          });

          return () => unsubscribe();
        } else {
          setChannels([]);
        }
      })
      .catch((error) => {
        console.error("Error getting channels", error);
      });

  }, [team]);

  return (
    <div className="border-base-300 flex-col justify-center px-4 bg-slate-600 text-slate-50 h-full w-60 ">
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title z-0 text-xl font-medium">
          Text Channels
        </div>
        <div className="collapse-content">
          {channels.map((channel, idx) => (
            <div key={channel?.id}>
              <a
                onClick={() => setChannel(channel ? channel : null)}
                key={idx}
                className="text-sm"
              >
                {channel?.name}
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
