const FriendList: React.FC = (): JSX.Element => {
  return (
    <div className="collapse">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Friends</div>
      <div className="collapse-content">
        <div className="avatar w-full flex justify-evenly align-middle mb-2">
          <div className="w-10 rounded-full avatar">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
          <p className="text-center">User 1</p>
        </div>
        <div className="avatar w-full flex justify-evenly align-middle mb-2">
          <div className="w-10 rounded-full avatar">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
          <p className="text-center">User 2</p>
        </div>
        <div className="avatar w-full flex justify-evenly align-middle mb-2">
          <div className="w-10 rounded-full avatar">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
          <p className="text-center">User 3</p>
        </div>
      </div>
    </div>
  );
};
export default FriendList;
