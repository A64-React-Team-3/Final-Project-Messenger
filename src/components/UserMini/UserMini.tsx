import React from 'react';
import { UserModel } from '../../models/UserModel';
import { defaultUserAvatarPath, Status } from '../../common/constants';

type UserMiniProps = {
  user: UserModel;
};


const UserMini: React.FC<UserMiniProps> = ({ user }): JSX.Element => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className={`avatar ${user.status === Status.OFFLINE ? 'offline' : 'online'}`}>
        <div className="mask mask-squircle h-12 w-12">
          <img
            src={user.avatarUrl}
            alt={defaultUserAvatarPath} />
        </div>
      </div>
      <div>
        <div className="font-bold">{user.username}</div>
      </div>
      <div>
        <button className="btn btn-sm btn-circle btn-primary">DM</button>
      </div>
    </div>
  );
};

export default UserMini;