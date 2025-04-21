import { QuestionComponentPropsType } from '@/components/QuestionComponents';
import { QuestionComponentItemDataType, QuestionComponentStateType } from '@/types/question';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { produce } from 'immer';
import { getNextSelectedId, insertNewComponent } from '@/utils';
import { nanoid } from 'nanoid';

const initialState: QuestionComponentStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
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
        insertNewComponent(draft, newComponent);
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
    removeSelectedComponent: produce((draft: QuestionComponentStateType) => {
      const { selectedId: removeId, componentList } = draft;
      const index = componentList.findIndex((item) => item.fe_id === removeId);
      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList);
      draft.componentList.splice(index, 1);
      draft.selectedId = newSelectedId;
    }),
    // 隐藏/显示组件
    changeComponentHidden: produce(
      (
        draft: QuestionComponentStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const { componentList } = draft;
        const { fe_id, isHidden } = action.payload;
        let newSelectedId: string = '';
        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;
        const currentComponent = componentList.find((item) => item.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.isHidden = isHidden;
        }
      }
    ),
    toggleComponentLocked: produce(
      (draft: QuestionComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload;
        const currentComponent = draft.componentList.find((item) => item.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.isLocked = !currentComponent.isLocked;
        }
      }
    ),
    copySelectedComponent: produce((draft: QuestionComponentStateType) => {
      const { selectedId, componentList } = draft;
      const currentComponent = componentList.find((item) => item.fe_id === selectedId);
      if (currentComponent) {
        draft.copiedComponent = cloneDeep(currentComponent);
      }
    }),
    pasteCopiedComponent: produce((draft: QuestionComponentStateType) => {
      const { copiedComponent } = draft;
      if (!copiedComponent) return;
      copiedComponent.fe_id = nanoid();
      insertNewComponent(draft, copiedComponent);
    }),
    selectPrevComponent: produce((draft: QuestionComponentStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((item) => item.fe_id === selectedId);
      if (index <= 0) return; // 没有选中任何组件
      draft.selectedId = componentList[index - 1].fe_id;
    }),
    selectNextComponent: produce((draft: QuestionComponentStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((item) => item.fe_id === selectedId);
      if (index === -1 || index >= componentList.length - 1) return; // 没有选中任何组件
      draft.selectedId = componentList[index + 1].fe_id;
    }),
    // 重命名组件
    changeComponentTitle: produce(
      (
        draft: QuestionComponentStateType,
        action: PayloadAction<{ fe_id: string; title: string }>
      ) => {
        const { fe_id, title } = action.payload;
        const currentComponent = draft.componentList.find((item) => item.fe_id === fe_id);
        if (currentComponent) {
          currentComponent.title = title;
        }
      }
    ),
  },
});

export const {
  resetComponentList,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = questionComponentsSlice.actions;

export default questionComponentsSlice.reducer;
