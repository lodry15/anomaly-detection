import React from 'react';
import { ProductType } from '../types/userDetail';

interface ClusterData {
  name: string;
  description: string;
  counts: {
    yesterday: {
      value: number;
      trend: number;
    };
    lastWeek: {
      value: number;
      trend: number;
    };
    lastMonth: {
      value: number;
      trend: number;
    };
  };
}

interface SegmentationTableProps {
  data: ClusterData[];
}

function TrendValue({ value, trend }: { value: number; trend: number }) {
  return (
    <div className="text-right">
      <div className="font-medium text-gray-900">{value}</div>
      <div className="text-sm">
        <span className={trend > 0 ? 'text-red-600' : 'text-green-600'}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-gray-900"> vs LP</span>
      </div>
    </div>
  );
}

export function SegmentationTable({ data }: SegmentationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
              Cluster & Description
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yesterday
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last 7 Days
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last 30 Days
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((cluster, index) => (
            <tr 
              key={cluster.name}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{cluster.name}</div>
                <div className="text-sm text-gray-500 mt-1">{cluster.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TrendValue value={cluster.counts.yesterday.value} trend={cluster.counts.yesterday.trend} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TrendValue value={cluster.counts.lastWeek.value} trend={cluster.counts.lastWeek.trend} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TrendValue value={cluster.counts.lastMonth.value} trend={cluster.counts.lastMonth.trend} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}