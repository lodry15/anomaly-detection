import React from 'react';
import { ClusterData } from '../types/userDetail';
import { COLORS } from './DoughnutChart';

interface ClusterTableProps {
  data: ClusterData[];
}

export function ClusterTable({ data }: ClusterTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cluster & Description
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              At-Risk Users
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((cluster, index) => (
            <tr key={cluster.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="font-medium" style={{ color: COLORS[index % COLORS.length] }}>
                  {cluster.name}
                </div>
                <div className="text-sm text-gray-500 mt-1">{cluster.description}</div>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{cluster.atRiskUsers}</div>
                <div className="text-sm text-gray-500">{cluster.percentage}%</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}