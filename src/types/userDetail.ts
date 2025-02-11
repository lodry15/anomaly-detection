import { ProductType } from './dashboard';

export type ClusterType = 'High Frequency' | 'High Stake' | 'Loss Chaser' | 'Night Time' | 'Erratic';
export type RiskLevel = 'High' | 'Medium' | 'Low';
export type TimeRange = 'Yesterday' | 'Last 7 Days' | 'Last 30 Days';

export interface AtRiskUser {
  id: string;
  username: string;
  cluster: ClusterType;
  level: RiskLevel;
  ggt: number;
  ggr: number;
  deposit: number;
  daysAtRisk: number;
}

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

export interface UserDetailData {
  id: string;
  username: string;
  email: string;
  age: number;
  province: string;
  registrationDate: string;
  lastLogin: string;
  preferredProducts: string[];
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