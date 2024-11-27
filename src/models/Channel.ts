import { Message } from './Message';


export type Channel = {
  name: string;
  id: string;
  members: string[] | null;
  messages: Message[] | null;
  creator: string | null;
  createdOn: number;
  teamId: string | null;
  private: boolean | null;
};