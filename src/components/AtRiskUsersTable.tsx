import React, { useState } from 'react';
import { Eye, Download, Search, ArrowUpDown, ArrowUp, ArrowDown, Plus, X } from 'lucide-react';
import { AtRiskUser, ClusterType, ProductType, RiskLevel, TimeRange } from '../types/userDetail';

interface AtRiskUsersTableProps {
  data: AtRiskUser[];
  onUserClick: (userId: string) => void;
  selectedProduct: ProductType;
  selectedTimeRange: TimeRange;
  onProductChange: (product: ProductType) => void;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

interface Filter {
  field: keyof AtRiskUser;
  operator: '=' | '>' | '<';
  value: string | number;
}

const COLUMN_TOOLTIPS = {
  username: 'User identifier',
  cluster: 'Behavioral cluster based on user patterns',
  level: 'Current risk level assessment',
  ggt: 'Gross Gaming Turnover - Total amount wagered',
  ggr: 'Gross Gaming Revenue - Net revenue after paying out winnings',
  deposit: 'Total deposits made by the user',
  daysAtRisk: 'Consecutive days user has been flagged as at-risk'
};

const CLUSTERS: ClusterType[] = ['High Frequency', 'High Stake', 'Loss Chaser', 'Night Time', 'Erratic'];
const RISK_LEVELS: RiskLevel[] = ['High', 'Medium', 'Low'];

export function AtRiskUsersTable({ 
  data, 
  onUserClick, 
  selectedProduct, 
  selectedTimeRange,
  onProductChange,
  onTimeRangeChange
}: AtRiskUsersTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AtRiskUser;
    direction: 'asc' | 'desc';
  } | null>(null);
  
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [openFilterField, setOpenFilterField] = useState<keyof AtRiskUser | null>(null);
  const [filterOperator, setFilterOperator] = useState<'=' | '>' | '<'>('=');
  const [filterValue, setFilterValue] = useState<string>('');

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

  const getLevelColor = (level: RiskLevel) => {
    switch (level) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-amber-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const addFilter = () => {
    if (!openFilterField || !filterValue) return;

    const newFilter: Filter = {
      field: openFilterField,
      operator: filterOperator,
      value: ['ggt', 'ggr', 'deposit', 'daysAtRisk'].includes(openFilterField)
        ? Number(filterValue)
        : filterValue
    };

    setActiveFilters(prev => [...prev, newFilter]);
    setOpenFilterField(null);
    setFilterValue('');
    setFilterOperator('=');
  };

  const removeFilter = (index: number) => {
    setActiveFilters(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setOpenFilterField(null);
    setFilterValue('');
    setFilterOperator('=');
  };

  // Apply filters to data
  const filteredData = data.filter(user => {
    return activeFilters.every(filter => {
      const userValue = user[filter.field];
      
      if (typeof userValue === 'number') {
        const numericValue = Number(filter.value);
        switch (filter.operator) {
          case '=': return userValue === numericValue;
          case '>': return userValue > numericValue;
          case '<': return userValue < numericValue;
          default: return true;
        }
      }
      
      if (filter.operator === '=') {
        return String(userValue).toLowerCase().includes(String(filter.value).toLowerCase());
      }
      
      return true;
    });
  });

  // Sort filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    const modifier = direction === 'asc' ? 1 : -1;
    
    if (a[key] < b[key]) return -1 * modifier;
    if (a[key] > b[key]) return 1 * modifier;
    return 0;
  });

