import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { QuestionRadioStateDataType } from './type';
import { STAT_COLORS } from '@/constants';
import { useMemo } from 'react';
import { formatStatCount } from '@/utils/format';

const StatComponent: React.FC<QuestionRadioStateDataType> = ({ stat }) => {
  const sum = useMemo(() => {
    let s: number = 0;
    stat.forEach((item) => {
      s += item.count;
    });
    return s;
  }, [stat]);

  return (
    <div style={{ width: 300, height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={(i) => `${i.name}: ${+formatStatCount(i.count) / sum}%`}
          >
            {stat.map((_, index) => {
              return <Cell key={`cell-${index}`} fill={STAT_COLORS[index % STAT_COLORS.length]} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
