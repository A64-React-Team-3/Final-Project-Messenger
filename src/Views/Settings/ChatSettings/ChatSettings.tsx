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
    <div className="bg-dark p-2 rounded-lg space-y-8">
      <h2 className="text-3xl font-bold">Chat Settings</h2>
      <p className="text-xl">Customize your chat preferences.</p>

      <div className="mt-8 h-80 overflow-y-auto scrollbar scrollbar-thumb-base-content scrollbar-track-base-300 scrollbar-thumb-rounded-lg scrollbar-w-4 rounded-lg">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Notification Preferences
            </label>
            <select className="select select-bordered w-1/2 text-lg">
              <option>All notifications</option>
              <option>Only important notifications</option>
              <option>No notifications</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Message Font Size
            </label>
            <select className="select select-bordered w-1/2 text-lg">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Auto-Delete Messages
            </label>
            <select className="select select-bordered w-1/2 text-lg">
              <option>Never</option>
              <option>After 24 Hours</option>
              <option>After 7 Days</option>
              <option>After 30 Days</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">Chat Background</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-1/2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Mute Conversations
            </label>
            <select className="select select-bordered w-1/2 text-lg">
              <option>None</option>
              <option>All Chats</option>
              <option>Specific Chats</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Language Preferences
            </label>
            <select className="select select-bordered w-1/2 text-lg">
              <option>English</option>
              <option>Bulgarian</option>
            </select>
          </div>
        </form>
      </div>
      <button className="btn btn-outline btn-primary">Save Changes</button>
    </div>
  );
};
export default ChatSettings;
