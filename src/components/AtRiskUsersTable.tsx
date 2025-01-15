import React, { useState } from 'react';
import { Eye, Download, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { AtRiskUser, ClusterType, ProductType } from '../types/userDetail';

interface AtRiskUsersTableProps {
  data: AtRiskUser[];
  onUserClick: (userId: string) => void;
}

export function AtRiskUsersTable({ data, onUserClick }: AtRiskUsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<ClusterType | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('All');
  const [timeRange, setTimeRange] = useState('day');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AtRiskUser;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleExport = () => {
    // Filter data based on current filters
    const filteredData = data
      .filter(user => 
        (selectedCluster === 'All' || user.cluster === selectedCluster) &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Create CSV content
    const headers = ['Username', 'Cluster', 'Total Deposit', 'Total Bets', 'Net Profit', 'Payout (%)'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(user => [
        user.username,
        user.cluster,
        `€${user.totalDeposit.toLocaleString()}`,
        user.totalBets,
        `€${user.netProfit.toLocaleString()}`,
        `${user.payoutPercentage}%`
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `at-risk-users-${timeRange}-${selectedProduct.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (key: keyof AtRiskUser) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key: keyof AtRiskUser) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown size={16} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUp size={16} className="text-gray-800" /> : 
      <ArrowDown size={16} className="text-gray-800" />;
  };

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    const modifier = direction === 'asc' ? 1 : -1;
    
    if (a[key] < b[key]) return -1 * modifier;
    if (a[key] > b[key]) return 1 * modifier;
    return 0;
  });

  // Filter data
  const filteredData = sortedData.filter(user => 
    (selectedCluster === 'All' || user.cluster === selectedCluster) &&
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="All">All Products</option>
            <option value="Casino">Casino</option>
            <option value="Sport">Sport</option>
            <option value="Poker">Poker</option>
            <option value="Others">Others</option>
          </select>
          <select
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value as ClusterType | 'All')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="All">All Clusters</option>
            <option value="Consistent">Consistent Users</option>
            <option value="Regular">Regular Users</option>
            <option value="Impulsive">Impulsive Users</option>
            <option value="Erratic">Erratic Users</option>
            <option value="New">New Users</option>
            <option value="High-Value">High-Value Users</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('username')}
              >
                <div className="flex items-center gap-2">
                  Username
                  {getSortIcon('username')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('cluster')}
              >
                <div className="flex items-center gap-2">
                  Cluster
                  {getSortIcon('cluster')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('totalDeposit')}
              >
                <div className="flex items-center justify-end gap-2">
                  Total Deposit
                  {getSortIcon('totalDeposit')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('totalBets')}
              >
                <div className="flex items-center justify-end gap-2">
                  Total Bets
                  {getSortIcon('totalBets')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('netProfit')}
              >
                <div className="flex items-center justify-end gap-2">
                  Net Profit
                  {getSortIcon('netProfit')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('payoutPercentage')}
              >
                <div className="flex items-center justify-end gap-2">
                  Payout (%)
                  {getSortIcon('payoutPercentage')}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((user) => (
              <tr 
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onUserClick(user.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.cluster}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  €{user.totalDeposit.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {user.totalBets.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={user.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                    €{user.netProfit.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {user.payoutPercentage}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUserClick(user.id);
                    }}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    <Eye size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}