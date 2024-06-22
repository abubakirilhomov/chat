import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import Quiz from './Quiz';
import ExitButton from './ExitButton';

const ChatAndQuiz = () => {
  const { roomId } = useParams(); // Получаем номер комнаты из URL

  return (  
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='absoulte left-3 top-7'>
        <ExitButton />
      </div>
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md flex flex-col gap-4">
        <Chat room={roomId} /> 
        <Quiz room={roomId}/>
      </div>
    </div>
  );
};

export default ChatAndQuiz;
