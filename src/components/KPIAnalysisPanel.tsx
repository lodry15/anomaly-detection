import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { KPIData, ProductType } from '../types/dashboard';
import { getKPIData } from '../data/kpiData';
import { KPITrendline } from './KPITrendline';

interface KPIBoxProps {
  title: string;
  data: KPIData[keyof KPIData];
  tooltip: string;
  isSelected: boolean;
  onClick: () => void;
  isWinRatio?: boolean;
}

function formatValue(value: number, isWinRatio: boolean = false): string {
  if (isWinRatio) {
    return `${value}%`;
  }
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}k`;
  }
  return `€${value}`;
}

function KPIBox({ title, data, tooltip, isSelected, onClick, isWinRatio = false }: KPIBoxProps) {
  return (
    <div 
      className={`bg-white p-6 rounded-lg border transition-all cursor-pointer
        ${isSelected 
          ? 'border-indigo-500 shadow-md ring-2 ring-indigo-200' 
          : 'border-gray-200 hover:shadow-md hover:border-gray-300'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {title} <span className="text-gray-500">(Yesterday)</span>
        </h3>
        <div className="group relative">
          <InfoIcon size={18} className="text-gray-400 cursor-help" />
          <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10">
            {tooltip}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left side - Current values */}
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{formatValue(data.activeUsers, isWinRatio)}</span>
              <span className={`text-sm ${data.activeDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({data.activeDelta >= 0 ? '+' : ''}{data.activeDelta}% vs LP)
              </span>
            </div>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600">
                {formatValue(data.atRiskUsers, isWinRatio)}
              </span>
              <span className={`text-sm ${data.riskDelta <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({data.riskDelta >= 0 ? '+' : ''}{data.riskDelta}% vs LP)
              </span>
            </div>
            <p className="text-sm text-gray-600">At-Risk Users</p>
          </div>
        </div>

        {/* Right side - Historical table */}
        <div className="border-l pl-8">
          <div className="bg-gray-50 rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-2 px-3 py-2 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-500">Period</div>
              <div className="text-sm font-medium text-gray-500 text-right">Active</div>
              <div className="text-sm font-medium text-gray-500 text-right">At-Risk</div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-3 gap-2 px-3 py-2 hover:bg-gray-100">
                <div className="text-sm text-gray-600">Last Week</div>
                <div className="text-sm font-medium text-right">
                  {formatValue(data.lastWeek.activeUsers, isWinRatio)}
                </div>
                <div className="text-sm font-medium text-right text-red-600">
                  {formatValue(data.lastWeek.atRiskUsers, isWinRatio)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 px-3 py-2 hover:bg-gray-100">
                <div className="text-sm text-gray-600">Last Month</div>
                <div className="text-sm font-medium text-right">
                  {formatValue(data.lastMonth.activeUsers, isWinRatio)}
                </div>
                <div className="text-sm font-medium text-right text-red-600">
                  {formatValue(data.lastMonth.atRiskUsers, isWinRatio)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 px-3 py-2 hover:bg-gray-100">
                <div className="text-sm text-gray-600">Last Year</div>
                <div className="text-sm font-medium text-right">
                  {formatValue(data.lastYear.activeUsers, isWinRatio)}
                </div>
                <div className="text-sm font-medium text-right text-red-600">
                  {formatValue(data.lastYear.atRiskUsers, isWinRatio)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const KPI_TOOLTIPS = {
  ggt: "Gross Gaming Turnover - Total amount wagered by users before any winnings are paid out",
  ggr: "Gross Gaming Revenue - Net revenue after paying out winnings but before operating costs",
  netProfit: "Net Profit - Final profit after all costs and expenses",
  totalDeposit: "Total Deposit - Sum of all deposits made by users",
  totalPayout: "Total Pay-out - Sum of all withdrawals and winnings paid to users",
  winRatio: "Win Ratio - Percentage of bets that result in wins for users"
};

export function KPIAnalysisPanel() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('All');
  const [selectedKPI, setSelectedKPI] = useState<keyof KPIData | null>(null);
  const data = getKPIData(selectedProduct);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">At-Risk Users Analysis</h2>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Products</option>
          <option value="Casino">Casino</option>
          <option value="Sport">Sport</option>
          <option value="Poker">Poker</option>
          <option value="Virtual">Virtual</option>
          <option value="Skill">Skill</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KPIBox 
          title="GGT" 
          data={data.ggt} 
          tooltip={KPI_TOOLTIPS.ggt}
          isSelected={selectedKPI === 'ggt'}
          onClick={() => setSelectedKPI(selectedKPI === 'ggt' ? null : 'ggt')}
        />
        <KPIBox 
          title="GGR" 
          data={data.ggr} 
          tooltip={KPI_TOOLTIPS.ggr}
          isSelected={selectedKPI === 'ggr'}
          onClick={() => setSelectedKPI(selectedKPI === 'ggr' ? null : 'ggr')}
        />
        <KPIBox 
          title="Net Profit" 
          data={data.netProfit} 
          tooltip={KPI_TOOLTIPS.netProfit}
          isSelected={selectedKPI === 'netProfit'}
          onClick={() => setSelectedKPI(selectedKPI === 'netProfit' ? null : 'netProfit')}
        />
        <KPIBox 
          title="Total Deposit" 
          data={data.totalDeposit} 
          tooltip={KPI_TOOLTIPS.totalDeposit}
          isSelected={selectedKPI === 'totalDeposit'}
          onClick={() => setSelectedKPI(selectedKPI === 'totalDeposit' ? null : 'totalDeposit')}
        />
        <KPIBox 
          title="Total Pay-out" 
          data={data.totalPayout} 
          tooltip={KPI_TOOLTIPS.totalPayout}
          isSelected={selectedKPI === 'totalPayout'}
          onClick={() => setSelectedKPI(selectedKPI === 'totalPayout' ? null : 'totalPayout')}
        />
        <KPIBox 
          title="Win Ratio" 
          data={data.winRatio} 
          tooltip={KPI_TOOLTIPS.winRatio}
          isSelected={selectedKPI === 'winRatio'}
          onClick={() => setSelectedKPI(selectedKPI === 'winRatio' ? null : 'winRatio')}
          isWinRatio
        />
      </div>

      {/* Trendline section */}
      <div className="mt-6">
        {selectedKPI ? (
          <KPITrendline 
            selectedKPI={selectedKPI}
            selectedProduct={selectedProduct}
          />
        ) : (
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center text-gray-500">
            Select a KPI box above to view its 30-day trend
          </div>
        )}
      </div>
    </div>
  );
}