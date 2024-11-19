import React from "react";
import Settings, { SettingsItem } from "../Settings";
import ChatSettings from "../ChatSettings/ChatSettings";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import ThemeSettings from "../ThemeSettings/ThemeSettings";

const SettingsPage: React.FC = () => {
  const settingsItems: SettingsItem[] = [
    { label: "Profile", key: "profile", component: <ProfileSettings /> },
    { label: "Theme", key: "theme", component: <ThemeSettings /> },
    {
      label: "Chat",
      key: "chat",
      component: <ChatSettings />,
    },
  ];

  return (
    <div className="min-h-screen bg-base-300 flex justify-center items-center">
      <Settings settingsItems={settingsItems} />
    </div>
  );
};

export default SettingsPage;
