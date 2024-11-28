const FriendRequests: React.FC = (): JSX.Element => {
  enum Status {
    Pending = "Pending",
    Accepted = "Accepted",
    Declined = "Declined",
  }

  type FriendReq = {
    id: number;
    name: string;
    status: Status;
    avatarUrl: string;
  };
  const friendRequests: FriendReq[] = [
    {
      id: 1,
      name: "User 1",
      status: Status.Pending,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
      id: 2,
      name: "User 2",
      status: Status.Pending,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
      id: 3,
      name: "User 3",
      status: Status.Pending,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
      id: 4,
      name: "User 4",
      status: Status.Pending,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
      id: 5,
      name: "User 5",
      status: Status.Pending,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
      id: 6,
      name: "User 6",
      status: Status.Pending,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
  ];
  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Friend Requests</div>
      <div className="collapse-content">
        <div className="max-h-36 overflow-y-auto">
          {friendRequests.map(friend => (
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
          ))}
        </div>
      </div>
    </div>
  );
};
export default FriendRequests;
