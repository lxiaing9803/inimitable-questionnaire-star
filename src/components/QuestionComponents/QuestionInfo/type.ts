export type QuestionInfoPropsType = {
  title?: string;
  desc?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionInfoPropsType) => void;
};
