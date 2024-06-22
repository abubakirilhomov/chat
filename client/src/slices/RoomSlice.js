import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  room: localStorage.getItem('room') || '',
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
      localStorage.setItem('room', action.payload); // Сохранение в localStorage
    },
  },
});

export const { setRoom } = roomSlice.actions;
export default roomSlice.reducer;
