export type QuestionTextareaPropsType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionTextareaPropsType) => void;
};
