import {
  Button,
  Flex,
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
import { QuestionnaireDataType } from '@/types/question';
import { useCallback, useMemo, useState } from 'react';
import { renderPublishStatus, renderPublishTagColor } from '@/utils/manage';
import SearchInput from '@/components/SearchInput';
import useLoadQuestionList from '@/hooks/useLoadQuestionList';
import { useRequest } from 'ahooks';
import { deleteQuestions, updateQuestion } from '@/apis/question';

const { Title } = Typography;

const Trash = () => {
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);

  const { list, total, loading, refresh } = useLoadQuestionList({ isDeleted: true });

  const onRefresh = useCallback(() => {
    refresh();
    setSelectedIds([]);
  }, [refresh]);

  const { loading: recoveryLoading, run: recoveryRun } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestion(id as string, { isDeleted: false });
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('恢复成功');
        onRefresh();
      },
    }
  );

  const { loading: deleteLoading, run: deleteRun } = useRequest(
    async () => {
      await deleteQuestions(selectedIds as string[]);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        onRefresh();
      },
    }
  );

  const rowSelection: TableProps<QuestionnaireDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: QuestionnaireDataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedIds(selectedRowKeys);
    },
  };

  const columns: TableColumnsType<QuestionnaireDataType> = useMemo(() => {
    return [
      {
        dataIndex: 'title',
        align: 'center',
        title: '问卷名称',
      },
      {
        dataIndex: 'isPublished',
        align: 'center',
        title: '是否发布',
        render: (val) => {
          return <Tag color={renderPublishTagColor(val)}>{renderPublishStatus(val)}</Tag>;
        },
      },
      {
        dataIndex: 'answerCount',
        align: 'center',
        title: '答卷数量',
      },
      {
        dataIndex: 'createdAt',
        align: 'center',
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
        recoveryRun();
      },
    });
  }, [recoveryRun]);

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: '确定彻底删除选中的问卷吗？',
      content: '彻底删除后将无法找回',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteRun();
      },
    });
  }, [deleteRun]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <SearchInput />
        </div>
      </div>
      <div className={styles.content}>
        <Flex justify="flex-end" style={{ marginBottom: 20 }}>
          <Space>
            <Button
              type="primary"
              disabled={!selectedIds.length}
              onClick={handleRecovery}
              loading={recoveryLoading}
            >
              恢复
            </Button>
            <Button
              danger
              type="primary"
              disabled={!selectedIds.length}
              onClick={handleDelete}
              loading={deleteLoading}
            >
              彻底删除
            </Button>
          </Space>
        </Flex>
        <Table
          bordered
          loading={loading}
          rowKey={(row) => row.id}
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            defaultPageSize: 10,
          }}
          rowSelection={rowSelection}
        />
      </div>
    </>
  );
};

export default Trash;
