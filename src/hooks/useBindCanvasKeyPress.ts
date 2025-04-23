import { useAppDispatch } from '@/utils/hook';
import { useKeyPress } from 'ahooks';
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '@/store/questionComponentsReducer';
import { isActiveElementValid } from '@/utils';
import { message } from 'antd';
import { ActionCreators } from 'redux-undo';

const useBindCanvasKeyPress = () => {
  const dispatch = useAppDispatch();
  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });
  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
    message.success('复制成功');
  });
  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });
  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });
  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(ActionCreators.undo());
    },
    {
      exactMatch: true,
    }
  );
  // 重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(ActionCreators.redo());
    },
    {
      exactMatch: true,
    }
  );
};
export default useBindCanvasKeyPress;
