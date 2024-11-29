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

  const handleSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (messageToSend.trim() !== "" && channel) {
        sendMessage(channel.id, user?.uid, user?.displayName, messageToSend);
        setMessageToSend("");
      }
    }
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
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="channel-view flex h-full bg-slate-500 w-[calc(100vw-20rem)]">
      <div className="bg-red-400 flex flex-col w-[calc(100vw-35rem)] h-full">
        <div
          ref={chatRef}
          className="display-chat bg-slate-900 w-[calc(100vw-35rem)] flex-grow overflow-auto p-3"
        >
          {messages.length !== 0 ? (
            messages.map((msg, idx) => (
              <MessageComponent key={idx} message={msg} />
            ))
          ) : (
            <p>No Messages in {channel?.name}</p>
          )}
        </div>
        <div className="p-3 flex gap-1">
          <textarea
            ref={textareaRef}
            className="textarea w-[70rem] p-2 text-black resize-none overflow-hidden"
            placeholder="Type your message here... and press Enter to send"
            onInput={handleInput}
            value={messageToSend}
            onChange={e => setMessageToSend(e.target.value)}
            onKeyDown={handleSendMessage}
            style={{ height: `${textareaHeight}px`, minHeight: "5rem" }}
          ></textarea>
          <div className="join join-vertical lg:join-horizontal">
            <button className="btn join-item">Button</button>
            <button className="btn join-item">Button</button>
            <button className="btn join-item">Button</button>
          </div>
        </div>

      </div>
      <ChannelSideBar />
    </div>
  );
};

export default Channel;
