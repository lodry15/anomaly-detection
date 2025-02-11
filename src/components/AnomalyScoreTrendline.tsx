import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Mock data for the last 14 days
const data = [
  { date: 'Mar 1', score: 42, riskLevel: 'Low Risk' },
  { date: 'Mar 2', score: 50, riskLevel: 'Medium Risk' },
  { date: 'Mar 3', score: 55, riskLevel: 'Medium Risk' },
  { date: 'Mar 4', score: 62, riskLevel: 'Medium Risk' },
  { date: 'Mar 5', score: 72, riskLevel: 'High Risk' },
  { date: 'Mar 6', score: 80, riskLevel: 'High Risk' },
  { date: 'Mar 7', score: 85, riskLevel: 'High Risk' },
  { date: 'Mar 8', score: 78, riskLevel: 'High Risk' },
  { date: 'Mar 9', score: 68, riskLevel: 'Medium Risk' },
  { date: 'Mar 10', score: 59, riskLevel: 'Medium Risk' },
  { date: 'Mar 11', score: 49, riskLevel: 'Low Risk' },
  { date: 'Mar 12', score: 45, riskLevel: 'Low Risk' },
  { date: 'Mar 13', score: 60, riskLevel: 'Medium Risk' },
  { date: 'Mar 14', score: 65, riskLevel: 'Medium Risk' },
];

const getRiskColor = (score: number) => {
  if (score >= 70) return '#991B1B'; // dark red
  if (score >= 50) return '#D97706'; // amber
  return '#6B7280'; // grey
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    const color = getRiskColor(score);
    
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm mt-1">
          Score: <span className="font-medium">{score}%</span>
        </p>
        <p className="text-sm mt-1" style={{ color }}>
          {score >= 70 ? 'High Risk' : score >= 50 ? 'Medium Risk' : 'Low Risk'}
        </p>
      </div>
    );
  }
  return null;
};

const CustomizedDot = ({ cx, cy, value }: any) => {
  const color = getRiskColor(value);
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={4} 
      fill={color}
      stroke="white"
      strokeWidth={2}
    />
  );
};

export function AnomalyScoreTrendline() {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="text-center mb-4">
        <h4 className="text-base font-medium">Anomaly Score Trendline</h4>
        <p className="text-sm text-gray-500">
          This graph tracks the user's anomaly score over the past 14 days, providing insights into risk fluctuations.
        </p>
      </div>
      
      <div className="relative w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2A3647" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2A3647" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            
            {/* Risk Level Reference Lines */}
            <ReferenceLine 
              y={70} 
              stroke="#991B1B" 
              strokeDasharray="3 3"
              label={{ 
                value: "High Risk", 
                position: 'right',
                fill: '#991B1B',
                fontSize: 12
              }}
            />
            <ReferenceLine 
              y={50} 
              stroke="#D97706" 
              strokeDasharray="3 3"
              label={{ 
                value: "Medium Risk", 
                position: 'right',
                fill: '#D97706',
                fontSize: 12
              }}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[30, 95]}
              ticks={[30, 50, 70, 95]}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#2A3647"
              strokeWidth={2}
              fill="url(#scoreGradient)"
              dot={<CustomizedDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-sm text-gray-600">Low Risk (&lt;50%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-600" />
          <span className="text-sm text-gray-600">Medium Risk (50-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-800" />
          <span className="text-sm text-gray-600">High Risk (&gt;70%)</span>
        </div>
      </div>
    </div>
  );
}