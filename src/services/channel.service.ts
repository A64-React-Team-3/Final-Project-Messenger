import { get, set, ref, query, equalTo, orderByChild, push, update } from "firebase/database";
import { db } from "../config/firebase-config";
import { UserModel } from "../models/UserModel";

export const createChannel = async (user: UserModel | null, channelName: string, isPrivate: boolean, teamId: string): Promise<void> => {
  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const channel = {
    name: channelName,
    members: { [user && user.uid ? user.uid : '']: true },
    creator: { id: user?.uid, username: user?.username },
    teamId: teamId,
    private: isPrivate,
    createdOn: Date.now(),
  };

  try {
    const result = await push(ref(db, `channels/`), channel);
    const id = result.key;
    await update(ref(db), { [`channels/${id}/id`]: id });
  } catch (error) {
    console.error("Error creating channel", error);
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
  }
};

export const sendMessage = async (channelId: string, userId: string | null | undefined, userDisplayName: string | null | undefined, message: string, imageUrl?: string): Promise<void> => {
  const messageObj = {
    message,
    sender: userId,
    senderName: userDisplayName,
    channelId: channelId,
    imageUrl: imageUrl || null,
    timestamp: Date.now(),
  };
  try {
    const result = await push(ref(db, `channels/${channelId}/messages`), messageObj);
    const id = result.key;
    await update(ref(db), { [`channels/${channelId}/messages/${id}/id`]: id });
  } catch (error) {
    console.error("Error sending message", error);
  }
}


export const sendReaction = async (channelId: string, messageId: string, emoji: string, userId: string): Promise<void> => {
  const reaction = {
    [emoji]: {
      name: emoji,
      count: 1,
      reactors: { [userId]: true },
    },
  };
  try {
    const reactionRef = ref(db, `channels/${channelId}/messages/${messageId}/reactions`);
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
        await set(ref(db, `channels/${channelId}/messages/${messageId}/reactions/`), reactionData);
      } else {
        await set(ref(db, `channels/${channelId}/messages/${messageId}/reactions/${emoji}`), reaction[emoji]);
      }

    } else {
      await set(ref(db, `channels/${channelId}/messages/${messageId}/reactions/`), reaction);
    }
  } catch (error) {
    console.error("Error sending reaction", error);
  }
}

export const deleteMessage = async (channelId: string, messageId: string): Promise<void> => {
  try {
    await set(ref(db, `channels/${channelId}/messages/${messageId}`), null);
  } catch (error) {
    console.error("Error deleting message", error);
  }
}