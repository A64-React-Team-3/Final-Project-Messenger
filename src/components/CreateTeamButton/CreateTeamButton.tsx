import { FaPlus } from "react-icons/fa6";
const CreateTeamButton: React.FC = (): JSX.Element => {
  return (
    <div className="avatar placeholder">
      <div className=" bg-neutral btn btn-secondary text-neutral-content w-12 rounded-full border-none">
        <FaPlus strokeWidth={10} size={25} />
      </div>
    </div>
  );
};
export default CreateTeamButton;
