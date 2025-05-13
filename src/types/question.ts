import { QuestionComponentPropsType, QuestionComponentType } from '@/components/QuestionComponents';

/** 问卷组件数据类型 */
export type QuestionComponentItemDataType = {
  fe_id: string;
  title: string;
  /** 问卷组件类型 */
  type: QuestionComponentType;
  /** 组件的props */
  props: QuestionComponentPropsType;
  /** 组件的显示/隐藏 */
  isHidden?: boolean;
  /** 组件的锁定/解锁 */
  isLocked?: boolean;
};

export type QuestionDataType = {
  id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
  _id: string;
};

export type QuestionDataRequestParams = {
  title: string;
  isStar: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

export type QuestionRequestParams = Omit<QuestionDataType, 'id' | 'createdAt'> & QuestionInfoType;

// 问卷详情数据类型
export type QuestionInfoType = {
  id: string;
  title: string;
  componentList: QuestionComponentItemDataType[];
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};
// store中questionComponentsReducer的state类型
export type QuestionComponentStateType = {
  /** 问卷组件列表 */
  componentList: QuestionComponentItemDataType[];
  /** 当前选中的组件id */
  selectedId: string;
  /** 当前复制的组件 */
  copiedComponent: QuestionComponentItemDataType | null;
};

export enum QUESTION_RIGHT_PANEL_TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

export type QuestionRightPanelTabItemType =
  | QUESTION_RIGHT_PANEL_TAB_KEYS.PROP_KEY
  | QUESTION_RIGHT_PANEL_TAB_KEYS.SETTING_KEY;

export type QuestionPageSettingType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};
