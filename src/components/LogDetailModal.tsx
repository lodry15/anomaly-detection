import React from 'react';
import { X } from 'lucide-react';
import { LogDetailData } from '../types/log';

interface LogDetailModalProps {
  data: LogDetailData;
  onClose: () => void;
}

export function LogDetailModal({ data, onClose }: LogDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{data.username}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
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

          {/* Report History */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Report History</h3>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reason</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reported By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.reportHistory.map((report, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">{report.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.product}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{report.reason}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.reportedBy}</td>
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