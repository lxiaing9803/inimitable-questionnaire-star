export enum QUESTION_TITLE_LEVEL_ENUM {
  L1 = 1,
  L2 = 2,
  L3 = 3,
  L4 = 4,
  L5 = 5,
  L6 = 6,
}

export type LevelType = 1 | 2 | 3 | 4 | 5;

export type QuestionTitlePropsType = {
  text?: string;
  level?: LevelType;
  isCenter?: boolean;
  disabled?: boolean;
  onChange?: (newProps: QuestionTitlePropsType) => void;
};

export type QuestionTitleFontSizeMapType = {
  [key in LevelType]: string;
};
