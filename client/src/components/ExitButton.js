import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNickname } from '../slices/NickNameSlice';
import { setRoom } from '../slices/RoomSlice';

const ExitButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExit = () => {
    // Remove values from localStorage
    localStorage.removeItem('nickname');
    localStorage.removeItem('room');
    localStorage.removeItem('quiz_answers'); // Assuming 'quiz_answers' is the key used for storing quiz answers
    localStorage.removeItem('messages'); // Assuming 'messages' is the key used for storing chat messages

    // Reset values in Redux
    dispatch(setNickname(''));
    dispatch(setRoom(''));

    // Redirect user to the initial page
    navigate('/');
  };

  return (
    <button onClick={handleExit} className="p-2 bg-red-500 absolute top-10 text-white rounded-md hover:bg-red-600">
      Exit Chat
    </button>
  );
};

export default ExitButton;
