import React from "react";
/**
 * ChatSettings Component
 *
 * This component renders the settings for customizing chat preferences.
 * Users can modify their chat-related settings.
 *
 * @component
 * @returns {JSX.Element} The rendered `ChatSettings` component.
 */
const ChatSettings: React.FC = (): JSX.Element => {
  return (
    <div className="w-full max-w-xl bg-dark p-8 rounded-lg shadow-lg space-y-8">
      <h2 className="text-3xl font-bold">Chat Settings</h2>
      <p className="text-xl">Customize your chat preferences.</p>

      <div className="mt-8">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Notification Preferences
            </label>
            <select className="select select-bordered w-full text-lg">
              <option>All notifications</option>
              <option>Only important notifications</option>
              <option>No notifications</option>
            </select>
          </div>

          <button className="btn btn-primary btn-lg w-full text-xl mt-6">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatSettings;
