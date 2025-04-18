import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import questionComponentsReducer from './questionComponentsReducer';

export const store = configureStore({
  reducer: {
    userReducer,
    questionComponentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
