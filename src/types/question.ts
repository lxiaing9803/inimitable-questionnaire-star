export type QuestionDataType = {
  id: string;
  title: string;
};
export type QuestionnaireDataType = {
  _id: string;
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
};
