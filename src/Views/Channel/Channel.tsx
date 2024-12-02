import ChannelSideBar from "../../components/ChannelSideBar/ChannelSideBar";
import { useEffect, useRef, useState } from "react";
import MessageComponent from "../../components/MessageComponent/Message";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { sendMessage } from "../../services/channel.service";
import { useContext } from "react";
import { UserAppContext } from "../../store/user.context";
import { transformMessages } from "../../helper/helper";
import type { ChannelModel } from "../../models/ChannelModel";
import { MessageModel } from "../../models/MessageModel";
import EmojiPicker from "emoji-picker-react";

type ChannelProps = {
  channel: ChannelModel | null;
};

const Channel: React.FC<ChannelProps> = ({ channel }): JSX.Element => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserAppContext);
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (messageToSend.trim() !== "" && channel) {
        sendMessage(channel.id, user?.uid, user?.displayName, messageToSend);
        setMessageToSend("");
      }
    }
  };

  const handleEmojiClick = (emojiObject: any, event: any) => {
    setMessageToSend(prevInput => prevInput + emojiObject.emoji);
  };

  const handleShowPicker = () => {
    setShowPicker(prevValue => !prevValue);
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (channel) {
      const channelRef = ref(db, `channels/${channel.id}/messages`);
      get(channelRef)
        .then(channelSnapshot => {
          if (channelSnapshot.exists()) {
            const unsubscribe = onValue(channelRef, snapshot => {
              const transformedData = transformMessages(snapshot);
              if (transformedData) {
                setMessages(transformedData);
              }
            });

            return () => unsubscribe();
          } else {
            setMessages([]);
            return null;
          }
        })
        .catch(error => {
          console.error("Error getting messages", error);
        });
    }
  }, [channel]);

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
    if (messageToSend === "") {
      setTextareaHeight(0);
    }
  }, [messageToSend]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="channel-view flex h-full w-[calc(100vw-20rem)]">
      <div className="flex flex-col w-[calc(100vw-35rem)] h-full">
        <div
          ref={chatRef}
          className="display-chat w-[calc(100vw-35rem)] flex-grow overflow-auto p-3"
        >
          {messages.length !== 0 ? (
            messages.map((msg, idx) => (
              <MessageComponent key={idx} message={msg} />
            ))
          ) : (
            <p>No Messages in {channel?.name}</p>
          )}
        </div>
        <div className="p-3 border-t border-base-200 flex gap-1 items-center">
          <textarea
            ref={textareaRef}
            className="textarea w-[70rem] p-2 resize-none overflow-hidden"
            placeholder="Type your message here... and press Enter to send"
            onInput={handleInput}
            value={messageToSend}
            onChange={e => setMessageToSend(e.target.value)}
            onKeyDown={handleSendMessage}
            style={{ height: `${textareaHeight}px` }}
          ></textarea>
          <div className="relative ">
            <button
              tabIndex={0}
              onClick={handleShowPicker}
              className="btn btn-ghost m-1"
            >
              Emojis
            </button>
            {showPicker && (
              <div
                tabIndex={0}
                className="absolute bottom-20 right-0 bg-base-100 rounded-box z-[1] p-2 shadow"
              >
                <div className="h-96">
                  <EmojiPicker height="100%" onEmojiClick={handleEmojiClick} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChannelSideBar />
    </div>
  );
};

export default Channel;
