import React, { useState } from 'react';
import { X, ArrowUpDown, ArrowUp, ArrowDown, Plus, Mail, Ban, Clock, AlertTriangle, Download, Filter } from 'lucide-react';
import { LogDetailData, ReportHistoryEntry, ActionType, Status } from '../types/log';

interface LogDetailModalProps {
  data: LogDetailData;
  onClose: () => void;
  onStatusChange: (status: Status) => void;
}

interface SortConfig {
  key: keyof ReportHistoryEntry;
  direction: 'asc' | 'desc';
}

const ACTION_TYPES: ActionType[] = [
  'Call Attempt',
  'Email Sent',
  'Alert Sent',
  'Limits Set',
  'Temporary Suspension',
  'Others'
];

const STATUSES: Status[] = ['Done', 'Under Monitoring', 'Pending Review'];

export function LogDetailModal({ data, onClose, onStatusChange }: LogDetailModalProps) {
  const [showActionForm, setShowActionForm] = useState(false);
  const [selectedActionType, setSelectedActionType] = useState<ActionType>('Call Attempt');
  const [selectedStatus, setSelectedStatus] = useState<Status>('Under Monitoring');
  const [actionNote, setActionNote] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filterProduct, setFilterProduct] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  const handleSort = (key: keyof ReportHistoryEntry) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key: keyof ReportHistoryEntry) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown size={16} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUp size={16} className="text-gray-800" /> : 
      <ArrowDown size={16} className="text-gray-800" />;
  };

  const handleSaveAction = () => {
    // In a real application, this would make an API call to add the action
    console.log('Saving action:', {
      type: selectedActionType,
      note: actionNote,
      followUpDate: followUpDate || undefined
    });
    
    setSelectedActionType('Call Attempt');
    setActionNote('');
    setFollowUpDate('');
    setShowActionForm(false);
  };

  const handleQuickAction = (action: 'email' | 'alert' | 'limits' | 'suspension') => {
    switch (action) {
      case 'email':
        console.log('Opening email template for:', data.username);
        break;
      case 'alert':
        console.log('Sending alert to:', data.username);
        break;
      case 'limits':
        console.log('Opening enforce limits modal for:', data.username);
        break;
      case 'suspension':
        console.log('Initiating temporary suspension for:', data.username);
        break;
    }
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    console.log(`Exporting ${format} for:`, data.username);
  };

  const handleClose = () => {
    onStatusChange(selectedStatus);
    onClose();
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-amber-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Pending Review': return 'bg-red-600 hover:bg-red-700';
      case 'Under Monitoring': return 'bg-amber-600 hover:bg-amber-700';
      case 'Done': return 'bg-green-600 hover:bg-green-700';
    }
  };

  const filteredAndSortedHistory = [...data.reportHistory]
    .filter(report => {
      if (filterProduct !== 'all' && report.product !== filterProduct) return false;
      if (filterRisk !== 'all' && report.riskLevel.toLowerCase() !== filterRisk) return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;
      
      const { key, direction } = sortConfig;
      const modifier = direction === 'asc' ? 1 : -1;
      
      if (a[key] < b[key]) return -1 * modifier;
      if (a[key] > b[key]) return 1 * modifier;
      return 0;
    });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{data.username}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-[#2A3647] text-white rounded-lg hover:bg-[#3a4759]"
            >
              Save & Close
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* User Information */}
          <section>
            <h3 className="text-lg font-semibold mb-4">User Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{data.age} years</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Province</p>
                <p className="font-medium">{data.province}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">{data.registrationDate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="font-medium">{data.lastLogin}</p>
              </div>
            </div>
          </section>

          {/* Update Status */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Update Status</h3>
            <div className="flex gap-4">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-6 py-3 rounded-lg text-white transition-colors ${
                    selectedStatus === status 
                      ? getStatusColor(status) 
                      : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleQuickAction('email')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Mail size={20} />
                Contact User
              </button>
              <button
                onClick={() => handleQuickAction('alert')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                <AlertTriangle size={20} />
                Send Alert
              </button>
              <button
                onClick={() => handleQuickAction('limits')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Ban size={20} />
                Enforce Limits
              </button>
              <button
                onClick={() => handleQuickAction('suspension')}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Clock size={20} />
                Temporary Suspension
              </button>
            </div>
          </section>

          {/* Actions Timeline */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Actions Timeline</h3>
              <button
                onClick={() => setShowActionForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#2A3647] text-white rounded-lg hover:bg-[#3a4759]"
              >
                <Plus size={20} />
                Log Action
              </button>
            </div>

            {showActionForm && (
              <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Action Type
                    </label>
                    <select
                      value={selectedActionType}
                      onChange={(e) => setSelectedActionType(e.target.value as ActionType)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
                    >
                      {ACTION_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Note
                    </label>
                    <textarea
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      placeholder="Enter details about the action taken..."
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Follow-up Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A3647] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowActionForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAction}
                    className="px-4 py-2 bg-[#2A3647] text-white rounded-lg hover:bg-[#3a4759]"
                  >
                    Save Action
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {data.timeline.map((entry) => (
                <div key={entry.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{entry.actionType}</span>
                      <span className="text-sm text-gray-500">{entry.date}</span>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">By: {entry.operatorName}</span>
                      {entry.followUpDate && (
                        <span className="text-sm text-blue-600">
                          Follow-up: {entry.followUpDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Report History */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Report History</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-400" />
                  <select
                    value={filterProduct}
                    onChange={(e) => setFilterProduct(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Products</option>
                    <option value="Casino">Casino</option>
                    <option value="Sport">Sport</option>
                    <option value="Poker">Poker</option>
                  </select>
                  <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="high">High Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="low">Low Risk</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    <Download size={16} />
                    PDF
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    <Download size={16} />
                    CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center gap-2">
                        Date
                        {getSortIcon('date')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('product')}
                    >
                      <div className="flex items-center gap-2">
                        Product
                        {getSortIcon('product')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('riskLevel')}
                    >
                      <div className="flex items-center gap-2">
                        Risk
                        {getSortIcon('riskLevel')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('reportedBy')}
                    >
                      <div className="flex items-center gap-2">
                        Reported By
                        {getSortIcon('reportedBy')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredAndSortedHistory.map((report) => (
                    <tr key={report.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                        {report.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.product}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`font-medium ${getRiskLevelColor(report.riskLevel)}`}>
                          {report.riskLevel}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.reportedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}