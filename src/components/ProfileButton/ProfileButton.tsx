import { signOutUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserAppContext } from "../../store/user.context.ts";
import { defaultUserAvatarPath } from "../../common/constants.ts";
import { setUserStatusOffline } from "../../services/user.service.ts";

const ProfileButton: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserAppContext);
  const handleLogout = async () => {
    try {
      await signOutUser();
      await setUserStatusOffline(user!.username);
      setUser(null);
      navigate("/", { replace: true });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleToSettings = () => {
    navigate("/settings");
  };
  return (
    <div className="dropdown dropdown-end !overflow-visible">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt={defaultUserAvatarPath}
            src={user?.avatarUrl || defaultUserAvatarPath}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box mt-3 w-52 p-2 shadow !z-50"
      >
        <li>
          <a onClick={handleToSettings}>Settings</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};
export default ProfileButton;
