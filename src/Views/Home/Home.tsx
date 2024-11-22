import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAppContext } from "../../store/app-context";
import { signOutUser } from "../../services/auth.service";

/**
 * Home Component
 *
 * This component serves as the home page for the application. So far it only includes
 * buttons for logging out and accessing settings.
 *
 * @component
 * @returns {JSX.Element} The rendered `Home` component.
 */
const Home: React.FC = (): JSX.Element => {
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
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 space-y-6">
      <h1 className="text-4xl font-bold">
        Welcome {user?.username} to the Home Page
      </h1>
      <div className="space-x-4">
        <button onClick={handleLogout} className="btn btn-primary text-xl">
          Logout
        </button>
        <button
          onClick={handleToSettings}
          className="btn btn-secondary text-xl"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default Home;
