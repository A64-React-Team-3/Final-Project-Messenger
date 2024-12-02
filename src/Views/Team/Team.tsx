import { useContext, useEffect } from "react";
import TeamNavBar from "../../components/TeamNavBar/TeamNavBar";
import TeamSideBar from "../../components/TeamSideBar/TeamSideBar";
import { useState } from "react";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { transformChannels } from "../../helper/helper";
import Channel from "../Channel/Channel";
import { ChannelModel } from "../../models/ChannelModel";
import { TeamAppContext } from "../../store/team.context";

const Team: React.FC = (): JSX.Element => {
  const [channels, setChannels] = useState<ChannelModel[]>([]);
  const [channel, setChannel] = useState<ChannelModel | null>(null);
  const { team, setTeam } = useContext(TeamAppContext);
  useEffect(() => {
    const channelsRef = ref(db, "channels/");
    get(channelsRef)
      .then(channelsSnapshot => {
        if (channelsSnapshot.exists()) {
          const unsubscribe = onValue(channelsRef, snapshot => {
            const transformedData = transformChannels(snapshot);
            if (transformedData) {
              setChannels(transformedData);
            }
          });

          return () => unsubscribe();
        }
      })
      .catch(error => {
        console.error("Error getting channels", error);
      });
  }, []);

  return (
    <div className="border-base-200 bg-base-300 flex-col justify-center w-full ">
      <TeamNavBar channelName={channel?.name} />
      <div className="flex w-full h-[calc(100vh-4rem)]">
        {team?.channels ? (
          <TeamSideBar channels={team?.channels} setChannel={setChannel} />
        ) : (
          <TeamSideBar channels={channels} setChannel={setChannel} />
        )}
        <Channel channel={channel} />
      </div>
    </div>
  );
};

export default Team;
