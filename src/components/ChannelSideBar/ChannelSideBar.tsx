import { useContext, useEffect, useState } from "react";
import { TeamAppContext } from "../../store/team.context";
import { UserModel } from "../../models/UserModel";
import { getByUserName, getUserByHandle } from "../../services/user.service";

const ChannelSideBar: React.FC = (): JSX.Element => {
  const { team } = useContext(TeamAppContext);
  const [teamMembers, setTeamMembers] = useState<UserModel[]>([]);
  useEffect(() => {
    try {
      const result: UserModel[] = [];
      team?.members.forEach(member => {
        getByUserName(member).then(snapshot => {
          if (snapshot) {
            result.push(snapshot);
          }
        });
      });
      setTeamMembers(result);
      console.log("teamMembers", teamMembers);
    } catch (error) {
      console.error("Error getting team members: ", error);
    }
  }, [team]);
  return (
    <div className="bg-base-200 w-60">
      <div className="teamMembers">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Team Members</div>
          <div className="collapse-content">
            <div className="max-h-36 overflow-y-auto scrollbar-hide">
              {teamMembers.length > 0 &&
                teamMembers.map((teamMember, index) => (
                  <div
                    key={index}
                    className="avatar w-full flex justify-evenly align-middle mb-2"
                  >
                    <div className="w-10 rounded-full avatar">
                      <img
                        alt={`${teamMember.username} avatar`}
                        src={teamMember.avatarUrl}
                      />
                    </div>
                    <p className="text-center">{teamMember.displayName}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="channelMembers">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Channel Members
          </div>
          <div className="collapse-content">
            <div className="max-h-36 overflow-y-auto scrollbar-hide">
              {/* {friendRequests.map(friend => (
            <div
              key={friend.id}
              className="avatar w-full flex justify-evenly align-middle mb-2"
            >
              <div className="w-10 rounded-full avatar">
                <img alt={`${friend.name} avatar`} src={friend.avatarUrl} />
              </div>
              <p className="text-center">{friend.name}</p>
              <button className="btn btn-xs btn-success btn-outline">
                Accept
              </button>
              <button className="btn btn-xs btn-error btn-outline">
                Decline
              </button>
            </div>
          ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelSideBar;
