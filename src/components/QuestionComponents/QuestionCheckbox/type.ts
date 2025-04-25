export type CheckboxOptionType = {
  value: string;
  text: string;
  checked: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: CheckboxOptionType[];
  disabled?: boolean;
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
};

export type QuestionCheckboxStateDataType = {
  stat: Array<{ name: string; count: number }>;
};
