import React, { useEffect } from 'react';
import { UserModel } from '../../models/UserModel';
import { defaultUserAvatarPath, Status } from '../../common/constants';
import { useContext } from 'react';
import { UserAppContext } from '../../store/user.context';
import { createPersonalChannel } from '../../services/channel.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ChannelModel } from '../../models/ChannelModel';
import { UserChannel } from '../../models/User/UserChannel';
import { ChannelType } from '../../common/constants';

type UserMiniProps = {
  member: UserModel;
};


const UserMini: React.FC<UserMiniProps> = ({ member }): JSX.Element => {
  const { user } = useContext(UserAppContext);
  const [userPersonalChannels, setUserPersonalChannels] = useState<UserChannel[]>([]);
  const [isMemberInPersonalChannels, setIsMemberInPersonalChannels] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.channels) {
      const personalChannels = user.channels.filter(channel => channel.type === ChannelType.PERSONAL);
      const userPersonalChannels = personalChannels.filter(channel => {
        if (channel.members) {
          return channel.members.includes(member.username);
        }
        return false;
      });
      setUserPersonalChannels(userPersonalChannels);

      const isMemberInChannels = userPersonalChannels.some(channel =>
        channel.members && channel.members.includes(member.username)
      );
      setIsMemberInPersonalChannels(isMemberInChannels);
      console.log("isMemberInPersonalChannels", isMemberInChannels);
    }
  }, [user, member]);



  const handleSendDm = async (userName: string, recipientName: string) => {
    if (userName === recipientName) {
      toast.error("You can't send a message to yourself");
      return;
    }
    try {
      await createPersonalChannel(userName, recipientName);
      toast.success(`Personal channel created with ${recipientName}`);
    } catch (error) {
      console.error("Error creating personal channel", error);
      toast.error("Error creating personal channel");
    }

  };

  return (
    <div className="flex items-center gap-3 mb-2">
      <div className={`avatar ${member.status === Status.OFFLINE ? 'offline' : 'online'}`}>
        <div className="mask mask-squircle h-12 w-12">
          <img
            src={member.avatarUrl}
            alt={defaultUserAvatarPath} />
        </div>
      </div>
      <div>
        <div className="font-bold">{member.username}</div>
      </div>
      <div>
        <button className={`btn btn-sm btn-circle btn-primary ${isMemberInPersonalChannels ? `btn-disabled` : ""}`} onClick={() => {
          if (user) {
            handleSendDm(user.username, member.username);
          }
        }}>DM</button>
      </div>
    </div>
  );
};

export default UserMini;