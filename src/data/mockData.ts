import { CategoryData, KPIData, KPITrendData, TimeRange } from '../types/dashboard';

const getTimeRangeData = (timeRange: TimeRange) => {
  switch (timeRange) {
    case 'day':
      return {
        totalUsers: 1500,
        atRiskUsers: 30
      };
    case 'week':
      return {
        totalUsers: 2800,
        atRiskUsers: 70
      };
    case 'month':
      return {
        totalUsers: 4500,
        atRiskUsers: 105
      };
    default:
      return {
        totalUsers: 1500,
        atRiskUsers: 30
      };
  }
};

const PRODUCT_DISTRIBUTION = {
  Casino: { percentage: 0.40 },
  Sport: { percentage: 0.20 },
  Poker: { percentage: 0.15 },
  Virtual: { percentage: 0.10 },
  Skill: { percentage: 0.08 },
  Others: { percentage: 0.07 }
};

export const getDummyData = (timeRange: TimeRange): CategoryData[] => {
  const { totalUsers, atRiskUsers } = getTimeRangeData(timeRange);
  
  return Object.entries(PRODUCT_DISTRIBUTION).map(([name, { percentage }]) => ({
    name,
    activeUsers: Math.round(totalUsers * percentage),
    atRiskUsers: Math.round(atRiskUsers * percentage),
    percentage: Math.round(percentage * 100)
  }));
};

export const getTrendData = () => {
  const data = [];
  const now = new Date();
  
  // Function to generate a smooth random walk
  const generateSmoothValue = (prevValue: number): number => {
    // Maximum allowed change (small to ensure smoothness)
    const maxChange = 2;
    // Generate a random change between -maxChange and +maxChange
    const change = (Math.random() * 2 - 1) * maxChange;
    // Calculate new value
    let newValue = prevValue + change;
    
    // Ensure the value stays within our desired range (25-45)
    newValue = Math.max(25, Math.min(45, newValue));
    
    return Math.round(newValue);
  };

  // Start with a value around the middle of our range
  let currentValue = 35;

  // Generate data for the past 29 days
  for (let i = 29; i > 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    currentValue = generateSmoothValue(currentValue);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: currentValue
    });
  }

  // Add yesterday's data point (always 30)
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  data.push({
    date: yesterday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: 30
  });
  
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