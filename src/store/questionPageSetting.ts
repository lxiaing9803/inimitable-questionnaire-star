import { QuestionPageSettingType } from '@/types/question';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState: QuestionPageSettingType = {
  title: '',
  desc: '',
  js: '',
  css: '',
};

export const questionPageSettingSlice = createSlice({
  name: 'questionPageSettingReducer',
  initialState,
  reducers: {
    resetPageSetting: (_, action: PayloadAction<QuestionPageSettingType>) => action.payload,
    changePageSettingTitle: produce((draft, action: PayloadAction<string>) => {
      draft.title = action.payload;
    }),
  },
});

export const { resetPageSetting, changePageSettingTitle } = questionPageSettingSlice.actions;

export default questionPageSettingSlice.reducer;
