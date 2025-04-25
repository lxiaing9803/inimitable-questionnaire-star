import { QuestionComponentType } from '@/components/QuestionComponents';

export type StatDataRequestType = {
  page: number;
  pageSize: number;
};

export type StatDataType = {
  questionId: string;
};

export type StatComponentDataType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type?: QuestionComponentType) => void;
};
