import { ChannelType } from '../common/constants';
import { MessageModel } from './MessageModel';


export type ChannelModel = {
  name: string;
  id: string;
  members: string[];
  messages?: MessageModel[] | null;
  creator: string;
  createdOn: number;
  type: ChannelType;
  teamId?: string;
  private: boolean | null;
};