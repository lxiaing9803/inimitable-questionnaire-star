export type QuestionDataType = {
  id: string;
  title: string;
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
