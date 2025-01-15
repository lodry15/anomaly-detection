import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { KPITrendData, TimeRange } from '../types/dashboard';

interface KPITrendChartProps {
  data: KPITrendData[];
  timeRange: TimeRange;
  metric: string;
  unit: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const formattedValue = unit === '%' 
      ? `${value.toFixed(1)}%`
      : value >= 1000000
        ? `€${(value / 1000000).toFixed(1)}M`
        : value >= 1000
          ? `€${(value / 1000).toFixed(0)}k`
          : `€${value.toLocaleString()}`;

    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium">{label}</p>
        <p className="text-gray-600">{formattedValue}</p>
      </div>
    );
  }
  return null;
};

export function KPITrendChart({ data, timeRange, metric, unit }: KPITrendChartProps) {
  const formatYAxis = (value: number) => {
    if (unit === '%') return `${value}%`;
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}k`;
    return `€${value}`;
  };

  const getDateRangeLabel = () => {
    const firstDate = data[0].date;
    const lastDate = data[data.length - 1].date;
    return `${firstDate} - ${lastDate}`;
  };

  return (
    <div className="h-[200px] w-full">
      <h3 className="text-lg font-semibold mb-2">
        Trendline for {metric} - {timeRange === 'day' ? 'Last 15 Days' : timeRange === 'week' ? 'Last 10 Weeks' : 'Last 3 Months'} ({getDateRangeLabel()})
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="kpiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A3647" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#2A3647" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tickFormatter={formatYAxis}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2A3647"
            strokeWidth={2}
            fill="url(#kpiGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}