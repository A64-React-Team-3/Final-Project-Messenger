import { useState, useContext } from "react";
import { uploadImage } from "../../../services/storage.service";
import { createTeam } from "../../../services/team.service";
import { UserAppContext } from "../../../store/user.context.ts";
type CreateTeamProps = {
  closeModal: () => void;
};
const CreateTeam: React.FC<CreateTeamProps> = ({ closeModal }): JSX.Element => {
  const [isTeamPrivate, setIsTeamPrivate] = useState(false);
  const [teamName, setTeamName] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { user } = useContext(UserAppContext);

  const updateTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleSwitchChange = () => {
    setIsTeamPrivate(!isTeamPrivate);
  };
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };
  const handleCreateTeam = async () => {
    if (avatarFile) {
      try {
        const imageUrl = await uploadImage(avatarFile);
        const privacy = isTeamPrivate ? "private" : "public";
        const teamData = {
          name: teamName,
          privacy: privacy,
          avatarUrl: imageUrl || null,
        };
        console.log("teamData", teamData);
        try {
          await createTeam(user!, teamName, privacy, imageUrl);
          closeModal();
        } catch (error) {
          console.error("Error with creating team: ", error);
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box shadow-xl rounded-lg">
        <h3 className="font-bold text-xl mb-4 text-center">
          Create a new Team:
        </h3>
        <div className="space-y-4 flex flex-col items-center">
          <input
            type="text"
            value={teamName}
            onChange={updateTeamName}
            placeholder="Enter team name"
            className="input  input-bordered input-primary w-3/4 input-sm"
          />
          <div className="flex justify-evenly items-center">
            <label className="label cursor-pointer">
              <span className="label-text text-white">Private</span>
              <input
                type="checkbox"
                name="teamPrivacy"
                checked={isTeamPrivate}
                onChange={handleSwitchChange}
                className="toggle mx-2 border-primary bg-primary hover:border-secondary  hover:bg-secondary"
              />
              <span className="label-text  text-white">Public</span>
            </label>
          </div>
          <div className="flex flex-col items-center">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Team Avatar Preview"
                className="w-24 h-24 rounded-full mb-3 object-contain"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                <span className="text-gray-400">No Avatar</span>
              </div>
            )}
            <label className="btn btn-outline btn-primary btn-sm">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>
        <div className="modal-action justify-between">
          <button className="btn btn-success" onClick={handleCreateTeam}>
            Create
          </button>
          <button className="btn btn-error" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
