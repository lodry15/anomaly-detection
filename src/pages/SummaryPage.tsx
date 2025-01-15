import React, { useState } from 'react';
import { StatBox } from '../components/StatBox';
import { PieChart } from '../components/PieChart';
import { BarChart } from '../components/BarChart';
import { TimeFilter } from '../components/TimeFilter';
import { TrendLineChart } from '../components/TrendLineChart';
import { KPIGrid } from '../components/KPIGrid';
import { Category, TimeRange } from '../types/dashboard';
import { getDummyData, getTrendData, getKPIData } from '../data/mockData';

export function SummaryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  
  const dummyData = getDummyData(timeRange);
  const trendData = getTrendData();
  const kpiData = getKPIData(timeRange, selectedCategory || undefined);
  const totalActiveUsers = dummyData.reduce((sum, item) => sum + item.activeUsers, 0);
  const totalAtRiskUsers = dummyData.reduce((sum, item) => sum + item.atRiskUsers, 0);
  
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Responsible Gambling Dashboard</h1>
          <div className="flex justify-end">
            <TimeFilter selectedRange={timeRange} onRangeSelect={setTimeRange} />
          </div>
        </div>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <StatBox
            title="Active Users"
            value={totalActiveUsers}
            delta={2.3}
            type="active"
          />
          <StatBox
            title="At-Risk Users"
            value={totalAtRiskUsers}
            delta={-4.5}
            type="risk"
          />
        </div>

        {/* Trend Line Chart */}
        <div className="mt-6 bg-white p-6 rounded-xl border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">At-Risk Users Trend (30 Days)</h2>
          <TrendLineChart data={trendData} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Product Distribution */}
          <div className="bg-white p-6 rounded-xl border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Product Distribution</h2>
              <div className="text-sm text-gray-500">
                {selectedCategory || 'All'}
              </div>
            </div>
            <PieChart
              data={dummyData}
              selectedCategory={selectedCategory}
              onCategorySelect={(category) => setSelectedCategory(category as Category)}
            />
          </div>

          {/* Active vs At-Risk */}
          <div className="bg-white p-6 rounded-xl border border-gray-300">
            <h2 className="text-lg font-semibold mb-4">Active vs At-Risk Users</h2>
            <BarChart
              data={dummyData}
              selectedCategory={selectedCategory}
              onCategorySelect={(category) => setSelectedCategory(category as Category)}
            />
          </div>
        </div>

        {/* KPI Grid */}
        <div className="mt-6">
          <KPIGrid 
            data={kpiData} 
            timeRange={timeRange}
            category={selectedCategory || undefined}
          />
        </div>
      </div>
    </div>
  );
}