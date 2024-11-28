import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import ProfileButton from "../../components/ProfileButton/ProfileButton";

const Personal: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <HomeSideBar />
        <div className="border-base-300 flex-col justify-center px-4 bg-slate-600 text-slate-50 h-full w-60">
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Friend Requests
            </div>
            <div className="collapse-content">
              <p>User 1</p>
              <p>User 2</p>
              <p>User 3</p>
            </div>
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Friends</div>
              <div className="collapse-content">
                <p>User 1</p>
                <p>User 2</p>
                <p>User 3</p>
              </div>
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
          </div>
        </div>
        <div className="navbar py-0 px-0 bg-zinc-900 h-14"></div>
        <ProfileButton />
      </div>
    </>
  );
};
export default Personal;
