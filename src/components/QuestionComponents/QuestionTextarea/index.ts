import Component from './component';
import PropComponent from './propComponent';
import { QuestionTextareaDefaultProps } from './constant';
export * from './type.ts';

export default {
  title: '多行输入',
  type: 'questionTextarea',
  /** 画布组件 */
  Component,
  /** 属性组件 */
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
};
