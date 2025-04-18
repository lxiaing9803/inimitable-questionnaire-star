import { QuestionComponentPropsType } from '@/components/QuestionComponents';
import { QuestionComponentItemDataType, QuestionComponentStateType } from '@/types/question';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState: QuestionComponentStateType = {
  componentList: [],
  selectedId: '',
};

export const questionComponentsSlice = createSlice({
  name: 'questionComponentsReducer',
  initialState,
  reducers: {
    resetComponentList: (_, action: PayloadAction<QuestionComponentStateType>) => action.payload,
    changeSelectedId: produce(
      (draft: QuestionComponentStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      }
    ),
    addComponent: produce(
      (draft: QuestionComponentStateType, action: PayloadAction<QuestionComponentItemDataType>) => {
        const newComponent = action.payload;

        const { selectedId, componentList } = draft;

        const index = componentList.findIndex((item) => item.fe_id === selectedId);
        if (index < 0) {
          draft.componentList.push(newComponent);
        } else {
          draft.componentList.splice(index + 1, 0, newComponent);
        }

        draft.selectedId = newComponent.fe_id;
      }
    ),
    changeComponentProps: produce(
      (
        draft: QuestionComponentStateType,
        action: PayloadAction<{ fe_id: string; newProps: QuestionComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload;
        const currentComponent = draft.componentList.find((item) => item.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.props = {
            ...currentComponent.props,
            ...newProps,
          };
        }
      }
    ),
  },
});

export const { resetComponentList, changeSelectedId, addComponent, changeComponentProps } =
  questionComponentsSlice.actions;

export default questionComponentsSlice.reducer;
