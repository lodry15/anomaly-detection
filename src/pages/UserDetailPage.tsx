import React, { useState } from 'react';
import { AtRiskUsersTable } from '../components/AtRiskUsersTable';
import { UserDetailModal } from '../components/UserDetailModal';
import { MetricBox } from '../components/DemographicAnalysis/MetricBox';
import { AgeDistributionChart } from '../components/DemographicAnalysis/AgeDistributionChart';
import { SegmentationTable } from '../components/SegmentationTable';
import { ProductType, TimeRange } from '../types/userDetail';
import { getMockAtRiskUsers } from '../data/mockAtRiskUsers';
import { getMockUserDetail } from '../data/mockUserDetail';
import { getDemographicData } from '../data/demographicData';
import { getSegmentationData } from '../data/segmentationData';

const METRIC_DATA = {
  newUsers: {
    title: 'New Users (Yesterday)',
    activeUsers: {
      current: 180,
      lastWeek: 230,
      lastMonth: 675
    },
    atRiskUsers: {
      current: 8,
      lastWeek: 22,
      lastMonth: 31
    }
  },
  averageAge: {
    title: 'Average Age (Yesterday)',
    activeUsers: {
      current: 37.5,
      lastWeek: 37.2,
      lastMonth: 37.8
    },
    atRiskUsers: {
      current: 32.2,
      lastWeek: 32.5,
      lastMonth: 32.0
    }
  },
  genderSplit: {
    title: 'Gender Split (Yesterday)',
    activeUsers: {
      current: 71,
      label: 'men',
      lastWeek: 70,
      lastMonth: 72
    },
    atRiskUsers: {
      current: 81,
      label: 'men',
      lastWeek: 81,
      lastMonth: 83
    }
  }
};

export function UserDetailPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('All');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('Yesterday');
  
  const atRiskUsers = getMockAtRiskUsers(selectedProduct, timeRange);
  const selectedUser = selectedUserId ? getMockUserDetail(selectedUserId) : null;
  const demographicData = getDemographicData('yesterday', selectedProduct);
  const segmentationData = getSegmentationData(selectedProduct);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Demographic Analysis Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Demographic Analysis</h2>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Products</option>
            <option value="Casino">Casino</option>
            <option value="Sport">Sport</option>
            <option value="Poker">Poker</option>
            <option value="Virtual">Virtual</option>
            <option value="Skill">Skill</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Metrics */}
          <div className="col-span-5 space-y-4">
            <MetricBox data={METRIC_DATA.newUsers} />
            <MetricBox data={METRIC_DATA.averageAge} isAge />
            <MetricBox data={METRIC_DATA.genderSplit} isGender />
          </div>

          {/* Right Column - Age Distribution Chart */}
          <div className="col-span-7 border border-gray-200 rounded-lg p-4 bg-white">
            <AgeDistributionChart data={demographicData.ageGroups} />
          </div>
        </div>
      </div>

      {/* Segmentation Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Segmentation</h2>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Products</option>
            <option value="Casino">Casino</option>
            <option value="Sport">Sport</option>
            <option value="Poker">Poker</option>
            <option value="Virtual">Virtual</option>
            <option value="Skill">Skill</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <SegmentationTable data={segmentationData} />
      </div>

      {/* At-Risk Users Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-300">
        <AtRiskUsersTable 
          data={atRiskUsers}
          onUserClick={handleUserClick}
          selectedProduct={selectedProduct}
          selectedTimeRange={timeRange}
          onProductChange={setSelectedProduct}
          onTimeRangeChange={setTimeRange}
        />
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