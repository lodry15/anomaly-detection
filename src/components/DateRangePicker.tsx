import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

const presetRanges = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 14 days', days: 14 },
  { label: 'Last 28 days', days: 28 },
  { label: 'Last 3 months', days: 90 }
];

export function DateRangePicker({ startDate, endDate, onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [includeToday, setIncludeToday] = useState(true);
  const [selectedRange, setSelectedRange] = useState('Last 7 days');
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleApply = () => {
    onDateChange(tempStartDate, tempEndDate);
    setIsOpen(false);
  };

  const handlePresetClick = (days: number, label: string) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    
    setTempStartDate(start.toISOString().split('T')[0]);
    setTempEndDate(end.toISOString().split('T')[0]);
    setSelectedRange(label);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[42px] inline-flex items-center gap-2 px-4 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
      >
        <Calendar size={18} />
        <span>{selectedRange}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[600px] bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={includeToday}
                onChange={(e) => setIncludeToday(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Include today
              <span className="ml-2 text-gray-500">{selectedRange}</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Start Date</h3>
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">End Date</h3>
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 flex items-center gap-4">
            <div className="flex-grow">
              {presetRanges.map(({ label, days }) => (
                <button
                  key={label}
                  onClick={() => handlePresetClick(days, label)}
                  className={`mr-2 px-3 py-1 rounded-md text-sm ${
                    selectedRange === label
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}