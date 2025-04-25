export enum VALIDATOR_FORM_ITEM_ENUM {
  username = 'username',
  password = 'password',
  nickname = 'nickname',
  phone = 'phone',
}
export interface BasicUserInfoType {
  username: string;
  password: string;
}

export interface UserInfoType extends BasicUserInfoType {
  nickname: string;
  phone?: string;
  avatar?: string;
  email?: string;
  token?: string;
}

export interface RegisterParamsType extends BasicUserInfoType {
  nickname?: string;
}

export interface LoginFormDataType extends BasicUserInfoType {
  remember?: boolean;
}

export interface RegisterFormDataType extends RegisterParamsType {
  confirmPassword: string;
}

export type ValidatorFormItemKeyType = keyof typeof VALIDATOR_FORM_ITEM_ENUM;

export type RegexMapType = {
  [key in ValidatorFormItemKeyType]: RegExp;
};

export type RegexErrorMapType = {
  [key in ValidatorFormItemKeyType]: string;
};
