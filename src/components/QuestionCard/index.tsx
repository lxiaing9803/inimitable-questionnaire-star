import { Button, Divider, message, Modal, Space, Tag } from 'antd';
import { QuestionDataType } from '@/types/question';
import styles from './index.module.scss';
import { useCallback, useMemo, useState } from 'react';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { renderPublishStatus, renderPublishTagColor } from '@/utils/manage';
import { useRequest } from 'ahooks';
import { deleteQuestion, duplicateQuestion, updateQuestion } from '@/apis/question';

type QuestionCardProps = {
  info: QuestionDataType;
};

type NavigateType = 'operation' | 'stat';

const QuestionCard: React.FC<QuestionCardProps> = ({ info }) => {
  const { id, title, createdAt, answerCount, isPublished, isStar, isDeleted, _id } = info;

  const navigate = useNavigate();

  const currentId = useMemo(() => {
    return id || _id;
  }, [id, _id]);

  const [isStarState, setIsStartState] = useState<boolean>(isStar);
  const [isDeletedState, setIsDeletedState] = useState<boolean>(isDeleted);

  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () => {
      await updateQuestion(currentId, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStartState(!isStarState);
        message.success('操作成功');
      },
    }
  );

  const { run: duplicateRun, loading: duplicateLoading } = useRequest(
    async () => {
      const res = await duplicateQuestion(currentId);
      return res;
    },
    {
      manual: true,
      onSuccess: (res) => {
        message.success('复制成功');
        navigate(`/question/operation/${res.id || res._id}`);
      },
    }
  );

  const { run: deleteRun, loading: deleteLoading } = useRequest(
    async () => await deleteQuestion(currentId),
    {
      manual: true,
      onSuccess: () => {
        setIsDeletedState(!isDeletedState);
        message.success('删除成功');
      },
    }
  );

  const renderStarStatus = useMemo(() => {
    return isStarState ? '取消标星' : '标星';
  }, [isStarState]);

  const currentLinkTo = useMemo(() => {
    return isPublished ? `/question/stat/${currentId}` : `/question/operation/${currentId}`;
  }, [currentId, isPublished]);

  const handleNavigate = useCallback(
    (key: NavigateType) => {
      navigate(`/question/${key}/${currentId}`);
    },
    [currentId, navigate]
  );

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: '删除问卷',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该问卷吗？',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        deleteRun();
      },
    });
  }, [deleteRun]);

  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={currentLinkTo}>
            <Space>
              {isStarState && <StarFilled className={styles.star} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            <Tag color={renderPublishTagColor(isPublished)}>{renderPublishStatus(isPublished)}</Tag>
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styles.buttonContainer}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleNavigate('operation')}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              disabled={!isPublished}
              onClick={() => handleNavigate('stat')}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              loading={changeStarLoading}
            >
              {renderStarStatus}
            </Button>
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={duplicateRun}
              loading={duplicateLoading}
            >
              复制
            </Button>
            <Button
              danger
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              loading={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
