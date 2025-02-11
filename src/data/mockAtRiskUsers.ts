import { AtRiskUser, ClusterType, ProductType, RiskLevel } from '../types/userDetail';

const CLUSTERS: ClusterType[] = ['High Frequency', 'High Stake', 'Loss Chaser', 'Night Time', 'Erratic'];
const RISK_LEVELS: RiskLevel[] = ['High', 'Medium', 'Low'];

const generateMockUser = (id: number): AtRiskUser => {
  // Generate random values within specified ranges
  const ggt = Math.floor(Math.random() * (400 - 250) + 250);
  const ggr = Math.floor(Math.random() * (270 - 150) + 150);
  const deposit = Math.floor(Math.random() * (200 - 20) + 20);
  const daysAtRisk = Math.floor(Math.random() * 14) + 1;
  
  // Distribute risk levels roughly 20% High, 35% Medium, 45% Low
  const riskLevelRandom = Math.random();
  let level: RiskLevel;
  if (riskLevelRandom < 0.2) {
    level = 'High';
  } else if (riskLevelRandom < 0.55) {
    level = 'Medium';
  } else {
    level = 'Low';
  }

  return {
    id: `user-${id}`,
    username: `player${id}`,
    cluster: CLUSTERS[Math.floor(Math.random() * CLUSTERS.length)],
    level,
    ggt,
    ggr,
    deposit,
    daysAtRisk
  };
};

export const getMockAtRiskUsers = (
  product: ProductType,
  timeRange: 'Yesterday' | 'Last 7 Days' | 'Last 30 Days' = 'Yesterday'
): AtRiskUser[] => {
  const userCounts = {
    'Yesterday': 30,
    'Last 7 Days': 70,
    'Last 30 Days': 105
  };
  
  const userCount = userCounts[timeRange];
  const baseUsers = Array.from({ length: userCount }, (_, i) => generateMockUser(i + 1));
  
  if (product === 'All') {
    return baseUsers;
  }
  
  const productMultiplier = {
    Casino: 0.35,
    Sport: 0.25,
    Poker: 0.20,
    Virtual: 0.10,
    Skill: 0.05,
    Others: 0.05
  }[product] || 1;
  
  const productUserCount = Math.round(userCount * productMultiplier);
  
  return baseUsers
    .slice(0, productUserCount)
    .map(user => ({
      ...user,
      ggt: Math.floor(user.ggt * productMultiplier),
      ggr: Math.floor(user.ggr * productMultiplier),
      deposit: Math.floor(user.deposit * productMultiplier)
    }));
};