import { setNickname } from './slices/NickNameSlice';

export const setNicknameAsync = (nickname) => (dispatch) => {
  setTimeout(() => {
    dispatch(setNickname(nickname));
  }, 1000);
};
