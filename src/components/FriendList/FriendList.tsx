import { useContext, useEffect, useState } from "react";
import { UserAppContext } from "../../store/user.context";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { getAllUsers } from "../../services/user.service";
import { UserModel } from "../../models/UserModel";
import { TeamAppContext } from "../../store/team.context";
import { getTeams } from "../../services/team.service";
import { TeamModel } from "../../models/Team/TeamModel";
import { defaultTeamImgUrl } from "../../common/constants";

const FriendList: React.FC = (): JSX.Element => {
  const [friendSettings, setFriendSettings] = useState<string | null>(null);
  const [unfriendConfirm, setUnfriendConfirm] = useState<string | null>(null);
  const [pickTeam, setPickTeam] = useState<string | null>(null);
  const [friends, setFriends] = useState<UserModel[] | null>(null);
  const [teams, setTeams] = useState<TeamModel[] | null>([]);
  const { user } = useContext(UserAppContext);

  useEffect(() => {
    if (user) {
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
            console.log("failed to get friends");
            return null;
          }
        })
        .catch(error => {
          console.error("Error getting friends", error);
        });
    }
  }, [user]);
  useEffect(() => {
    console.log("friends", friends);
    console.log("teams", teams);
  }, [friends, teams]);
  useEffect(() => {
    console.log("pickTeam", pickTeam);
    try {
      getTeams().then(snapshot => {
        if (snapshot) {
          const result = snapshot;
          console.log("result", result);
          setTeams(result);
        } else {
          console.log("Error fetching teams");
        }
      });
    } catch (error) {
      console.log("Error getting teams", error);
    }
  }, [pickTeam]);
  const handleUnfriend = (friendId: string | null) => {
    console.log("unfriend: ", friendId);
    setUnfriendConfirm(null);
    setFriendSettings(null);
  };

  const toggleFriendSettings = (id: string | null) => {
    setFriendSettings(prev => (prev === id ? null : id));
  };
  const handleInviteToTeam = (username: string) => {
    console.log("username", username);
  };
  return (
    <div className="collapse collapse-arrow bg-base-400 rounded-box w-full">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Friends</div>
      <div className="collapse-content">
        <div className="max-h-48 overflow-y-auto">
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
                  <ul className="menu menu-sm bg-gray-700 rounded-box mt-2 w-52 p-2 shadow">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <button
                        className="text-primary hover:text-secondary"
                        onClick={() => setPickTeam(friend.username)}
                      >
                        Invite to Team
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-red-500 hover:text-red-700 hover:font-bold"
                        onClick={() => setUnfriendConfirm(friend.uid)}
                      >
                        Unfriend
                      </button>
                    </li>
                  </ul>
                )}
                {pickTeam === friend.username && (
                  <div className="modal modal-open ">
                    <div className="modal-box flex flex-col items-center bg-base-200 transition-transform transform duration-300 hover:scale-105">
                      <h3 className="font-bold text-xl text-primary mb-6 text-center">
                        Invite {friend.displayName} to team:
                      </h3>

                      <div className="form-control space-y-4 w-3/4 flex items-center relative">
                        <div className="dropdown flex items-center w-3/4">
                          <button
                            tabIndex={0}
                            className="btn btn-primary w-2/4"
                          >
                            Select a Team
                          </button>
                          <ul
                            tabIndex={0}
                            className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box  w-3/4 mt-2 absolute z-50"
                            style={{ top: "100%" }}
                          >
                            {teams &&
                              teams.map(team => (
                                <li key={team.teamId}>
                                  <a className="flex items-center space-x-2">
                                    <img
                                      src={team.avatarUrl || defaultTeamImgUrl}
                                      alt={`${team.name} avatar`}
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <span>{team.name}</span>
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="modal-action justify-center space-x-4">
                        <button
                          className="btn btn-primary text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all"
                          onClick={() => handleInviteToTeam(friend.username)}
                        >
                          Invite
                        </button>
                        <button
                          className="btn btn-secondary text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all"
                          onClick={() => setPickTeam(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {unfriendConfirm === friend.uid && (
                  <div className="modal modal-open">
                    <div className="modal-box bg-gray-800 text-white shadow-xl rounded-lg transition-transform transform duration-300 scale-100 hover:scale-105">
                      <h3 className="font-bold text-xl text-red-500 mb-6 text-center">
                        Are you sure you want to unfriend {friend.displayName}?
                      </h3>
                      <div className="modal-action justify-center space-x-4">
                        <button
                          className="btn btn-error text-lg font-semibold rounded-full shadow-md  hover:scale-105 transition-all"
                          onClick={() => handleUnfriend(friend.uid)}
                        >
                          Yes, Unfriend
                        </button>
                        <button
                          className="btn btn-secondary   text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all"
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
        </div>
      </div>
    </div>
  );
};

export default FriendList;
