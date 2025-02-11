import { ProductType } from '../types/userDetail';

interface ClusterData {
  name: string;
  description: string;
  counts: {
    yesterday: {
      value: number;
      trend: number;
    };
    lastWeek: {
      value: number;
      trend: number;
    };
    lastMonth: {
      value: number;
      trend: number;
    };
  };
}

const BASE_DATA: ClusterData[] = [
  {
    name: 'High Frequency Players',
    description: 'Users who play frequently with consistent high activity patterns',
    counts: {
      yesterday: { value: 12, trend: 8 },
      lastWeek: { value: 30, trend: -5 },
      lastMonth: { value: 45, trend: 12 }
    }
  },
  {
    name: 'High Stakes Players',
    description: 'Users placing large bets with significant financial exposure',
    counts: {
      yesterday: { value: 8, trend: -3 },
      lastWeek: { value: 20, trend: 7 },
      lastMonth: { value: 30, trend: -2 }
    }
  },
  {
    name: 'Loss Chasers',
    description: 'Users showing patterns of increasing bets after losses',
    counts: {
      yesterday: { value: 6, trend: 15 },
      lastWeek: { value: 10, trend: -8 },
      lastMonth: { value: 15, trend: 4 }
    }
  },
  {
    name: 'Night Time Players',
    description: 'Users predominantly active during late-night hours',
    counts: {
      yesterday: { value: 4, trend: -6 },
      lastWeek: { value: 8, trend: 10 },
      lastMonth: { value: 10, trend: -5 }
    }
  },
  {
    name: 'Erratic Behavior',
    description: 'Users with unpredictable playing patterns and sudden changes',
    counts: {
      yesterday: { value: 2, trend: 12 },
      lastWeek: { value: 6, trend: -4 },
      lastMonth: { value: 5, trend: 8 }
    }
  }
];

export const getSegmentationData = (product: ProductType = 'All'): ClusterData[] => {
  if (product === 'All') {
    return BASE_DATA;
  }

  // Apply product-specific multiplier
  const multiplier = {
    Casino: 0.8,
    Sport: 0.6,
    Poker: 0.4,
    Virtual: 0.3,
    Skill: 0.2,
    Others: 0.1
  }[product] || 1;

  return BASE_DATA.map(cluster => ({
    ...cluster,
    counts: {
      yesterday: {
        value: Math.round(cluster.counts.yesterday.value * multiplier),
        trend: cluster.counts.yesterday.trend
      },
      lastWeek: {
        value: Math.round(cluster.counts.lastWeek.value * multiplier),
        trend: cluster.counts.lastWeek.trend
      },
      lastMonth: {
        value: Math.round(cluster.counts.lastMonth.value * multiplier),
        trend: cluster.counts.lastMonth.trend
      }
    }
  }));
};