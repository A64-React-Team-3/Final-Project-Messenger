import React from 'react';
import { NotificationModel } from '../../models/NotificationModel';
import { defaultUserAvatarPath, NotificationStatus } from '../../common/constants';
import { transformDate } from '../../helper/helper';
import { toast } from 'react-toastify';
import { removeNotificationFromRecipient, rejectTeamInvite, acceptTeamInvite } from '../../services/notification.service';
import { useContext } from 'react';
import { TeamAppContext } from '../../store/team.context';

type TeamRequestTableProps = {
  notifications: NotificationModel[];
};


const TeamRequestTable: React.FC<TeamRequestTableProps> = ({ notifications }): JSX.Element => {
  const { team } = useContext(TeamAppContext);

  const handleRemoveNotification = async (notificationId: string, recipientUserName: string) => {
    const result = await removeNotificationFromRecipient(notificationId, recipientUserName);
    if (result) {
      console.log("Notification removed");
    } else {
      console.error("Error removing notification");
    }
  };

  const handleRejectTeamInvite = async (notificationId: string, senderUserName: string, recipientUserName: string) => {
    const result = await rejectTeamInvite(notificationId, senderUserName, recipientUserName);
    if (result) {
      toast.success("Team invite rejected");
    } else {
      toast.error("Error rejecting team invite");
    }
  }

  const handleAcceptTeamInvite = async (notificationId: string, senderUserName: string, recipientUserName: string, teamId: string, teamName: string, teamAvatarUrl: string) => {
    const result = await acceptTeamInvite(notificationId, senderUserName, recipientUserName, teamId, teamName, teamAvatarUrl);
    if (result) {
      toast.success("Team invite accepted");
    } else {
      toast.error("Error accepting team invite");
    }
  };

  return (
    <div className="overflow-x-auto">
      {notifications.length > 0 ? <table className="table">
        <thead>
          <tr>
            <th>From</th>
            <th>To Join Team</th>
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
                        src={notification.teamInvite?.fromAvatarUrl}
                        alt={defaultUserAvatarPath} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{notification.teamInvite?.from}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={notification.teamInvite?.teamAvatarUrl}
                        alt={defaultUserAvatarPath} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{notification.teamInvite?.teamName}</div>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className={`btn btn-sm btn-primary ${notification.teamInvite?.status === NotificationStatus.PENDING ? "" : "btn-disabled"}`}
                  onClick={() => {
                    if (notification?.id && notification.teamInvite?.from && notification.teamInvite?.to && notification.teamInvite?.teamId && notification.teamInvite?.teamName && notification.teamInvite?.teamAvatarUrl) {
                      handleAcceptTeamInvite(notification.id, notification.teamInvite.from, notification.teamInvite.to, notification.teamInvite.teamId, notification.teamInvite.teamName, notification.teamInvite.teamAvatarUrl);
                    }
                  }}
                >
                  Accept
                </button>

              </td>
              <td>
                <button
                  className={`btn btn-sm btn-secondary ${notification.teamInvite?.status === NotificationStatus.PENDING ? "" : "btn-disabled"}`}
                  onClick={() => {
                    if (notification?.id && notification.teamInvite?.from && notification.teamInvite?.to) {
                      handleRejectTeamInvite(notification.id, notification.teamInvite.from, notification.teamInvite.to);
                    }
                  }}
                >Reject</button>
              </td>
              <td>
                <p className='text-lg'>{notification.teamInvite?.status}</p>
              </td>
              <td>
                <p className='text-sm'>{transformDate(notification.teamInvite?.createdOn ?? 0)}</p>
              </td>
              <td>
                <button className="btn btn-sm btn-ghost" onClick={() => {
                  if (notification?.id && notification.teamInvite?.to) {
                    handleRemoveNotification(notification.id, notification.teamInvite?.to);
                  }
                }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <div className="text-center text-lg">No Team Requests requests</div>}
    </div>
  );
};

export default TeamRequestTable;