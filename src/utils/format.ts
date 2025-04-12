import { regexErrorMap, regexMap } from '@/constants/rules';
import { ValidatorFormItemKeyType } from '@/types/user';
/**
 * 表单项校验
 * @param validatorKey 校验项的key(枚举VALIDATOR_FORM_ITEM_ENUM)
 * @param value 校验项的值
 */
export const validatorFormItem = (validatorKey: ValidatorFormItemKeyType, value: string) => {
  if (regexMap[validatorKey].test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error(regexErrorMap[validatorKey]));
};
