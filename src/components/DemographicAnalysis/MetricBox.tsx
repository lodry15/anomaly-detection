import React from 'react';

interface MetricData {
  title: string;
  activeUsers: {
    current: number;
    label?: string;
    lastWeek: number;
    lastMonth: number;
  };
  atRiskUsers: {
    current: number;
    label?: string;
    lastWeek: number;
    lastMonth: number;
  };
}

interface MetricBoxProps {
  data: MetricData;
  isAge?: boolean;
  isGender?: boolean;
}

function formatValue(value: number, isAge: boolean = false, isGender: boolean = false): string {
  if (isAge) {
    return `${value}y`;
  }
  if (isGender) {
    const womenPercentage = 100 - value;
    return `${value}% / ${womenPercentage}%`;
  }
  return value.toLocaleString();
}

export function MetricBox({ data, isAge = false, isGender = false }: MetricBoxProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-base font-medium text-gray-900 mb-3">{data.title}</h3>
      
      <div className="flex">
        {/* Left side - Current Values */}
        <div className="w-[45%] space-y-3 pr-4 border-r border-gray-200">
          <div>
            <div className="text-sm font-medium text-gray-500">Active Users</div>
            <div className="mt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatValue(data.activeUsers.current, isAge, isGender)}
                </span>
                {isGender && (
                  <span className="text-sm text-gray-600">men/women</span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-gray-500">At-Risk Users</div>
            <div className="mt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-red-600">
                  {formatValue(data.atRiskUsers.current, isAge, isGender)}
                </span>
                {isGender && (
                  <span className="text-sm text-gray-600">men/women</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Comparison Table */}
        <div className="w-[55%] pl-4">
          <div className="bg-gray-50 rounded-lg text-sm">
            <div className="grid grid-cols-3 px-3 py-2 border-b border-gray-200">
              <div className="font-medium text-gray-500">Period</div>
              <div className="font-medium text-gray-500 text-center">Active</div>
              <div className="font-medium text-gray-500 text-center">At-Risk</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-3 px-3 py-2">
                <div className="text-gray-600">Last 7d</div>
                <div className="font-medium text-center">
                  {formatValue(data.activeUsers.lastWeek, isAge, isGender)}
                </div>
                <div className="font-medium text-center text-red-600">
                  {formatValue(data.atRiskUsers.lastWeek, isAge, isGender)}
                </div>
              </div>
              <div className="grid grid-cols-3 px-3 py-2">
                <div className="text-gray-600">Last 30d</div>
                <div className="font-medium text-center">
                  {formatValue(data.activeUsers.lastMonth, isAge, isGender)}
                </div>
                <div className="font-medium text-center text-red-600">
                  {formatValue(data.atRiskUsers.lastMonth, isAge, isGender)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}