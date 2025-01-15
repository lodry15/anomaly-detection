import React, { useState } from 'react';
import { Eye, Search, ArrowUpDown, ArrowUp, ArrowDown, Download } from 'lucide-react';
import { DateRangePicker } from '../components/DateRangePicker';
import { LogDetailModal } from '../components/LogDetailModal';
import { LogEntry } from '../types/log';
import { ProductType } from '../types/userDetail';
import { getMockLogEntries, getMockLogDetail } from '../data/mockLogData';

export function LogPage() {
  const today = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(today.getDate() - 27); // Last 28 days by default

  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductType | 'All'>('All');
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Pick<LogEntry, 'username' | 'numReports' | 'lastReportDate'>;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Pick<LogEntry, 'username' | 'numReports' | 'lastReportDate'>) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key: keyof Pick<LogEntry, 'username' | 'numReports' | 'lastReportDate'>) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown size={16} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUp size={16} className="text-gray-800" /> : 
      <ArrowDown size={16} className="text-gray-800" />;
  };

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Get and sort data
  const logEntries = getMockLogEntries(
    startDate,
    endDate,
    searchTerm,
    selectedProduct
  ).sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    const modifier = direction === 'asc' ? 1 : -1;
    
    if (a[key] < b[key]) return -1 * modifier;
    if (a[key] > b[key]) return 1 * modifier;
    return 0;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">At-Risk User Log</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 h-[42px] w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as ProductType | 'All')}
            className="px-4 py-2 h-[42px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="All">All Products</option>
            <option value="Casino">Casino</option>
            <option value="Sport">Sport</option>
            <option value="Poker">Poker</option>
            <option value="Others">Others</option>
          </select>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
          <button
            className="h-[42px] inline-flex items-center gap-2 px-4 bg-white border border-gray-300 rounded-md text-sm text-gray-700"
          >
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>

        {/* Log Table */}
        <div className="mt-6 overflow-x-auto">
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
                  onClick={() => handleSort('numReports')}
                >
                  <div className="flex items-center gap-2">
                    Number of Reports
                    {getSortIcon('numReports')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Main Product
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastReportDate')}
                >
                  <div className="flex items-center gap-2">
                    Last Report Date
                    {getSortIcon('lastReportDate')}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logEntries.map((entry) => (
                <tr 
                  key={entry.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.numReports}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.mainProduct}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.lastReportDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedUsername(entry.username)}
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

      {/* Detail Modal */}
      {selectedUsername && (
        <LogDetailModal
          data={getMockLogDetail(selectedUsername)}
          onClose={() => setSelectedUsername(null)}
        />
      )}
    </div>
  );
}