import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#9AA4FA', '#A9EAE0', '#a6d1bf', '#636b85'];

const riskFactors = [
  {
    name: 'Time Spent Gambling',
    value: 40,
    description: 'Percentage of total time spent on gambling activities'
  },
  {
    name: 'Net Losses',
    value: 30,
    description: 'Total losses compared to the amount deposited'
  },
  {
    name: 'Deposit Frequency',
    value: 20,
    description: 'Number of deposits made during the selected period'
  },
  {
    name: 'Others',
    value: 10,
    description: 'Other contributing factors'
  }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-gray-600">{data.description}</p>
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
    <div className="flex flex-col items-center h-full">
      <div className="text-center mb-4">
        <h4 className="text-base font-medium">Key Features</h4>
        <p className="text-sm text-gray-500">
          This graph shows the variables contributing to the at-risk behaviour
        </p>
      </div>
      
      <div className="relative w-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskFactors}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
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

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {riskFactors.map((factor, index) => (
          <div key={factor.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div>
              <span className="text-sm font-medium">{factor.name}</span>
              <span className="text-sm text-gray-500 ml-1">({factor.value}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}