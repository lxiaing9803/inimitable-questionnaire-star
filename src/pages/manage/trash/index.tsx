import {
  Button,
  Flex,
  Input,
  message,
  Modal,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
  Typography,
} from 'antd';
import styles from '../manage.module.scss';
import { QuestionnaireDataType } from '@/types/manage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { renderPublishStatus, renderPublishTagColor } from '@/utils/manage';

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

const Trash = () => {
  const [dataSource, setDataSource] = useState<QuestionnaireDataType[]>([]);

  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);

  const rowSelection: TableProps<QuestionnaireDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: QuestionnaireDataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedIds(selectedRowKeys);
    },
  };

  console.log('selectedIds:', selectedIds);

  const columns: TableColumnsType<QuestionnaireDataType> = useMemo(() => {
    return [
      {
        dataIndex: 'title',
        title: '问卷名称',
      },
      {
        dataIndex: 'isPublished',
        title: '是否发布',
        render: (val) => {
          return <Tag color={renderPublishTagColor(val)}>{renderPublishStatus(val)}</Tag>;
        },
      },
      {
        dataIndex: 'answerCount',
        title: '答卷数量',
      },
      {
        dataIndex: 'createdAt',
        title: '创建时间',
      },
    ];
  }, []);

  const handleRecovery = useCallback(() => {
    Modal.confirm({
      title: '确定恢复选中的问卷吗？',
      content: '恢复后将回到未发布状态',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        message.success('恢复成功');
      },
    });
  }, []);

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: '确定彻底删除选中的问卷吗？',
      content: '彻底删除后将无法找回',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        message.success('删除成功');
      },
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(DEFAULT_DATA);
    }, 2000);
  }, []);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <Input placeholder="请输入问卷名称" />
        </div>
      </div>
      <div className={styles.content}>
        <Flex justify="flex-end" style={{ marginBottom: 20 }}>
          <Space>
            <Button type="primary" disabled={!selectedIds.length} onClick={handleRecovery}>
              恢复
            </Button>
            <Button danger type="primary" disabled={!selectedIds.length} onClick={handleDelete}>
              彻底删除
            </Button>
          </Space>
        </Flex>
        <Table
          bordered
          rowKey={(row) => row._id}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowSelection={rowSelection}
        />
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Trash;
