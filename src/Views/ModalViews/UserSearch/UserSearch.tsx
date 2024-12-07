import { get } from "firebase/database";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/user.service";
import { UserModel } from "../../../models/UserModel";

type UserSearchProps = {
  setIsUserSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const UserSearch: React.FC<UserSearchProps> = ({ setIsUserSearchModalOpen }): JSX.Element => {
  const [searchUserTerm, setSearchUserTerm] = useState<string>("");
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    getAllUsers().then((users) => {
      setAllUsers(users);
      setSearchedUsers(users.filter((user) => user.username.toLowerCase().includes(searchUserTerm.toLowerCase())));
    });
  }, [searchUserTerm]);


  return (
    <div className="flex flex-col mt-4">
      <div className="form-control">
        <input
          value={searchUserTerm}
          onChange={(e) => setSearchUserTerm(e.target.value)}
          type="text"
          placeholder="Search users"
          className="input input-sm input-bordered w-24 md:w-auto"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Team invite</th>
              <th>Friend invite</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {searchedUsers.map((user) => (
              <tr key={user.uid}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.avatarUrl}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">Team Invite</button>
                </td>
                <td>friend invite</td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Team invite</th>
              <th>Friend invite</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        className="btn btn-primary btn-sm mt-4"
        onClick={() => setIsUserSearchModalOpen(false)}
      >
        Close
      </button>
    </div>
  );
};

export default UserSearch;