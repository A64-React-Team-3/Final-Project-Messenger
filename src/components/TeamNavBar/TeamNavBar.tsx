import Modal from "../../hoc/Modal/Modal";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import CreateChannel from "../../Views/ModalViews/CreateChannel/CreateChannel";
import ProfileButton from "../ProfileButton/ProfileButton";
import { TeamAppContext } from "../../store/team.context";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { NotificationModel } from "../../models/NotificationModel";
import { MdOutlineSearch } from "react-icons/md";


type TeamNavBarProps = {
  channelName: string | undefined;
  notifications: NotificationModel[];
  setIsUserSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserNotificationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamNavBar: React.FC<TeamNavBarProps> = ({
  channelName,
  notifications,
  setIsUserSearchModalOpen,
  setIsUserNotificationModalOpen
}): JSX.Element => {
  const createChannelRef = useRef<HTMLDialogElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { team } = useContext(TeamAppContext);
  return (
    <div className="navbar py-0 px-0 bg-base-100 h-14 shadow-md z-10 shadow-primary">
      <div className=" h-full">
        <div className="dropdown dropdown-end h-full w-60">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-neutral bg-base-100 border-none hover:bg-base-300 w-full h-full rounded-none flex flex-col justify-center items-center gap-2 p-4"
          >
            <h2 className="text-lg font-semibold text-center break-words truncate max-w-40 text-primary overflow-hidden">
              {team?.name}
            </h2>
            {team?.avatarUrl && (
              <img
                src={team?.avatarUrl}
                alt="team image"
                className="w-12 h-12 rounded-full"
              />
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[100] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Team Settings</a>
            </li>
            <li>
              <a
                onClick={() => {
                  setIsModalOpen(prevValue => !prevValue);
                }}
              >
                Create Channel
              </a>
            </li>
            <li>
              <a onClick={() => setIsUserSearchModalOpen(true)}>Invite Team Members</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 pl-3">{channelName}</div>
      <button className="btn btn-circle bg-transparent hover:bg-transparent shadow-none border-none flex-none gap-2 mr-3 relative" onClick={() => setIsUserNotificationModalOpen(true)}>
        <IoNotificationsCircleOutline className="text-2xl text-primary scale-150" />
        {notifications.length > 0 && <div className="badge badge-secondary absolute bottom-0 left-0 scale-75">{notifications.length}</div>}
      </button>
      <div className="flex-none gap-2">
        <button className="btn btn-circle bg-transparent hover:bg-transparent shadow-none border-none flex-none gap-2 mr-3 relative"
          onClick={() => setIsUserSearchModalOpen(true)}>
          <MdOutlineSearch className="text-2xl text-primary scale-150" />
        </button>
        <ProfileButton />
      </div>
      <Modal
        modalRef={createChannelRef}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <CreateChannel team={team} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default TeamNavBar;
