import { Button, Divider, message, Modal, Space, Tag } from 'antd';
import { QuestionnaireDataType } from '@/types/question';
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
import { duplicateQuestion, updateQuestion } from '@/apis/question';

type QuestionnaireCardProps = {
  info: QuestionnaireDataType;
};

type NavigateType = 'operation' | 'stat';

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ info }) => {
  const { id, title, createdAt, answerCount, isPublished, isStar, isDeleted } = info;

  const navigate = useNavigate();

  const [isStarState, setIsStartState] = useState<boolean>(isStar);
  const [isDeletedState, setIsDeletedState] = useState<boolean>(isDeleted);

  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () => {
      await updateQuestion(id, { isStar: isStarState });
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
      const res = await duplicateQuestion(id);
      return res;
    },
    {
      manual: true,
      onSuccess: (res) => {
        message.success('复制成功');
        navigate(`/question/operation/${res.id}`);
      },
    }
  );

  const { run: deleteRun, loading: deleteLoading } = useRequest(
    async () => await updateQuestion(id, { isDeleted: !isDeletedState }),
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
    return isPublished ? `/question/stat/${id}` : `/question/operation/${id}`;
  }, [id, isPublished]);

  const handleNavigate = useCallback(
    (key: NavigateType) => {
      navigate(`/question/${key}/${id}`);
    },
    [id, navigate]
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

export default QuestionnaireCard;
