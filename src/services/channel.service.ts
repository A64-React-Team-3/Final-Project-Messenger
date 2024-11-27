import { get, set, ref, query, equalTo, orderByChild, push, update } from "firebase/database";
import { db } from "../config/firebase-config";
import { User } from "../models/user";

export const createChannel = async (user: User | null, channelName: string, isPrivate: boolean, teamId: string): Promise<void> => {
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

export const sendMessage = async (channelId: string, message: string): Promise<void> => {
  const messageObj = {
    message,
    timestamp: Date.now(),
  };
  try {
    await push(ref(db, `channels/${channelId}/messages`), messageObj);
  } catch (error) {
    console.error("Error sending message", error);
  }
}