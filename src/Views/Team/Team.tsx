import { useContext, useEffect, useRef } from "react";
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
import Modal from "../../hoc/Modal/Modal";
import ChannelSettings from "../ModalViews/ChannelSettings/ChannelSettings";
import ChannelDelete from "../ModalViews/ChannelDelete/ChannelDelete";
import { toast } from "react-toastify";
import UserSearch from "../ModalViews/UserSearch/UserSearch";
import UserNotification from "../ModalViews/UserNotification/UserNotifications";
import { NotificationModel } from "../../models/NotificationModel";
import { UserAppContext } from "../../store/user.context";

type TeamProps = {
  notifications: NotificationModel[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationModel[]>>;
};

const Team: React.FC<TeamProps> = ({ notifications, setNotifications }): JSX.Element => {
  const [teamChannels, setTeamChannels] = useState<ChannelModel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChannelModel | null>(
    null
  );
  const [isChannelEditing, setIsChannelEditing] = useState<boolean>(false);
  const [isChannelDeleting, setIsChannelDeleting] = useState<boolean>(false);
  const channelSettings = useRef<HTMLDialogElement>(null);
  const channelDelete = useRef<HTMLDialogElement>(null);
  const userSearch = useRef<HTMLDialogElement>(null);
  const userNotification = useRef<HTMLDialogElement>(null);
  const [isUserNotificationModalOpen, setIsUserNotificationModalOpen] = useState<boolean>(false);
  const [isChannelDeleteModalOpen, setIsChannelDeleteModalOpen] =
    useState<boolean>(false);
  const [isNamePrivacyModalOpen, setIsNamePrivacyModalOpen] =
    useState<boolean>(false);
  const [isUserSearchModalOpen, setIsUserSearchModalOpen] = useState<boolean>(false);
  const { team } = useContext(TeamAppContext);
  const { user } = useContext(UserAppContext);

  useEffect(() => {
    const teamChannelsRef = ref(db, `teams/${team?.teamId}/channels`);
    get(teamChannelsRef)
      .then(_snapshot => {
        const unsubscribe = onValue(teamChannelsRef, snapshot => {
          if (snapshot.exists()) {
            const channelsData = Object.keys(snapshot.val());
            getChannelsByIds(channelsData).then(channels => {
              setTeamChannels(transformChannelFromSnapshotVal(channels));
            });
          } else {
            setTeamChannels([]);
          }
        });

        return () => unsubscribe();
      })
      .catch(error => {
        console.error("Error getting channels", error);
        toast.error("Error getting channels");
      });
  }, [team, isChannelEditing, isChannelDeleting]);




  useEffect(() => {
    if (teamChannels.length > 0) {
      setCurrentChannel(teamChannels[0]);
    } else {
      setCurrentChannel(null);
    }
  }, [team, teamChannels]);

  return (
    <div className="border-base-200 bg-base-300 flex-col justify-center w-full ">
      <TeamNavBar channelName={currentChannel?.name} setIsUserSearchModalOpen={setIsUserSearchModalOpen} setIsUserNotificationModalOpen={setIsUserNotificationModalOpen} notifications={notifications} />
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <TeamSideBar
          setChannel={setCurrentChannel}
          teamChannels={teamChannels}
          setIsNamePrivacyModalOpen={setIsNamePrivacyModalOpen}
          setIsChannelDeleteModalOpen={setIsChannelDeleteModalOpen}
        />
        <Channel channel={currentChannel} />
      </div>
      <Modal
        modalRef={channelSettings}
        isModalOpen={isNamePrivacyModalOpen}
        setIsModalOpen={setIsNamePrivacyModalOpen}
      >
        <ChannelSettings
          currentChannel={currentChannel}
          setIsModalOpen={setIsNamePrivacyModalOpen}
          isModalOpen={isNamePrivacyModalOpen}
          setIsChannelEditing={setIsChannelEditing}
        />
      </Modal>
      <Modal
        modalRef={channelDelete}
        isModalOpen={isChannelDeleteModalOpen}
        setIsModalOpen={setIsChannelDeleteModalOpen}
      >
        <ChannelDelete
          currentChannel={currentChannel}
          setIsModalOpen={setIsChannelDeleteModalOpen}
          setIsChannelDeleting={setIsChannelDeleting}
        />
      </Modal>
      <Modal
        modalRef={userSearch}
        isModalOpen={isUserSearchModalOpen}
        setIsModalOpen={setIsUserSearchModalOpen}
      >
        <UserSearch setIsUserSearchModalOpen={setIsUserSearchModalOpen} />
      </Modal>
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

export default Team;
