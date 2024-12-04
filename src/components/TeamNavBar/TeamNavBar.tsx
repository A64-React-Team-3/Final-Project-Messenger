import Modal from "../../hoc/Modal/Modal";
import { createChannel } from "../../services/channel.service";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import CreateChannel from "../../Views/ModalViews/CreateChannel/CreateChannel";
import ProfileButton from "../ProfileButton/ProfileButton";
import { TeamAppContext } from "../../store/team.context";

type TeamNavBarProps = {
  channelName: string | undefined;
};

const TeamNavBar: React.FC<TeamNavBarProps> = ({
  channelName,
}): JSX.Element => {
  const createChannelRef = useRef<HTMLDialogElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { team } = useContext(TeamAppContext);
  return (
    <div className="navbar py-0 px-0 bg-zinc-900 h-14">
      <div className=" h-full">
        <div className="dropdown dropdown-end h-full w-60">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-neutral w-full h-full bg-slate-600 rounded-none flex flex-col  justify-center items-center gap-2 p-4"
          >
            <h2 className="text-lg font-semibold text-center break-words truncate max-w-40 overflow-hidden">
              {team?.name}
            </h2>
            {team?.avatarUrl && (
              <img
                src={team?.avatarUrl}
                alt="team image"
                className="w-12 h-12"
              />
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[100] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Team Settings</a>
            </li>
            <li>
              <a
                onClick={() => {
                  setIsModalOpen(prevValue => !prevValue);
                  console.log("Hi");
                }}
              >
                Create Channel
              </a>
            </li>
            <li>
              <a>Notification Settings</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 pl-3">{channelName}</div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <ProfileButton />
      </div>
      <Modal
        modalRef={createChannelRef}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <CreateChannel />
      </Modal>
    </div>
  );
};

export default TeamNavBar;
