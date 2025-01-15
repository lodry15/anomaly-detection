import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ClusterData } from '../types/userDetail';

interface DoughnutChartProps {
  data: ClusterData[];
  totalAtRisk: number;
}

export const COLORS = ['#9AA4FA', '#A9EAE0', '#a6d1bf', '#636b85', '#FFB1C1'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const color = COLORS[payload[0].dataIndex % COLORS.length];
    
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium" style={{ color }}>{data.name}</p>
        <p className="text-gray-600">At-Risk Users: {data.atRiskUsers}</p>
        <p className="text-gray-500 text-sm">{data.percentage}%</p>
      </div>
    );
  }
  return null;
};

export function DoughnutChart({ data, totalAtRisk }: DoughnutChartProps) {
  return (
    <div className="relative h-[400px] w-full">
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-gray-800">{totalAtRisk}</span>
        <span className="text-sm text-gray-500">At-Risk Users</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="atRiskUsers"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={entry.id}
                fill={COLORS[index % COLORS.length]}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}