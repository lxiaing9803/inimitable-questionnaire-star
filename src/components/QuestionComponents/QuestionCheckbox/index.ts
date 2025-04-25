import Component from './component';
import PropComponent from './propComponent';
import StatComponent from './statComponent.tsx';
import { QuestionCheckboxDefaultProps } from './constant';
export * from './type.ts';

export default {
  title: '多选',
  type: 'questionCheckbox',
  /** 画布组件 */
  Component,
  /** 属性组件 */
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
};
