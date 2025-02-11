import React, { useState } from 'react';
import { PieChart } from './PieChart';
import { CombinedBarChart } from './CombinedBarChart';
import { TimeRange } from '../types/dashboard';
import { getDummyData } from '../data/mockData';

export function ProductDistributionDetailContainer() {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const data = getDummyData(timeRange);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Product Distribution Detail</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="day">Yesterday</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <PieChart
            data={data}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            hideTimeRangeSelector={true}
          />
        </div>

        {/* Active vs At-Risk */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Active vs At-Risk Users</h2>
          <CombinedBarChart data={data} />
        </div>
      </div>
    </div>
  );
}