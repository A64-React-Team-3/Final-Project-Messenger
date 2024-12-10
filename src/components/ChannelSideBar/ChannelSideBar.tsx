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

type ChannelSidBarProps = {
  users: string[];
  usersType: "teamMembers" | "friends";
};

const ChannelSideBar: React.FC<ChannelSidBarProps> = ({ users, usersType }): JSX.Element => {
  const { user } = useContext(UserAppContext);
  const [loadingTeamMember, setLoadingTeamMember] = useState<boolean>(false);
  const [listOfUsers, setListOfUsers] = useState<UserModel[]>([]);

  // useEffect(() => {
  //     setLoadingTeamMember(true);
  //     setListOfUsers([]);

  // }, [users]);

  useEffect(() => {
    if (usersType === "friends") {
      const friendsRef = ref(db, `users/${user?.username}/friends`);
      get(friendsRef).then(_snapshot => {
        const unsubscribe = onValue(friendsRef, async snapshot => {
          if (snapshot.exists()) {
            const friendsData = snapshot.val();
            console.log("Friends Data", friendsData);
            const friendList: UserModel[] = [];
            const friendPromises = Object.keys(friendsData).map(friend =>
              getUserByHandle(friend).then(user => {
                const transformedUser = transformUserFromSnapshot(user);
                if (transformedUser) {
                  friendList.push(transformedUser);
                }
              })
            );
            await Promise.all(friendPromises);
            setListOfUsers(friendList);
            console.log("Friend List", friendList);
          }
        });
        return () => unsubscribe();
      }).catch(error => {
        console.error("Error getting friends", error);
      });
    } else if (usersType === "teamMembers") {
      const teamMembersRef = ref(db, `users/`);
      get(teamMembersRef).then(_snapshot => {
        const unsubscribe = onValue(teamMembersRef, async snapshot => {
          if (snapshot.exists()) {
            const membersData = Object.keys(snapshot.val());
            const result: UserModel[] = [];
            const memberPromises = membersData.map(member =>
              getUserByHandle(member).then(user => {
                const transformedUser = transformUserFromSnapshot(user);
                if (transformedUser) {
                  result.push(transformedUser);
                }
              })
            );
            await Promise.all(memberPromises);
            setListOfUsers(result);
            console.log("Team Members", result);
          }
        });
        return () => unsubscribe();
      }).catch(error => {
        console.error("Error getting team members", error);
      });
    }
  }, [user, usersType]);


  return (
    <div className="bg-base-100 w-60 flex flex-col items-center py-4">
      {listOfUsers.length > 0 && (
        <>
          {loadingTeamMember && <LoadingSpinner />}
          {listOfUsers.map((member, idx) => (
            <UserMini key={idx} member={member} />
          ))}
        </>)}
    </div>
  );
};

export default ChannelSideBar;
