import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, Space } from 'antd';
import styles from './index.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonEnum, ButtonTypeKey } from '@/types/layout';
import { ButtonGroupData } from '@/constants/layout';
import { PAGE_TITLE_MAP } from '@/constants';
import { PageTitleKeyType } from '@/types';
import { createQuestion } from '@/apis/question';

const ManageLayout = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [loading, setLoading] = useState<boolean>(false);

  const title = useMemo(() => {
    return PAGE_TITLE_MAP[pathname as PageTitleKeyType] || '问卷系统';
  }, [pathname]);

  const handleClick = useCallback(
    async (key: ButtonTypeKey) => {
      if (key === 'create') {
        setLoading(true);
        const res = await createQuestion();
        const id = res?.id || res?._id;
        if (id) {
          setLoading(false);
          navigate(`/question/operation/${id}`);
        }
      } else {
        navigate(`/manage/${key}`);
      }
    },
    [navigate]
  );

  const isCreate = useCallback((key: ButtonTypeKey) => {
    return key === ButtonEnum.create;
  }, []);

  const renderButtonType = useCallback(
    (key: ButtonTypeKey) => {
      if (key === ButtonEnum.create) {
        return 'primary';
      }
      return pathname.startsWith(`/manage/${key}`) ? 'default' : 'text';
    },
    [pathname]
  );

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          {ButtonGroupData.map((item) => {
            return (
              <div key={item.key}>
                <Button
                  size="large"
                  icon={item.icon}
                  type={renderButtonType(item.key)}
                  onClick={() => handleClick(item.key)}
                  disabled={isCreate(item.key) ? loading : false}
                  loading={isCreate(item.key) ? loading : false}
                >
                  {item.name}
                </Button>
                {isCreate(item.key) && <Divider />}
              </div>
            );
          })}
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};
export default ManageLayout;
