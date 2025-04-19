import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import {
  changeComponentHidden,
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/questionComponentsReducer';
import { useAppDispatch } from '@/utils/hook';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, message, Space, Tooltip } from 'antd';
import { useCallback, useMemo } from 'react';

type ToolBarActionKeyType = 'delete' | 'hidden' | 'lock' | 'copy' | 'paste';

const ToolBar = () => {
  const dispatch = useAppDispatch();

  const { selectedId, selectedComponent, copiedComponent } = useGetQuestionComponentInfo();

  const isLocked = useMemo(() => {
    return selectedComponent?.isLocked ?? false;
  }, [selectedComponent]);

  const handleClick = useCallback(
    (key: ToolBarActionKeyType) => {
      switch (key) {
        case 'delete':
          dispatch(removeSelectedComponent());
          break;
        case 'hidden':
          dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
          break;
        case 'lock':
          dispatch(toggleComponentLocked({ fe_id: selectedId }));
          break;
        case 'copy':
          dispatch(copySelectedComponent());
          message.success('复制成功');
          break;
        case 'paste':
          dispatch(pasteCopiedComponent());
          message.success('粘贴成功');
          break;
        default:
          break;
      }
    },
    [dispatch, selectedId]
  );

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => handleClick('delete')}
          disabled={!selectedId}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={() => handleClick('hidden')}
          disabled={!selectedId}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={() => handleClick('lock')}
          type={isLocked ? 'primary' : 'default'}
          disabled={!selectedId}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={() => handleClick('copy')}
          disabled={!selectedId}
        />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={() => handleClick('paste')}
          disabled={!copiedComponent}
        />
      </Tooltip>
    </Space>
  );
};

export default ToolBar;
