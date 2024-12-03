import React from "react";
import { MdDelete } from "react-icons/md";

type PreviewImageProps = {
  imageURL: string;
  removeImageFiles: (imageURL: string) => void;

};

const PreviewImage: React.FC<PreviewImageProps> = ({ imageURL, removeImageFiles }): JSX.Element => {
  return (
    <div className="avatar">
      <div className="w-40 rounded">
        <img src={imageURL} alt="" />
      </div>
      <button
        className="btn btn-ghost btn-sm absolute hover:bg-transparent top-0 right-0"
        onClick={() => removeImageFiles(imageURL)}
      >
        <MdDelete color="red" size={20} />
      </button>
    </div >
  );
};

export default PreviewImage;