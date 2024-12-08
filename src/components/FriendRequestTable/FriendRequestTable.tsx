import { NotificationModel } from '../../models/NotificationModel';

type FriendRequestTableProps = {
  notifications: NotificationModel[];
};


const FriendRequestTable: React.FC<FriendRequestTableProps> = ({ notifications }): JSX.Element => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>From</th>
            <th>Accept</th>
            <th>Reject</th>
            <th>Status</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={notification.friendRequest?.fromAvatarUrl}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{notification.friendRequest?.from}</div>
                  </div>
                </div>
              </td>
              <td>
                <button className="btn btn-sm btn-primary">Accept</button>
              </td>
              <td>
                <button className="btn btn-sm btn-secondary">Reject</button>
              </td>
              <td>
                <p className='text-lg'>{notification.friendRequest?.status}</p>
              </td>
              <td>
                <button className="btn btn-sm btn-ghost">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>From</th>
            <th>Accept</th>
            <th>Reject</th>
            <th>Status</th>
            <th>Remove</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FriendRequestTable;