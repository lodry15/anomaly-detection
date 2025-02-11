import { UserDetailData } from '../types/userDetail';

const ITALIAN_PROVINCES = [
  'Milano', 'Roma', 'Napoli', 'Torino', 'Palermo', 
  'Genova', 'Bologna', 'Firenze', 'Bari', 'Catania'
];

const PRODUCTS = ['Casino', 'Sport', 'Poker'];

export const getMockUserDetail = (userId: string): UserDetailData => {
  // Generate 1-3 random products
  const numProducts = Math.floor(Math.random() * 3) + 1;
  const shuffledProducts = [...PRODUCTS].sort(() => Math.random() - 0.5);
  const selectedProducts = shuffledProducts.slice(0, numProducts);

  return {
    id: userId,
    username: `player${userId.split('-')[1]}`,
    email: `player${userId.split('-')[1]}@example.com`,
    age: Math.floor(Math.random() * (65 - 18) + 18),
    province: ITALIAN_PROVINCES[Math.floor(Math.random() * ITALIAN_PROVINCES.length)],
    registrationDate: '2023-09-15',
    lastLogin: '2024-03-14 15:30',
    preferredProducts: selectedProducts,
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