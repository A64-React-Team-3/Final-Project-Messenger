type TeamNavBarProps = {
  handleLogout: () => Promise<void>;
  handleToSettings: () => void;
};

const TeamNavBar: React.FC<TeamNavBarProps> = ({ handleLogout, handleToSettings }): JSX.Element => {

  return (
    <div className="navbar py-0 px-0 bg-zinc-900 h-28" >
      <div className="flex-none bg-red-500">
        <div className="dropdown dropdown-begin">
          <div tabIndex={0} role="button" className="btn w-full h-full rounded-none ">
            team name
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a>Team Settings</a></li>
            <li><a>Create Channel</a></li>
            <li><a>Notification Settings</a></li>
          </ul>
        </div>
      </div>
      <div className="flex-1 bg-black tea">
        team name
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a onClick={handleToSettings}>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TeamNavBar;