import { useState } from "react";
type Friend = {
  id: number;
  name: string;
  avatarUrl: string;
};

const friends: Friend[] = [
  {
    id: 1,
    name: "User 1",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
  {
    id: 2,
    name: "User 2",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
  {
    id: 3,
    name: "User 3",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
  {
    id: 4,
    name: "User 4",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
  {
    id: 5,
    name: "User 5",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
  {
    id: 6,
    name: "User 6",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
];

const FriendList: React.FC = (): JSX.Element => {
  const [friendSettings, setFriendSettings] = useState<number | null>(null);
  const [unfriendConfirm, setUnfriendConfirm] = useState<number | null>(null);

  const handleUnfriend = (friendId: number) => {
    console.log("unfriend: ", friendId);
    setUnfriendConfirm(null);
    setFriendSettings(null);
  };

  const toggleFriendSettings = (id: number) => {
    setFriendSettings(prev => (prev === id ? null : id));
  };

  return (
    <div className="collapse collapse-arrow bg-base-400 rounded-box w-full">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Friends</div>
      <div className="collapse-content">
        <div className="max-h-48 overflow-y-auto">
          {friends.map(friend => (
            <div key={friend.id} className="mb-2">
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleFriendSettings(friend.id)}
                onKeyDown={e =>
                  e.key === "Enter" && toggleFriendSettings(friend.id)
                }
                className="flex items-center gap-3 p-1  rounded-lg hover:bg-gray-700 cursor-pointer"
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      alt={`${friend.name}'s avatar`}
                      src={friend.avatarUrl}
                    />
                  </div>
                </div>
                <p className="font-semibold">{friend.name}</p>
              </div>
              {friendSettings === friend.id && (
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
                      onClick={() => setUnfriendConfirm(friend.id)}
                    >
                      Unfriend
                    </button>
                  </li>
                </ul>
              )}
              {unfriendConfirm === friend.id && (
                <div className="modal modal-open">
                  <div className="modal-box bg-gray-800 text-white shadow-xl rounded-lg transition-transform transform duration-300 scale-100 hover:scale-105">
                    <h3 className="font-bold text-xl text-red-500 mb-6 text-center">
                      Are you sure you want to unfriend {friend.name}?
                    </h3>
                    <div className="modal-action justify-center space-x-4">
                      <button
                        className="btn btn-error text-lg font-semibold rounded-full shadow-md  hover:scale-105 transition-all"
                        onClick={() => handleUnfriend(friend.id)}
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
