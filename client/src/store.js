import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/RoomSlice';
import nicknameReducer from './slices/NickNameSlice';

export default configureStore({
  reducer: {
    room: roomReducer,
    nickname: nicknameReducer,
  },
});
