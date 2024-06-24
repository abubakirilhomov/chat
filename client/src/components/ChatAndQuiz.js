import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import Quiz from './Quiz';
import ExitButton from './ExitButton';

const ChatAndQuiz = () => {
  const { roomId } = useParams(); // Получаем номер комнаты из URL

  return (  
    <div className="flex items-center justify-center min-h-screen bg-gray-100 sm:mt-8">
      <div className=''>
        <ExitButton room={roomId}/>
      </div>
       <div className='sm:flex sm:flex-col'>
        <Chat room={roomId} /> 
        <Quiz room={roomId}/>
       </div>
    </div>
  );
};

export default ChatAndQuiz;
