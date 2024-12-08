import { NotificationModel } from '../models/NotificationModel';
import { NotificationStatus, NotificationType } from '../common/constants';
import { FriendRequestModel } from '../models/FriendRequestModel';
import { db } from '../config/firebase-config';
import { ref, push, update, get } from 'firebase/database';


export const sendFriendRequest = async (senderUserName: string, senderAvatarUrl: string, recipientUserName: string): Promise<boolean | null> => {
  const friendRequest: NotificationModel = {
    type: NotificationType.FRIEND_REQUEST,
    friendRequest: {
      from: senderUserName,
      fromAvatarUrl: senderAvatarUrl,
      to: recipientUserName,
      createdOn: Date.now(),
      status: NotificationStatus.PENDING,
    } as FriendRequestModel,
  };

  try {
    const result = await push(ref(db, `notifications/`), friendRequest);
    const id = result.key;
    await update(ref(db), { [`notifications/${id}/id`]: id });
    const dbFriendRequest = (await get(ref(db, `notifications/${id}`))).val();
    await push(ref(db, `users/${senderUserName}/notifications`), dbFriendRequest);
    const finalResult = await push(ref(db, `users/${recipientUserName}/notifications`), dbFriendRequest);
    if (!finalResult.key) {
      return false;
    } else {
      return true;
    }

  } catch (error) {
    console.error('Error sending friend request', error);
    return null;
  }
}

const rejectFriendRequest = async (notificationId: string, userName: string): Promise<boolean | null> => {
  try {
    await update(ref(db), { [`notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    await update(ref(db), { [`users/${userName}/notifications/${notificationId}/friendRequest/status`]: NotificationStatus.REJECTED });
    return true;
  } catch (error) {
    console.error('Error rejecting friend request', error);
    return null;
  }
}
