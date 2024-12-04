import React from "react";
import { MdDelete } from "react-icons/md";

type PreviewImageProps = {
  imageURL: string;
  removeImageFiles: (idx: number) => void;
  idx: number;

};

const PreviewImage: React.FC<PreviewImageProps> = ({ imageURL, removeImageFiles, idx }): JSX.Element => {
  return (
    <div className="avatar">
      <div className="w-40 rounded">
        <img src={imageURL} alt="" />
      </div>
      <button
        className="btn btn-ghost btn-sm absolute hover:bg-transparent top-0 right-0"
        onClick={() => removeImageFiles(idx)}
      >
        <MdDelete color="red" size={20} />
      </button>
    </div >
  );
};

export default PreviewImage;