import React, { useState } from 'react';
import { AtRiskUsersTable } from '../components/AtRiskUsersTable';
import { UserDetailModal } from '../components/UserDetailModal';
import { DoughnutChart } from '../components/DoughnutChart';
import { ClusterTable } from '../components/ClusterTable';
import { TimeFilter } from '../components/TimeFilter';
import { ProductType } from '../types/userDetail';
import { TimeRange } from '../types/dashboard';
import { getMockAtRiskUsers } from '../data/mockAtRiskUsers';
import { getMockUserDetail } from '../data/mockUserDetail';
import { getClusterData } from '../data/clusterData';

export function UserDetailPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('All');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const atRiskUsers = getMockAtRiskUsers(selectedProduct, timeRange);
  const selectedUser = selectedUserId ? getMockUserDetail(selectedUserId) : null;
  const clusterData = getClusterData(selectedProduct);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Cluster Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Cluster Overview</h2>
          <div className="flex justify-end">
            <TimeFilter selectedRange={timeRange} onRangeSelect={setTimeRange} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <DoughnutChart 
            data={clusterData.clusters} 
            totalAtRisk={clusterData.totalAtRisk} 
          />
          <ClusterTable data={clusterData.clusters} />
        </div>
      </div>

      {/* At-Risk Users Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User Detail</h2>
        </div>

        {/* At-Risk Users Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">At-Risk Users</h3>
          <AtRiskUsersTable 
            data={atRiskUsers}
            onUserClick={handleUserClick}
          />
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}