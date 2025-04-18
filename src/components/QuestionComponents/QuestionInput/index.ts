import Component from './component';
import PropComponent from './propComponent';

import { QuestionInputDefaultProps } from './constant';

export * from './type.ts';

export default {
  title: '输入框',
  type: 'questionInput',
  /** 画布组件 */
  Component,
  /** 属性组件 */
  PropComponent,
  defaultProps: QuestionInputDefaultProps,
};
