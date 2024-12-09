import { useContext, useEffect, useState } from "react";
import { TeamAppContext } from "../../store/team.context";
import { UserModel } from "../../models/UserModel";
import { db } from "../../config/firebase-config";
import { ref, get, onValue } from "firebase/database";
import { getByUserName, getUserByHandle } from "../../services/user.service";
import { transformUserFromSnapshot } from "../../helper/helper";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UserMini from "../UserMini/UserMini";

const ChannelSideBar: React.FC = (): JSX.Element => {
  const { team } = useContext(TeamAppContext);
  const [loadingTeamMember, setLoadingTeamMember] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<UserModel[]>([]);

  useEffect(() => {
    if (team) {
      setLoadingTeamMember(true);
      setTeamMembers([]);
      const teamMembersRef = ref(db, `teams/${team?.teamId}/members`);
      get(teamMembersRef).then(_snapshot => {
        const result: UserModel[] = [];
        const unsubscribe = onValue(teamMembersRef, snapshot => {
          if (snapshot.exists()) {
            const membersData = Object.keys(snapshot.val());
            membersData.map(member => {
              getUserByHandle(member).then(user => {
                const transformedUser = transformUserFromSnapshot(user);
                if (transformedUser) {
                  result.push(transformedUser);
                }
              });
            });
          }
        });
        setTeamMembers(result);
        return () => unsubscribe();
      }).catch(error => {
        console.error("Error getting team members", error);
      }).finally(() => setLoadingTeamMember(false));
    }
  }, [team]);

  useEffect(() => {
    console.log("teamMembers", teamMembers);

  }, [teamMembers]);

  return (
    <div className="bg-base-200 w-60">
      <div className="teamMembers">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Team Members</div>
          <div className="collapse-content">
            {loadingTeamMember && <LoadingSpinner />}
            {teamMembers.map((member, idx) => (
              <UserMini key={idx} user={member} />
            ))}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelSideBar;
