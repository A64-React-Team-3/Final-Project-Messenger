type HomeNavBarProps = {
  handleLogout: () => Promise<void>;
  handleToSettings: () => void;
};

const HomeNavBar: React.FC<HomeNavBarProps> = ({ handleLogout, handleToSettings }): JSX.Element => {

  return (
    <div className="navbar  bg-black" >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
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

export default HomeNavBar;