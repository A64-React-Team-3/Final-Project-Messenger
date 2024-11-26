import { signOutUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserAppContext } from "../../store/app-context";
import TeamNavBar from "../../components/TeamNavBar/TeamNavBar";
import TeamSideBar from "../../components/TeamSideBar/TeamSideBar";
import Channel from "../Channel/Channel";

const Team: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserAppContext);

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      navigate("/", { replace: true });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleToSettings = () => {
    navigate("/settings");
  };


  return (
    <div className="border-base-300 flex-col justify-center w-full bg-slate-500 text-white">
      <TeamNavBar handleLogout={handleLogout} handleToSettings={handleToSettings} />
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <TeamSideBar />
        <Channel />
      </div>
    </div>
  )
}

export default Team;