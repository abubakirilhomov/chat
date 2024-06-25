import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import DEFAULT_AVATAR_URL from '../assets/images/user-default-image.png';

const socket = io('https://chat-back-1-eg9f.onrender.co');

function Chat({ room }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const nicknameObj = useSelector((state) => state.nickname);
  const nickname = nicknameObj.nickname; // Access the actual nickname string
  const [idCounter, setIdCounter] = useState(0); // Initialize a counter for IDs

  useEffect(() => {
    if (room) {
      const storedMessages = localStorage.getItem(`messages_${room}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }

      socket.emit('joinRoom', room);

      const handleReceiveChatMessage = (data) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, { ...data, isSentByMe: data.sender.nickname === nickname }];
          localStorage.setItem(`messages_${room}`, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      };

      socket.on('receiveChatMessage', handleReceiveChatMessage);

      return () => {
        socket.off('receiveChatMessage', handleReceiveChatMessage);
      };
    }
  }, [room, nickname]);

  const sendMessage = () => {
    if (message.trim() && room) {
      const newMessage = {
        id: idCounter + 1, // Increment ID counter
        avatar: DEFAULT_AVATAR_URL,
        sender: { nickname },
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        footer: 'Sent',
      };

      setIdCounter((prevCounter) => prevCounter + 1); // Update the ID counter

      socket.emit('sendChatMessage', { message: newMessage, room });
      setMessage('');
    }
  };

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[85vh] w-full shadow-md shadow-warning rounded-lg">
      <div className="w-full h-full p-4 bg-base-300 shadow-md rounded-lg">
        <div className="min-h-[90%] overflow-y-scroll mb-4 border border-warning border-opacity-20 rounded-md p-2">
          {messages.map((msg, index) => (
            <div
              key={msg.id || index} // Ensure a unique key even if id is missing
              className={`flex ${msg.isSentByMe ? 'justify-end' : 'justify-start'} mb-2`}
            >
              {!msg.isSentByMe && (
                <div className="flex items-end mr-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300">
                    <img alt="User avatar" src={msg.avatar || DEFAULT_AVATAR_URL} className="w-full h-full rounded-full" />
                  </div>
                </div>
              )}
              <div className={`p-2 rounded-lg ${msg.isSentByMe ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                <div className="text-sm">
                  {msg.sender.nickname} <span className="text-xs opacity-70">{msg.time}</span>
                </div>
                <div className="text-base">
                  {msg.text}
                </div>
                <div className="text-xs opacity-50">
                  {msg.footer}
                </div>
              </div>
              {msg.isSentByMe && (
                <div className="flex items-end ml-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300">
                    <img alt="User avatar" src={msg.avatar || DEFAULT_AVATAR_URL} className="w-full h-full rounded-full" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full mt-2">
          <input
            type="text"
            value={message}
            onChange={inputHandler}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow p-2 rounded-l-md min-h-10 border border-warning placeholder:text-warning placeholder:text-sm text-sm"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="btn btn-warning rounded-none h-full py-4 focus:outline-none max-h-10 text-white rounded-r-md "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
