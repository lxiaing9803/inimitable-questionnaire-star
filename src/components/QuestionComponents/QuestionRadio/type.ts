export type OptionType = {
  value: string;
  label: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  /** 默认值 */
  value?: string;
  disabled?: boolean;
  onChange?: (value: QuestionRadioPropsType) => void;
};
