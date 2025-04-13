import { Empty, Typography } from 'antd';
import styles from '../manage.module.scss';
import QuestionnaireCard from '@/components/QuestionnaireCard';
import SearchInput from '@/components/SearchInput';
import useLoadQuestionList from '@/hooks/useLoadQuestionList';
import LoadingSpin from '@/components/LoadingSpin';
import ListPagination from '@/components/ListPagination';

const { Title } = Typography;

const Star = () => {
  const { list, total, loading } = useLoadQuestionList({ isStar: true });

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
        ) : list.length === 0 ? (
          <Empty description="暂无数据" />
        ) : (
          <>
            {list.map((item) => {
              return <QuestionnaireCard key={item._id} info={item} />;
            })}
          </>
        )}
      </div>
      {list.length > 0 && !loading && <ListPagination total={total} />}
    </>
  );
};

export default Star;
