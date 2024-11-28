import ChannelSideBar from "../../components/ChannelSideBar/ChannelSideBar";
import { useEffect, useRef, useState } from "react";
import Message from "../../components/Message/Message";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { sendMessage } from "../../services/channel.service";

type ChannelProps = {
  channel: any;
}

const Channel: React.FC<ChannelProps> = ({ channel }): JSX.Element => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [textareaHeight, setTextareaHeight] = useState(0);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (message.trim() !== '') {
        sendMessage(channel.id, message);
        setMessage('');
      }
    }
  }

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (channel) {
      const channelRef = ref(db, `channels/${channel.id}/messages`);
      if (channelRef) {
        const unsubscribe = onValue(channelRef, (snapshot) => {
          const data = snapshot.val();
          console.log("Data", data);
          if (data) {
            const messages = Object.values(data);
            setMessages(messages);
            console.log("Messages", messages);
          }
        });

        return () => unsubscribe();

      }

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
    <div className="channel-view flex bg-slate-500 w-[calc(100vw-20rem)]">
      <div className="bg-red-400 flex flex-col w-[calc(100vw-35rem)] h-full">
        <div ref={chatRef} className="display-chat bg-slate-900 w-[calc(100vw-35rem)] flex-grow overflow-auto p-2">
          {messages.map((msg, idx) => (
            <Message key={idx} message={msg} />
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="w-full p-2 text-black resize-none overflow-hidden"
          placeholder="Type your message here... and press Enter to send"
          onInput={handleInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleSendMessage}
          style={{ height: `${textareaHeight}px`, minHeight: '5rem' }}
        ></textarea>
      </div>
      <ChannelSideBar />
    </div>
  );
}

export default Channel;