import { MessageModel } from '../../../models/MessageModel';
import { useContext } from 'react';
import { UserAppContext } from '../../../store/user.context';
import { transformDate } from '../../../helper/helper';
import { useState } from 'react';
import { editMessage } from '../../../services/channel.service';

type EditMessageProps = {
  message: MessageModel;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const EditMessage: React.FC<EditMessageProps> = ({ message, setIsModalOpen }): JSX.Element => {
  const { user } = useContext(UserAppContext);
  const [editedMessage, setEditedMessage] = useState<string>(message.message);

  const handleEditMessage = () => {
    if (user?.uid === message.sender) {
      editMessage(message.channelId, message.id, editedMessage);
      setIsModalOpen(false);
    } else {
      alert("You cannot edit this message");
    }
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">Edit Message</p>
      <p>Are you sure you want to edit this message?</p>
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
      <div className="flex flex-col">
        <label className="label">Edit Message</label>
        <textarea
          onChange={(e) => setEditedMessage(e.target.value)}
          value={editedMessage}
          className="textarea textarea-bordered resize-none break-words max-w-xs"
          placeholder="Type here">
        </textarea>
      </div>
      <div className="flex gap-2 pt-2">
        <button className="btn btn-sm btn-secondary" onClick={handleEditMessage}>Edit</button>
        <button className="btn btn-sm btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default EditMessage;