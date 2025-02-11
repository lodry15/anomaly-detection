import { KPIData, ProductType } from '../types/dashboard';

// Product distribution percentages
const PRODUCT_DISTRIBUTION = {
  Casino: 0.35,
  Sport: 0.20,
  Poker: 0.15,
  Virtual: 0.10,
  Skill: 0.08,
  Others: 0.12
};

// Base monthly totals for at-risk users (excluding last day)
const MONTHLY_TOTALS = {
  ggt: 175000,      // 180k - 5k (last day)
  ggr: 98000,       // 100k - 2k (last day)
  netProfit: 73500, // 75k - 1.5k (last day)
  totalDeposit: 212000, // 220k - 8k (last day)
  totalPayout: 143500,  // 150k - 6.5k (last day)
  winRatio: 90 // percentage
};

// Per-user median values
const PER_USER_MEDIANS = {
  ggt: {
    active: 120,
    atRisk: 144 // 20% higher
  },
  ggr: {
    active: 60,
    atRisk: 75 // 25% higher
  },
  netProfit: {
    active: 45,
    atRisk: 56 // 25% higher
  },
  totalDeposit: {
    active: 100,
    atRisk: 120 // 20% higher
  },
  totalPayout: {
    active: 20,
    atRisk: 25 // 25% higher
  },
  winRatio: {
    active: 89,
    atRisk: 93
  }
};

const BASE_DATA: KPIData = {
  ggt: {
    activeUsers: 40000,
    atRiskUsers: 5000,
    activeDelta: 2,
    riskDelta: -4,
    lastWeek: {
      activeUsers: 100000,
      atRiskUsers: 30000
    },
    lastMonth: {
      activeUsers: 750000,
      atRiskUsers: 180000
    },
    lastYear: {
      activeUsers: 1100000,
      atRiskUsers: 400000
    }
  },
  ggr: {
    activeUsers: 20000,
    atRiskUsers: 2000,
    activeDelta: 1.5,
    riskDelta: -2,
    lastWeek: {
      activeUsers: 60000,
      atRiskUsers: 12000
    },
    lastMonth: {
      activeUsers: 500000,
      atRiskUsers: 100000
    },
    lastYear: {
      activeUsers: 850000,
      atRiskUsers: 250000
    }
  },
  netProfit: {
    activeUsers: 15000,
    atRiskUsers: 1500,
    activeDelta: 3,
    riskDelta: -1,
    lastWeek: {
      activeUsers: 45000,
      atRiskUsers: 9000
    },
    lastMonth: {
      activeUsers: 350000,
      atRiskUsers: 75000
    },
    lastYear: {
      activeUsers: 650000,
      atRiskUsers: 180000
    }
  },
  totalDeposit: {
    activeUsers: 50000,
    atRiskUsers: 8000,
    activeDelta: -1,
    riskDelta: 2,
    lastWeek: {
      activeUsers: 150000,
      atRiskUsers: 40000
    },
    lastMonth: {
      activeUsers: 900000,
      atRiskUsers: 220000
    },
    lastYear: {
      activeUsers: 1500000,
      atRiskUsers: 450000
    }
  },
  totalPayout: {
    activeUsers: 35000,
    atRiskUsers: 6500,
    activeDelta: -2,
    riskDelta: 1,
    lastWeek: {
      activeUsers: 105000,
      atRiskUsers: 31000
    },
    lastMonth: {
      activeUsers: 650000,
      atRiskUsers: 150000
    },
    lastYear: {
      activeUsers: 950000,
      atRiskUsers: 350000
    }
  },
  winRatio: {
    activeUsers: 89,
    atRiskUsers: 92,
    activeDelta: 4,
    riskDelta: -3,
    lastWeek: {
      activeUsers: 91,
      atRiskUsers: 93
    },
    lastMonth: {
      activeUsers: 87,
      atRiskUsers: 90
    },
    lastYear: {
      activeUsers: 90,
      atRiskUsers: 91
    }
  }
};

