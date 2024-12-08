import { NotificationModel } from '../models/NotificationModel';
import { NotificationStatus, NotificationType } from '../common/constants';
import { FriendRequestModel } from '../models/FriendRequestModel';
import { db } from '../config/firebase-config';
import { ref, push, update, get, set } from 'firebase/database';


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
    }

  } catch (error) {
    console.error('Error sending friend request', error);
    return null;
  }
}

export const rejectFriendRequest = async (notificationId: string, senderUserName: string, recipientUserName: string): Promise<boolean | null> => {
  try {
    await update(ref(db), { [`notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    await update(ref(db), { [`users/${senderUserName}/notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    await update(ref(db), { [`users/${recipientUserName}/notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    return true;
  } catch (error) {
    console.error('Error rejecting friend request', error);
    return null;
  }
}
