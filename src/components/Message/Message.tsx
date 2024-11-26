type MessageProps = {
  message: string;
};


const Message: React.FC<MessageProps> = ({ message }): JSX.Element => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="chat-bubble break-words max-w-2xl">{message}</div>
    </div>
  );
};

export default Message;