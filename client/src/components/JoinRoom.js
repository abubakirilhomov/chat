import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRoom } from '../slices/RoomSlice';

const JoinRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoomInput] = useState('');

  const handleJoinRoom = () => {
    dispatch(setRoom(room));
    navigate('/room/' + room);
  };

  const handleChange = (e) => {
    setRoomInput(e.target.value);
  };

  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      <div className='flex flex-col gap-2 w-1/2'>
        <input 
          onChange={handleChange} 
          type="number" 
          placeholder='type ID room' 
          required
          className='bg-transparent placeholder:text-primary border-2 rounded-lg border-primary py-2 px-4 outline-none text-primary' 
        />
        <div className='flex items-center gap-2 justify-center'>
          <button 
            onClick={handleJoinRoom} 
            className='w-full bg-primary text-white py-2 rounded-box flex-1'
          >
            Join Chat Room
          </button>
          <button 
            onClick={handleJoinRoom} 
            className='w-full bg-primary text-white py-2 rounded-box flex-1'
          >
            Create Chat Room
          </button>
        </div>
      </div>  
    </div>
  );
};

export default JoinRoom;
