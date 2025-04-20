import Component from './component';
import PropComponent from './propComponent';
import { QuestionParagraphDefaultProps } from './constant';
export * from './type.ts';

export default {
  title: '段落',
  type: 'questionParagraph',
  /** 画布组件 */
  Component,
  /** 属性组件 */
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
