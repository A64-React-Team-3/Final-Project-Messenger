import Modal from "../../hoc/Modal/Modal";
import { createChannel } from "../../services/channel.service";
import { useEffect, useRef } from "react";
import { useState } from "react";
import CreateChannel from "../../Views/ModalViews/CreateChannel/CreateChannel";

type TeamNavBarProps = {
  handleLogout: () => Promise<void>;
  handleToSettings: () => void;
  channelName: string | undefined;
};

const TeamNavBar: React.FC<TeamNavBarProps> = ({ handleLogout, handleToSettings, channelName }): JSX.Element => {
  const createChannelRef = useRef<HTMLDialogElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="navbar py-0 px-0 bg-zinc-900 h-14" >
      <div className="flex-none h-full">
        <div className="dropdown dropdown-end h-full w-60">
          <div tabIndex={0} role="button" className="btn btn-neutral w-full h-full bg-slate-600 rounded-none ">
            team name
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[100] mt-3 w-52 p-2 shadow">
            <li><a>Team Settings</a></li>
            <li>
              <a onClick={() => {
                setIsModalOpen((prevValue) => !prevValue)
                console.log("Hi");
              }}>Create Channel</a>

            </li>
            <li><a>Notification Settings</a></li>
          </ul>
        </div>
      </div>
      <div className="flex-1 pl-3">
        {channelName}
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a onClick={handleToSettings}>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>

      </div>
      <Modal modalRef={createChannelRef} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}><CreateChannel /></Modal>
    </div>
  )
}

export default TeamNavBar;