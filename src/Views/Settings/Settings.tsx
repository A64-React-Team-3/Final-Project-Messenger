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
    <div className="mockup-window pr-7 pb-5 pl-0 border-4 border-gray-600 w-[75vw] h-[85vh] gap-4 flex  lg:flex-row shadow-xl">
      <div className="bg-base-200 w-1/4 p-4 rounded-box">
        <SettingsMenu
          items={settingsItems}
          activeKey={activeKey}
          onSelect={setActiveKey}
        />
      </div>
      <div className="flex-1 bg-base-100 w-1/4 p-4 rounded-box shadow">
        {activeComponent}
      </div>
    </div>
  );
};

export default Settings;
