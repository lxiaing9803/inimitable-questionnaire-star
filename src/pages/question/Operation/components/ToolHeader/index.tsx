import { Button, Input, Space, Typography } from 'antd';
import styles from './index.module.scss';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ToolBar from '../ToolBar';
import useGetPageSetting from '@/hooks/useGetPageSetting';
import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch } from '@/utils/hook';
import { changePageSettingTitle } from '@/store/questionPageSetting';

const { Title } = Typography;

const EditTitle = () => {
  const { title } = useGetPageSetting();

  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsEdit(false);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value.trim();
      dispatch(changePageSettingTitle(newTitle));
    },
    [dispatch]
  );

  const renderTitle = useMemo(() => {
    if (isEdit) {
      return (
        <Input autoFocus value={title} onChange={onChange} onPressEnter={onBlur} onBlur={onBlur} />
      );
    }
    return <Title>{title}</Title>;
  }, [isEdit, onBlur, onChange, title]);

  return (
    <Space>
      {renderTitle}
      {!isEdit && <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />}
    </Space>
  );
};

const ToolHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <EditTitle />
          </Space>
        </div>
        <div className={styles.main}>
          <ToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ToolHeader;
