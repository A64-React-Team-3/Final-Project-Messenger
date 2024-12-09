import { ChannelType } from "../../common/constants";

export type UserChannel = {
  channelId: string | null;
  type: ChannelType;
};
