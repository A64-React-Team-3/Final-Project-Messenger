import { Message } from './Message';


export type Channel = {
  name: string;
  id: string;
  members: string[];
  messages: Message[] | null;
  creator: string;
  createdOn: number;
  teamId: string;
  private: boolean | null;
};