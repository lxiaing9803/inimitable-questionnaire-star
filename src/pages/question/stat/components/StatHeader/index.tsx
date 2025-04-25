import useGetQuestionPageSetting from '@/hooks/useGetQuestionPageSetting';
import styles from './index.module.scss';
import {
  Button,
  Input,
  InputRef,
  message,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useCallback, useMemo, useRef } from 'react';
const { Title } = Typography;

const StatHeader = () => {
  const { title, isPublished } = useGetQuestionPageSetting();

  const navigate = useNavigate();

  const { id } = useParams();

  const urlInputRef = useRef<InputRef>(null);

  const handleCopy = useCallback(() => {
    const elem = urlInputRef.current;
    if (!elem) return;
    elem.select();
    document.execCommand('copy');
    message.success('复制成功');
  }, []);

  const renderLinkAndQRCodeElem = useMemo(() => {
    if (typeof isPublished === 'boolean' && !isPublished) return null;
    // C端链接，暂定义为localhost:3000
    const url = `http://localhost:3000/question/${id}`;

    return (
      <Space>
        <Input value={url} style={{ width: 300 }} ref={urlInputRef} />
        <Tooltip title="复制链接">
          <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
        </Tooltip>
        <Popover content={<QRCode value={url} size={150} />}>
          <Button shape="circle" icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }, [handleCopy, id, isPublished]);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{renderLinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => navigate(`/question/operation/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
