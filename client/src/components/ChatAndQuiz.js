import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import Quiz from './Quiz';
import ExitButton from './ExitButton';

const ChatAndQuiz = () => {
  const { roomId } = useParams(); // Получаем номер комнаты из URL

  return (  
    <div className='p-5'>
      <ExitButton room={roomId}/>

      <div className="flex justify-between bg-base-100">
        <div className='pw-3/12'>
          <Chat room={roomId} /> 
        </div>
        <div className='w-9/12 flex flex-col xl:flex-row xl:gap-4'>
          <Quiz room={roomId}/>
        </div>
      </div>
    </div>
  );
};

export default ChatAndQuiz;
