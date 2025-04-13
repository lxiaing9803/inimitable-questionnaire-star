import { DEFAULT_PAGE_SIZE } from '@/constants';
import { Pagination } from 'antd';
import { useState } from 'react';
import styles from './index.module.scss';

interface ListPaginationProps {
  total: number;
}

const ListPagination: React.FC<ListPaginationProps> = ({ total }) => {
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  return (
    <div className={styles.listPagination}>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />
    </div>
  );
};

export default ListPagination;
