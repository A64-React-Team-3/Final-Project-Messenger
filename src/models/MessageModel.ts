export type MessageModel = {
  id: string;
  message: string;
  senderName: string;
  sender: string;
  channelId: string;
  timestamp: number;
  imageUrl?: string;
  reactions?: [
    {
      emojiName: string;
      count: number;
      reactors: string[];
    }
  ];
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