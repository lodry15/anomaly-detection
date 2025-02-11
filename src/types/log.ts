export type ActionTaken = 'None' | 'Call' | 'Alert' | 'Limits' | 'Suspension' | 'Others';
export type Status = 'Pending Review' | 'Under Monitoring' | 'Done';
export type NoteCategory = 'User Contacted' | 'Set Limit' | 'Advised Self-Exclusion' | 'User Complaint' | 'Other';
export type ActionType = 'Call Attempt' | 'Email Sent' | 'Alert Sent' | 'Limits Set' | 'Temporary Suspension' | 'Others';

export interface TimelineEntry {
  id: string;
  date: string;
  actionType: ActionType;
  operatorName: string;
  notes: string;
  followUpDate?: string;
}

export interface LogEntry {
  id: string;
  username: string;
  reportDate: string;
  mainProduct: string;
  numReports: number;
  daysAtRisk: number;
  lastReportDate: string;
  lastAction: ActionTaken;
  status: Status;
  reportHistory: ReportHistoryEntry[];
  timeline: TimelineEntry[];
}

export interface ReportHistoryEntry {
  id: string;
  date: string;
  product: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  notes: string;
  reportedBy: string;
  category?: 'Deposit Spike' | 'Erratic Behavior' | 'Excessive Loss' | 'Other';
}

export interface Note {
  id: string;
  date: string;
  category: NoteCategory;
  content: string;
  operatorName: string;
  followUpDate?: string;
}

export interface LogDetailData {
  username: string;
  email: string;
  age: number;
  province: string;
  registrationDate: string;
  lastLogin: string;
  reportHistory: ReportHistoryEntry[];
  timeline: TimelineEntry[];
  notes: Note[];
  riskMetrics: {
    timeSpentGambling: number;
    netLosses: number;
    depositFrequency: number;
  };
}