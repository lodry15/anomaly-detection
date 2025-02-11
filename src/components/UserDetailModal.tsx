import React, { useState } from 'react';
import { X, AlertTriangle, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { UserDetailData } from '../types/userDetail';
import { RiskFactorsPieChart } from './RiskFactorsPieChart';
import { AnomalyScoreTrendline } from './AnomalyScoreTrendline';

interface UserDetailModalProps {
  user: UserDetailData;
  onClose: () => void;
}

interface StatisticRow {
  key: string;
  label: string;
  atRiskValue: number;
  averageValue: number;
  format?: 'currency' | 'percentage' | 'hours' | 'count';
}

const STATISTICS: StatisticRow[] = [
  { key: 'ggt', label: 'GGT', atRiskValue: 800, averageValue: 400, format: 'currency' },
  { key: 'ggr', label: 'GGR', atRiskValue: 300, averageValue: 150, format: 'currency' },
  { key: 'netProfit', label: 'Net Profit', atRiskValue: -50, averageValue: 20, format: 'currency' },
  { key: 'totalDeposit', label: 'Total Deposit', atRiskValue: 900, averageValue: 200, format: 'currency' },
  { key: 'totalPayout', label: 'Total Pay-out', atRiskValue: 600, averageValue: 150, format: 'currency' },
  { key: 'winRatio', label: 'Win-Ratio', atRiskValue: 94, averageValue: 88, format: 'percentage' },
  { key: 'daysAtRisk', label: 'Days At Risk', atRiskValue: 10, averageValue: 4, format: 'count' },
  { key: 'netLoss', label: 'Net Loss', atRiskValue: 300, averageValue: 100, format: 'currency' },
  { key: 'timeSpent', label: 'Time Spent Gambling', atRiskValue: 20, averageValue: 8, format: 'hours' },
  { key: 'depositFreq', label: 'Deposit Frequency', atRiskValue: 15, averageValue: 5, format: 'count' }
];

function formatValue(value: number, format: StatisticRow['format'] = 'currency'): string {
  switch (format) {
    case 'currency':
      return `€${Math.abs(value).toLocaleString()}`;
    case 'percentage':
      return `${value}%`;
    case 'hours':
      return `${value}h`;
    case 'count':
      return value.toString();
    default:
      return value.toString();
  }
}

function calculateGap(atRiskValue: number, averageValue: number, format: StatisticRow['format'] = 'currency'): string {
  const gap = atRiskValue - averageValue;
  return formatValue(gap, format);
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: 'atRiskValue' | 'averageValue' | 'gap';
    direction: 'asc' | 'desc';
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSort = (key: 'atRiskValue' | 'averageValue' | 'gap') => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key: 'atRiskValue' | 'averageValue' | 'gap') => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown size={16} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUp size={16} className="text-gray-800" /> : 
      <ArrowDown size={16} className="text-gray-800" />;
  };

  const handleMarkAtRisk = () => {
    console.log('Marking user as at-risk:', user.username);
    onClose();
  };

  const sortedStats = [...STATISTICS].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const getValue = (stat: StatisticRow) => {
      switch (sortConfig.key) {
        case 'atRiskValue':
          return stat.atRiskValue;
        case 'averageValue':
          return stat.averageValue;
        case 'gap':
          return stat.atRiskValue - stat.averageValue;
        default:
          return 0;
      }
    };

    const modifier = sortConfig.direction === 'asc' ? 1 : -1;
    return (getValue(a) - getValue(b)) * modifier;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowConfirmation(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <AlertTriangle size={20} className="mr-2" />
              Mark as At-Risk
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to mark {user.username} as at-risk?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMarkAtRisk}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* User Information */}
          <section>
            <h3 className="text-lg font-semibold mb-3">User Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{user.age} years</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Province</p>
                <p className="font-medium">{user.province}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">{user.registrationDate}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="font-medium">{user.lastLogin}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Preferred Products</p>
                <p className="font-medium">{user.preferredProducts.join(', ')}</p>
              </div>
            </div>
          </section>

          {/* Risk Analysis */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Risk Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <RiskFactorsPieChart product={user.preferredProducts[0]} />
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <AnomalyScoreTrendline />
              </div>
            </div>
          </section>

          {/* Key Statistics */}
          <section>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-base font-medium mb-6">Key Statistics (Last 14 days)</h4>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th 
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('atRiskValue')}
                      >
                        <div className="flex items-center justify-end gap-2">
                          At-Risk Value
                          {getSortIcon('atRiskValue')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('averageValue')}
                      >
                        <div className="flex items-center justify-end gap-2">
                          Average Value
                          {getSortIcon('averageValue')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('gap')}
                      >
                        <div className="flex items-center justify-end gap-2">
                          Gap
                          {getSortIcon('gap')}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedStats.map((stat) => {
                      const gap = stat.atRiskValue - stat.averageValue;
                      const isNegative = stat.atRiskValue < 0;
                      
                      return (
                        <tr key={stat.key} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stat.label}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <span className={isNegative ? 'text-red-600' : 'text-gray-900'}>
                              {isNegative && '-'}
                              {formatValue(stat.atRiskValue, stat.format)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                            {formatValue(stat.averageValue, stat.format)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <span className={gap > 0 ? 'text-red-600' : 'text-green-600'}>
                              {gap > 0 ? '+' : ''}
                              {calculateGap(stat.atRiskValue, stat.averageValue, stat.format)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}