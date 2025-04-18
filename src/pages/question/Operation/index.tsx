// import useLoadQuestionDetail from '@/hooks/useLoadQuestionDetail';
import useLoadQuestionDetail from '@/hooks/useLoadQuestionDetail';
import OperationCanvas from './components/OperationCanvas';
import styles from './index.module.scss';
import { useCallback } from 'react';
import { useAppDispatch } from '@/utils/hook';
import { changeSelectedId } from '@/store/questionComponentsReducer';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import ToolHeader from './components/ToolHeader';

const Operation = () => {
  const { loading } = useLoadQuestionDetail();

  const dispatch = useAppDispatch();

  const clearSelectedId = useCallback(() => {
    dispatch(changeSelectedId(''));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ToolHeader />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles.canvasWrapper}>
              <div className={styles.canvas}>
                <OperationCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operation;
