import { NotificationModel } from '../../models/NotificationModel';
import { NotificationStatus } from '../../common/constants';
import { rejectFriendRequest } from '../../services/notification.service';
import { transformDate } from '../../helper/helper';

type FriendRequestTableProps = {
  notifications: NotificationModel[];
};


const FriendRequestTable: React.FC<FriendRequestTableProps> = ({ notifications }): JSX.Element => {

  const handleFriendRequestReject = async (notificationId: string, senderUserName: string, recipientUserName: string) => {
    if (notificationId && senderUserName && recipientUserName) {
      const result = await rejectFriendRequest(notificationId, senderUserName, recipientUserName);
      if (result) {
        console.log('Friend request rejected');
      } else {
        console.error('Error rejecting friend request');
      }
    };
  }
  return (
    <div className="overflow-x-auto">
      {notifications.length > 0 ? <table className="table">
        <thead>
          <tr>
            <th>From</th>
            <th>Accept</th>
            <th>Reject</th>
            <th>Status</th>
            <th>Date</th>
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
                <button className={`btn btn-sm btn-primary ${notification.friendRequest?.status === NotificationStatus.PENDING ? "" : "disabled"}`}>Accept</button>
              </td>
              <td>
                <button
                  className={`btn btn-sm btn-secondary ${notification.friendRequest?.status === NotificationStatus.PENDING ? "" : "disabled"}`}
                  onClick={() => {
                    if (notification?.id && notification.friendRequest?.from && notification.friendRequest?.to) {
                      handleFriendRequestReject(notification.id, notification.friendRequest.from, notification.friendRequest.to);
                    }
                  }}
                >Reject</button>
              </td>
              <td>
                <p className='text-lg'>{notification.friendRequest?.status}</p>
              </td>
              <td>
                <p className='text-sm'>{transformDate(notification.friendRequest?.createdOn ?? 0)}</p>
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
            <th>Date</th>
            <th>Remove</th>
          </tr>
        </tfoot>
      </table> : <div className="text-center text-lg">No friend requests</div>}
    </div>
  );
};

export default FriendRequestTable;