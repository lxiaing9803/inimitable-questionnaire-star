/**
 * @description: 此文件用于定义公共常用常量声明
 */

// 路由变量
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

/** 路由-页面标题映射 */
export const PAGE_TITLE_MAP = {
  '/': '问卷系统-首页',
  '/login': '问卷系统-登录',
  '/register': '问卷系统-注册',
  '/manage/list': '问卷系统-我的问卷',
  '/manage/star': '问卷系统-星标问卷',
  '/manage/trash': '问卷系统-回收站',
  '/question/operation': '问卷系统-问卷详情',
  '/question/stat': '问卷系统-问卷统计',
};

/** 常用默认参数 */

/** 默认数据条数 */
export const DEFAULT_PAGE_SIZE = 10;

/** token */
export const TOKEN_KEY = 'QUESTION_USER_TOKEN';
/** 统计颜色 */
export const STAT_COLORS: string[] = [
  '#FF2D2D',
  '#BE77FF',
  '#2894FF',
  '#00EC00',
  '#EAC100',
  '#FF9D6F',
];
