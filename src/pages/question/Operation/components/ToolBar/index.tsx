import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/questionComponentsReducer';
import { useAppDispatch } from '@/utils/hook';
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, message, Space, Tooltip } from 'antd';
import { useCallback, useMemo } from 'react';
import { ActionCreators } from 'redux-undo';

type ToolBarActionKeyType =
  | 'delete'
  | 'hidden'
  | 'lock'
  | 'copy'
  | 'paste'
  | 'up'
  | 'down'
  | 'undo'
  | 'redo';

const ToolBar = () => {
  const dispatch = useAppDispatch();

  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetQuestionComponentInfo();

  const selectedIndex = useMemo(() => {
    return componentList.findIndex((item) => item.fe_id === selectedId);
  }, [componentList, selectedId]);

  const isFirst = useMemo(() => {
    return selectedIndex <= 0;
  }, [selectedIndex]);

  const isLast = useMemo(() => {
    return selectedIndex >= componentList.length - 1;
  }, [selectedIndex, componentList]);

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
          break;
        case 'up':
          dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
          break;
        case 'down':
          dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
          break;
        case 'undo':
          dispatch(ActionCreators.undo());
          break;
        case 'redo':
          dispatch(ActionCreators.redo());
          break;
        default:
          break;
      }
    },
    [dispatch, selectedId, selectedIndex]
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
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={() => handleClick('up')}
          disabled={isFirst}
        />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={() => handleClick('down')}
          disabled={isLast}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={() => handleClick('undo')} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={() => handleClick('redo')} />
      </Tooltip>
    </Space>
  );
};

export default ToolBar;
