import { ProductClusterData, ProductType } from '../types/userDetail';

const baseClusterData = [
  {
    id: 'high-frequency',
    name: 'High Frequency Players',
    description: 'Users who play frequently with consistent high activity patterns',
    baseAtRisk: 120
  },
  {
    id: 'high-stakes',
    name: 'High Stakes Players',
    description: 'Users placing large bets with significant financial exposure',
    baseAtRisk: 85
  },
  {
    id: 'chase-losses',
    name: 'Loss Chasers',
    description: 'Users showing patterns of increasing bets after losses',
    baseAtRisk: 95
  },
  {
    id: 'night-players',
    name: 'Night Time Players',
    description: 'Users predominantly active during late night hours',
    baseAtRisk: 65
  },
  {
    id: 'erratic',
    name: 'Erratic Behavior',
    description: 'Users with unpredictable playing patterns and sudden changes',
    baseAtRisk: 45
  }
];

export const getClusterData = (product: ProductType): ProductClusterData => {
  const multiplier = {
    Casino: 1,
    Sport: 0.8,
    Poker: 0.6,
    Others: 0.3,
    All: 1.2
  }[product];

  const clusters = baseClusterData.map(cluster => {
    const atRiskUsers = Math.round(cluster.baseAtRisk * multiplier);
    return {
      ...cluster,
      atRiskUsers,
      percentage: 0 // Will be calculated below
    };
  });

  const totalAtRisk = clusters.reduce((sum, cluster) => sum + cluster.atRiskUsers, 0);
  
  // Calculate percentages
  clusters.forEach(cluster => {
    cluster.percentage = Math.round((cluster.atRiskUsers / totalAtRisk) * 100);
  });

  return {
    product,
    totalAtRisk,
    clusters
  };
};