  const FilterTag = ({ filter, index }: { filter: Filter; index: number }) => (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
      <span className="text-gray-700">
        {filter.field} {filter.operator} {filter.value}
      </span>
      <button
        onClick={() => removeFilter(index)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X size={14} />
      </button>
    </div>
  );

  const FilterDropdown = ({ field }: { field: keyof AtRiskUser }) => {
    const isNumeric = ['ggt', 'ggr', 'deposit', 'daysAtRisk'].includes(field);
    const isEnum = field === 'cluster' || field === 'level';

    return (
      <div className="absolute z-10 mt-1 w-60 bg-white rounded-md shadow-lg border border-gray-200 p-2">
        {isNumeric && (
          <div className="flex gap-2 mb-2">
            <select
              value={filterOperator}
              onChange={(e) => setFilterOperator(e.target.value as '=' | '>' | '<')}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
            >
              <option value="=">=</option>
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
            </select>
            <input
              type="number"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
            />
          </div>
        )}

        {field === 'username' && (
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Search username"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
            autoFocus
          />
        )}

        {field === 'cluster' && (
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
            autoFocus
          >
            <option value="">Select cluster</option>
            {CLUSTERS.map(cluster => (
              <option key={cluster} value={cluster}>{cluster}</option>
            ))}
          </select>
        )}

        {field === 'level' && (
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
            autoFocus
          >
            <option value="">Select level</option>
            {RISK_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        )}

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setOpenFilterField(null)}
            className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              addFilter();
              setOpenFilterField(null);
            }}
            disabled={!filterValue}
            className="px-2 py-1 text-sm bg-[#2A3647] text-white rounded-md hover:bg-[#3a4759] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  const TableHeader = ({ label, field }: { label: string; field: keyof AtRiskUser }) => {
    const isNumeric = ['ggt', 'ggr', 'deposit', 'daysAtRisk'].includes(field);
    
    return (
      <th className={`px-6 py-3 ${isNumeric ? 'text-right' : 'text-left'}`}>
        <div className="space-y-2">
          <div 
            className={`flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group ${isNumeric ? 'justify-end' : 'justify-start'}`}
            onClick={() => handleSort(field)}
            title={COLUMN_TOOLTIPS[field]}
          >
            {label}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              {getSortIcon(field)}
            </span>
          </div>
          
          <div className={`flex items-center gap-2 ${isNumeric ? 'justify-end' : 'justify-start'}`}>
            <button
              onClick={() => setOpenFilterField(field)}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Plus size={12} />
              Add Filter
            </button>
            {openFilterField === field && (
              <FilterDropdown field={field} />
            )}
          </div>
        </div>
      </th>
    );
  };

  const TopFilter = ({ 
    label, 
    value, 
    options, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    options: { value: string; label: string; }[];
    onChange: (value: string) => void;
  }) => (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2A3647] focus:border-transparent hover:bg-gray-50 transition-colors"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Top Filters */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">At-Risk Users</h3>
        <div className="flex items-center gap-4">
          <TopFilter
            label="Product"
            value={selectedProduct}
            options={[
              { value: 'All', label: 'All Products' },
              { value: 'Casino', label: 'Casino' },
              { value: 'Sport', label: 'Sport' },
              { value: 'Poker', label: 'Poker' },
              { value: 'Virtual', label: 'Virtual' },
              { value: 'Skill', label: 'Skill' },
              { value: 'Others', label: 'Others' }
            ]}
            onChange={(value) => onProductChange(value as ProductType)}
          />
          <TopFilter
            label="Date"
            value={selectedTimeRange}
            options={[
              { value: 'Yesterday', label: 'Yesterday' },
              { value: 'Last 7 Days', label: 'Last 7 Days' },
              { value: 'Last 30 Days', label: 'Last 30 Days' }
            ]}
            onChange={(value) => onTimeRangeChange(value as TimeRange)}
          />
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <FilterTag key={index} filter={filter} index={index} />
            ))}
          </div>
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader label="Username" field="username" />
              <TableHeader label="Cluster" field="cluster" />
              <TableHeader label="Level" field="level" />
              <TableHeader label="GGT (€)" field="ggt" />
              <TableHeader label="GGR (€)" field="ggr" />
              <TableHeader label="Deposit (€)" field="deposit" />
              <TableHeader label="Days At-Risk" field="daysAtRisk" />
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((user) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-medium ${getLevelColor(user.level)}`}>
                    {user.level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {user.ggt.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {user.ggr.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {user.deposit.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {user.daysAtRisk}
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