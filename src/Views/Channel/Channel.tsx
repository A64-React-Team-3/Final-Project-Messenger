import ChannelSideBar from "../../components/ChannelSideBar/ChannelSideBar";
import { useEffect, useRef, useState } from "react";
import MessageComponent from "../../components/MessageComponent/Message";
import { get, onValue, ref, set } from "firebase/database";
import { db } from "../../config/firebase-config";
import { sendMessage } from "../../services/channel.service";
import { useContext } from "react";
import { UserAppContext } from "../../store/user.context";
import { transformMessages } from "../../helper/helper";
import type { ChannelModel } from "../../models/ChannelModel";
import { MessageModel } from "../../models/MessageModel";
import EmojiPicker from "emoji-picker-react";
import { MdAddReaction } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import PreviewImage from "../../components/PreviewImage/PreviewImage";
import { uploadMessageImage } from "../../services/storage.service";
import { TeamAppContext } from "../../store/team.context";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

type ChannelProps = {
  channel: ChannelModel | null;
};

const Channel: React.FC<ChannelProps> = ({ channel }): JSX.Element => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useContext(UserAppContext);
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [imagePreviewFilesURL, setImagePreviewFilesURL] = useState<string[]>(
    []
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { team } = useContext(TeamAppContext);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (imageFiles.length > 0) {
        uploadMessageImage(imageFiles)
          .then(imageURLs => {
            if (channel) {
              sendMessage(
                channel.id,
                user?.uid,
                user?.displayName,
                messageToSend,
                imageURLs,
                user?.avatarUrl
              );
              setMessageToSend("");
              setImagePreviewFilesURL([]);
              setImageFiles([]);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }
          })
          .catch(error => {
            console.error("Error uploading image", error);
            toast.error("Error uploading image");
          });
      } else if (messageToSend.trim() !== "" && channel) {
        sendMessage(channel.id, user?.uid, user?.displayName, messageToSend);
        setMessageToSend("");
      }
    }
  };

  const addImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const imageURLs = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviewFilesURL(prevValue => [...prevValue, ...imageURLs]);

      setImageFiles(prevValue => [...prevValue, ...filesArray]);
    }
  };

  const removeImageFiles = (idx: number) => {
    setImagePreviewFilesURL(prevValue =>
      prevValue.filter((_, index) => index !== idx)
    );
    setImageFiles(prevValue => prevValue.filter((_, index) => index !== idx));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      setLoadingMessages(true);
      const channelRef = ref(db, `channels/${channel.id}/messages`);
      get(channelRef)
        .then(_channelSnapshot => {
          const unsubscribe = onValue(channelRef, snapshot => {
            if (snapshot.exists()) {
              const transformedData = transformMessages(snapshot);
              if (transformedData) {
                setMessages(transformedData);
              }
            } else {
              setMessages([]);
            }
          });

          return () => unsubscribe;
        })
        .catch(error => {
          console.error("Error getting messages", error);
          toast.error("Error getting messages");
        })
        .finally(() => setLoadingMessages(false));
    }
  }, [messages.length, channel]);

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
  }, [messages.length]);

  return (
    <>
      <div className="channel-view flex h-full w-[calc(100vw-20rem)]">
        <div className="flex flex-col w-[calc(100vw-35rem)] h-full">
          <div
            ref={chatRef}
            className="display-chat w-[calc(100vw-35rem)] flex-grow overflow-auto p-3 scrollbar-hide"
          >
            {loadingMessages && <LoadingSpinner />}
            {messages.length !== 0 ? (
              messages.map((msg, idx) => (
                <MessageComponent
                  key={idx}
                  message={msg}
                  setMessages={setMessages}
                />
              ))
            ) : (
              <div className="w-full flex justify-center text-secondary font-semibold">
                <p>- No Messages - {channel?.name}</p>
              </div>
            )}
          </div>
          <div className="p-3 flex flex-col gap-1 items-center">
            <div className="flex w-full">
              {imagePreviewFilesURL.length > 0 && (
                <div className="flex flex-row gap-2 mb-1">
                  {imagePreviewFilesURL.map((imageURL, idx) => (
                    <PreviewImage
                      key={idx}
                      idx={idx}
                      imageURL={imageURL}
                      removeImageFiles={removeImageFiles}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-full flex flex-row items-center">
              <textarea
                ref={textareaRef}
                className="textarea p-2 resize-none overflow-hidden w-full shadow-md shadow-primary font-semibold"
                placeholder="Type your message here... and press Enter to send"
                onInput={handleInput}
                value={messageToSend}
                onChange={e => {
                  setMessageToSend(e.target.value);
                }}
                onKeyDown={handleSendMessage}
                style={{ height: `${textareaHeight}px` }}
              ></textarea>
              <div className="relative flex flex-row items-center">
                <button
                  onClick={handleShowPicker}
                  className="btn btn-ghost p-0 m-1 bg-transparent hover:bg-transparent hover:scale-125"
                >
                  <MdAddReaction size={30} />
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-ghost p-0 m-1 bg-transparent hover:bg-transparent hover:scale-125"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple={true}
                    className="file-input file-input-bordered w-full max-w-xs hidden"
                    onChange={e => addImageFiles(e)}
                  />
                  <RiImageAddFill size={30} />
                </button>

                {showPicker && (
                  <div
                    tabIndex={0}
                    className="absolute bottom-20 right-0 bg-base-100 rounded-box z-10 p-2 shadow"
                  >
                    <div className="h-96">
                      <EmojiPicker
                        height="100%"
                        lazyLoadEmojis={true}
                        onEmojiClick={handleEmojiClick}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ChannelSideBar />
      </div>
    </>
  );
};

export default Channel;
