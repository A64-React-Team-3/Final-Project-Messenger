import { NotificationModel } from '../models/NotificationModel';
import { NotificationStatus, NotificationType } from '../common/constants';
import { FriendRequestModel } from '../models/FriendRequestModel';
import { db } from '../config/firebase-config';
import { ref, push, update, get, set, remove } from 'firebase/database';
import { FriendModel } from '../models/User/FriendModel';
import { TeamRequestModel } from '../models/TeamRequestModel';
import { UserTeam } from '../models/User/UserTeam';
import { TeamMemberModel } from '../models/Team/TeamMemberModel';


export const sendFriendRequest = async (senderUserName: string, senderAvatarUrl: string, recipientUserName: string, recipientAvatarUrl: string): Promise<boolean | null> => {
  const friendRequest: NotificationModel = {
    type: NotificationType.FRIEND_REQUEST,
    friendRequest: {
      from: senderUserName,
      fromAvatarUrl: senderAvatarUrl,
      to: recipientUserName,
      toAvatarUrl: recipientAvatarUrl,
      createdOn: Date.now(),
      status: NotificationStatus.PENDING,
    } as FriendRequestModel,
  };

  try {
    const result = await push(ref(db, `notifications/`), friendRequest);
    const id = result.key;
    await update(ref(db), { [`notifications/${id}/id`]: id });
    const dbFriendRequest = (await get(ref(db, `notifications/${id}`))).val();
    await set(ref(db, `users/${senderUserName}/notifications/${id}`), dbFriendRequest);
    await set(ref(db, `users/${recipientUserName}/notifications/${id}`), dbFriendRequest);
    if (!id) {
      return false;
    } else {
      return true;
    };

  } catch (error) {
    console.error('Error sending friend request', error);
    return null;
  };
};

export const rejectFriendRequest = async (notificationId: string, senderUserName: string, recipientUserName: string): Promise<boolean | null> => {
  try {
    await update(ref(db), { [`notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    await update(ref(db), { [`users/${senderUserName}/notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    await update(ref(db), { [`users/${recipientUserName}/notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    return true;
  } catch (error) {
    console.error('Error rejecting friend request', error);
    return null;
  };
};

export const acceptFriendRequest = async (
  notificationId: string,
  senderUserName: string,
  recipientUserName: string,
  senderAvatarUrl: string,
  recipientAvatarUrl: string
): Promise<boolean | null> => {
  try {
    const friendRecipient: FriendModel = {
      userName: recipientUserName,
      avatarUrl: recipientAvatarUrl,
    };

    const friendSender: FriendModel = {
      userName: senderUserName,
      avatarUrl: senderAvatarUrl,
    };

    await update(ref(db), { [`users/${recipientUserName}/friends/${senderUserName}`]: friendSender });
    await update(ref(db), { [`users/${senderUserName}/friends/${recipientUserName}`]: friendRecipient });

    await update(ref(db), { [`notifications/${notificationId}/friendRequest/status`]: NotificationStatus.ACCEPTED });
    await update(ref(db), { [`users/${senderUserName}/notifications/${notificationId}/friendRequest/status`]: NotificationStatus.ACCEPTED });
    await update(ref(db), { [`users/${recipientUserName}/notifications/${notificationId}/friendRequest/status`]: NotificationStatus.ACCEPTED });
    return true;
  } catch (error) {
    console.error('Error accepting friend request', error);
    return null;
  };
};

export const removeNotificationFromRecipient = async (notificationId: string, recipientUserName: string): Promise<boolean | null> => {
  try {
    await remove(ref(db, `users/${recipientUserName}/notifications/${notificationId}`));
    return true;
  } catch (error) {
    console.error('Error removing friend request', error);
    return null;
  };
};

export const removeNotificationFromSender = async (notificationId: string, senderUserName: string): Promise<boolean | null> => {
  try {
    await remove(ref(db, `notifications/${notificationId}`));
    await remove(ref(db, `users/${senderUserName}/notifications/${notificationId}`));
    return true;
  } catch (error) {
    console.error('Error removing friend request', error);
    return null;
  };
};

export const sendTeamInvite = async (
  senderUserName: string,
  senderAvatarUrl: string,
  recipientUserName: string,
  recipientAvatarUrl: string,
  teamId: string,
  teamName: string,
  teamAvatarUrl: string
): Promise<boolean | null> => {
  const teamInvite: NotificationModel = {
    type: NotificationType.TEAM_INVITE,
    teamInvite: {
      from: senderUserName,
      fromAvatarUrl: senderAvatarUrl,
      to: recipientUserName,
      toAvatarUrl: recipientAvatarUrl,
      teamId: teamId,
      teamName: teamName,
      teamAvatarUrl: teamAvatarUrl,
      createdOn: Date.now(),
      status: NotificationStatus.PENDING,
    } as TeamRequestModel,
  };

  try {
    const result = await push(ref(db, `notifications/`), teamInvite);
    const id = result.key;
    await update(ref(db), { [`notifications/${id}/id`]: id });
    const dbTeamInvite = (await get(ref(db, `notifications/${id}`))).val();
    await set(ref(db, `users/${senderUserName}/notifications/${id}`), dbTeamInvite);
    await set(ref(db, `users/${recipientUserName}/notifications/${id}`), dbTeamInvite);
    if (!id) {
      return false;
    } else {
      return true;
    };
  } catch (error) {
    console.error('Error sending team invite', error);
    return null;
  };
};

export const rejectTeamInvite = async (notificationId: string, senderUserName: string, recipientUserName: string): Promise<boolean | null> => {
  try {
    await update(ref(db), { [`notifications/${notificationId}/teamInvite/status`]: NotificationStatus.REJECTED });
    await update(ref(db), { [`users/${senderUserName}/notifications/${notificationId}/teamInvite/status`]: NotificationStatus.REJECTED });
    await update(ref(db), { [`users/${recipientUserName}/notifications/${notificationId}/teamInvite/status`]: NotificationStatus.REJECTED });
    return true;
  } catch (error) {
    console.error('Error rejecting team invite', error);
    return null;
  };
};

export const acceptTeamInvite = async (
  notificationId: string,
  senderName: string,
  recipientName: string,
  teamId: string,
  teamName: string,
  teamAvatarUrl: string): Promise<boolean | null> => {

  try {
    const userTeam: UserTeam = {
      teamId: teamId,
      teamName: teamName,
      teamAvatarUrl: teamAvatarUrl,
    };

    const teamMember: TeamMemberModel = {
      username: recipientName,
      role: 'member',
    };

    await update(ref(db), { [`users/${recipientName}/teams/${teamId}`]: userTeam });
    await update(ref(db), { [`teams/${teamId}/members/${recipientName}`]: teamMember });

    await update(ref(db), { [`notifications/${notificationId}/teamInvite/status`]: NotificationStatus.ACCEPTED });
    await update(ref(db), { [`users/${senderName}/notifications/${notificationId}/teamInvite/status`]: NotificationStatus.ACCEPTED });
    await update(ref(db), { [`users/${recipientName}/notifications/${notificationId}/teamInvite/status`]: NotificationStatus.ACCEPTED });
    return true;
  } catch (error) {
    console.error('Error accepting team invite', error);
    return null;
  };
};