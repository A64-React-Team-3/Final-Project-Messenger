import { get, set, ref, query, equalTo, orderByChild, push, update } from "firebase/database";
import { db } from "../config/firebase-config";

export const createChannel = async (): Promise<void> => {
  const channel = {
    name: "TEST2",
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