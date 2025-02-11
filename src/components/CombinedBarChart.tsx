import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CategoryData } from '../types/dashboard';

interface CombinedBarChartProps {
  data: CategoryData[];
}

const COLORS = {
  total: '#636b85',
  atRisk: '#a6d1bf'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-900">{data.name}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            <span className="text-gray-500">Total Users: </span>
            <span className="font-medium">{data.activeUsers.toLocaleString()}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-500">At-Risk Users: </span>
            <span className="font-medium">{data.atRiskUsers.toLocaleString()}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-500">At-Risk Ratio: </span>
            <span className="font-medium">
              {((data.atRiskUsers / data.activeUsers) * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function CombinedBarChart({ data }: CombinedBarChartProps) {
  // Sort data by activeUsers in descending order
  const sortedData = [...data].sort((a, b) => b.activeUsers - a.activeUsers);
  
  // Find the maximum value for the domain
  const maxValue = Math.max(...data.map(item => item.activeUsers));
  // Add 10% padding to the maximum value for better visualization
  const domainMax = Math.ceil(maxValue * 1.1);
  
  // Calculate tick values based on the domain max
  const tickCount = 5;
  const tickInterval = Math.ceil(domainMax / (tickCount - 1));
  const ticks = Array.from({ length: tickCount }, (_, i) => i * tickInterval);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 10, left: 60, bottom: 5 }}
          barSize={24}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, domainMax]}
            ticks={ticks}
            tickFormatter={(value) => value.toLocaleString()}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="activeUsers"
            fill={COLORS.total}
            radius={[0, 4, 4, 0]}
            stackId="stack"
          />
          <Bar
            dataKey="atRiskUsers"
            fill={COLORS.atRisk}
            radius={[0, 4, 4, 0]}
            stackId="stack"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}