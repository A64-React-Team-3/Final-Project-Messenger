import { defaultTeamImgUrl } from "../../common/constants";
import { TeamModel } from "../../models/Team/TeamModel";
type TeamAvatarButtonProps = {
  teamData: TeamModel;
};
const TeamAvatarButton: React.FC<TeamAvatarButtonProps> = ({
  teamData,
}): JSX.Element => {
  return (
    <div className="avatar placeholder">
      <div className="mb-2 bg-neutral btn btn-secondary text-neutral-content w-12 rounded-full border-none">
        <span>
          <img
            style={{ transform: "scale(2.6)" }}
            src={teamData.avatarUrl || defaultTeamImgUrl}
            alt="team avatar picture"
          />
        </span>
      </div>
    </div>
  );
};

export default TeamAvatarButton;
