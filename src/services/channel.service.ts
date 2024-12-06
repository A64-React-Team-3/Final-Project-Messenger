import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  push,
  update,
  DataSnapshot,
} from "firebase/database";
import { db } from "../config/firebase-config";
import { UserModel } from "../models/UserModel";
import { toast } from "react-toastify";

export const createChannel = async (
  user: UserModel | null,
  channelName: string,
  isPrivate: boolean,
  teamId?: string
): Promise<void> => {
  if (!user) {
    console.error("User is not authenticated");
    toast.error("User is not authenticated");
    return;
  }

  const channel = {
    name: channelName,
    members: { [user && user.uid ? user.uid : ""]: true },
    creator: { id: user?.uid, username: user?.username },
    private: isPrivate,
    teamId: teamId ? teamId : user.uid,
    createdOn: Date.now(),
  };

  try {
    const result = await push(ref(db, `channels/`), channel);
    const id = result.key;
    await update(ref(db), { [`channels/${id}/id`]: id });
    await update(ref(db), { [`teams/${teamId}/channels/${id}`]: true });
  } catch (error) {
    console.error("Error creating channel", error);
    toast.error("Error creating channel");
  }
};

export const getChannels = async (): Promise<any> => {
  const channelsRef = ref(db, "channels/");
  try {
    const channels = await get(channelsRef);
    if (channels.exists()) {
      console.log("Data:", channels.val());
      const data = channels.val();
      return Object.values(data);
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting channels", error);
    toast.error("Error getting channels");
  }
};

export const getChannelsByIds = async (channelIds: string[]): Promise<any> => {
  try {
    const channels = await Promise.all(
      channelIds.map(async channelId => {
        const channelRef = ref(db, `channels/${channelId}`);
        const channelSnapshot = await get(channelRef);
        if (channelSnapshot.exists()) {
          return channelSnapshot.val();
        }
      })
    );
    return channels;
  } catch (error) {
    console.error("Error getting channels by ids", error);
    toast.error("Error getting channels");
  }
};

export const deleteChannel = async (
  channelId: string,
  teamId: string
): Promise<void> => {
  try {
    console.log("channelID", channelId);
    console.log("teamId", teamId);
    await set(ref(db, `teams/${teamId}/channels/${channelId}`), null);
    await set(ref(db, `channels/${channelId}`), null);
  } catch (error) {
    console.error("Error deleting channel", error);
    toast.error("Error deleting channel");
  }
};

export const updateChannel = async (
  channelId: string,
  channelName: string,
  channelPrivate: boolean
): Promise<void> => {
  try {
    await update(ref(db), { [`channels/${channelId}/name`]: channelName });
    await update(ref(db), {
      [`channels/${channelId}/private`]: channelPrivate,
    });
  } catch (error) {
    console.error("Error updating channel", error);
    toast.error("Error updating channel");
  }
};

export const sendMessage = async (
  channelId: string,
  userId: string | null | undefined,
  userDisplayName: string | null | undefined,
  message: string,
  imageUrl?: object | null
): Promise<void> => {
  const messageObj = {
    message,
    sender: userId,
    senderName: userDisplayName,
    channelId: channelId,
    timestamp: Date.now(),
    imageUrl: imageUrl || null,
  };
  try {
    const result = await push(
      ref(db, `channels/${channelId}/messages`),
      messageObj
    );
    const id = result.key;
    await update(ref(db), { [`channels/${channelId}/messages/${id}/id`]: id });
  } catch (error) {
    console.error("Error sending message", error);
    toast.error("Error sending message");
  }
};

export const sendReaction = async (
  channelId: string,
  messageId: string,
  emoji: string,
  userId: string
): Promise<void> => {
  const reaction = {
    [emoji]: {
      name: emoji,
      count: 1,
      reactors: { [userId]: true },
    },
  };
  try {
    const reactionRef = ref(
      db,
      `channels/${channelId}/messages/${messageId}/reactions`
    );
    const reactionSnapshot = await get(reactionRef);
    if (reactionSnapshot.exists()) {
      const reactionData = reactionSnapshot.val();
      if (reactionData[emoji]) {
        if (reactionData[emoji].reactors[userId]) {
          delete reactionData[emoji].reactors[userId];
          reactionData[emoji].count -= 1;
        } else {
          reactionData[emoji].reactors[userId] = true;
          reactionData[emoji].count += 1;
        }

        if (reactionData[emoji].count === 0) {
          delete reactionData[emoji];
        }
        await set(
          ref(db, `channels/${channelId}/messages/${messageId}/reactions/`),
          reactionData
        );
      } else {
        await set(
          ref(
            db,
            `channels/${channelId}/messages/${messageId}/reactions/${emoji}`
          ),
          reaction[emoji]
        );
      }
    } else {
      await set(
        ref(db, `channels/${channelId}/messages/${messageId}/reactions/`),
        reaction
      );
    }
  } catch (error) {
    console.error("Error sending reaction", error);
    toast.error("Error sending reaction");
  }
};

export const deleteMessage = async (
  channelId: string,
  messageId: string
): Promise<void> => {
  try {
    await set(ref(db, `channels/${channelId}/messages/${messageId}`), null);
  } catch (error) {
    console.error("Error deleting message", error);
    toast.error("Error deleting message");
  }
};

export const editMessage = async (
  channelId: string,
  messageId: string,
  message: string
): Promise<void> => {
  try {
    await update(ref(db), {
      [`channels/${channelId}/messages/${messageId}/message`]: message,
    });
  } catch (error) {
    console.error("Error editing message", error);
    toast.error("Error editing message");
  }
};
