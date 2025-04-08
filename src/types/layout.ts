export enum ButtonEnum {
  create = 'create',
  list = 'list',
  star = 'star',
  trash = 'trash',
}

export type ButtonTypeKey = keyof typeof ButtonEnum;

export type ButtonItemType = {
  name: string;
  key: ButtonTypeKey;
  icon: React.ReactNode;
};
