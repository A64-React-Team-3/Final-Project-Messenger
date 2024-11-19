import React from "react";

export type MenuButtonProps = {
  /** The label displayed on the button */
  label: string;
  /** Whether the button is active */
  isActive: boolean;
  /** Callback triggered when the button is clicked */
  onClick: () => void;
};

/**
 * MenuButton Component
 *
 * A reusable button for the settings menu.
 *
 * @param {MenuButtonProps} props - Props for the component.
 * @returns {JSX.Element} The rendered `MenuButton` component.
 */
const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  isActive,
  onClick,
}: MenuButtonProps): JSX.Element => {
  return (
    <button
      className={`btn btn-ghost w-full text-left ${
        isActive ? "btn-active" : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MenuButton;
