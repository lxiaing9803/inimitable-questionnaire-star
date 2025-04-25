import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import styles from './index.module.scss';
import { getComponentConfigByType, QuestionComponentType } from '@/components/QuestionComponents';
import cn from 'classnames';
import { useCallback } from 'react';
import { StatComponentDataType } from '@/types/stat';

const LeftPanel: React.FC<StatComponentDataType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  const { componentList } = useGetQuestionComponentInfo();

  const handleClick = useCallback(
    (id: string, type: QuestionComponentType) => {
      setSelectedComponentId(id);
      setSelectedComponentType(type);
    },
    [setSelectedComponentId, setSelectedComponentType]
  );

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, props, type } = c;

          const componentConfig = getComponentConfigByType(type);

          if (!componentConfig) return null;

          const { Component } = componentConfig;

          return (
            <div
              key={fe_id}
              className={cn(styles.componentWrapper, {
                [styles.selected]: selectedComponentId === fe_id,
              })}
              onClick={() => {
                handleClick(fe_id, type);
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LeftPanel;
