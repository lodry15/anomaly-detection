import React, { useState } from 'react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryData } from '../types/dashboard';

interface PieChartProps {
  data: CategoryData[];
  selectedCategory?: string | null;
  onCategorySelect: (category: string | null) => void;
}

const COLORS = {
  Casino: '#9AA4FA',
  Sport: '#A9EAE0',
  Poker: '#a6d1bf',
  Others: '#636b85'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium">{data.name}</p>
        <p className="text-gray-600">At-Risk Users: {data.atRiskUsers}</p>
      </div>
    );
  }
  return null;
};

const renderLegendText = (value: string, entry: any, selectedCategory: string | null, atRiskUsers: number) => {
  return (
    <span 
      className={`text-gray-700 ${value === selectedCategory ? 'font-semibold' : ''}`}
    >
      {value} {value === selectedCategory ? `(${atRiskUsers} at-risk)` : ''}
    </span>
  );
};

export function PieChart({ data, selectedCategory, onCategorySelect }: PieChartProps) {
  return (
    <div className="h-[300px] w-full">
      <style>
        {`
          .recharts-sector {
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .recharts-sector:hover {
            transform: scale(1.03);
            filter: brightness(1.1);
          }
          .selected-sector {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
          .recharts-legend-item {
            cursor: pointer;
            transition: opacity 0.2s ease;
          }
          .recharts-legend-item:hover {
            opacity: 0.8;
          }
        `}
      </style>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPie>
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="name"
            cx="55%"
            cy="50%"
            outerRadius={100}
            onClick={(entry) => onCategorySelect(entry.name === selectedCategory ? null : entry.name)}
            animationDuration={300}
            animationBegin={0}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as keyof typeof COLORS]}
                stroke={entry.name === selectedCategory ? '#1E40AF' : '#fff'}
                strokeWidth={2}
                className={entry.name === selectedCategory ? 'selected-sector' : ''}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            align="left"
            verticalAlign="middle"
            layout="vertical"
            iconType="circle"
            formatter={(value: string, entry: any) => 
              renderLegendText(
                value, 
                entry, 
                selectedCategory, 
                data.find(d => d.name === value)?.atRiskUsers || 0
              )
            }
            onClick={(entry) => onCategorySelect(entry.value === selectedCategory ? null : entry.value)}
            wrapperStyle={{
              paddingLeft: '10px'
            }}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}