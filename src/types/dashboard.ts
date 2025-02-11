export type ProductType = 'Casino' | 'Sport' | 'Poker' | 'Virtual' | 'Skill' | 'Others' | 'All';
export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface KPIValue {
  activeUsers: number;
  atRiskUsers: number;
  activeDelta: number;
  riskDelta: number;
}

export interface KPIHistoricalData {
  lastWeek: {
    activeUsers: number;
    atRiskUsers: number;
  };
  lastMonth: {
    activeUsers: number;
    atRiskUsers: number;
  };
  lastYear: {
    activeUsers: number;
    atRiskUsers: number;
  };
}

export interface KPIData {
  ggt: KPIValue & KPIHistoricalData;
  ggr: KPIValue & KPIHistoricalData;
  netProfit: KPIValue & KPIHistoricalData;
  totalDeposit: KPIValue & KPIHistoricalData;
  totalPayout: KPIValue & KPIHistoricalData;
  winRatio: KPIValue & KPIHistoricalData;
}