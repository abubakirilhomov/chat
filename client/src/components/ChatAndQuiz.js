import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import Quiz from './Quiz';
import ExitButton from './ExitButton';
import RatingModal from './RatingModal';

const ChatAndQuiz = ({ nickname }) => {
  const { roomId } = useParams(); // Get room ID from URL
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const openRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  return (  
    <div className='p-5'>
      <div className='flex justify-between'>
        <ExitButton room={roomId} />
        <button className="btn" onClick={openRatingModal}>Open Ratings</button>
      </div>
      <RatingModal isOpen={isRatingModalOpen} onClose={closeRatingModal} room={roomId} />
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
