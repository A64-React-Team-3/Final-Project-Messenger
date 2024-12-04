import React from "react";
/**
 * ThemeSettings Component
 * This component allows users to view the options for customizing the app's theme.
 * @component
 *
 * @returns {JSX.Element} The rendered `ThemeSettings` component.
 */
const ThemeSettings: React.FC = (): JSX.Element => {
  return (
    <div className="w-full max-w-xl bg-dark p-2 rounded-lg space-y-8">
      <h2 className="text-4xl font-bold">Theme Settings</h2>
      <p className="text-xl">Manage your app's theme preferences.</p>

      <div className="mt-8 space-y-6">
        <p className="text-lg">Select a theme for the app:</p>
        <div className="space-y-6">
          <button className="btn btn-ghost w-full py-4 text-xl">
            Light Mode
          </button>
          <button className="btn btn-ghost w-full py-4 text-xl">
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
