import { getQuestionStatList } from '@/apis/stat';
import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import { StatComponentDataType, StatDataRequestType } from '@/types/stat';
import { useRequest } from 'ahooks';
import { Divider, Table, TableColumnsType, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './index.module.scss';
import { DEFAULT_PAGE_SIZE } from '@/constants';

const { Title } = Typography;

const StatPage: React.FC<StatComponentDataType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  const { id } = useParams();

  const [total, setTotal] = useState<number>(0);

  const [dataSource, setDatSource] = useState<any[]>([]);

  const [page, setPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const { componentList } = useGetQuestionComponentInfo();

  const { loading } = useRequest(
    async () => {
      if (!id) return;
      const res = await getQuestionStatList(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      debounceWait: 500,
      onSuccess: (res) => {
        const { total, list } = res;
        setTotal(total);
        setDatSource(list);
      },
    }
  );

  const columns: TableColumnsType<StatDataRequestType> = useMemo(() => {
    return componentList.map((item) => {
      const { fe_id, title, props, type } = item;
      const colTitle = props!.title || props!.text || title;
      return {
        title: (
          <div
            className={cn(styles.colTitle, { [styles.selected]: selectedComponentId === fe_id })}
            onClick={() => {
              setSelectedComponentId(fe_id);
              setSelectedComponentType(type);
            }}
          >
            {colTitle}
          </div>
        ),
        dataIndex: fe_id,
        ellipsis: true,
      };
    });
  }, [componentList, selectedComponentId, setSelectedComponentId, setSelectedComponentType]);

  return (
    <div className={styles.container}>
      <Title level={3}>答卷数量:{!loading && total}</Title>
      <Divider />
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey={(row) => row.id}
        pagination={{
          total,
          pageSize,
          current: page,
          onChange: (p, s) => {
            setPage(p);
            setPageSize(s);
          },
        }}
      />
    </div>
  );
};

export default StatPage;
