import Component from './component';
import PropComponent from './propComponent';
import { QuestionInfoDefaultProps } from './constant';
export * from './type.ts';

export default {
  title: '问卷信息',
  type: 'questionInfo',
  /** 画布组件 */
  Component,
  /** 属性组件 */
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
