import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNickname } from '../slices/NickNameSlice';

const NicknameForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nickname, setNicknameInput] = useState(''); // Замените [] на ''

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setNickname(nickname));
    navigate('/join-room');
  };

  const handleNicknameChange = (e) => {
    setNicknameInput(e.target.value);
  };

  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-2 w-1/2'>
        <input 
          type="text" 
          value={nickname}
          onChange={handleNicknameChange} 
          placeholder='Enter your nickname' 
          className='bg-transparent placeholder:text-primary border-2 rounded-lg border-primary py-2 px-4 outline-none text-primary' 
        />
        <button type="submit" className='w-full bg-primary text-white py-2 rounded-box flex-1'>Set Nickname</button>
      </form>
    </div>
  );
};

export default NicknameForm;
