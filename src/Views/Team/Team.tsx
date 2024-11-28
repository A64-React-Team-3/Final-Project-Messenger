import { useEffect } from "react";
import TeamNavBar from "../../components/TeamNavBar/TeamNavBar";
import TeamSideBar from "../../components/TeamSideBar/TeamSideBar";
import Channel from "../Channel/Channel";
import { useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { transformChannels } from "../../helper/helper";

const Team: React.FC = (): JSX.Element => {
  const [channels, setChannels] = useState<any[]>([]);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const channelsRef = ref(db, "channels/");
    if (channelsRef) {
      const unsubscribe = onValue(channelsRef, snapshot => {
        const transformedData = transformChannels(snapshot);
        if (transformedData) {
          const channels = Object.values(transformedData);
          setChannels(channels);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <div className="border-base-300 flex-col justify-center w-full bg-slate-500 text-white">
      <TeamNavBar channelName={channel?.name} />
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <TeamSideBar channels={channels} setChannel={setChannel} />
        <Channel channel={channel} />
      </div>
    </div>
  );
};

export default Team;
