import React from "react";
import "./Home.css";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import Team from "../Team/Team";
import ProfileButton from "../../components/ProfileButton/ProfileButton";

/**
 * Home Component
 *
 * This component serves as the home page for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered `Home` component.
 */
const Home: React.FC = (): JSX.Element => {
  return (
    <div className="window border-base-300 flex h-screen bg-black">
      <HomeSideBar />
      <div className="navbar h-14"></div>
      <ProfileButton />
      {/* <Team /> */}
    </div>
  );
};

export default Home;
