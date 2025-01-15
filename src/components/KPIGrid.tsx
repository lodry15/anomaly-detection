import React, { useState } from 'react';
import { KPIData, TimeRange } from '../types/dashboard';
import { KPITrendChart } from './KPITrendChart';
import { getKPITrendData } from '../data/mockData';

interface KPIGridProps {
  data: KPIData;
  timeRange: TimeRange;
  category?: string;
}

interface KPIBoxProps {
  title: string;
  value: number;
  isMedian?: boolean;
}

function formatValue(value: number, isMedian?: boolean): string {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000 && !isMedian) {
    return `€${(value / 1000).toFixed(0)}k`;
  }
  return `€${value.toLocaleString()}`;
}

function KPIBox({ title, value, isMedian }: KPIBoxProps) {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{formatValue(value, isMedian)}</p>
    </div>
  );
}

export function KPIGrid({ data, timeRange, category }: KPIGridProps) {
  const [selectedKPI, setSelectedKPI] = useState<keyof KPIData>('ggt');
  
  const getMetricUnit = (metric: keyof KPIData): string => {
    if (metric.toLowerCase().includes('ratio')) return '%';
    return '€';
  };

  const getMetricDisplayName = (metric: string): string => {
    const names: Record<string, string> = {
      ggt: 'GGT',
      medianGgt: 'Median GGT',
      ggr: 'GGR',
      medianGgr: 'Median GGR',
      netProfit: 'Net Profit',
      medianNetProfit: 'Median Net Profit',
      totalDeposit: 'Total Deposit',
      medianDeposit: 'Median Deposit',
      totalPayout: 'Total Pay-out',
      medianPayout: 'Median Pay-out',
      winRatio: 'Win Ratio',
      medianWinRatio: 'Median Win Ratio'
    };
    return names[metric] || metric;
  };

  const trendData = getKPITrendData(selectedKPI, timeRange, category);

  return (
    <div className="bg-white p-6 pb-12 rounded-xl border border-gray-300">
      <h2 className="text-lg font-semibold mb-4">At-Risk Users Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setSelectedKPI('ggt')}
            className={`cursor-pointer transition-all ${selectedKPI === 'ggt' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="GGT" value={data.ggt} />
          </div>
          <div 
            onClick={() => setSelectedKPI('medianGgt')}
            className={`cursor-pointer transition-all ${selectedKPI === 'medianGgt' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Median GGT" value={data.medianGgt} isMedian />
          </div>
          <div 
            onClick={() => setSelectedKPI('ggr')}
            className={`cursor-pointer transition-all ${selectedKPI === 'ggr' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="GGR" value={data.ggr} />
          </div>
          <div 
            onClick={() => setSelectedKPI('medianGgr')}
            className={`cursor-pointer transition-all ${selectedKPI === 'medianGgr' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Median GGR" value={data.medianGgr} isMedian />
          </div>
          <div 
            onClick={() => setSelectedKPI('netProfit')}
            className={`cursor-pointer transition-all ${selectedKPI === 'netProfit' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Net Profit" value={data.netProfit} />
          </div>
          <div 
            onClick={() => setSelectedKPI('medianNetProfit')}
            className={`cursor-pointer transition-all ${selectedKPI === 'medianNetProfit' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Median Net Profit" value={data.medianNetProfit} isMedian />
          </div>
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setSelectedKPI('totalDeposit')}
            className={`cursor-pointer transition-all ${selectedKPI === 'totalDeposit' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Total Deposit" value={data.totalDeposit} />
          </div>
          <div 
            onClick={() => setSelectedKPI('medianDeposit')}
            className={`cursor-pointer transition-all ${selectedKPI === 'medianDeposit' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Median Deposit" value={data.medianDeposit} isMedian />
          </div>
          <div 
            onClick={() => setSelectedKPI('totalPayout')}
            className={`cursor-pointer transition-all ${selectedKPI === 'totalPayout' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Total Pay-out" value={data.totalPayout} />
          </div>
          <div 
            onClick={() => setSelectedKPI('medianPayout')}
            className={`cursor-pointer transition-all ${selectedKPI === 'medianPayout' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Median Pay-out" value={data.medianPayout} isMedian />
          </div>
          <div 
            onClick={() => setSelectedKPI('winRatio')}
            className={`cursor-pointer transition-all ${selectedKPI === 'winRatio' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Win Ratio" value={data.winRatio} />
          </div>
          <div 
            onClick={() => setSelectedKPI('medianWinRatio')}
            className={`cursor-pointer transition-all ${selectedKPI === 'medianWinRatio' ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
          >
            <KPIBox title="Median Win Ratio" value={data.medianWinRatio} isMedian />
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 pb-6 border-t border-gray-200">
        <KPITrendChart 
          data={trendData}
          timeRange={timeRange}
          metric={getMetricDisplayName(selectedKPI)}
          unit={getMetricUnit(selectedKPI)}
        />
      </div>
    </div>
  );
}