import { get } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../../services/user.service";
import { UserModel } from "../../../models/UserModel";
import { sendFriendRequest, sendTeamInvite } from "../../../services/notification.service";
import { UserAppContext } from "../../../store/user.context";
import { TeamAppContext } from "../../../store/team.context";
import { toast } from "react-toastify";

type UserSearchProps = {
  setIsUserSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const UserSearch: React.FC<UserSearchProps> = ({ setIsUserSearchModalOpen }): JSX.Element => {
  const [searchUserTerm, setSearchUserTerm] = useState<string>("");
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<UserModel[]>([]);
  const { user } = useContext(UserAppContext);
  const { team } = useContext(TeamAppContext);

  const handleFriendRequest = async (senderUserName: string, senderAvatarUrl: string, recipientUserName: string, recipientAvatarUrl: string) => {
    if (senderUserName && recipientUserName && senderAvatarUrl && recipientAvatarUrl) {
      if (senderUserName === recipientUserName) {
        toast.error("You cannot send friend request to yourself");
        return;
      }
      const result = await sendFriendRequest(senderUserName, senderAvatarUrl, recipientUserName, recipientAvatarUrl);
      if (result) {
        toast.success("Friend request sent");
      } else {
        toast.error("Error sending friend request");
      }
    }
  };

  const handleTeamInvite = async (senderUserName: string, senderAvatarUrl: string, recipientUserName: string, recipientAvatarUrl: string, teamId: string, teamName: string, teamAvatarUrl: string) => {
    if (senderUserName === recipientUserName) {
      toast.error("You cannot send team invite to yourself");
      return;
    }
    if (senderUserName && recipientUserName && teamId && teamName && senderAvatarUrl && recipientAvatarUrl) {
      const result = await sendTeamInvite(senderUserName, senderAvatarUrl, recipientUserName, recipientAvatarUrl, teamId, teamName, teamAvatarUrl);
      if (result) {
        toast.success("Team invite sent");
      } else {
        toast.error("Error sending team invite");
      }
    }
  };

  useEffect(() => {
    getAllUsers().then((users) => {
      setAllUsers(users);
      setSearchedUsers(users.filter((user) => user.username.toLowerCase().includes(searchUserTerm.toLowerCase())));
    });
  }, [searchUserTerm]);



  return (
    <div className="flex flex-col mt-4 max-h-96">
      <div className="form-control mb-5">
        <input
          value={searchUserTerm}
          onChange={(e) => setSearchUserTerm(e.target.value)}
          type="text"
          placeholder="Search users"
          className="input input-sm input-bordered w-24 md:w-auto"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Team invite</th>
              <th>Friend invite</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchedUsers.map((userData) => (
              <tr key={userData.uid}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={userData.avatarUrl}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{userData.username}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <button className={`btn btn-sm btn-primary ${team?.members.includes(user!.username) ? "" : "btn-disabled"}`} onClick={() => {
                    if (user?.username && user?.avatarUrl && userData.username && userData.avatarUrl && team?.teamId && team.name && team.avatarUrl) {
                      handleTeamInvite(user.username, user.avatarUrl, userData.username, userData.avatarUrl, team.teamId, team.name, team.avatarUrl);
                    }
                  }}>
                    Team Invite
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => {
                    if (user && user.username && user.avatarUrl && userData.username && userData.avatarUrl) {
                      handleFriendRequest(user.username, user.avatarUrl, userData.username, userData.avatarUrl);
                    }
                  }}>Friend Invite</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSearch;