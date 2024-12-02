import { transformDate } from "../../helper/helper";
import { MessageModel } from "../../models/MessageModel";
import { useContext } from "react";
import { UserAppContext } from "../../store/user.context";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { sendReaction } from "../../services/channel.service";

type MessageProps = {
  message: MessageModel;
};

const Message: React.FC<MessageProps> = ({ message }): JSX.Element => {
  const { user } = useContext(UserAppContext);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

  const handleEmojiReactionClick = (emojiObject: any, event: any) => {
    if (user && user.uid) {
      sendReaction(message.channelId, message.id, emojiObject.emoji, user.uid);
    }
  };

  return (
    <>
      <div
        className={`chat ${
          message.sender === user!.uid ? "chat-end" : "chat-start"
        } mt-5 mb-2 p-0 relative`}
        onMouseEnter={() => setIsPickerVisible(true)}
        onMouseLeave={() => setIsPickerVisible(false)}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div
          className={`chat-header flex gap-1 items-center ${
            message.sender === user!.uid ? "flex-row-reverse" : ""
          }`}
        >
          <span>{message.senderName}</span>
          <time className="text-xs opacity-50">
            {" "}
            {transformDate(message.timestamp)}
          </time>
        </div>
        <div
          className={`chat-bubble ${
            message.sender === user!.uid ? "chat-bubble-primary" : ""
          } break-words max-w-full`}
        >
          <p className="break-words">{message.message}</p>
        </div>
        {isPickerVisible && (
          <div
            className={`absolute z-10 top-[-2rem] ${
              message.sender === user!.uid ? "left-[50rem]" : "right-[50rem]"
            }`}
          >
            <EmojiPicker
              onReactionClick={handleEmojiReactionClick}
              onEmojiClick={handleEmojiReactionClick}
              reactionsDefaultOpen={true}
              lazyLoadEmojis={true}
              searchDisabled={true}
              skinTonesDisabled={true}
            />
          </div>
        )}
      </div>
      <div
        className={`flex gap-2 z-10 bottom-[-1rem] w-50 flex-wrap ${
          message.sender === user!.uid
            ? "left-[70rem] flex-row-reverse"
            : "right-[70rem]"
        }`}
      >
        {message.reactions?.map((reaction, index) => (
          <span key={index} className="text-xs">
            {reaction.name} {reaction.count}
          </span>
        ))}
      </div>
    </>
  );
};

export default Message;
