import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { TimeRange, UserDetailData } from '../types/userDetail';
import { RiskFactorsPieChart } from './RiskFactorsPieChart';

interface UserDetailModalProps {
  user: UserDetailData;
  onClose: () => void;
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMarkAtRisk = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Here you would typically make an API call to update the user's status
    console.log(`Marked ${user.username} as at-risk at ${new Date().toISOString()}`);
    setShowConfirmation(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleMarkAtRisk}
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

        <div className="p-6 space-y-8">
          {/* User Information */}
          <section>
            <h3 className="text-lg font-semibold mb-4">User Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Province of Residence</p>
                  <p className="font-medium">{user.province}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="font-medium">{user.registrationDate}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{user.age} years</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-medium">{user.lastLogin}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Preferred Product</p>
                  <p className="font-medium">{user.preferredProduct}</p>
                </div>
              </div>
            </div>
          </section>

          {/* At-Risk Behavior */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Risk Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  user.riskLevel === 'High' 
                    ? 'bg-red-100 text-red-800'
                    : user.riskLevel === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.riskLevel} Risk
                </div>
                <RiskFactorsPieChart product={user.preferredProduct} />
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-base font-medium">Key Statistics</h4>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Deposits</span>
                    <span className="font-medium">€{user.stats.totalDeposits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Withdrawals</span>
                    <span className="font-medium">€{user.stats.totalWithdrawals.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Bets</span>
                    <span className="font-medium">€{user.stats.totalBets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Wins</span>
                    <span className="font-medium">€{user.stats.totalWins.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Net Profit</span>
                    <span className={`font-medium ${user.stats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      €{user.stats.netProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Bet Size</span>
                    <span className="font-medium">€{user.stats.avgBetSize.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payout Percentage</span>
                    <span className="font-medium">{user.stats.payoutPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">Confirm Action</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to mark {user.username} as At-Risk? This action will create a new log entry.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center z-[60]">
            <CheckCircle2 size={20} className="mr-2" />
            User marked as At-Risk successfully
          </div>
        )}
      </div>
    </div>
  );
}