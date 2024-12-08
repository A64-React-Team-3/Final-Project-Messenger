import React from "react";
import { NotificationModel } from "../../models/NotificationModel";

type FriendInviteTableProps = {
  notifications: NotificationModel[];
};

const FriendInviteTable: React.FC<FriendInviteTableProps> = ({ notifications }): JSX.Element => {
  return (
    <div className="overflow-x-auto">
      {notifications.length > 0 ? <table className="table">
        <thead>
          <tr>
            <th>To</th>
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
                        src={notification.friendRequest?.toAvatarUrl}
                        alt="Avatar Tailwind CSS Component" />
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
                <button className="btn btn-sm btn-ghost">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>To</th>
            <th>Status</th>
            <th>Remove</th>
          </tr>
        </tfoot>
      </table> : <div className="text-center text-lg">No friend invites</div>}
    </div>
  );
};

export default FriendInviteTable;