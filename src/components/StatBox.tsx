import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, Users, AlertTriangle } from 'lucide-react';
import { MetricBox } from '../types/dashboard';

interface StatBoxProps extends MetricBox {
  isSelected?: boolean;
  type?: 'active' | 'risk';
}

export function StatBox({ title, value, delta, prefix, suffix, type }: StatBoxProps) {
  const isPositive = delta && delta > 0;
  
  const getIcon = () => {
    if (type === 'active') return <Users size={24} className="text-[#2A3647]" />;
    if (type === 'risk') return <AlertTriangle size={24} className="text-[#2A3647]" />;
    return null;
  };

  return (
    <div className="p-6 rounded-xl bg-white border border-gray-300 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {getIcon()}
      </div>
      <p className="text-2xl font-semibold mt-2">
        {prefix}{value.toLocaleString()}{suffix}
      </p>
      {delta && (
        <div className="mt-4">
          <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {isPositive ? <ArrowUpIcon size={16} className="mr-1" /> : <ArrowDownIcon size={16} className="mr-1" />}
            {Math.abs(delta)}%
          </div>
          <span className="text-sm text-gray-500">vs previous period</span>
        </div>
      )}
    </div>
  );
}