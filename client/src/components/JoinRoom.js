import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRoom } from '../slices/RoomSlice';

const JoinRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoomInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (room) {
      dispatch(setRoom(room));
      navigate('/room/' + room);
    } else {
      setErrorMessage('Please fill in the room ID');
    }
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (room) {
      dispatch(setRoom(room));
      // Implement room creation logic if needed
      navigate('/room/' + room);
    } else {
      setErrorMessage('Please fill in the room ID');
    }
  };

  const handleChange = (e) => {
    setRoomInput(e.target.value);
    if (e.target.value) {
      setErrorMessage('');
    }
  };

  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      <form className='flex flex-col gap-2 w-1/2'>
        <input 
          onChange={handleChange} 
          type="number" 
          placeholder='Type ID room' 
          required
          className='bg-transparent placeholder:text-primary border-2 rounded-lg border-primary py-2 px-4 outline-none text-primary' 
        />
        {errorMessage && (
          <p className='text-red-500'>{errorMessage}</p>
        )}
        <div className='flex flex-col lg:flex-row items-center gap-2 justify-center text-xs lg:text-lg'>
          <button 
            onClick={handleJoinRoom} 
            className='w-full bg-primary text-white py-3 rounded-box flex-1'
          >
            Join Chat Room
          </button>
          <button 
            onClick={handleCreateRoom} 
            className='w-full bg-primary text-white py-3 rounded-box flex-1'
          >
            Create Chat Room
          </button>
        </div>
      </form>  
    </div>
  );
};

export default JoinRoom;
