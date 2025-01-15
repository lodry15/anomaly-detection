import { UserDetailData } from '../types/userDetail';

export const getMockUserDetail = (userId: string): UserDetailData => {
  return {
    id: userId,
    username: `player${userId.split('-')[1]}`,
    email: `player${userId.split('-')[1]}@example.com`,
    age: Math.floor(Math.random() * (65 - 18) + 18), // Random age between 18-65
    province: 'Ontario', // Example province
    registrationDate: '2023-09-15',
    lastLogin: '2024-03-14 15:30',
    preferredProduct: 'Casino',
    riskLevel: 'High',
    stats: {
      totalDeposits: 150000,
      totalWithdrawals: 120000,
      totalBets: 450000,
      totalWins: 430000,
      netProfit: -20000,
      avgBetSize: 500,
      payoutPercentage: 95.5
    }
  };
};