export const getKPIData = (product: ProductType = 'All'): KPIData => {
  if (product === 'All') {
    return BASE_DATA;
  }

  const multiplier = PRODUCT_DISTRIBUTION[product] || 1;

  return Object.entries(BASE_DATA).reduce((acc, [key, value]) => {
    const isWinRatio = key === 'winRatio';
    
    if (isWinRatio) {
      acc[key as keyof KPIData] = value;
      return acc;
    }

    acc[key as keyof KPIData] = {
      activeUsers: Math.round(value.activeUsers * multiplier),
      atRiskUsers: Math.round(value.atRiskUsers * multiplier),
      activeDelta: value.activeDelta,
      riskDelta: value.riskDelta,
      lastWeek: {
        activeUsers: Math.round(value.lastWeek.activeUsers * multiplier),
        atRiskUsers: Math.round(value.lastWeek.atRiskUsers * multiplier)
      },
      lastMonth: {
        activeUsers: Math.round(value.lastMonth.activeUsers * multiplier),
        atRiskUsers: Math.round(value.lastMonth.atRiskUsers * multiplier)
      },
      lastYear: {
        activeUsers: Math.round(value.lastYear.activeUsers * multiplier),
        atRiskUsers: Math.round(value.lastYear.atRiskUsers * multiplier)
      }
    };
    return acc;
  }, {} as KPIData);
};

const generateDailyValues = (total: number, days: number = 29): number[] => {
  const baseValue = total / days;
  const values: number[] = [];
  let remainingTotal = total;

  for (let i = 0; i < days - 1; i++) {
    const variation = (Math.random() - 0.5) * 0.2;
    const value = Math.round(baseValue * (1 + variation));
    values.push(value);
    remainingTotal -= value;
  }

  values.push(Math.round(remainingTotal));
  return values;
};

const generatePerUserValues = (baseValue: number, days: number = 30): number[] => {
  return Array.from({ length: days }, () => {
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    return Math.round(baseValue * (1 + variation));
  });
};

const generateWinRatioValues = (basePercentage: number, days: number = 29): number[] => {
  return Array.from({ length: days }, () => {
    const variation = (Math.random() - 0.5) * 3;
    return Math.round((basePercentage + variation) * 10) / 10;
  });
};

export const getTrendData = (
  kpiKey: keyof KPIData,
  product: ProductType = 'All',
  isPerUserView: boolean = false
) => {
  const now = new Date();
  const data = [];
  const multiplier = product === 'All' ? 1 : PRODUCT_DISTRIBUTION[product];
  
  if (isPerUserView) {
    // Get per-user median values
    const medianValues = PER_USER_MEDIANS[kpiKey];
    const adjustedAtRiskMedian = kpiKey === 'winRatio' 
      ? medianValues.atRisk 
      : medianValues.atRisk * multiplier;
    const adjustedActiveMedian = kpiKey === 'winRatio'
      ? medianValues.active
      : medianValues.active * multiplier;

    // Generate daily values for per-user view
    const atRiskValues = generatePerUserValues(adjustedAtRiskMedian);
    const activeValues = generatePerUserValues(adjustedActiveMedian);

    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: atRiskValues[i],
        activeTotal: activeValues[i],
        atRiskUsers: Math.floor(Math.random() * 21) + 30
      });
    }
  } else {
    // Get the exact values from the table for the last day
    const kpiData = getKPIData(product);
    const lastDayAtRisk = kpiData[kpiKey].atRiskUsers;
    const lastDayActive = kpiData[kpiKey].activeUsers;
    
    // Generate daily values for the first 29 days
    const monthlyTotal = MONTHLY_TOTALS[kpiKey];
    const adjustedMonthlyTotal = kpiKey === 'winRatio' ? monthlyTotal : monthlyTotal * multiplier;
    
    const dailyValues = kpiKey === 'winRatio'
      ? generateWinRatioValues(monthlyTotal)
      : generateDailyValues(adjustedMonthlyTotal);
    
    const activeValues = kpiKey === 'winRatio'
      ? generateWinRatioValues(85)
      : dailyValues.map(value => Math.round(value * 4));

    // Create the trend data array for first 29 days
    for (let i = 0; i < 29; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: dailyValues[i],
        activeTotal: activeValues[i],
        atRiskUsers: Math.floor(Math.random() * 21) + 30
      });
    }

    // Add the last day with exact values from the table
    data.push({
      date: new Date(now.setDate(now.getDate() - 1)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: lastDayAtRisk,
      activeTotal: lastDayActive,
      atRiskUsers: Math.floor(Math.random() * 21) + 30
    });
  }
  
  return data;
};