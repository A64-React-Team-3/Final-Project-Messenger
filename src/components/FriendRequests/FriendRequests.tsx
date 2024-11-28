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
  };
  const friendRequests: FriendReq[] = [
    {
      id: 1,
      name: "User 1",
      status: Status.Pending,
    },
    {
      id: 2,
      name: "User 2",
      status: Status.Pending,
    },
    {
      id: 3,
      name: "User 3",
      status: Status.Pending,
    },
    {
      id: 4,
      name: "User 4",
      status: Status.Pending,
    },
    {
      id: 5,
      name: "User 5",
      status: Status.Pending,
    },
    {
      id: 6,
      name: "User 6",
      status: Status.Pending,
    },
  ];
  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Friend Requests</div>
      <div className="collapse-content">
        <div className="max-h-40 overflow-y-auto">
          {friendRequests.map(friend => (
            <div
              key={friend.id}
              className="avatar w-full flex justify-evenly align-middle mb-2"
            >
              <div className="w-10 rounded-full avatar">
                <img
                  alt={`${friend.name}'s avatar`}
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
              <p className="text-center">{friend.name}</p>
              <button className="btn btn-success w-12">Accept</button>
              <button className="btn btn-error w-12">Decline</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FriendRequests;
