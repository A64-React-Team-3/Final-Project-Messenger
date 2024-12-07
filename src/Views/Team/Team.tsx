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

const Team: React.FC = (): JSX.Element => {
  const [teamChannels, setTeamChannels] = useState<ChannelModel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChannelModel | null>(
    null
  );
  const [isChannelEditing, setIsChannelEditing] = useState<boolean>(false);
  const [isChannelDeleting, setIsChannelDeleting] = useState<boolean>(false);
  const channelSettings = useRef<HTMLDialogElement>(null);
  const channelDelete = useRef<HTMLDialogElement>(null);
  const [isChannelDeleteModalOpen, setIsChannelDeleteModalOpen] =
    useState<boolean>(false);
  const [isNamePrivacyModalOpen, setIsNamePrivacyModalOpen] =
    useState<boolean>(false);
  const { team } = useContext(TeamAppContext);
  const teamName = team ? team?.name : "newMeeting";
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

        return () => unsubscribe;
      })
      .catch(error => {
        console.error("Error getting channels", error);
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
      <TeamNavBar channelName={currentChannel?.name} />

      <div className="flex w-full h-[calc(100vh-4rem)]">
        <TeamSideBar
          teamName={teamName}
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
    </div>
  );
};

export default Team;
