export type MessageModel = {
  message: string;
  senderName: string;
  sender: string;
  channelId: string;
  timestamp: number;
  imageUrl?: string;
};


// export type MessageModel = {
//   message: string;
//   senderName: string;
//   sender: string;
//   channelId: string;
//   timestamp: number;
//   imageUrl?: string;
//   reactions?: {
//     [emoji: string]: {
//       count: number;
//       reactors: string[];
//     };
//   };
// };