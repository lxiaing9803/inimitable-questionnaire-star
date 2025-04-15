import { UserInfoType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Partial<UserInfoType> = {
  username: '',
  password: '',
  email: '',
  avatar: '',
  nickname: '',
  phone: '',
};

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginReducer: (_, action: PayloadAction<Partial<UserInfoType>>) => {
      return action.payload;
    },
    logoutReducer: () => initialState,
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
