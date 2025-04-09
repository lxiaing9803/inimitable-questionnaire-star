import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, Space } from 'antd';
import styles from './index.module.scss';
import { useCallback, useEffect, useMemo } from 'react';
import { ButtonEnum, ButtonTypeKey } from '@/types/layout';
import { ButtonGroupData } from '@/constants/layout';
import { PAGE_TITLE_MAP } from '@/constants';
import { PageTitleKeyType } from '@/types';

const ManageLayout = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const title = useMemo(() => {
    return PAGE_TITLE_MAP[pathname as PageTitleKeyType] || '问卷系统';
  }, [pathname]);

  const handleClick = useCallback(
    (key: ButtonTypeKey) => {
      if (key === 'create') {
        console.log(key);
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
