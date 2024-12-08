import { NotificationModel } from "../../../models/NotificationModel";
import { useEffect, useState } from "react";
import { NotificationType } from "../../../common/constants";
import FriendRequestTable from "../../../components/FriendRequestTable/FriendRequestTable";
import { useContext } from "react";
import { UserAppContext } from "../../../store/user.context";
import FriendInviteTable from "../../../components/FriendInviteTable/FriendInviteTable";

type UserNotificationProps = {
  setIsUserNotificationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: NotificationModel[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationModel[]>>;
};


const UserNotification: React.FC<UserNotificationProps> = ({
  setIsUserNotificationModalOpen,
  notifications,
  setNotifications }): JSX.Element => {

  const { user } = useContext(UserAppContext);
  const [friendRequests, setFriendRequests] = useState<NotificationModel[]>([]);
  const [friendInvites, setFriendInvites] = useState<NotificationModel[]>([]);
  const [teamInvites, setTeamInvites] = useState<NotificationModel[]>([]);
  const [teamReuqests, setTeamRequests] = useState<NotificationModel[]>([]);

  useEffect(() => {
    const friendRequests = notifications.filter(notification => (notification.type === NotificationType.FRIEND_REQUEST && notification.friendRequest?.to === user?.username));
    const friendInvites = notifications.filter(notification => (notification.type === NotificationType.FRIEND_REQUEST && notification.friendRequest?.from === user?.username));
    const teamInvites = notifications.filter(notification => notification.type === NotificationType.TEAM_INVITE);
    const teamRequests = notifications.filter(notification => notification.type === NotificationType.TEAM_REQUEST);

    setFriendRequests(friendRequests);
    setFriendInvites(friendInvites);
    setTeamInvites(teamInvites);
    setTeamRequests(teamRequests);
  }, [notifications]);



  return (
    <div className="flex flex-col mt-4 max-h-[35rem]">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Friend Requests</div>
        <div className="collapse-content">
          <FriendRequestTable notifications={friendRequests} />
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Friend Invitations</div>
        <div className="collapse-content">
          <FriendInviteTable notifications={friendInvites} />
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Team Requests</div>
        <div className="collapse-content">
          <p>tabindex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Team Invites</div>
        <div className="collapse-content">
          <p>tabindex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
    </div>
  )
};

export default UserNotification;