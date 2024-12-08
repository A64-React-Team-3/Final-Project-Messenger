import { NotificationModel } from "../../../models/NotificationModel";
import { useEffect, useState } from "react";
import { NotificationType } from "../../../common/constants";
import FriendRequestTable from "../../../components/FriendRequestTable/FriendRequestTable";
import { useContext } from "react";
import { UserAppContext } from "../../../store/user.context";
import FriendInviteTable from "../../../components/FriendInviteTable/FriendInviteTable";
import { TeamAppContext } from "../../../store/team.context";
import Team from "../../Team/Team";
import TeamInviteTable from "../../../components/TeamInviteTable/TeamInviteTable";
import TeamRequestTable from "../../../components/TeamRequestTable/TeamRequestTable";

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
  const { team } = useContext(TeamAppContext)
  const [friendRequests, setFriendRequests] = useState<NotificationModel[]>([]);
  const [friendInvites, setFriendInvites] = useState<NotificationModel[]>([]);
  const [teamInvites, setTeamInvites] = useState<NotificationModel[]>([]);
  const [teamRequests, setTeamRequests] = useState<NotificationModel[]>([]);
  const [friendRequestCount, setFriendRequestCount] = useState<number>(0);
  const [friendInviteCount, setFriendInviteCount] = useState<number>(0);
  const [teamInviteCount, setTeamInviteCount] = useState<number>(0);
  const [teamRequestCount, setTeamRequestCount] = useState<number>(0);

  useEffect(() => {
    const friendRequests = notifications.filter(notification => (notification.type === NotificationType.FRIEND_REQUEST && notification.friendRequest?.to === user?.username));
    const friendInvites = notifications.filter(notification => (notification.type === NotificationType.FRIEND_REQUEST && notification.friendRequest?.from === user?.username));
    const teamInvites = notifications.filter(notification => (notification.type === NotificationType.TEAM_INVITE && notification.teamInvite?.from === user?.username));
    const teamRequests = notifications.filter(notification => (notification.type === NotificationType.TEAM_INVITE && notification.teamInvite?.to === user?.username));

    setFriendRequests(friendRequests);
    setFriendInvites(friendInvites);
    setTeamInvites(teamInvites);
    setTeamRequests(teamRequests);
  }, [notifications]);

  useEffect(() => {
    setFriendRequestCount(friendRequests.length);
    setFriendInviteCount(friendInvites.length);
    setTeamInviteCount(teamInvites.length);
    setTeamRequestCount(teamRequests.length);
  }, [friendRequests, friendInvites, teamInvites, teamRequests]);



  return (
    <div className="flex flex-col mt-4 max-h-[35rem]">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Friend Requests
          <div className="badge badge-primary ml-2">{friendRequestCount}</div>
        </div>
        <div className="collapse-content">
          <FriendRequestTable notifications={friendRequests} />
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Your Friend Invitations
          <div className="badge badge-primary ml-2">{friendInviteCount}</div>
        </div>
        <div className="collapse-content">
          <FriendInviteTable notifications={friendInvites} />
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Team Requests
          <div className="badge badge-primary ml-2">{teamRequestCount}</div>
        </div>
        <div className="collapse-content">
          <TeamRequestTable notifications={teamRequests} />
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border mb-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Team Invitations
          <div className="badge badge-primary ml-2">{teamInviteCount}</div>
        </div>
        <div className="collapse-content">
          <TeamInviteTable notifications={teamInvites} />
        </div>
      </div>
    </div>
  )
};

export default UserNotification;