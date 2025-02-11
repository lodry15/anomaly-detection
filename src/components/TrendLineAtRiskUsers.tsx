import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TrendData {
  date: string;
  value: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-medium">
          <span className="text-gray-900">{Math.round(payload[0].value)} </span>
          <span className="text-gray-500">At-Risk Users</span>
        </p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    );
  }
  return null;
};

export function TrendLineAtRiskUsers() {
  // Generate static data for the last 30 days
  const data = useMemo(() => {
    const result: TrendData[] = [];
    const now = new Date();
    let currentValue = 35;

    // Helper function to generate smooth values
    const generateSmoothValue = (prevValue: number): number => {
      const maxChange = 2;
      const change = (Math.random() * 2 - 1) * maxChange;
      let newValue = prevValue + change;
      // Ensure the value stays within our desired range (25-45)
      newValue = Math.max(25, Math.min(45, newValue));
      // Round to nearest integer
      return Math.round(newValue);
    };

    // Generate first 29 days
    for (let i = 30; i > 1; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      currentValue = generateSmoothValue(currentValue);
      
      result.push({
        date: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        }),
        value: currentValue
      });
    }

    // Add yesterday's data point (always 30)
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    result.push({
      date: yesterday.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      }),
      value: 30
    });

    return result;
  }, []); // Empty dependency array means this data is generated once and never changes

  return (
    <div className="mt-6 bg-white p-6 rounded-xl border border-gray-300">
      <h2 className="text-lg font-semibold mb-4">At-Risk Users Trend (Last 30 Days)</h2>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A3647" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#2A3647" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              type="number"
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#2A3647', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2A3647"
              strokeWidth={2}
              fill="url(#trendGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}