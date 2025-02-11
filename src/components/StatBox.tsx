import React from 'react';
import { Users, AlertTriangle } from 'lucide-react';

interface MetricData {
  value: number;
  delta: number;
}

interface StatBoxProps {
  type: 'active' | 'risk';
  yesterday: MetricData;
  lastWeek: MetricData;
  lastMonth: MetricData;
}

export function StatBox({ type, yesterday, lastWeek, lastMonth }: StatBoxProps) {
  const title = type === 'active' ? 'Active Users' : 'At-Risk Users';
  const Icon = type === 'active' ? Users : AlertTriangle;
  
  const formatDelta = (delta: number) => {
    const isPositive = delta > 0;
    const numberColor = type === 'active' 
      ? (isPositive ? 'text-green-600' : 'text-red-600')
      : (isPositive ? 'text-red-600' : 'text-green-600');
    
    return (
      <div className="text-sm">
        <span className={numberColor}>
          {isPositive ? '+' : ''}{delta}%
        </span>
        <span className="text-gray-900"> vs LP</span>
      </div>
    );
  };

  const MetricContainer = ({ label, data }: { label: string; data: MetricData }) => (
    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-2xl font-bold mt-1">{data.value.toLocaleString()}</span>
      <span className="mt-1">{formatDelta(data.delta)}</span>
    </div>
  );

  return (
    <div className="p-6 rounded-xl bg-white border border-gray-300 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Icon size={24} className="text-gray-700" />
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <MetricContainer label="Yesterday" data={yesterday} />
        <MetricContainer label="Last 7 Days" data={lastWeek} />
        <MetricContainer label="Last 30 Days" data={lastMonth} />
      </div>
    </div>
  );
}