import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import questionComponentsReducer from './questionComponentsReducer';
import questionPageSettingReducer from './questionPageSetting';

export const store = configureStore({
  reducer: {
    userReducer,
    questionComponentsReducer,
    questionPageSettingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
