import { signOutUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserAppContext } from "../../store/app-context";
import TeamNavBar from "../../components/TeamNavBar/TeamNavBar";
import TeamSideBar from "../../components/TeamSideBar/TeamSideBar";
import Channel from "../Channel/Channel";
import { useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";

const Team: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserAppContext);
  const [channels, setChannels] = useState<any[]>([]);
  const [channel, setChannel] = useState<any>(null);

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      navigate("/", { replace: true });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleToSettings = () => {
    navigate("/settings");
  };

  useEffect(() => {
    const channelsRef = ref(db, "channels/");
    if (channelsRef) {
      const unsubscribe = onValue(channelsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const channels = Object.values(data);
          console.log("Channels", channels);
          setChannels(channels);
        }
      });

      return () => unsubscribe();
    }
  }, []);


  return (
    <div className="border-base-300 flex-col justify-center w-full bg-slate-500 text-white">
      <TeamNavBar handleLogout={handleLogout} handleToSettings={handleToSettings} channelName={channel?.name} />
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <TeamSideBar channels={channels} setChannel={setChannel} />
        <Channel channel={channel} />
      </div>
    </div>
  )
}

export default Team;