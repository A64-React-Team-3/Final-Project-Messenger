import { useContext, useEffect, useState } from "react";
import { TeamAppContext } from "../../store/team.context";
import { UserModel } from "../../models/UserModel";
import { db } from "../../config/firebase-config";
import { ref, get, onValue } from "firebase/database";
import { getByUserName, getUser, getUserByHandle } from "../../services/user.service";
import { transformUserFromSnapshot } from "../../helper/helper";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UserMini from "../UserMini/UserMini";
import { UserAppContext } from "../../store/user.context";

const ChannelSideBar: React.FC = (): JSX.Element => {
  const { team } = useContext(TeamAppContext);
  const { user } = useContext(UserAppContext);
  const [loadingTeamMember, setLoadingTeamMember] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<UserModel[]>([]);
  const [friendList, setFriendList] = useState<UserModel[]>([]);

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
    if (user?.friends) {
      const friendsRef = ref(db, `users/${user.username}/friends`);
      get(friendsRef).then(_snapshot => {
        const unsubscribe = onValue(friendsRef, snapshot => {
          if (snapshot.exists()) {
            const friendsData = snapshot.val();
            const friendList: UserModel[] = [];
            Object.keys(friendsData).map(friend => {
              getUserByHandle(friend).then(user => {
                const transformedUser = transformUserFromSnapshot(user);
                if (transformedUser) {
                  friendList.push(transformedUser);
                }
              });
            });
            setFriendList(friendList);
            console.log("Friend List", friendList);
          } else {
            setFriendList([]);
          }
        });
        return () => unsubscribe();
      }).catch(error => {
        console.error("Error getting friends", error);
      });

    }
  }, [user?.friends]);


  return (
    <div className="bg-base-200 w-60">
      <div className="teamMembers">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Team Members</div>
          <div className="collapse-content">
            {loadingTeamMember && <LoadingSpinner />}
            {teamMembers.map((member, idx) => (
              <UserMini key={idx} member={member} />
            ))}
          </div>
        </div>
      </div>
      <div className="channelMembers">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Friends
          </div>
          <div className="collapse-content">
            {friendList.map((friend, idx) => (
              <UserMini key={idx} member={friend} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelSideBar;
