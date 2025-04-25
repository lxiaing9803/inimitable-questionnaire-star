import { getComponentStat } from '@/apis/stat';
import { getComponentConfigByType, QuestionComponentType } from '@/components/QuestionComponents';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';

interface StatChartProps {
  selectedComponentId: string;
  selectedComponentType: QuestionComponentType;
}

const { Title } = Typography;

const StatChart: React.FC<StatChartProps> = ({ selectedComponentId, selectedComponentType }) => {
  const { id = '' } = useParams();

  const [stat, setStat] = useState<any[]>([]);

  const { run } = useRequest(
    async (questionId: string, componentId: string) =>
      await getComponentStat(questionId, componentId),
    {
      manual: true,
      onSuccess: (res) => {
        setStat(res.stat);
      },
    }
  );

  const renderChart = useMemo(() => {
    if (!selectedComponentId) return <div>未选择组件</div>;
    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {};
    if (!StatComponent) return <div>该组件没有统计</div>;
    return <StatComponent stat={stat} />;
  }, [selectedComponentId, selectedComponentType, stat]);

  useEffect(() => {
    if (id && selectedComponentId) {
      run(id, selectedComponentId);
    }
  }, [id, run, selectedComponentId]);

  return (
    <div className={styles.container}>
      <Title level={3}>图表统计</Title>
      <div className={styles.chart}>{renderChart}</div>
    </div>
  );
};

export default StatChart;
