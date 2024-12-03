import { MessageModel } from "../../../models/MessageModel";
import { useContext } from "react";
import { UserAppContext } from "../../../store/user.context";
import { transformDate } from "../../../helper/helper";
import { deleteMessage } from "../../../services/channel.service";

type deleteMessageProps = {
  message: MessageModel;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteMessage: React.FC<deleteMessageProps> = ({ message, setIsModalOpen }): JSX.Element => {
  const { user } = useContext(UserAppContext);

  const handleDeleteMessage = () => {
    if (user?.uid === message.sender) {
      deleteMessage(message.channelId, message.id);
      setIsModalOpen(false);
    } else {
      alert("You cannot delete this message");
    }
  }


  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">Delete Message</p>
      <p>Are you sure you want to delete this message?</p>
      <div className="message chat chat-start py-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div
          className={`chat-header flex gap-1 items-center $`}
        >
          <span>{message.senderName}</span>
          <time className="text-xs opacity-50">
            {" "}
            {transformDate(message.timestamp)}
          </time>
        </div>
        <div
          className={`chat-bubble ${message.sender === user!.uid ? "chat-bubble-primary" : ""
            } break-words max-w-full`}
        >
          {message.imageUrl && (
            message.imageUrl.map((url, index) => (
              <div key={index} className="avatar w-40 rounded">
                <img src={url} alt="" className="rounded" />
              </div>
            ))
          )}
          <p className="break-words">{message.message}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-sm btn-error text-error-content" onClick={handleDeleteMessage}>Delete</button>
        <button className="btn btn-sm btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteMessage;