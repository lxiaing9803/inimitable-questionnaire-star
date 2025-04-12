import { RegexMapType, VALIDATOR_FORM_ITEM_ENUM } from '@/types/user';

/** 用户名正则 */
// export const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]$/;
export const usernameRegex = /^\w+$/;
/** 密码正则 */
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;
/** 昵称正则 */
export const nicknameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]$/;
/** 手机号正则 */
export const phoneRegex = /^1[3-9]\d{9}$/;

export const regexMap: RegexMapType = {
  [VALIDATOR_FORM_ITEM_ENUM.username]: usernameRegex,
  [VALIDATOR_FORM_ITEM_ENUM.password]: passwordRegex,
  [VALIDATOR_FORM_ITEM_ENUM.nickname]: nicknameRegex,
  [VALIDATOR_FORM_ITEM_ENUM.phone]: phoneRegex,
};

export const regexErrorMap = {
  [VALIDATOR_FORM_ITEM_ENUM.username]: '用户名只能包含字母、数字、下划线',
  [VALIDATOR_FORM_ITEM_ENUM.password]: '密码必须必须包含大小写字母、数字和特殊字符',
  [VALIDATOR_FORM_ITEM_ENUM.nickname]: '昵称只能包含字母、数字、下划线和中文',
  [VALIDATOR_FORM_ITEM_ENUM.phone]: '手机号格式不正确',
};
