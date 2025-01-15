import { AtRiskUser, ClusterType, ProductType } from '../types/userDetail';

const generateMockUser = (id: number, timeRange: string): AtRiskUser => {
  const clusters: ClusterType[] = ['Consistent', 'Regular', 'Impulsive', 'Erratic', 'New', 'High-Value'];
  
  // Adjust values based on time range
  const multiplier = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
  
  const baseDeposit = Math.floor(Math.random() * 50000) + 1000;
  const baseBets = Math.floor(Math.random() * 1000) + 100;
  const baseProfit = Math.floor((Math.random() * 20000) - 10000);
  
  return {
    id: `user-${id}`,
    username: `player${id}`,
    cluster: clusters[Math.floor(Math.random() * clusters.length)],
    totalDeposit: baseDeposit * multiplier,
    totalBets: baseBets * multiplier,
    netProfit: baseProfit * multiplier,
    payoutPercentage: Math.floor(Math.random() * 40) + 60
  };
};

export const getMockAtRiskUsers = (product: ProductType, timeRange: string = 'day'): AtRiskUser[] => {
  const baseUsers = Array.from({ length: 50 }, (_, i) => generateMockUser(i + 1, timeRange));
  
  if (product === 'All') {
    return baseUsers;
  }
  
  // Filter and adjust data based on product
  const productMultiplier = {
    Casino: 0.8,
    Sport: 0.7,
    Poker: 0.6,
    Others: 0.4
  }[product] || 1;
  
  return baseUsers
    .slice(0, Math.floor(baseUsers.length * 0.6))
    .map(user => ({
      ...user,
      totalDeposit: Math.floor(user.totalDeposit * productMultiplier),
      totalBets: Math.floor(user.totalBets * productMultiplier),
      netProfit: Math.floor(user.netProfit * productMultiplier)
    }));
};