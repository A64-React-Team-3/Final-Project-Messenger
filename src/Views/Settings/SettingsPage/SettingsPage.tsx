import React, { useContext, useEffect } from "react";
import Settings, { SettingsItem } from "../Settings";
import ChatSettings from "../ChatSettings/ChatSettings";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import ThemeSettings from "../ThemeSettings/ThemeSettings";
// import { UserAppContext } from "../../../store/app-context";
// import { useNavigate } from "react-router-dom";

const SettingsPage: React.FC = () => {
  // const { user, loading } = useContext(UserAppContext);
  // const navigate = useNavigate();
  const settingsItems: SettingsItem[] = [
    { label: "Profile", key: "profile", component: <ProfileSettings /> },
    { label: "Theme", key: "theme", component: <ThemeSettings /> },
    {
      label: "Chat",
      key: "chat",
      component: <ChatSettings />,
    },
  ];
  // useEffect(() => {
  //   if (loading) {
  //     navigate("/home");
  //   }
  // }, [loading]);
  return (
    <div className="min-h-screen bg-red-300 flex justify-center items-center">
      <Settings settingsItems={settingsItems} />
      <h2>hi</h2>
    </div>
  );
};

export default SettingsPage;
