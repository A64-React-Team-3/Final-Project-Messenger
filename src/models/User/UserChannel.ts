import { ChannelType } from "../../common/constants";

export type UserChannel = {
  members?: string[];
  channelId: string | null;
  type: ChannelType;
};
