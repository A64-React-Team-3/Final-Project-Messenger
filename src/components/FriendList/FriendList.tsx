import { useContext, useEffect, useRef, useState } from "react";
import { UserAppContext } from "../../store/user.context";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { getAllUsers } from "../../services/user.service";
import { UserModel } from "../../models/UserModel";
import { TeamAppContext } from "../../store/team.context";
import { getTeams, inviteToTeam } from "../../services/team.service";
import { TeamModel } from "../../models/Team/TeamModel";
import { defaultTeamImgUrl } from "../../common/constants";
import { transformTeams } from "../../helper/helper";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { FriendModel } from "../../models/User/FriendModel";

const FriendList: React.FC = (): JSX.Element => {
  const [friendSettings, setFriendSettings] = useState<string | null>(null);
  const [unfriendConfirm, setUnfriendConfirm] = useState<string | null>(null);
  const [pickTeam, setPickTeam] = useState<string | null>(null);
  const [pickedTeamName, setPickedTeamName] = useState<string | null>(null);
  const [pickFriend, setPickFriend] = useState<UserModel | null>(null);
  const [friends, setFriends] = useState<UserModel[] | null>(null);
  const [teams, setTeams] = useState<TeamModel[] | null>([]);
  const { user } = useContext(UserAppContext);
  const [loadingFriends, setLoadingFriends] = useState<boolean>(false);
  const friendSettingsRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (user && !friends) {
      setLoadingFriends(true);
      // const friendsRef = ref(db, `users/${user?.username}/friends`);
      const friendsRef = ref(db, `users`);
      // get(friendsRef)
      //   .then(snapshot => {
      //     if (snapshot.exists()) {
      //       const unsubscribe = onValue(friendsRef, snapshot => {
      //         console.log("result", snapshot.val());
      //       });

      //       return () => unsubscribe();
      //     } else {
      //       // friends([]);
      //       console.log("failed to get friends", snapshot.val());
      //       return null;
      //     }
      //   })
      //   .catch(error => {
      //     console.error("Error getting friends", error);
      //   });
      getAllUsers()
        .then(snapshot => {
          if (snapshot) {
            const unsubscribe = onValue(friendsRef, snapshot => {
              console.log("result", snapshot.val());
              // const transformedData =
              //   [snapshot.val()[Object.keys(snapshot.val())[0]]];
              // setFriends(transformedData);
              setFriends(Object.values(snapshot.val()));
              // setFriends([snapshot.val()]);
              // setFriends(Object.values([snapshot.val()]));
              // console.log("friends", friends);
            });
            return () => unsubscribe();
          } else {
            toast.error("failed to get friends");
            return null;
          }
        })
        .catch(error => {
          console.error("Error getting friends", error);
          toast.error("Error getting friends");
        })
        .finally(() => setLoadingFriends(false));
    }
  }, [user]);
  useEffect(() => {
    if (pickFriend) {
      const teamsRef = ref(db, "teams/");
      try {
        getTeams().then(snapshot => {
          if (snapshot) {
            const unsubscribe = onValue(teamsRef, snapshot => {
              const teamsData = transformTeams(snapshot);
              console.log("teamsData", teamsData);
              setTeams(teamsData);
            });
            return () => unsubscribe();
          } else {
            console.log("Error fetching teams");
          }
        });
      } catch (error) {
        console.log("Error getting teams", error);
      }
    }
  }, [pickFriend]);
  const handleUnfriend = (friend: UserModel) => {
    console.log("unfriend: ", friend.displayName);
    toast.error(`${friend.displayName} was removed from friends!`);
    setUnfriendConfirm(null);
    setFriendSettings(null);
  };

  const toggleFriendSettings = (id: string) => {
    setFriendSettings(prev => (prev === id ? null : id));
    // if (friendSettingsRef.current && friendSettings === id) {
    //   friendSettingsRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
  };
  const handleInviteToTeam = async () => {
    if (!pickTeam) {
      toast.info("Please select a team first!");
      return;
    }
    if (pickFriend) {
      console.log("Invite ", pickFriend?.displayName, "to team ", pickTeam);
      try {
        await inviteToTeam(pickFriend.username, pickTeam);
        toast.success(
          `Invited ${pickFriend.displayName} to team ${pickedTeamName}!`
        );
      } catch (error) {
        console.error("Error inviting user to team: ", error);
        toast.error("Error inviting user to team!");
      }
      setPickFriend(null);
      setPickTeam(null);
      setPickedTeamName(null);
    }
  };
  const selectTeamOption = (teamId: string, name: string) => {
    setPickTeam(teamId);
    setPickedTeamName(name);
    // console.log(teamId);
  };
  return (
    <div className="collapse collapse-arrow bg-base-400 rounded-box w-full">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Friends</div>
      <div className="collapse-content">
        <div className="max-h-48 overflow-y-auto scrollbar-hide">
          {loadingFriends && <LoadingSpinner />}
          {friends &&
            friends.map(friend => (
              <div key={friend.uid} className="mb-2">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleFriendSettings(friend.uid)}
                  onKeyDown={e =>
                    e.key === "Enter" && toggleFriendSettings(friend.uid)
                  }
                  className="flex items-center gap-3 p-1  rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      {friend.avatarUrl && (
                        <img
                          alt={`${friend.displayName}'s avatar`}
                          src={friend.avatarUrl}
                        />
                      )}
                    </div>
                  </div>
                  <p className="font-semibold">{friend.displayName}</p>
                </div>
                {friendSettings === friend.uid && (
                  <ul className="menu menu-sm bg-gray-700 rounded-box mt-2 w-48 p-2 shadow">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <button
                        className="text-primary hover:text-secondary"
                        onClick={() => setPickFriend(friend)}
                      >
                        Invite to Team
                      </button>
                    </li>
                    <li ref={friendSettingsRef}>
                      <button
                        className="text-red-500 hover:text-red-700 hover:font-bold"
                        onClick={() => setUnfriendConfirm(friend.uid)}
                      >
                        Unfriend
                      </button>
                    </li>
                  </ul>
                )}
                {unfriendConfirm === friend.uid && (
                  <div className="modal modal-open">
                    <div className="modal-box bg-gray-800 text-white shadow-xl rounded-lg transition-transform transform duration-300 scale-100 hover:scale-105">
                      <h3 className="font-bold text-xl text-red-500 mb-6 text-center">
                        Are you sure you want to unfriend {friend.displayName}?
                      </h3>
                      <div className="modal-action justify-center space-x-4">
                        <button
                          className="btn btn-error btn-outline font-semibold rounded-full shadow-md  hover:scale-105 transition-all"
                          onClick={() => handleUnfriend(friend)}
                        >
                          Yes, Unfriend
                        </button>
                        <button
                          className="btn btn-secondary btn-outline font-semibold rounded-full shadow-md hover:scale-105 transition-all"
                          onClick={() => setUnfriendConfirm(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          {pickFriend && (
            <div className="modal modal-open" style={{ zIndex: 49 }}>
              <div className="modal-box flex flex-col items-center bg-base-300 h-auto w-80 overflow-hidden">
                <h3 className="font-bold text-xl text-primary text-center mb-3">
                  Invite {pickFriend.displayName} to team:
                </h3>

                <div className="form-control w-3/4 flex items-center bg-base-300">
                  <div className="flex flex-col items-center w-3/4 z-50 justify-center ">
                    <ul className="menu p-2 shadow bg-base-100 rounded-box w-64 max-h-[20vh] overflow-auto flex flex-row ">
                      {teams &&
                        teams.map(team => (
                          <li
                            onClick={() =>
                              selectTeamOption(team.teamId, team.name)
                            }
                            key={team.teamId}
                          >
                            <a className="flex items-center space-x-2">
                              <img
                                src={team.avatarUrl || defaultTeamImgUrl}
                                alt={`${team.name} avatar`}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="break-words truncate w-32">
                                {team.name}
                              </span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="modal-action justify-between space-x-4 w-full ">
                  <button
                    className="btn btn-outline btn-primary text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all"
                    onClick={handleInviteToTeam}
                  >
                    Invite
                  </button>
                  <span className="break-words truncate max-w-20 text-center mt-2">
                    {pickedTeamName}
                  </span>
                  <button
                    className="btn btn-outline btn-secondary text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all"
                    onClick={() => {
                      setPickFriend(null);
                      setPickTeam(null);
                      setPickedTeamName(null);
                      return;
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
