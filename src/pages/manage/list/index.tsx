import { Empty, Spin, Typography } from 'antd';
import QuestionCard from '@/components/QuestionCard';
import { QuestionDataType } from '@/types/question';
import SearchInput from '@/components/SearchInput';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getQuestionList } from '@/apis/question';
import styles from '../manage.module.scss';
import { useDebounceFn, useRequest } from 'ahooks';
import { DEFAULT_PAGE_SIZE } from '@/constants';

const { Title } = Typography;

const List = () => {
  const [list, setList] = useState<QuestionDataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);

  const moreRef = useRef<HTMLDivElement>(null);

  const { run, loading } = useRequest(
    async () => {
      const res = await getQuestionList({ page, pageSize: DEFAULT_PAGE_SIZE });
      return res;
    },
    {
      manual: true,
      onSuccess: (res) => {
        const { total: t, list: l } = res;
        setList(list.concat(l));
        setTotal(t);
        setPage(page + 1);
      },
    }
  );

  const { run: loadMore } = useDebounceFn(
    () => {
      const ele = moreRef.current;
      if (!ele) return;
      const { bottom } = ele.getBoundingClientRect();
      if (bottom < document.body.clientHeight) {
        run();
        setIsStart(true);
      }
    },
    { wait: 1000 }
  );

  const hasMoreData = useMemo(() => {
    return total > list.length;
  }, [list.length, total]);

  const loadMoreContentElement = useMemo(() => {
    if (!isStart || loading) return <Spin />;
    if (total === 0) return <Empty />;
    if (!hasMoreData) return <span>没有更多数据了</span>;
    return <span>加载更多</span>;
  }, [hasMoreData, isStart, loading, total]);

  useEffect(() => {
    run();
  }, [run]);

  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener('scroll', loadMore);
    }
    return () => window.removeEventListener('scroll', loadMore);
  }, [hasMoreData, loadMore]);

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
        {list?.map((item) => {
          return <QuestionCard key={item.id} info={item} />;
        })}
      </div>
      <div className={styles.footer}>
        <div ref={moreRef}>{loadMoreContentElement}</div>
      </div>
    </>
  );
};

export default List;
