import { LogEntry, LogDetailData } from '../types/log';
import { ProductType } from '../types/userDetail';

const products: ProductType[] = ['Casino', 'Sport', 'Poker', 'Others'];
const reasons = [
  'Excessive gambling time',
  'Large losses in short period',
  'Frequent deposits',
  'Erratic betting patterns',
  'Multiple self-exclusion attempts'
];

export const getMockLogEntries = (
  startDate?: string,
  endDate?: string,
  username?: string,
  product?: string
): LogEntry[] => {
  const entries: LogEntry[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const numReports = Math.floor(Math.random() * 5) + 1;
    const mainProduct = products[Math.floor(Math.random() * products.length)];
    
    const reportHistory = Array.from({ length: numReports }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      return {
        date: date.toISOString().split('T')[0],
        product: mainProduct,
        reason: reasons[Math.floor(Math.random() * reasons.length)]
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const entry: LogEntry = {
      id: `log-${i}`,
      username: `player${i}`,
      numReports,
      mainProduct,
      lastReportDate: reportHistory[0].date,
      reportHistory
    };

    // Apply filters
    if (startDate && new Date(entry.lastReportDate) < new Date(startDate)) continue;
    if (endDate && new Date(entry.lastReportDate) > new Date(endDate)) continue;
    if (username && !entry.username.toLowerCase().includes(username.toLowerCase())) continue;
    if (product && product !== 'All' && entry.mainProduct !== product) continue;

    entries.push(entry);
  }

  return entries;
};

export const getMockLogDetail = (username: string): LogDetailData => {
  return {
    username,
    email: `${username}@example.com`,
    age: Math.floor(Math.random() * (65 - 18) + 18),
    province: 'Ontario',
    registrationDate: '2023-09-15',
    lastLogin: '2024-03-14 15:30',
    reportHistory: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      product: products[Math.floor(Math.random() * products.length)],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      reportedBy: 'System'
    })),
    riskMetrics: {
      timeSpentGambling: Math.floor(Math.random() * 100),
      netLosses: Math.floor(Math.random() * 100),
      depositFrequency: Math.floor(Math.random() * 100)
    }
  };
};