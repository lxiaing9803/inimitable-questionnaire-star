import { useCallback } from 'react';
import { Flex, Spin } from 'antd';
import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import { getComponentConfigByType } from '@/components/QuestionComponents';
import { QuestionComponentItemDataType } from '@/types/question';
import { useAppDispatch } from '@/utils/hook';
import { changeSelectedId } from '@/store/questionComponentsReducer';
import cn from 'classnames';
import styles from './index.module.scss';

interface OperationCanvasProps {
  loading: boolean;
}

const genComponent = (componentInfo: QuestionComponentItemDataType) => {
  const { type, props } = componentInfo;
  const componentConfig = getComponentConfigByType(type);
  if (!componentConfig) {
    return null;
  }
  const { Component } = componentConfig;
  return <Component {...props} />;
};

const OperationCanvas: React.FC<OperationCanvasProps> = ({ loading }) => {
  const { componentList, selectedId } = useGetQuestionComponentInfo();

  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      dispatch(changeSelectedId(id));
    },
    [dispatch]
  );

  if (loading) {
    return (
      <Flex justify="center">
        <Spin />
      </Flex>
    );
  }

  return (
    <div className={styles.canvas}>
      {componentList.map((item) => {
        const { fe_id } = item;
        return (
          <div
            key={fe_id}
            className={cn(styles.componentWrapper, { [styles.selected]: selectedId === fe_id })}
            onClick={(e) => handleClick(e, fe_id)}
          >
            <div className={styles.component}>{genComponent(item)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OperationCanvas;
