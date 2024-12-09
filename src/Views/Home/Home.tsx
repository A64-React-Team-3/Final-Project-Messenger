import React, { useContext } from "react";
import "./Home.css";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import Team from "../Team/Team";
import { TeamAppContext } from "../../store/team.context";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import { Navigate } from "react-router-dom";

/**
 * Home Component
 *
 * This component serves as the home page for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered `Home` component.
 */
const Home: React.FC = (): JSX.Element => {
  const { team } = useContext(TeamAppContext);
  return (
    <div className="window border-base-300 flex h-screen">
      <HomeSideBar />
      {team ? <Team /> : <Navigate to={"/dms"} />}
    </div>
  );
};

export default Home;
