import {
  componentConfigGroup,
  QuestionComponentConfigType,
  QuestionComponentType,
} from '@/components/QuestionComponents';
import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import styles from './index.module.scss';
import { useAppDispatch } from '@/utils/hook';
import { addComponent } from '@/store/questionComponentsReducer';
import { useCallback } from 'react';

const { Title } = Typography;

const ComponentLib = () => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (componentConfig: QuestionComponentConfigType) => {
      const { title, type, defaultProps } = componentConfig;

      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type: type as QuestionComponentType,
          props: defaultProps,
        })
      );
    },
    [dispatch]
  );

  const genComponent = useCallback(
    (componentConfig: QuestionComponentConfigType) => {
      const { Component, type } = componentConfig;
      return (
        <div key={type} className={styles.wrapper} onClick={() => handleClick(componentConfig)}>
          <div className={styles.component}>
            <Component />
          </div>
        </div>
      );
    },
    [handleClick]
  );

  return (
    <>
      {componentConfigGroup.map((group) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title level={3} className={styles.title}>
              {groupName}
            </Title>
            <div>{components.map((component) => genComponent(component))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
