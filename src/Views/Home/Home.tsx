import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAppContext } from "../../store/app-context";
import { signOutUser } from "../../services/auth.service";
import "./Home.css";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import Team from "../Team/Team";

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



  return (

    <div className="window border-base-300 flex h-screen bg-black">
      <HomeSideBar />
      <Team />
    </div>
  );
};

export default Home;
