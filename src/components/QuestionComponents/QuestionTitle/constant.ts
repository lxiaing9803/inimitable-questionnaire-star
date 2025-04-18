import {
  QUESTION_TITLE_LEVEL_ENUM,
  QuestionTitleFontSizeMapType,
  QuestionTitlePropsType,
} from './type';

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一个标题',
  level: 1,
  isCenter: false,
};

export const QuestionTitleLevelFontSizeMap: QuestionTitleFontSizeMapType = {
  [QUESTION_TITLE_LEVEL_ENUM.L1]: '24px',
  [QUESTION_TITLE_LEVEL_ENUM.L2]: '20px',
  [QUESTION_TITLE_LEVEL_ENUM.L3]: '16px',
  [QUESTION_TITLE_LEVEL_ENUM.L4]: '14px',
  [QUESTION_TITLE_LEVEL_ENUM.L5]: '12px',
};

export const LevelList = [
  {
    value: 1,
    text: 1,
  },
  {
    value: 2,
    text: 2,
  },
  {
    value: 3,
    text: 3,
  },
  {
    value: 4,
    text: 4,
  },
  {
    value: 5,
    text: 5,
  },
];
