import { QuestionComponentPropsType, QuestionComponentType } from '@/components/QuestionComponents';

/** 问卷组件数据类型 */
export type QuestionComponentItemDataType = {
  fe_id: string;
  title: string;
  /** 问卷组件类型 */
  type: QuestionComponentType;
  /** 组件的props */
  props: QuestionComponentPropsType;
};

export type QuestionnaireDataType = {
  id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
};

export type QuestionnaireRequestParams = {
  title: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
  keyword: string;
};

// 问卷详情数据类型
export type QuestionInfoType = {
  id: string;
  title: string;
  componentList: QuestionComponentItemDataType[];
};
// store中questionComponentsReducer的state类型
export type QuestionComponentStateType = {
  /** 问卷组件列表 */
  componentList: QuestionComponentItemDataType[];
  /** 当前选中的组件id */
  selectedId: string;
};
