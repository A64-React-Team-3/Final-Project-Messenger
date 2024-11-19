import React from "react";
/**
 * ProfileSettings Component
 *
 * This component allows users to update their personal information.
 * It can include fields like name, email, avatar, and other personal details.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered `ProfileSettings` component.
 */
const ProfileSettings: React.FC = (): JSX.Element => {
  return (
    <div className="w-full max-w-xl bg-dark p-8 rounded-lg shadow-lg space-y-8">
      <h2 className="text-3xl font-bold">Profile Settings</h2>
      <p className="text-xl">Update your personal information here.</p>

      <div className="mt-8">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">Display Name: </label>
            <input
              type="text"
              placeholder="Enter your display name"
              className="input input-bordered w-full text-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium">Email: </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full text-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium">Avatar: </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary btn-lg w-full text-xl mt-6">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
