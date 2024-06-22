import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: localStorage.getItem('nickname') || '',
};

const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    setNickname: (state, action) => {
      state.nickname = action.payload;
      localStorage.setItem('nickname', action.payload); // Сохранение в localStorage
    },
  },
});

export const { setNickname } = nicknameSlice.actions;
export default nicknameSlice.reducer;
