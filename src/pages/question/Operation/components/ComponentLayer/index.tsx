import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked,
} from '@/store/questionComponentsReducer';
import { useAppDispatch } from '@/utils/hook';
import { Button, Input, message, Space } from 'antd';
import { useCallback, useState } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';

const ComponentLayer = () => {
  const { componentList, selectedId } = useGetQuestionComponentInfo();

  const dispatch = useAppDispatch();
  // 记录
  const [changeTitleId, setChangeTitleId] = useState<string>('');

  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedId) return;
      const newTitle = e.target.value.trim();
      if (!newTitle) return;
      dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
    },
    [dispatch, selectedId]
  );

  const onBlur = useCallback(() => {
    setChangeTitleId('');
  }, []);

  const changeHidden = useCallback(
    (fe_id: string, isHidden: boolean) => {
      dispatch(changeComponentHidden({ fe_id, isHidden }));
    },
    [dispatch]
  );

  const changeLocked = useCallback(
    (fe_id: string) => {
      dispatch(toggleComponentLocked({ fe_id }));
    },
    [dispatch]
  );

  const handleTitleClick = useCallback(
    (fe_id: string) => {
      const currentComponent = componentList.find((c) => c.fe_id === fe_id);
      if (currentComponent && currentComponent.isHidden) {
        message.warning('该组件已隐藏，无法进行重命名');
        setChangeTitleId('');
        return;
      }
      if (fe_id !== selectedId) {
        // 执行选中
        dispatch(changeSelectedId(fe_id));
        setChangeTitleId('');
        return;
      }
      setChangeTitleId(fe_id);
    },
    [componentList, dispatch, selectedId]
  );

  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={cn(styles.title, { [styles.selected]: fe_id === selectedId })}
              onClick={() => handleTitleClick(fe_id)}
            >
              {fe_id === changeTitleId && !isHidden ? (
                <Input value={title} onChange={changeTitle} onBlur={onBlur} onPressEnter={onBlur} />
              ) : (
                <span>{title}</span>
              )}
            </div>
            <Space>
              <Button
                shape="circle"
                size="small"
                className={cn({ [styles.btn]: !isHidden })}
                icon={<EyeInvisibleOutlined />}
                type={isHidden ? 'primary' : 'default'}
                onClick={() => changeHidden(fe_id, !isHidden)}
              />
              <Button
                shape="circle"
                size="small"
                className={cn({ [styles.btn]: !isHidden })}
                icon={<LockOutlined />}
                type={isLocked ? 'primary' : 'default'}
                onClick={() => changeLocked(fe_id)}
              />
            </Space>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLayer;
