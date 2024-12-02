import { transformDate } from "../../helper/helper";
import { MessageModel } from "../../models/MessageModel";
import { useContext } from "react";
import { MdAddReaction, MdDelete } from "react-icons/md";
import { UserAppContext } from "../../store/user.context";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { sendReaction } from "../../services/channel.service";
import { MdEdit } from "react-icons/md";
import { reactionEmoji } from "../../common/constants";
import Modal from "../../hoc/Modal/Modal";
import { useRef } from "react";
import DeleteMessage from "../../Views/ModalViews/DeleteMessage/DeleteMessage";

type MessageProps = {
  message: MessageModel;
};

const Message: React.FC<MessageProps> = ({ message }): JSX.Element => {
  const { user } = useContext(UserAppContext);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [showMessageOptions, setShowMessageOptions] = useState<boolean>(false);
  const deleteMessageRef = useRef<HTMLDialogElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleShowPicker = () => {
    setShowPicker(prevValue => !prevValue);
  };

  const handleEmojiReactionClick = (emojiObject: any, event: any) => {
    if (user && user.uid) {
      sendReaction(message.channelId, message.id, emojiObject.emoji, user.uid);
    }
    setShowPicker(false);
  };

  const handleEmojiClick = (emoji: string, event: any) => {
    if (user && user.uid) {
      sendReaction(message.channelId, message.id, emoji, user.uid);
    }
  };

  return (
    <>
      <div
        className={`chat ${message.sender === user!.uid ? "chat-end" : "chat-start"
          } mt-5 mb-2 relative rounded-2xl hover:bg-base-200`}
        onMouseEnter={() => setShowMessageOptions(true)}
        onMouseLeave={() => setShowMessageOptions(false)}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div
          className={`chat-header flex gap-1 items-center ${message.sender === user!.uid ? "flex-row-reverse" : ""
            }`}>
          <span>{message.senderName}</span>
          <time className="text-xs opacity-50">
            {" "}
            {transformDate(message.timestamp)}
          </time>
        </div>
        <div
          className={`chat-bubble ${message.sender === user!.uid ? "chat-bubble-primary" : ""
            } break-words max-w-full`}>
          <p className="break-words">{message.message}</p>
        </div>
        {showMessageOptions && (
          <div className={`message-options flex absolute top-0 rounded-2xl items-center p-1 ${message.sender === user!.uid ? "left-0 flex-row-reverse" : "right-0"
            }`}>
            <div className={`message-reactions flex gap-2 px-1 ${message.sender === user!.uid ? "flex-row-reverse" : ""}`}>
              {reactionEmoji.map((emoji, index) => (
                <button key={index} onClick={(e) => handleEmojiClick(emoji, e)} className="flex items-center rounded-full hover:scale-125">{emoji}</button>
              ))}
              <button className="flex items-center rounded-full scale-[1.35] hover:scale-150" onClick={handleShowPicker}><MdAddReaction /></button>
              {showPicker && (
                <div
                  className={`absolute z-10 ${message.sender === user!.uid ? "left-[6rem]" : "right-[6rem]"
                    }`}
                >
                  <EmojiPicker
                    onEmojiClick={handleEmojiReactionClick}
                    lazyLoadEmojis={true}
                    searchDisabled={true}
                    skinTonesDisabled={true}
                  />
                </div>
              )}
            </div>
            {message.sender === user?.uid && (
              <>
                <div className="mx-1">|</div>
                <div className={`message-buttons flex gap-2 px-1 ${message.sender === user!.uid ? "flex-row-reverse" : ""}`}>
                  <button className="flex items-center rounded-full scale-[1.35] hover:scale-150"><MdEdit /></button>
                  <button className="flex items-center rounded-full scale-[1.35] hover:scale-150" onClick={() => setIsDeleteModalOpen(true)}><MdDelete /></button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className={`flex gap-2 z-10 bottom-[-1rem] w-50 flex-wrap ${message.sender === user!.uid
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
      <Modal modalRef={deleteMessageRef} isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen}>
        <DeleteMessage message={message} setIsModalOpen={setIsDeleteModalOpen} />
      </Modal>
    </>
  );
};

export default Message;
