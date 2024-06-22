import { thunk } from 'redux-thunk'; // Correctly import thunk

// Ensure you use the setNickname action correctly
import { setNickname } from './slices/NickNameSlice';

export const setNicknameAsync = (nickname) => (dispatch) => {
  setTimeout(() => {
    dispatch(setNickname(nickname));
  }, 1000);
};
