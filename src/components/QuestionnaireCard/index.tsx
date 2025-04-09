import { Button, Divider, message, Modal, Space, Tag } from 'antd';
import { QuestionnaireDataType } from '@/types/manage';
import styles from './index.module.scss';
import { useCallback, useMemo } from 'react';
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

type QuestionnaireCardProps = {
  info: QuestionnaireDataType;
};

type NavigateType = 'edit' | 'stat';

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ info }) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = info;

  const navigate = useNavigate();

  const renderStarStatus = useMemo(() => {
    return isStar ? '取消标星' : '标星';
  }, [isStar]);

  const currentLinkTo = useMemo(() => {
    return isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`;
  }, [_id, isPublished]);

  const handleNavigate = useCallback(
    (key: NavigateType) => {
      navigate(`/question/${key}/${_id}`);
    },
    [_id, navigate]
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
        console.log(_id);
        message.success('删除成功');
      },
    });
  }, [_id]);

  const handleCopy = useCallback(() => {
    message.success('复制成功');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={currentLinkTo}>
            <Space>
              {isStar && <StarFilled className={styles.star} />}
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
              onClick={() => handleNavigate('edit')}
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
            <Button type="text" size="small" icon={<StarOutlined />}>
              {renderStarStatus}
            </Button>
            <Button type="text" size="small" icon={<CopyOutlined />} onClick={handleCopy}>
              复制
            </Button>
            <Button
              danger
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
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
