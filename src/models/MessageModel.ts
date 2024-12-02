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
      name: string;
      count: number;
      reactors: string[];
    }
  ];
};
