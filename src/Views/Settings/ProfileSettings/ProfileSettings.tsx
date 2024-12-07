import React, { useEffect, useState } from "react";
import { UserAppContext } from "../../../store/user.context";
import { uploadUserAvatar } from "../../../services/storage.service";
import { set, update, get, ref } from "firebase/database";
import { getUser, updateUser } from "../../../services/user.service";
import { db } from "../../../config/firebase-config";
import { transformUser } from "../../../helper/helper";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../models/UserModel";
import { defaultUserAvatarPath } from "../../../common/constants";

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
  const { user, setUser } = React.useContext(UserAppContext);
  const [displayName, setDisplayName] = useState<string>(user?.displayName ? user.displayName : "");
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber ? user.phoneNumber : "");
  const [avatar, setAvatar] = useState<string>(user?.avatarUrl ? user?.avatarUrl : defaultUserAvatarPath);
  const [avatarFile, setAvatarFile] = useState<File>({} as File);
  const navigate = useNavigate();

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files?.[0] as File);
      const file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleUpdateUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (displayName.length < 3 || displayName.length > 20) {
      alert("Display name must be between 3 and 20 characters");
      return;
    }
    if (avatarFile.name) {
      const avatarUrl = await uploadUserAvatar(avatarFile, avatarFile.name);
      if (user) {
        await updateUser(user.uid, displayName, phoneNumber, avatarUrl);
        const newUser = await getUser(user.uid);
        if (newUser) {
          setUser(newUser);
          alert("User updated successfully");
        }
      }
    } else {
      if (user) {
        await updateUser(user.uid, displayName, phoneNumber);
        const newUser = await getUser(user.uid);
        if (newUser) {
          setUser(newUser);
        }
      }
    }
  };


  return (
    <div className="w-full max-w-3xl bg-base-100 p-2 rounded-lg space-y-8">
      <h2 className="text-3xl font-bold">Profile Settings</h2>
      <p className="text-xl">Update your personal information here.</p>

      <div className="mt-8 flex flex-row w-full justify-between">
        <form className="space-y-6 w-2/4">
          <div className="space-y-2">
            <label className="block  font-medium">Display Name: </label>
            <input
              value={displayName}
              onChange={handleDisplayNameChange}
              type="text"
              placeholder="Enter your display name"
              className="input input-bordered "
            />
            {(displayName.length < 3 || displayName.length > 20) && (
              <p className="text-red-500">Display name must be between 3 and 20 characters</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block  font-medium">Phone number: </label>
            <input
              value={phoneNumber}
              type="phone"
              onChange={handlePhoneNumberChange}
              placeholder="Enter your phone number"
              className="input input-bordered  "
            />
          </div>
          <div className="space-y-2">
            <label className="block  font-medium">Avatar: </label>
            <input type="file" className="file-input file-input-bordered " onChange={handleAvatarChange} />
          </div>

          <button className="btn btn-outline btn-primary  mt-6" onClick={(e) => handleUpdateUser(e)}>
            Save Changes
          </button>
        </form>
        <div className="flex flex-col items-center">
          <label className="block font-medium mb-2">Avatar Preview </label>
          <img className="max-w-48 max-h-48 rounded-full" src={avatar}></img>
        </div>
      </div>
    </div >
  );
};

export default ProfileSettings;
