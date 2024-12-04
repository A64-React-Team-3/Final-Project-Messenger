import { useContext, useEffect } from "react";
import TeamNavBar from "../../components/TeamNavBar/TeamNavBar";
import TeamSideBar from "../../components/TeamSideBar/TeamSideBar";
import { useState } from "react";
import { DataSnapshot, get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { transformChannels } from "../../helper/helper";
import Channel from "../Channel/Channel";
import { ChannelModel } from "../../models/ChannelModel";
import { TeamAppContext } from "../../store/team.context";
import { getChannelsByIds } from "../../services/channel.service";

const Team: React.FC = (): JSX.Element => {
  const [allChannels, setAllChannels] = useState<ChannelModel[]>([]);
  const [teamChannels, setTeamChannels] = useState<(ChannelModel | undefined)[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChannelModel | null>(null);
  const { team } = useContext(TeamAppContext);
  useEffect(() => {
    const channelsRef = ref(db, `channels/`);
    get(channelsRef)
      .then(channelsSnapshot => {
        if (channelsSnapshot.exists()) {
          const unsubscribe = onValue(channelsRef, snapshot => {
            const transformedData = transformChannels(snapshot);
            if (transformedData) {
              setAllChannels(transformedData);
            }
          });

          return () => unsubscribe();
        }
      })
      .catch(error => {
        console.error("Error getting channels", error);
      });
  }, []);

  useEffect(() => {
    if (team?.channels) {
      const filteredChannels = team?.channels.map((channelId) => {
        return allChannels.find((channel: ChannelModel) => channel.id === channelId);
      });
      if (filteredChannels) {
        setTeamChannels(filteredChannels);
      }
    }
  }, [team]);


  return (
    <div className="border-base-200 bg-base-300 flex-col justify-center w-full ">
      <TeamNavBar channelName={currentChannel?.name} />
      <div className="flex w-full h-[calc(100vh-4rem)]">
        {team?.channels ? (
          <TeamSideBar channels={teamChannels} setChannel={setCurrentChannel} />
        ) : (
          <TeamSideBar channels={allChannels} setChannel={setCurrentChannel} />
        )}
        <Channel channel={currentChannel} />
      </div>
    </div>
  );
};

export default Team;
