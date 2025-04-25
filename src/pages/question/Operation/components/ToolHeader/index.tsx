import { Button, message, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import ToolBar from '../ToolBar';
import useGetQuestionPageSetting from '@/hooks/useGetQuestionPageSetting';
import { useCallback } from 'react';
import { useAppDispatch } from '@/utils/hook';
import { changePageSettingTitle } from '@/store/questionPageSetting';
import ToolEditTitle from '../ToolEditTitle';
import styles from './index.module.scss';
import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import { useKeyPress, useRequest } from 'ahooks';
import { updateQuestion } from '@/apis/question';

const ToolHeader = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const pageInfo = useGetQuestionPageSetting();

  const { componentList } = useGetQuestionComponentInfo();

  const dispatch = useAppDispatch();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestion(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('保存成功');
      },
    }
  );

  const { loading: publishLoading, run: publish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestion(id, { ...pageInfo, componentList, isPublished: true }).then(() => {});
    },
    {
      manual: true,
      onSuccess: () => {
        message.success({
          content: '发布成功',
          duration: 1,
          onClose: () => {
            navigate(`/question/stat/${id}`);
          },
        });
      },
    }
  );

  const handleEditTitle = useCallback(
    (newTitle: string) => {
      dispatch(changePageSettingTitle(newTitle));
    },
    [dispatch]
  );

  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault();
    if (!loading) save();
  });

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <ToolEditTitle title={pageInfo.title} onEdit={handleEditTitle} />
          </Space>
        </div>
        <div className={styles.main}>
          <ToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button onClick={save} loading={loading}>
              保存
            </Button>
            <Button type="primary" onClick={publish} loading={publishLoading}>
              发布
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ToolHeader;
