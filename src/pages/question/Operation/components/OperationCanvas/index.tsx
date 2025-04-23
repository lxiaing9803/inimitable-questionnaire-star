import { useCallback } from 'react';
import { Flex, Spin } from 'antd';
import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import { getComponentConfigByType } from '@/components/QuestionComponents';
import { QuestionComponentItemDataType } from '@/types/question';
import { useAppDispatch } from '@/utils/hook';
import { changeSelectedId } from '@/store/questionComponentsReducer';
import cn from 'classnames';
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress';
import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';
import styles from './index.module.scss';
import useDragSortComponent from '@/hooks/useDragSortComponent';

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
  const { selectedId } = useGetQuestionComponentInfo();

  const { renderComponentList, onDragEnd } = useDragSortComponent();

  useBindCanvasKeyPress();

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
    <SortableContainer items={renderComponentList} onDragEnd={onDragEnd}>
      <div className={styles.canvas}>
        {renderComponentList
          .filter((c) => !c.isHidden)
          .map((item) => {
            const { fe_id } = item;
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={cn(
                    styles.componentWrapper,
                    { [styles.selected]: selectedId === fe_id },
                    { [styles.locked]: item.isLocked }
                  )}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>{genComponent(item)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default OperationCanvas;
