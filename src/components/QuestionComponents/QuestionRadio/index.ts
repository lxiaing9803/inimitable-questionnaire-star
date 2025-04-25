import Component from './component';
import PropComponent from './propComponent';
import StatComponent from './statComponent.tsx';
import { QuestionRadioDefaultProps } from './constant';
export * from './type.ts';

export default {
  title: '单选',
  type: 'questionRadio',
  /** 画布组件 */
  Component,
  /** 属性组件 */
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
};
