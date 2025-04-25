import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionInfoConfig, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextareaConfig, { QuestionTextareaPropsType } from './QuestionTextarea';
import QuestionRadioConfig, {
  QuestionRadioPropsType,
  QuestionRadioStateDataType,
} from './QuestionRadio';
import QuestionCheckboxConfig, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStateDataType,
} from './QuestionCheckbox';

export type QuestionComponentType =
  | 'questionTitle'
  | 'questionInput'
  | 'questionParagraph'
  | 'questionInfo'
  | 'questionSelect'
  | 'questionRadio'
  | 'questionCheckbox'
  | 'questionTextarea';

export type QuestionComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

export type QuestionComponentStateType = QuestionRadioStateDataType & QuestionCheckboxStateDataType;

// 组件配置类型
export type QuestionComponentConfigType = {
  title: string;
  type: string;
  Component: React.FC<QuestionComponentPropsType>;
  PropComponent: React.FC<QuestionComponentPropsType>;
  defaultProps: QuestionComponentPropsType;
  StatComponent?: React.FC<QuestionComponentStateType>;
};

const componentConfigList: QuestionComponentConfigType[] = [
  QuestionTitleConfig,
  QuestionInputConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig,
];

// 组件分组
export const componentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConfig, QuestionParagraphConfig, QuestionInfoConfig],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig, QuestionTextareaConfig],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckboxConfig],
  },
];

export const getComponentConfigByType = (type: QuestionComponentType) => {
  return componentConfigList.find((item) => item.type === type);
};
