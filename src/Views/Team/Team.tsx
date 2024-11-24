import HomeNavBar from "../../components/HomeNavBar/HomeNavBar"
import { signOutUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserAppContext } from "../../store/app-context";

export default function Team() {
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
    <div className="border-base-300 flex-row justify-center w-full bg-slate-500 text-white">
      <HomeNavBar handleLogout={handleLogout} handleToSettings={handleToSettings} />
    </div>
  )
} 