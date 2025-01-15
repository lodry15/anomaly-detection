export interface LogEntry {
  id: string;
  username: string;
  numReports: number;
  mainProduct: string;
  lastReportDate: string;
  reportHistory: {
    date: string;
    product: string;
    reason: string;
  }[];
}

export interface LogDetailData {
  username: string;
  email: string;
  age: number;
  province: string;
  registrationDate: string;
  lastLogin: string;
  reportHistory: {
    date: string;
    product: string;
    reason: string;
    reportedBy: string;
  }[];
  riskMetrics: {
    timeSpentGambling: number;
    netLosses: number;
    depositFrequency: number;
  };
}