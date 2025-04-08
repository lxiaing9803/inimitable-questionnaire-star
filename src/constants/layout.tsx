import { ButtonItemType, ButtonEnum } from '@/types/layout';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';

export const ButtonGroupData: ButtonItemType[] = [
  {
    name: '新建问卷',
    key: ButtonEnum.create,
    icon: <PlusOutlined />,
  },
  {
    name: '我的问卷',
    key: ButtonEnum.list,
    icon: <BarsOutlined />,
  },
  {
    name: '星标问卷',
    key: ButtonEnum.star,
    icon: <StarOutlined />,
  },
  {
    name: '回收站',
    key: ButtonEnum.trash,
    icon: <DeleteOutlined />,
  },
];
