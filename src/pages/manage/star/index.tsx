import { Empty, Input, Typography } from 'antd';
import styles from '../manage.module.scss';
import QuestionnaireCard from '@/components/QuestionnaireCard';
import { QuestionnaireDataType } from '@/types/manage';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const DEFAULT_DATA: QuestionnaireDataType[] = [
  {
    _id: '1',
    title: '问卷1',
    isStar: true,
    isPublished: true,
    answerCount: 10,
    createdAt: '2025年04月01日 20:00:00',
  },
  {
    _id: '2',
    title: '问卷2',
    isStar: true,
    isPublished: false,
    answerCount: 20,
    createdAt: '2025年04月01日 20:00:00',
  },
  {
    _id: '3',
    title: '问卷3',
    isStar: true,
    isPublished: true,
    answerCount: 30,
    createdAt: '2025年04月01日 20:00:00',
  },
  {
    _id: '4',
    title: '问卷4',
    isStar: true,
    isPublished: false,
    answerCount: 40,
    createdAt: '2025年04月01日 20:00:00',
  },
];

const Star = () => {
  const [starList, setStarList] = useState<QuestionnaireDataType[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setStarList(DEFAULT_DATA);
    }, 2000);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <Input placeholder="请输入问卷名称" />
        </div>
      </div>
      <div className={styles.content}>
        {starList.length === 0 ? (
          <Empty description="暂无数据" />
        ) : (
          <>
            {starList.map((item) => {
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
