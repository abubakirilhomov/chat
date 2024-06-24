import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import Quiz from './Quiz';
import ExitButton from './ExitButton';

const ChatAndQuiz = () => {
  const { roomId } = useParams(); // Получаем номер комнаты из URL

  return (  
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=''>
        <ExitButton room={roomId}/>
      </div>
        <Chat room={roomId} /> 
        <Quiz room={roomId}/>
    </div>
  );
};

export default ChatAndQuiz;
