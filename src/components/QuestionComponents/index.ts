import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle';

export type QuestionComponentType =
  | 'questionTitle'
  | 'questionInput'
  | 'questionSelect'
  | 'questionRadio'
  | 'questionCheckbox'
  | 'questionTextarea';

export type QuestionComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;
// 组件配置类型
export type QuestionComponentConfigType = {
  title: string;
  type: string;
  Component: React.FC<QuestionComponentPropsType>;
  PropComponent: React.FC<QuestionComponentPropsType>;
  defaultProps: QuestionComponentPropsType;
};

const componentConfigList: QuestionComponentConfigType[] = [
  QuestionTitleConfig,
  QuestionInputConfig,
];

// 组件分组
export const componentConfigGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConfig],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConfig],
  },
];

export const getComponentConfigByType = (type: QuestionComponentType) => {
  return componentConfigList.find((item) => item.type === type);
};
