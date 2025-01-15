import React from 'react';
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CategoryData } from '../types/dashboard';

interface BarChartProps {
  data: CategoryData[];
  selectedCategory?: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function BarChart({ data, selectedCategory, onCategorySelect }: BarChartProps) {
  return (
    <div className="h-[300px] w-full">
      <style>
        {`
          .recharts-bar-rectangle {
            transition: opacity 0.3s ease;
          }
          .bar-inactive {
            opacity: 0.5;
          }
        `}
      </style>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar
          data={data}
          layout="vertical"
          barGap={0}
          barSize={20}
          onClick={(data) => {
            if (data && data.activeBar) {
              onCategorySelect(data.activeBar.name === selectedCategory ? null : data.activeBar.name);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar
            dataKey="activeUsers"
            fill="#636b85"
            radius={[0, 4, 4, 0]}
            className={({ name }) => selectedCategory && name !== selectedCategory ? 'bar-inactive' : ''}
          />
          <Bar
            dataKey="atRiskUsers"
            fill="#a6d1bf"
            radius={[0, 4, 4, 0]}
            className={({ name }) => selectedCategory && name !== selectedCategory ? 'bar-inactive' : ''}
          />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}