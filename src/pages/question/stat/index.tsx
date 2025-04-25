import useGetQuestionPageSetting from '@/hooks/useGetQuestionPageSetting';
import useLoadQuestionDetail from '@/hooks/useLoadQuestionDetail';
import { Button, Flex, Result, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useMemo, useState } from 'react';
import StatHeader from './components/StatHeader';
import LeftPanel from './components/LeftPanel';
import { QuestionComponentType } from '@/components/QuestionComponents';
import StatPage from './components/StatPage';
import StatChart from './components/StatChart';

const LoadingElem = () => {
  return (
    <Flex justify="center" align="center">
      <Spin />
    </Flex>
  );
};

const Stat = () => {
  const { loading } = useLoadQuestionDetail();

  const { isPublished } = useGetQuestionPageSetting();

  const [selectedComponentId, setSelectedComponentId] = useState<string>('');

  const [selectedComponentType, setSelectedComponentType] = useState<
    QuestionComponentType | undefined
  >();

  const navigate = useNavigate();

  const renderElem = useMemo(() => {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该问卷尚未发布"
            extra={
              <Button type="primary" onClick={() => navigate(-1)}>
                返回
              </Button>
            }
          />
        </div>
      );
    }
    return (
      <>
        <div className={styles.left}>
          <LeftPanel
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <StatPage
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <StatChart
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType!}
          />
        </div>
      </>
    );
  }, [isPublished, navigate, selectedComponentId, selectedComponentType]);

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles.contentWrapper}>
        {loading && <LoadingElem />}
        {!loading && <div className={styles.content}>{renderElem}</div>}
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
};

export default Stat;
