import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AgeGroupData {
  name: string;
  value: number;
  count: number;
}

type TimeFilter = 'yesterday' | 'last7d' | 'last30d';

const GRADIENTS = [
  ['#A5C9FF', '#7EB6FF'], // 18-25
  ['#92E2A1', '#70D68A'], // 26-40
  ['#FFD1A1', '#FFB987'], // 41-60
  ['#A1B6FF', '#879DFF']  // 60+
];

const AGE_DATA: Record<TimeFilter, { total: number; data: AgeGroupData[] }> = {
  yesterday: {
    total: 30,
    data: [
      { name: '18-25', value: 20, count: 6 },
      { name: '26-40', value: 40, count: 12 },
      { name: '41-60', value: 30, count: 9 },
      { name: '60+', value: 10, count: 3 }
    ]
  },
  last7d: {
    total: 70,
    data: [
      { name: '18-25', value: 15, count: 10 },
      { name: '26-40', value: 45, count: 32 },
      { name: '41-60', value: 20, count: 14 },
      { name: '60+', value: 20, count: 14 }
    ]
  },
  last30d: {
    total: 150,
    data: [
      { name: '18-25', value: 10, count: 15 },
      { name: '26-40', value: 30, count: 45 },
      { name: '41-60', value: 40, count: 60 },
      { name: '60+', value: 20, count: 30 }
    ]
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">{data.count} users</p>
        <p className="text-sm font-medium text-gray-900">{data.value}% of total</p>
      </div>
    );
  }
  return null;
};

export function AgeDistributionChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('yesterday');
  const { total, data } = AGE_DATA[timeFilter];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Age Distribution</h3>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 transition-colors"
        >
          <option value="yesterday">Yesterday</option>
          <option value="last7d">Last 7 Days</option>
          <option value="last30d">Last 30 Days</option>
        </select>
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
        <div className="relative w-[240px] h-[240px]">
          {/* Center Label */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-3xl font-semibold text-gray-900">{total}</div>
              <div className="text-sm text-gray-500">At-Risk Users</div>
            </div>
          </div>

          {/* Doughnut Chart */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {GRADIENTS.map((gradient, index) => (
                  <linearGradient
                    key={`gradient-${index}`}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={gradient[0]} />
                    <stop offset="100%" stopColor={gradient[1]} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                strokeWidth={2}
                stroke="#ffffff"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${index})`}
                    className="transition-opacity duration-200 hover:opacity-90"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{
                  background: `linear-gradient(135deg, ${GRADIENTS[index][0]}, ${GRADIENTS[index][1]})`
                }}
              />
              <span className="text-sm font-medium text-gray-900">{entry.name}</span>
              <span className="text-sm text-gray-500">
                ({entry.count} users • {entry.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}