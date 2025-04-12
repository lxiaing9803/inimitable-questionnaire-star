import { Typography } from 'antd';
import styles from '../manage.module.scss';
import QuestionnaireCard from '@/components/QuestionnaireCard';
import { QuestionnaireDataType } from '@/types/question';
import SearchInput from '@/components/SearchInput';
import { useCallback, useEffect, useState } from 'react';
import { getQuestionList } from '@/apis/question';

const { Title } = Typography;

const List = () => {
  const [list, setList] = useState<QuestionnaireDataType[]>([]);

  const getData = useCallback(async () => {
    const res = await getQuestionList();
    setList(res.list);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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
          return <QuestionnaireCard key={item._id} info={item} />;
        })}
      </div>
      <div className={styles.footer}>上划加载更多</div>
    </>
  );
};

export default List;
