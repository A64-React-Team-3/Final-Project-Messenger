import { transformDate } from "../../helper/helper";
import { MessageModel } from "../../models/MessageModel";
import { useContext } from "react";
import { UserAppContext } from "../../store/user.context";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

type MessageProps = {
  message: MessageModel;
};


const Message: React.FC<MessageProps> = ({ message }): JSX.Element => {
  const { user } = useContext(UserAppContext);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

  return (
    <div className={`chat ${message.sender === user!.uid ? "chat-end" : "chat-start"} my-4 p-0 relative`} onMouseEnter={() => setIsPickerVisible(true)} onMouseLeave={() => setIsPickerVisible(false)}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className={`chat-header flex gap-1 items-center ${message.sender === user!.uid ? "flex-row-reverse" : ""}`}>
        <span>{message.senderName}</span>
        <time className="text-xs opacity-50"> {transformDate(message.timestamp)}</time>
      </div>
      <div className={`chat-bubble ${message.sender === user!.uid ? "chat-bubble-primary" : ""} break-words max-w-full`} >
        <p className="break-words">
          {message.message}
        </p>
        {/* {isPickerVisible && <div className={`absolute bottom-[-2] ${message.sender === user!.uid ? "right-0" : "left-0"}`}><EmojiPicker reactionsDefaultOpen={true} /></div>} */}
      </div>
      {isPickerVisible && <div className="absolute z-10 right-0 bottom-0 m-0 p-0" style={{ transform: 'scale(0.6)' }}>
        <EmojiPicker
          reactionsDefaultOpen={true}
          lazyLoadEmojis={true}
          searchDisabled={true}
          skinTonesDisabled={true}
        />
      </div>}
    </div>
  );
};

export default Message;