import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import Quiz from './Quiz';
import ExitButton from './ExitButton';
import RatingModal from './RatingModal';

const ChatAndQuiz = ({ nickname }) => {
  const { roomId } = useParams(); // Получаем номер комнаты из URL
  return (  
    <div className='p-5'>
      <div className='flex justify-between'>
        <ExitButton room={roomId} />
        <RatingModal room={roomId}/>  
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 justify-between bg-base-100">
        <div className='w-full lg:w-1/4'>
          <Chat room={roomId} /> 
        </div>
        <div className='w-full lg:w-3/4 flex flex-col xl:flex-row xl:gap-4'>
          <Quiz room={roomId} nickname={nickname}/>
        </div>
      </div>
    </div>
  );
};

export default ChatAndQuiz;
