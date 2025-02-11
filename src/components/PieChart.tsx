import React from 'react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryData, TimeRange } from '../types/dashboard';

interface PieChartProps {
  data: CategoryData[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  hideTimeRangeSelector?: boolean;
}

const COLORS = {
  Casino: '#9AA4FA',
  Sport: '#A9EAE0',
  Poker: '#a6d1bf',
  Virtual: '#FFB1C1',
  Skill: '#636b85',
  Others: '#94a3b8'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium">{data.name}</p>
        <p className="text-gray-600">At-Risk Users: {data.atRiskUsers}</p>
        <p className="text-gray-500">{data.percentage}%</p>
      </div>
    );
  }
  return null;
};

const renderLegendText = (value: string) => (
  <span className="text-gray-700">{value}</span>
);

export function PieChart({ data, timeRange, onTimeRangeChange, hideTimeRangeSelector = false }: PieChartProps) {
  return (
    <div className="h-[300px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Product Distribution</h2>
        {!hideTimeRangeSelector && (
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="day">Yesterday</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        )}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPie>
          <Pie
            data={data}
            dataKey="atRiskUsers"
            nameKey="name"
            cx="55%"
            cy="50%"
            outerRadius={100}
            animationDuration={300}
            animationBegin={0}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as keyof typeof COLORS]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            align="left"
            verticalAlign="middle"
            layout="vertical"
            iconType="circle"
            formatter={renderLegendText}
            wrapperStyle={{
              paddingLeft: '10px'
            }}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}