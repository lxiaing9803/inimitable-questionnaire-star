import { Spin } from 'antd';
import styles from './index.module.scss';

const LoadingSpin = () => {
  return (
    <div className={styles.loadingSpin}>
      <Spin />
    </div>
  );
};

export default LoadingSpin;
