import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
// for date-picker i18n
import 'dayjs/locale/zh-cn';
import App from './App.tsx';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
