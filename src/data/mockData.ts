import { CategoryData, KPIData, KPITrendData, TimeRange } from '../types/dashboard';

export const getDummyData = (timeRange: TimeRange): CategoryData[] => {
  const multiplier = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
  
  return [
    {
      name: 'Casino',
      activeUsers: 5000 * multiplier,
      atRiskUsers: 120 * multiplier,
      percentage: 44
    },
    {
      name: 'Sport',
      activeUsers: 3000 * multiplier,
      atRiskUsers: 80 * multiplier,
      percentage: 23
    },
    {
      name: 'Poker',
      activeUsers: 1500 * multiplier,
      atRiskUsers: 25 * multiplier,
      percentage: 18
    },
    {
      name: 'Others',
      activeUsers: 432 * multiplier,
      atRiskUsers: 6 * multiplier,
      percentage: 15
    }
  ];
};

export const getTrendData = () => {
  const data = [];
  const baseValue = 200;
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const randomFactor = 0.8 + Math.random() * 0.4;
    const value = Math.round(baseValue * randomFactor);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value
    });
  }
  
  return data;
};

export const getKPIData = (timeRange: TimeRange, category?: string): KPIData => {
  const multiplier = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
  const categoryMultiplier = category ? 0.8 : 1; // Reduce values for specific categories
  
  return {
    ggt: Math.round(1000000 * multiplier * categoryMultiplier),
    medianGgt: 1000,
    totalDeposit: Math.round(2000000 * multiplier * categoryMultiplier),
    medianDeposit: 2000,
    ggr: Math.round(450000 * multiplier * categoryMultiplier),
    medianGgr: 450,
    totalPayout: Math.round(1500000 * multiplier * categoryMultiplier),
    medianPayout: 800,
    netProfit: Math.round(350000 * multiplier * categoryMultiplier),
    medianNetProfit: 350,
    winRatio: 28.7,
    medianWinRatio: 28.7
  };
};

export const getKPITrendData = (
  metric: keyof KPIData,
  timeRange: TimeRange,
  category?: string
): KPITrendData[] => {
  const data: KPITrendData[] = [];
  const now = new Date();
  const baseValue = getKPIData('day', category)[metric];
  
  const getDateFormat = (date: Date, range: TimeRange): string => {
    if (range === 'day') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (range === 'week') {
      const weekNum = Math.ceil((date.getDate() + date.getDay()) / 7);
      return `W${weekNum}, ${date.getFullYear()}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  };

  const periods = timeRange === 'day' ? 15 : timeRange === 'week' ? 10 : 3;
  const periodOffset = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;

  for (let i = periods - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - (i * periodOffset));
    
    const randomFactor = 0.8 + Math.random() * 0.4;
    const value = Math.round(baseValue * randomFactor);
    
    data.push({
      date: getDateFormat(date, timeRange),
      value
    });
  }
  
  return data;
};