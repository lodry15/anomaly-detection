import { DemographicData, TimeFilter, ProductType } from '../types';

const ITALY_COORDINATES = {
  'Lombardy': { x: 45.4773, y: 9.1815 },
  'Lazio': { x: 41.9028, y: 12.4964 },
  'Campania': { x: 40.8522, y: 14.2681 },
  'Sicily': { x: 37.5990, y: 14.0154 },
  'Veneto': { x: 45.4371, y: 12.3326 },
  'Tuscany': { x: 43.7696, y: 11.2558 },
  'Emilia-Romagna': { x: 44.4949, y: 11.3426 },
  'Sardinia': { x: 40.1209, y: 9.0129 }
};

const BASE_DATA: Record<TimeFilter, DemographicData> = {
  yesterday: {
    newAtRiskUsers: 25,
    averageAge: 37.5,
    ageComparison: 0.5,
    genderDistribution: {
      male: 60,
      female: 40,
      malePercentage: 60,
      femalePercentage: 40
    },
    ageGroups: [
      { group: '18-25', count: 20, percentage: 20 },
      { group: '26-40', count: 40, percentage: 40 },
      { group: '41-60', count: 30, percentage: 30 },
      { group: '60+', count: 10, percentage: 10 }
    ],
    regions: [
      { region: 'Lombardy', count: 150, percentage: 25, coordinates: ITALY_COORDINATES['Lombardy'] },
      { region: 'Lazio', count: 90, percentage: 15, coordinates: ITALY_COORDINATES['Lazio'] },
      { region: 'Campania', count: 72, percentage: 12, coordinates: ITALY_COORDINATES['Campania'] },
      { region: 'Sicily', count: 60, percentage: 10, coordinates: ITALY_COORDINATES['Sicily'] },
      { region: 'Veneto', count: 48, percentage: 8, coordinates: ITALY_COORDINATES['Veneto'] },
      { region: 'Tuscany', count: 48, percentage: 8, coordinates: ITALY_COORDINATES['Tuscany'] },
      { region: 'Emilia-Romagna', count: 72, percentage: 12, coordinates: ITALY_COORDINATES['Emilia-Romagna'] },
      { region: 'Sardinia', count: 60, percentage: 10, coordinates: ITALY_COORDINATES['Sardinia'] }
    ]
  },
  week: {
    newAtRiskUsers: 150,
    averageAge: 36.8,
    ageComparison: -0.2,
    genderDistribution: {
      male: 420,
      female: 180,
      malePercentage: 70,
      femalePercentage: 30
    },
    ageGroups: [
      { group: '18-25', count: 120, percentage: 20 },
      { group: '26-40', count: 240, percentage: 40 },
      { group: '41-60', count: 180, percentage: 30 },
      { group: '60+', count: 60, percentage: 10 }
    ],
    regions: [
      { region: 'Lombardy', count: 150, percentage: 25, coordinates: ITALY_COORDINATES['Lombardy'] },
      { region: 'Lazio', count: 90, percentage: 15, coordinates: ITALY_COORDINATES['Lazio'] },
      { region: 'Campania', count: 72, percentage: 12, coordinates: ITALY_COORDINATES['Campania'] },
      { region: 'Sicily', count: 60, percentage: 10, coordinates: ITALY_COORDINATES['Sicily'] },
      { region: 'Veneto', count: 48, percentage: 8, coordinates: ITALY_COORDINATES['Veneto'] },
      { region: 'Tuscany', count: 48, percentage: 8, coordinates: ITALY_COORDINATES['Tuscany'] },
      { region: 'Emilia-Romagna', count: 72, percentage: 12, coordinates: ITALY_COORDINATES['Emilia-Romagna'] },
      { region: 'Sardinia', count: 60, percentage: 10, coordinates: ITALY_COORDINATES['Sardinia'] }
    ]
  },
  month: {
    newAtRiskUsers: 600,
    averageAge: 38.2,
    ageComparison: 1.2,
    genderDistribution: {
      male: 1800,
      female: 1200,
      malePercentage: 60,
      femalePercentage: 40
    },
    ageGroups: [
      { group: '18-25', count: 600, percentage: 20 },
      { group: '26-40', count: 1200, percentage: 40 },
      { group: '41-60', count: 900, percentage: 30 },
      { group: '60+', count: 300, percentage: 10 }
    ],
    regions: [
      { region: 'Lombardy', count: 750, percentage: 25, coordinates: ITALY_COORDINATES['Lombardy'] },
      { region: 'Lazio', count: 450, percentage: 15, coordinates: ITALY_COORDINATES['Lazio'] },
      { region: 'Campania', count: 360, percentage: 12, coordinates: ITALY_COORDINATES['Campania'] },
      { region: 'Sicily', count: 300, percentage: 10, coordinates: ITALY_COORDINATES['Sicily'] },
      { region: 'Veneto', count: 240, percentage: 8, coordinates: ITALY_COORDINATES['Veneto'] },
      { region: 'Tuscany', count: 240, percentage: 8, coordinates: ITALY_COORDINATES['Tuscany'] },
      { region: 'Emilia-Romagna', count: 360, percentage: 12, coordinates: ITALY_COORDINATES['Emilia-Romagna'] },
      { region: 'Sardinia', count: 300, percentage: 10, coordinates: ITALY_COORDINATES['Sardinia'] }
    ]
  }
};

export const getDemographicData = (timeFilter: TimeFilter, product: ProductType): DemographicData => {
  const baseData = BASE_DATA[timeFilter];
  
  if (product === 'All') {
    return baseData;
  }

  // Apply product-specific multiplier
  const multiplier = {
    Casino: 0.35,
    Sport: 0.20,
    Poker: 0.15,
    Virtual: 0.10,
    Skill: 0.08,
    Others: 0.12
  }[product] || 1;

  return {
    ...baseData,
    newAtRiskUsers: Math.round(baseData.newAtRiskUsers * multiplier),
    genderDistribution: {
      male: Math.round(baseData.genderDistribution.male * multiplier),
      female: Math.round(baseData.genderDistribution.female * multiplier),
      malePercentage: baseData.genderDistribution.malePercentage,
      femalePercentage: baseData.genderDistribution.femalePercentage
    },
    ageGroups: baseData.ageGroups.map(group => ({
      ...group,
      count: Math.round(group.count * multiplier)
    })),
    regions: baseData.regions.map(region => ({
      ...region,
      count: Math.round(region.count * multiplier)
    }))
  };
};