export type TimeFilter = 'yesterday' | 'week' | 'month';
export type Region = 'Lombardy' | 'Lazio' | 'Campania' | 'Sicily' | 'Veneto' | 'Tuscany' | 'Emilia-Romagna' | 'Sardinia';
export type AgeGroup = '18-25' | '26-40' | '41-60' | '60+';

export interface GenderDistribution {
  male: number;
  female: number;
  malePercentage: number;
  femalePercentage: number;
}

export interface AgeGroupData {
  group: AgeGroup;
  count: number;
  percentage: number;
}

export interface RegionData {
  region: Region;
  count: number;
  percentage: number;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface DemographicData {
  newAtRiskUsers: number;
  averageAge: number;
  ageComparison: number;
  genderDistribution: GenderDistribution;
  ageGroups: AgeGroupData[];
  regions: RegionData[];
}