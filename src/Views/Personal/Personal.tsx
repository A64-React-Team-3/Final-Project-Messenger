import { useEffect, useState } from "react";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import { ChannelModel } from "../../models/ChannelModel";
import { get, onValue, ref } from "firebase/database";
import { transformChannelsFromSnapshot } from "../../helper/helper";
import { db } from "../../config/firebase-config";
import Channel from "../Channel/Channel";
import { FaRocketchat } from "react-icons/fa6";
import { toast } from "react-toastify";
import Modal from "../../hoc/Modal/Modal";
import { useRef } from "react";
import UserNotification from "../ModalViews/UserNotification/UserNotifications";
import { NotificationModel } from "../../models/NotificationModel";
import { useContext } from "react";
import { UserAppContext } from "../../store/user.context";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { ChannelType } from "../../common/constants";
import { MdOutlineSearch } from "react-icons/md";

const Personal: React.FC = (): JSX.Element => {
  const [personalChannels, setPersonalChannels] = useState<ChannelModel[]>([]);
  const [channel, setChannel] = useState<ChannelModel | null>(null);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const userNotification = useRef<HTMLDialogElement>(null);
  const { user } = useContext(UserAppContext);
  const [isUserNotificationModalOpen, setIsUserNotificationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const channelsRef = ref(db, "channels/");
    get(channelsRef)
      .then(channelsSnapshot => {
        if (channelsSnapshot.exists()) {
          const unsubscribe = onValue(channelsRef, snapshot => {
            const transformedData = transformChannelsFromSnapshot(snapshot);
            if (transformedData) {
              console.log("Transformed Data", transformedData);
              const personalChannels = transformedData.filter(channel => {
                if (user && channel.type === ChannelType.PERSONAL && channel.members.includes(user?.username)) {
                  console.log("user", user);
                  return channel;
                }
              });
              setPersonalChannels(personalChannels);

            }
          });

          return () => unsubscribe();
        }
      })
      .catch(error => {
        console.error("Error getting channels", error);
        toast.error("Error getting channels");
      });
  }, [user]);

  useEffect(() => {
    const notificationsRef = ref(db, `users/${user?.username}/notifications`);
    get(notificationsRef)
      .then(_snapshot => {
        const unsubscribe = onValue(notificationsRef, snapshot => {
          if (snapshot.exists()) {
            const notificationsData = snapshot.val();
            setNotifications(Object.values(notificationsData));
          } else {
            setNotifications([]);
          }
        });

        return () => unsubscribe();
      })
      .catch(error => {
        console.error("Error getting notifications", error);
        toast.error("Error getting notifications");
      });
  }, [user]);


  return (
    <div className="flex w-full">
      <HomeSideBar />
      <div className="border-base-300 flex-col justify-center h-screen w-60 shadow-md shadow-primary z-10">
        <div className="overflow-y-auto min-h-[50vh] max-h-[66vh] scrollbar-hide">
          <div className="dropdown dropdown-end h-full w-60">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-neutral bg-base-100 border-none hover:bg-base-300 w-full h-[7vh] rounded-none flex flex-row justify-center items-center gap-2 p-4"
            >
              <h2 className="text-lg font-semibold text-center break-words truncate max-w-40 text-primary overflow-hidden">
                {user?.username}
              </h2>
              {user?.avatarUrl && (
                <img
                  src={user?.avatarUrl}
                  alt="team image"
                  className="w-12 h-12 rounded-full"
                />
              )}
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="checkbox" />
            <div className="collapse-title z-0 text-xl font-medium">
              Chats
            </div>
            <div className="collapse-content ">
              <div className="h-64 overflow-y-auto scrollbar-hide">
                {personalChannels.map(channel => (
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
            <button className="btn btn-circle bg-transparent hover:bg-transparent shadow-none border-none flex-none gap-2 mr-3 relative" onClick={() => setIsUserNotificationModalOpen(true)}>
              <IoNotificationsCircleOutline className="text-2xl text-primary scale-150" />
              {notifications.length > 0 && <div className="badge badge-secondary absolute bottom-0 left-0 scale-75">{notifications.length}</div>}
            </button>
            <div className="mr-4">
              <MdOutlineSearch className="text-2xl text-primary scale-150" />
            </div>
            <ProfileButton />
          </div>
        </div>
        <div className="flex-grow bg-base-300 overflow-auto">
          <Channel channel={channel} />
        </div>
      </div>
      <Modal
        modalRef={userNotification}
        isModalOpen={isUserNotificationModalOpen}
        setIsModalOpen={setIsUserNotificationModalOpen}
      >
        <UserNotification setIsUserNotificationModalOpen={setIsUserNotificationModalOpen} notifications={notifications} setNotifications={setNotifications} />
      </Modal>
    </div>
  );
};
export default Personal;
