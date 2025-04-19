export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionInputPropsType) => void;
};
