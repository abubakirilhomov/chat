import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNickname } from '../slices/NickNameSlice';
import { setRoom } from '../slices/RoomSlice';

const ExitButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExit = () => {
    // Удалить значения из localStorage
    localStorage.removeItem('nickname');
    localStorage.removeItem('room');

    // Сбросить значения в Redux
    dispatch(setNickname(''));
    dispatch(setRoom(''));

    // Перенаправить пользователя на начальную страницу
    navigate('/');
  };

  return (
    <button onClick={handleExit} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
      Exit Chat
    </button>
  );
};

export default ExitButton;
