import { useContext, useEffect } from "react";
import TeamNavBar from "../../components/TeamNavBar/TeamNavBar";
import TeamSideBar from "../../components/TeamSideBar/TeamSideBar";
import { useState } from "react";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import Channel from "../Channel/Channel";
import { ChannelModel } from "../../models/ChannelModel";
import { TeamAppContext } from "../../store/team.context";
import { getChannelsByIds } from "../../services/channel.service";
import { transformChannelFromSnapshotVal } from "../../helper/helper";

const Team: React.FC = (): JSX.Element => {
  const [teamChannels, setTeamChannels] = useState<ChannelModel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChannelModel | null>(null);
  const { team } = useContext(TeamAppContext);

  useEffect(() => {
    const teamChannelsRef = ref(db, `teams/${team?.teamId}/channels`);
    get(teamChannelsRef)
      .then((_snapshot) => {
        const unsubscribe = onValue(teamChannelsRef, (snapshot) => {
          if (snapshot.exists()) {
            const channelsData = Object.keys(snapshot.val());
            getChannelsByIds(channelsData).then((channels) => {
              setTeamChannels(transformChannelFromSnapshotVal(channels));
            });
          } else {
            setTeamChannels([]);
          }
        });

        return () => unsubscribe;
      })
      .catch((error) => {
        console.error("Error getting channels", error);
      });

  }, [team]);

  useEffect(() => {
    if (teamChannels.length > 0) {
      setCurrentChannel(teamChannels[0]);
    } else {
      setCurrentChannel(null);
    }

  }, [team?.teamId]);


  return (
    <div className="border-base-200 bg-base-300 flex-col justify-center w-full ">
      <TeamNavBar channelName={currentChannel?.name} />
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <TeamSideBar setChannel={setCurrentChannel} teamChannels={teamChannels} />
        <Channel channel={currentChannel} />
      </div>
    </div>
  );
};

export default Team;
