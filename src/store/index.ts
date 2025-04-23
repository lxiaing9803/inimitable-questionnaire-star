import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import questionComponentsReducer from './questionComponentsReducer';
import questionPageSettingReducer from './questionPageSetting';
import undoable, { excludeAction } from 'redux-undo';

export const store = configureStore({
  reducer: {
    userReducer,
    questionComponentsReducer: undoable(questionComponentsReducer, {
      limit: 20,
      filter: excludeAction([
        'questionComponentsReducer/resetComponents',
        'questionComponentsReducer/changeSelectedId',
        'questionComponentsReducer/selectPrevComponent',
        'questionComponentsReducer/selectNextComponent',
      ]),
    }),
    questionPageSettingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
