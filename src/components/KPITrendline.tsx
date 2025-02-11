import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { KPIData, ProductType } from '../types/dashboard';
import { getTrendData } from '../data/kpiData';

interface KPITrendlineProps {
  selectedKPI: keyof KPIData | null;
  selectedProduct: ProductType;
}

const CustomTooltip = ({ active, payload, label, isWinRatio, isPerUser }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const formatValue = (val: number) => {
      if (isWinRatio) return `${val}%`;
      if (isPerUser) {
        return `€${val.toLocaleString()}`;
      }
      return val >= 1000000 
        ? `€${(val / 1000000).toFixed(1)}M` 
        : val >= 1000 
          ? `€${(val / 1000).toFixed(0)}k` 
          : `€${val}`;
    };

    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <div className="mt-2 space-y-2">
          <p className="text-sm">
            <span className="text-red-600 font-medium">At-Risk {isPerUser ? 'Per User' : 'Total'}: </span>
            <span className="font-medium">{formatValue(data.value)}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600 font-medium">Active {isPerUser ? 'Per User' : 'Total'}: </span>
            <span className="font-medium">{formatValue(data.activeTotal)}</span>
          </p>
          <p className="text-xs text-gray-500">
            Based on {data.atRiskUsers} at-risk users
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function KPITrendline({ selectedKPI, selectedProduct }: KPITrendlineProps) {
  const [isPerUserView, setIsPerUserView] = useState(false);
  const data = selectedKPI ? getTrendData(selectedKPI, selectedProduct, isPerUserView) : [];
  const isWinRatio = selectedKPI === 'winRatio';

  if (!selectedKPI) return null;

  const kpiTitles = {
    ggt: 'GGT',
    ggr: 'GGR',
    netProfit: 'Net Profit',
    totalDeposit: 'Total Deposit',
    totalPayout: 'Total Pay-out',
    winRatio: 'Win Ratio'
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">
          {kpiTitles[selectedKPI]} Trend - Last 30 Days
          {selectedProduct !== 'All' && ` (${selectedProduct})`}
        </h3>
        
        {/* Toggle Switch */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              !isPerUserView 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setIsPerUserView(false)}
          >
            Total View
          </button>
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              isPerUserView 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setIsPerUserView(true)}
          >
            Per-User View
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2A3647" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2A3647" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                if (isWinRatio) return `${value}%`;
                if (isPerUserView) return `€${(value / 1000).toFixed(0)}k`;
                return value >= 1000000 
                  ? `€${(value / 1000000).toFixed(1)}M` 
                  : `€${(value / 1000).toFixed(0)}k`;
              }}
            />
            <Tooltip 
              content={
                <CustomTooltip 
                  isWinRatio={isWinRatio} 
                  isPerUser={isPerUserView}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2A3647"
              strokeWidth={2}
              fill="url(#colorValue)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}