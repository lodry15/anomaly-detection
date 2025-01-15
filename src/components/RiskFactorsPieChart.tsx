import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#9AA4FA', '#A9EAE0', '#a6d1bf'];

const riskFactors = [
  {
    name: 'Time Spent Gambling',
    value: 45,
    description: 'Percentage of total time spent on gambling activities'
  },
  {
    name: 'Net Losses',
    value: 35,
    description: 'Total losses compared to the amount deposited'
  },
  {
    name: 'Deposit Frequency',
    value: 20,
    description: 'Number of deposits made during the selected period'
  }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600 mt-1">{data.description}</p>
        <p className="text-sm font-medium text-gray-900 mt-2">
          Contribution: {data.value}%
        </p>
      </div>
    );
  }
  return null;
};

interface RiskFactorsPieChartProps {
  product: string;
}

export function RiskFactorsPieChart({ product }: RiskFactorsPieChartProps) {
  return (
    <div className="h-[260px] w-full">
      <h4 className="text-base font-medium mb-2">At-Risk Product: {product}</h4>
      <p className="text-sm text-gray-500 mb-4">
        This graph shows what are the variables contributing the most to the at-risk behaviour
      </p>
      <ResponsiveContainer width="100%" height="75%">
        <PieChart>
          <Pie
            data={riskFactors}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
          >
            {riskFactors.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}