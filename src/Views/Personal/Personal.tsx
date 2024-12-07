import { useEffect, useState } from "react";
import FriendList from "../../components/FriendList/FriendList";
import FriendRequests from "../../components/FriendRequests/FriendRequests";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import { ChannelModel } from "../../models/ChannelModel";
import { get, onValue, ref } from "firebase/database";
import { transformChannelsFromSnapshot } from "../../helper/helper";
import { db } from "../../config/firebase-config";
import Channel from "../Channel/Channel";
import { FaRocketchat } from "react-icons/fa6";
import { toast } from "react-toastify";
const Personal: React.FC = (): JSX.Element => {
  const [channels, setChannels] = useState<ChannelModel[]>([]);
  const [channel, setChannel] = useState<ChannelModel | null>(null);
  useEffect(() => {
    const channelsRef = ref(db, "channels/");
    get(channelsRef)
      .then(channelsSnapshot => {
        if (channelsSnapshot.exists()) {
          const unsubscribe = onValue(channelsRef, snapshot => {
            const transformedData = transformChannelsFromSnapshot(snapshot);
            if (transformedData) {
              setChannels(transformedData);
            }
          });

          return () => unsubscribe();
        }
      })
      .catch(error => {
        console.error("Error getting channels", error);
        toast.error("Error getting channels");
      });
  }, []);
  return (
    <>
      <div className="flex w-full h-screen ">
        <HomeSideBar />
        <div className="border-base-300 flex-col justify-center h-full   ">
          <FriendRequests />
          <div className="overflow-y-auto min-h-[50vh] max-h-[66vh] scrollbar-hide">
            <FriendList />
            <div className="collapse collapse-arrow ">
              <input type="checkbox" />
              <div className="collapse-title z-0 text-xl font-medium">
                Chats
              </div>
              <div className="collapse-content ">
                <div className="h-64 overflow-y-auto scrollbar-hide">
                  {channels.map(channel => (
                    <div className="mb-3" key={channel.id}>
                      <button
                        onClick={() => setChannel(channel)}
                        className="btn btn-sm btn-outline btn-primary  text-sm hover:bg-gray-700"
                      >
                        <span className="mr-2 text-lg ">
                          <FaRocketchat className="text-secondary" />
                        </span>
                        {channel.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-screen">
          <div className="navbar py-0 px-0 bh-14 w-full flex items-center justify-between">
            <div className="left-content">
              <h2 className="p-2">
                {channel ? channel.name : "Personal view"}
              </h2>
            </div>
            <div className="p-2">
              <ProfileButton />
            </div>
          </div>
          <div className="flex-grow bg-base-300 overflow-auto">
            <Channel channel={channel} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Personal;
