export type ProductType = 'Casino' | 'Sport' | 'Poker' | 'Others' | 'All';
export type ClusterType = 'Consistent' | 'Regular' | 'Impulsive' | 'Erratic' | 'New' | 'High-Value';

export interface ClusterData {
  id: string;
  name: string;
  description: string;
  atRiskUsers: number;
  percentage: number;
}

export interface ProductClusterData {
  product: ProductType;
  totalAtRisk: number;
  clusters: ClusterData[];
}

export interface AtRiskUser {
  id: string;
  username: string;
  cluster: ClusterType;
  totalDeposit: number;
  totalBets: number;
  netProfit: number;
  payoutPercentage: number;
}

export interface UserDetailData {
  id: string;
  username: string;
  email: string;
  age: number;
  province: string;
  registrationDate: string;
  lastLogin: string;
  preferredProduct: ProductType;
  riskLevel: 'Low' | 'Medium' | 'High';
  stats: {
    totalDeposits: number;
    totalWithdrawals: number;
    totalBets: number;
    totalWins: number;
    netProfit: number;
    avgBetSize: number;
    payoutPercentage: number;
  };
}