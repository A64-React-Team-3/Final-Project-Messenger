import React from "react";
import MenuButton from "../../../components/MenuButton/MenuButton";

export type MenuItem = {
  label: string;
  key: string;
};

export type SettingsMenuProps = {
  items: MenuItem[];
  activeKey: string;
  onSelect: (key: string) => void;
};

/**
 * SettingsMenu Component
 *
 * Renders a list of menu items and allows selecting one.
 *
 * @param {SettingsMenuProps} props - Props for the component.
 * @returns {JSX.Element} The rendered `SettingsMenu` component.
 */
const SettingsMenu: React.FC<SettingsMenuProps> = ({
  items,
  activeKey,
  onSelect,
}: SettingsMenuProps): JSX.Element => {
  return (
    <div className="menu bg-base-200 w-full lg:w-full p-2 rounded-box shadow">
      {items.map(item => (
        <MenuButton
          key={item.key}
          label={item.label}
          isActive={activeKey === item.key}
          onClick={() => onSelect(item.key)}
        />
      ))}
    </div>
  );
};

export default SettingsMenu;
