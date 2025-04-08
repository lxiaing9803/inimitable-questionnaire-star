import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const ManageLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>ManageLayout left</div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};
export default ManageLayout;
