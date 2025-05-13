import { List, Typography, Skeleton, Divider } from 'antd';
import QuestionCard from '@/components/QuestionCard';
import { QuestionDataType } from '@/types/question';
import SearchInput from '@/components/SearchInput';
import { useEffect, useState } from 'react';
import { getQuestionList } from '@/apis/question';
import styles from '../manage.module.scss';
import { useRequest } from 'ahooks';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Title } = Typography;

const ListPage = () => {
  const [list, setList] = useState<QuestionDataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const { run, loading } = useRequest(
    async () => {
      const res = await getQuestionList({ page, pageSize: DEFAULT_PAGE_SIZE });
      return res;
    },
    {
      manual: true,
      onSuccess: (res) => {
        const { total: t, list: l } = res;
        const newItems = l.filter((newItem) => !list.some((item) => item._id === newItem._id));
        setList(list.concat(newItems));
        setTotal(t);
        setPage(page + 1);
      },
    }
  );

  useEffect(() => {
    run();
  }, [run]);

  useEffect(() => {
    console.log(list, total);
  }, [list, total]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <SearchInput />
        </div>
      </div>
      <div className={styles.content}>
        <InfiniteScroll
          dataLength={total}
          next={run}
          hasMore={list.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={list}
            loading={loading}
            renderItem={(item: QuestionDataType) => <QuestionCard key={item._id} info={item} />}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ListPage;
