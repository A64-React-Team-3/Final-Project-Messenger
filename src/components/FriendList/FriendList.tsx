import { useContext, useEffect, useState } from "react";
import { UserAppContext } from "../../store/user.context";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { getAllUsers } from "../../services/user.service";
import { UserModel } from "../../models/UserModel";
type Friend = {
  id: number;
  name: string;
  avatarUrl: string;
};

const FriendList: React.FC = (): JSX.Element => {
  const [friendSettings, setFriendSettings] = useState<string | null>(null);
  const [unfriendConfirm, setUnfriendConfirm] = useState<string | null>(null);
  const [friends, setFriends] = useState<UserModel[] | null>(null);
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
  }, [friends]);
  const handleUnfriend = (friendId: string | null) => {
    console.log("unfriend: ", friendId);
    setUnfriendConfirm(null);
    setFriendSettings(null);
  };

  const toggleFriendSettings = (id: string | null) => {
    setFriendSettings(prev => (prev === id ? null : id));
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
                      <a>Invite to Team</a>
                    </li>
                    <li>
                      <button
                        className="text-red-500 hover:text-white"
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
