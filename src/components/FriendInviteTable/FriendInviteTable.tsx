import React from "react";
import { NotificationModel } from "../../models/NotificationModel";
import { transformDate } from "../../helper/helper";
import { defaultUserAvatarPath } from "../../common/constants";
import { removeNotificationFromSender } from "../../services/notification.service";

type FriendInviteTableProps = {
  notifications: NotificationModel[];
};

const FriendInviteTable: React.FC<FriendInviteTableProps> = ({ notifications }): JSX.Element => {

  const handleRemoveFriendRequestNotification = async (notificationId: string, senderUserName: string) => {
    if (notificationId && senderUserName) {
      const result = await removeNotificationFromSender(notificationId, senderUserName);
      if (result) {
        console.log('Notification removed');
      } else {
        console.error('Error removing notification');
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      {notifications.length > 0 ? <table className="table">
        <thead>
          <tr>
            <th>To</th>
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
                        src={notification.friendRequest?.toAvatarUrl}
                        alt={defaultUserAvatarPath} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{notification.friendRequest?.to}</div>
                  </div>
                </div>
              </td>
              <td>
                <p className='text-lg'>{notification.friendRequest?.status}</p>
              </td>
              <td>
                <p className='text-sm'>{transformDate(notification.friendRequest?.createdOn ?? 0)}</p>
              </td>
              <td>
                <button className="btn btn-sm btn-ghost" onClick={() => {
                  if (notification?.id && notification.friendRequest?.from) {
                    handleRemoveFriendRequestNotification(notification.id, notification.friendRequest.from);
                  }
                }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <div className="text-center text-lg">No friend invites</div>}
    </div>
  );
};

export default FriendInviteTable;