import { useNavigate } from "react-router-dom";
import TeamAvatarButton from "../TeamAvatarButton/TeamAvatarButton";
import CreateTeamButton from "../CreateTeamButton/CreateTeamButton";
import { useContext, useEffect, useState } from "react";
import CreateTeam from "../../Views/ModalViews/CreateTeam/CreateTeam";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { TeamAppContext } from "../../store/team.context";
import { getTeams } from "../../services/team.service";
import { transformTeams } from "../../helper/helper";
import { TeamModel } from "../../models/Team/TeamModel";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { DyteAppContext } from "../../store/Dyte/dyte.context";
const HomeSideBar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loadingCreateTeam, setLoadingCreateTeam] = useState<boolean>(false);
  const [loadingTeamsData, setLoadingTeamsData] = useState<boolean>(false);
  const [teams, setTeams] = useState<TeamModel[] | null>(null);
  const { team, setTeam } = useContext(TeamAppContext);
  const { setAuthToken } = useContext(DyteAppContext);

  const handleToPersonal = () => {
    setTeam(null);
    setAuthToken("");
    navigate("/dms");
  };
  const handleToTeam = async (team: TeamModel) => {
    navigate("/home");
    try {
      setTeam(team);
      // setAuthToken("");
    } catch (error) {
      console.log("Error navigating to team view: ", error);
    }
  };
  const handleCreateTeam = () => {
    setOpenModal(prevValue => !prevValue);
  };
  useEffect(() => {
    if (!teams) {
      const teamsRef = ref(db, "teams/");
      setLoadingTeamsData(true);
      getTeams()
        .then(snapshot => {
          if (snapshot) {
            const unsubscribe = onValue(teamsRef, snapshot => {
              const teamsData = transformTeams(snapshot);
              setTeams(teamsData);
            });
            return () => unsubscribe();
          }
        })
        .catch(error => {
          console.error("Error getting channels", error);
        })
        .finally(() => setLoadingTeamsData(false));
    }
  }, []);
  return (
    <>
      <div className="border-base-300 bg-base-200 flex flex-col  items-center w-20 z-20">
        <div className=" flex flex-col p-2 gap-2 personal-team  ">
          <div
            className="avatar placeholder border-b border-b-primary pb-2"
            onClick={handleToPersonal}
          >
            <div className="bg-neutral  btn btn-success text-neutral-content w-12 rounded-full border-none">
              <span>DM's</span>
            </div>
          </div>
          <span onClick={handleCreateTeam}>
            <CreateTeamButton />
          </span>
        </div>
        <div className="list-of-teams flex flex-col space-y-2 pt-2 overflow-y-auto max-h-[calc(100vh-118px)] scrollbar-hide ">
          {loadingTeamsData && <LoadingSpinner />}
          {teams &&
            teams.map((teamData: TeamModel, index: number) => {
              return (
                <span
                  key={index}
                  onClick={() => handleToTeam(teamData)}
                  className={`transition-transform duration-200 mb-2 ${
                    team?.teamId === teamData.teamId &&
                    `bg-gradient-to-r from-primary to-secondary rounded-full transition animate-[spin_1s]`
                  }`}
                >
                  <TeamAvatarButton teamData={teamData} />
                </span>
              );
            })}
        </div>
      </div>
      {loadingCreateTeam && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <LoadingSpinner />
        </div>
      )}
      {openModal && (
        <>
          <CreateTeam
            closeModal={handleCreateTeam}
            setLoading={val => setLoadingCreateTeam(val)}
          />
        </>
      )}
    </>
  );
};

export default HomeSideBar;
