import { Category } from './dashboard';

export interface DashboardStats {
  activeUsers: number;
  atRiskUsers: number;
  activeUsersDelta: number;
  atRiskUsersDelta: number;
}

export interface CategoryData {
  name: string;
  activeUsers: number;
  atRiskUsers: number;
  percentage: number;
}

export interface KPIData {
  ggt: number;
  medianGgt: number;
  totalDeposit: number;
  medianDeposit: number;
  ggr: number;
  medianGgr: number;
  totalPayout: number;
  medianPayout: number;
  netProfit: number;
  medianNetProfit: number;
  winRatio: number;
  medianWinRatio: number;
}

export interface KPITrendData {
  date: string;
  value: number;
}

export type KPIMetric = keyof KPIData;
export type Category = 'Casino' | 'Sport' | 'Poker' | 'Others';
export type TimeRange = 'day' | 'week' | 'month';