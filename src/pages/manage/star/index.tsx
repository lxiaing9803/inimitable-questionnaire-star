import { Empty, Typography } from 'antd';
import styles from '../manage.module.scss';
import QuestionnaireCard from '@/components/QuestionnaireCard';
import SearchInput from '@/components/SearchInput';
import useLoadQuestionList from '@/hooks/useLoadQuetionList';
import LoadingSpin from '@/components/LoadingSpin';

const { Title } = Typography;

const Star = () => {
  const { data, loading } = useLoadQuestionList({ isStar: true });

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <SearchInput />
        </div>
      </div>
      <div className={styles.content}>
        {loading ? (
          <LoadingSpin />
        ) : data?.list.length === 0 ? (
          <Empty description="暂无数据" />
        ) : (
          <>
            {data?.list.map((item) => {
              return <QuestionnaireCard key={item._id} info={item} />;
            })}
          </>
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
