import Component from './component';
import PropComponent from './propComponent';
import { QuestionTitleDefaultProps } from './constant';
export * from './type.ts';

export default {
  title: '标题',
  type: 'questionTitle',
  /** 画布组件 */
  Component,
  /** 属性组件 */
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
};
