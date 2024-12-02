import { useNavigate } from "react-router-dom";
import TeamAvatarButton from "../TeamAvatarButton/TeamAvatarButton";
import CreateTeamButton from "../CreateTeamButton/CreateTeamButton";
import { useEffect, useState } from "react";
import CreateTeam from "../../Views/ModalViews/CreateTeam/CreateTeam";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
// import { TeamModel } from "../../helper/helper";
const HomeSideBar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [teams, setTeams] = useState<any[] | null>(null);

  const handleToPersonal = () => {
    navigate("/dms");
  };
  const handleToTeam = () => {
    navigate("/home");
  };
  const handleCreateTeam = () => {
    setOpenModal(prevValue => !prevValue);
  };
  useEffect(() => {
    const teamsRef = ref(db, "teams/");
    get(teamsRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const unsubscribe = onValue(teamsRef, snapshot => {
            console.log(snapshot.val());
            const teamsData = Object.values(snapshot.val());
            console.log(teamsData);
            setTeams(teamsData);
          });

          return () => unsubscribe();
        }
      })
      .catch(error => {
        console.error("Error getting channels", error);
      });
  }, []);
  return (
    <>
      <div className="border-base-300 flex-row justify-center  bg-black text-slate-50 w-20 ml-4">
        <div className="personal-team flex-row pt-2 mb-4 border-b-2 h-16">
          <div className="avatar placeholder" onClick={handleToPersonal}>
            <div className="bg-neutral btn btn-success text-neutral-content w-12 rounded-full border-none">
              <span>DM's</span>
            </div>
          </div>
        </div>
        <div className="list-of-teams flex-row space-y-2 pt-2 overflow-y-auto max-h-[calc(100vh-120px)]">
          {teams &&
            teams.map(teamData => {
              return (
                <span key={teamData.id} onClick={handleToTeam}>
                  <TeamAvatarButton teamData={teamData} />
                </span>
              );
            })}
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
