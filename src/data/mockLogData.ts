import { LogEntry, LogDetailData, ReportHistoryEntry, ActionTaken, Status, TimelineEntry, Note } from '../types/log';
import { ProductType } from '../types/userDetail';

const products: ProductType[] = ['Casino', 'Sport', 'Poker', 'Virtual', 'Skill', 'Others'];
const ITALIAN_PROVINCES = [
  'Roma', 'Milano', 'Napoli', 'Torino', 'Palermo',
  'Genova', 'Bologna', 'Firenze', 'Bari', 'Venezia'
];

const ACTIONS: ActionTaken[] = ['None', 'Call', 'Alert', 'Limits', 'Suspension', 'Others'];
const STATUSES: Status[] = ['Pending Review', 'Under Monitoring', 'Done'];

const RISK_REASONS = [
  'Large losses in short period',
  'Frequent deposits',
  'Erratic betting patterns',
  'Multiple self-exclusion attempts',
  'Extended gambling sessions',
  'Significant increase in bet sizes',
  'Chasing losses behavior',
  'Unusual login patterns'
];

const generateReportHistory = (count: number): ReportHistoryEntry[] => {
  return Array.from({ length: count }, (_, index): ReportHistoryEntry => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const riskLevels = ['High', 'Medium', 'Low'] as const;
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    
    return {
      id: `report-${index}`,
      date: date.toISOString().split('T')[0],
      product: products[Math.floor(Math.random() * products.length)],
      riskLevel,
      notes: RISK_REASONS[Math.floor(Math.random() * RISK_REASONS.length)],
      reportedBy: Math.random() > 0.7 ? 'Admin' : 'System',
      category: Math.random() > 0.5 ? 'Deposit Spike' : 'Erratic Behavior'
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateTimeline = (count: number): TimelineEntry[] => {
  return Array.from({ length: count }, (_, index): TimelineEntry => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const actionTypes: ActionType[] = [
      'Call Attempt',
      'Email Sent',
      'Alert Sent',
      'Limits Set',
      'Temporary Suspension',
      'Others'
    ];
    
    return {
      id: `timeline-${index}`,
      date: date.toISOString().split('T')[0],
      actionType: actionTypes[Math.floor(Math.random() * actionTypes.length)],
      operatorName: 'Operator ' + (Math.floor(Math.random() * 5) + 1),
      notes: 'Action taken based on risk assessment',
      followUpDate: Math.random() > 0.5 ? 
        new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
        undefined
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateNotes = (count: number): Note[] => {
  const categories: NoteCategory[] = [
    'User Contacted',
    'Set Limit',
    'Advised Self-Exclusion',
    'User Complaint',
    'Other'
  ];
  
  return Array.from({ length: count }, (_, index): Note => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `note-${index}`,
      date: date.toISOString().split('T')[0],
      category: categories[Math.floor(Math.random() * categories.length)],
      content: 'Note content ' + (index + 1),
      operatorName: 'Operator ' + (Math.floor(Math.random() * 5) + 1),
      followUpDate: Math.random() > 0.5 ? 
        new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
        undefined
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getMockLogEntries = (
  startDate?: string,
  endDate?: string,
  username?: string,
  product?: string
): LogEntry[] => {
  const entries: LogEntry[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const numReports = Math.floor(Math.random() * 13) + 1; // 1-14 reports
    const daysAtRisk = Math.floor(Math.random() * 13) + 1; // 1-14 days
    const mainProduct = products[Math.floor(Math.random() * products.length)];
    const reportHistory = generateReportHistory(numReports);
    const lastAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

    const entry: LogEntry = {
      id: `log-${i}`,
      username: `player${i}`,
      reportDate: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0],
      mainProduct,
      numReports,
      daysAtRisk,
      lastReportDate: reportHistory[0].date,
      lastAction,
      status,
      reportHistory,
      timeline: generateTimeline(Math.floor(Math.random() * 5) + 1)
    };

    if (startDate && new Date(entry.lastReportDate) < new Date(startDate)) continue;
    if (endDate && new Date(entry.lastReportDate) > new Date(endDate)) continue;
    if (username && !entry.username.toLowerCase().includes(username.toLowerCase())) continue;
    if (product && product !== 'All' && entry.mainProduct !== product) continue;

    entries.push(entry);
  }

  return entries;
};

export const getMockLogDetail = (username: string): LogDetailData => {
  const numReports = Math.floor(Math.random() * 5) + 1;
  
  return {
    username,
    email: `${username}@example.com`,
    age: Math.floor(Math.random() * (65 - 18) + 18),
    province: ITALIAN_PROVINCES[Math.floor(Math.random() * ITALIAN_PROVINCES.length)],
    registrationDate: '2023-09-15',
    lastLogin: '2024-03-14 15:30',
    reportHistory: generateReportHistory(numReports),
    timeline: generateTimeline(Math.floor(Math.random() * 5) + 1),
    notes: generateNotes(Math.floor(Math.random() * 5) + 1),
    riskMetrics: {
      timeSpentGambling: Math.floor(Math.random() * 100),
      netLosses: Math.floor(Math.random() * 100),
      depositFrequency: Math.floor(Math.random() * 100)
    }
  };
};