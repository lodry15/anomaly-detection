import React, { useState } from 'react';
import { StatBox } from '../components/StatBox';
import { TrendLineAtRiskUsers } from '../components/TrendLineAtRiskUsers';
import { ProductDistributionDetailContainer } from '../components/ProductDistributionDetailContainer';
import { KPIAnalysisPanel } from '../components/KPIAnalysisPanel';

export function SummaryPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Business Impact</h1>
        </div>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <StatBox
            type="active"
            yesterday={{ value: 1500, delta: 2.5 }}
            lastWeek={{ value: 2800, delta: -1.0 }}
            lastMonth={{ value: 4500, delta: 3.1 }}
          />
          <StatBox
            type="risk"
            yesterday={{ value: 30, delta: 3.5 }}
            lastWeek={{ value: 70, delta: 2.0 }}
            lastMonth={{ value: 105, delta: 3.1 }}
          />
        </div>

        {/* Independent Trendline */}
        <TrendLineAtRiskUsers />

        {/* Product Distribution Detail Container */}
        <div className="mt-6">
          <ProductDistributionDetailContainer />
        </div>

        {/* KPI Analysis Panel */}
        <div className="mt-6">
          <KPIAnalysisPanel />
        </div>
      </div>
    </div>
  );
}