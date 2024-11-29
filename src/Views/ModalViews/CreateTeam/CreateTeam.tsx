import { useState, useContext } from "react";
// import { UserAppContext } from "../../../store/user.context.ts";
type CreateTeamProps = {
  closeModal: () => void;
};
const CreateTeam: React.FC<CreateTeamProps> = ({ closeModal }): JSX.Element => {
  const [isTeamPrivate, setIsTeamPrivate] = useState(false);
  const [teamName, setTeamName] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  //   const [teamId, setTeamId] = useState<number | null>(null);
  //   const { user } = useContext(UserAppContext);

  const updateTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTeamPrivate(event.target.value === "private");
  };
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleCreateTeam = async () => {};

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-gray-800 text-white shadow-xl rounded-lg">
        <h3 className="font-bold text-xl mb-4 text-center">
          Create a new Team:
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={teamName}
            onChange={updateTeamName}
            placeholder="Enter team name"
            className="input input-bordered input-primary w-full"
          />
          <div className="flex justify-evenly items-center">
            <label className="label cursor-pointer">
              <span className="label-text text-white">Public</span>
              <input
                type="radio"
                name="teamPrivacy"
                value="public"
                checked={!isTeamPrivate}
                onChange={handleRadioChange}
                className="radio radio-primary ml-2"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-white">Private</span>
              <input
                type="radio"
                name="teamPrivacy"
                value="private"
                checked={isTeamPrivate}
                onChange={handleRadioChange}
                className="radio radio-primary ml-2"
              />
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
