import { useNavigate } from "react-router-dom";
import TeamAvatarButton from "../TeamAvatarButton/TeamAvatarButton";
import CreateTeamButton from "../CreateTeamButton/CreateTeamButton";
import { useState } from "react";
import CreateTeam from "../../Views/ModalViews/CreateTeam/CreateTeam";

const HomeSideBar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToPersonal = () => {
    navigate("/dms");
  };
  const handleToTeam = () => {
    navigate("/home");
  };
  const handleCreateTeam = () => {
    setOpenModal(prevValue => !prevValue);
  };
  return (
    <>
      <div className="border-base-300 flex-row justify-center px-4 bg-black text-slate-50 w-20">
        <div className="personal-team flex-row pt-2 mb-4 border-b-2 h-16">
          <div className="avatar placeholder" onClick={handleToPersonal}>
            <div className="bg-neutral btn btn-success text-neutral-content w-12 rounded-full border-none">
              <span>DM's</span>
            </div>
          </div>
        </div>
        <div className="list-of-teams flex-row space-y-2 pt-2">
          <span onClick={handleToTeam}>
            <TeamAvatarButton />
          </span>
          <span onClick={handleToTeam}>
            <TeamAvatarButton />
          </span>
          <span onClick={handleToTeam}>
            <TeamAvatarButton />
          </span>
          <span onClick={handleToTeam}>
            <TeamAvatarButton />
          </span>
          <span onClick={handleCreateTeam}>
            <CreateTeamButton />
          </span>
        </div>
      </div>
      {openModal && <CreateTeam closeModal={handleCreateTeam} />}
    </>
  );
};

export default HomeSideBar;
