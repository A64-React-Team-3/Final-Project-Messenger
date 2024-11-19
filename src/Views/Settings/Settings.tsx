import "./Settings.css";

import React, { useState } from "react";
import SettingsMenu, { MenuItem } from "../Settings/SettingsMenu/SettingsMenu";

export type SettingsItem = MenuItem & {
  /** React component to render for this menu item */
  component: JSX.Element;
};

export type SettingsProps = {
  /** Array of menu items with their components */
  settingsItems: SettingsItem[];
};

/**
 * Settings Component
 *
 * A container that renders the SettingsMenu and the active setting component.
 *
 * @param {SettingsProps} props - Props for the component.
 * @returns {JSX.Element} The rendered `SettingsView` component.
 */
const Settings: React.FC<SettingsProps> = ({
  settingsItems,
}: SettingsProps): JSX.Element => {
  const [activeKey, setActiveKey] = useState(settingsItems[0]?.key);

  const activeComponent =
    settingsItems.find(item => item.key === activeKey)?.component ?? null;

  return (
    <div className="flex flex-col lg:flex-row h-full p-4">
      <SettingsMenu
        items={settingsItems}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <div className="flex-1 bg-base-100 p-4 rounded-box shadow ml-0 lg:ml-4">
        {activeComponent}
      </div>
    </div>
  );
};

export default Settings;
