import FriendList from "../../components/FriendList/FriendList";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import ProfileButton from "../../components/ProfileButton/ProfileButton";

const Personal: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="flex w-full h-screen">
        <HomeSideBar />
        <div className="border-base-300 flex-col justify-center bg-slate-600 text-slate-50 h-full w-96 p-1">
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Friend Requests
            </div>
            <div className="collapse-content">
              <div className="avatar w-full flex justify-evenly align-middle mb-2">
                <div className="w-10 rounded-full avatar">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
                <p className="text-center">User 1</p>
                <button className="btn btn-success w-12">Accept</button>
                <button className="btn btn-error w-12">Decline</button>
              </div>
              <div className="avatar w-full flex justify-evenly align-middle mb-2">
                <div className="w-10 rounded-full avatar">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
                <p className="text-center">User 2</p>
                <button className="btn btn-success w-12">Accept</button>
                <button className="btn btn-error w-12">Decline</button>
              </div>
              <div className="avatar w-full flex justify-evenly align-middle mb-2">
                <div className="w-10 rounded-full avatar">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
                <p className="text-center">User 3</p>
                <button className="btn btn-success w-12">Accept</button>
                <button className="btn btn-error w-12">Decline</button>
              </div>
            </div>
          </div>
          <FriendList />
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title z-0 text-xl font-medium">
              Text Channels
            </div>
            <div className="collapse-content">
              <p>Channel 1</p>
              <p>Channel 2</p>
              <p>Channel 3</p>
              <p>Channel 4</p>
            </div>
          </div>
        </div>
        <div className="navbar py-0 px-0 bg-zinc-900 h-14 w-full flex items-center justify-between">
          <div className="left-content">
            <h2 className="p-2">Personal View</h2>
          </div>
          <div className="p-2">
            <ProfileButton />
          </div>
        </div>
      </div>
    </>
  );
};
export default Personal;
