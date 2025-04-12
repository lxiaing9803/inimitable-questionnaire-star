export interface LoginFormDataType {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormDataType extends LoginFormDataType {
  confirmPassword: string;
  nickname?: string;
}

export enum VALIDATOR_FORM_ITEM_ENUM {
  username = 'username',
  password = 'password',
  nickname = 'nickname',
  phone = 'phone',
}

export type ValidatorFormItemKeyType = keyof typeof VALIDATOR_FORM_ITEM_ENUM;

export type RegexMapType = {
  [key in ValidatorFormItemKeyType]: RegExp;
};

export type RegexErrorMapType = {
  [key in ValidatorFormItemKeyType]: string;
};
