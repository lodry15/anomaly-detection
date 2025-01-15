import React from 'react';
import { TimeRange } from '../types/dashboard';

interface TimeFilterProps {
  selectedRange: TimeRange;
  onRangeSelect: (range: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

export function TimeFilter({ selectedRange, onRangeSelect }: TimeFilterProps) {
  return (
    <div className="space-y-2">
      <div className="inline-flex bg-gray-100 rounded-lg p-1">
        {ranges.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onRangeSelect(value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedRange === value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        {selectedRange === 'day' && new Date(Date.now() - 86400000).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
        {selectedRange === 'week' && 'Last 7 days'}
        {selectedRange === 'month' && 'Last 30 days'}
      </p>
    </div>
  );
}