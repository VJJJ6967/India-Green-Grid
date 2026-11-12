export interface FuelCapacity {
  id: string;
  name: string;
  capacityGW: number;
  capacitySharePercent: number;
  generationSharePercent: number;
  cufPercent: number; // Capacity Utilization Factor
  color: string;
  category: 'fossil' | 'renewable' | 'clean';
  description: string;
}

export interface MetricSummary {
  label: string;
  value: string;
  subtext: string;
  change?: string;
  isPositive?: boolean;
  highlight?: boolean;
}

export interface HistoricalDataPoint {
  year: string;
  coalCapacity: number;
  renewableCapacity: number;
  coalGeneration: number;
  renewableGeneration: number;
}

export interface RegionalRenewable {
  region: string;
  states: string;
  solarGW: number;
  windGW: number;
  hydroGW: number;
  totalCleanGW: number;
  shareOfNationalRE: number;
}

// Total India Grid Installed Capacity: ~450 GW (as per CEA / Ministry of Power data)
export const installedCapacityData: FuelCapacity[] = [
  {
    id: 'coal',
    name: 'Coal & Lignite',
    capacityGW: 218.0,
    capacitySharePercent: 48.4,
    generationSharePercent: 73.8,
    cufPercent: 68.5,
    color: '#475569', // Slate-600
    category: 'fossil',
    description: 'Baseload thermal power with high continuous availability and ~68% plant load factor.'
  },
  {
    id: 'solar',
    name: 'Solar PV',
    capacityGW: 85.5,
    capacitySharePercent: 19.0,
    generationSharePercent: 7.2,
    cufPercent: 21.0,
    color: '#f59e0b', // Amber-500
    category: 'renewable',
    description: 'Rapidly growing solar utility and rooftop capacity; operates primarily between 8 AM - 5 PM.'
  },
  {
    id: 'wind',
    name: 'Wind Energy',
    capacityGW: 47.2,
    capacitySharePercent: 10.5,
    generationSharePercent: 5.8,
    cufPercent: 24.5,
    color: '#06b6d4', // Cyan-500
    category: 'renewable',
    description: 'Concentrated in coastal/peninsular states (TN, Gujarat); peak generation during monsoon months.'
  },
  {
    id: 'hydro',
    name: 'Large Hydro',
    capacityGW: 46.9,
    capacitySharePercent: 10.4,
    generationSharePercent: 9.6,
    cufPercent: 34.0,
    color: '#3b82f6', // Blue-500
    category: 'clean',
    description: 'Flexible dispatchable hydropower vital for evening peak shaving and grid frequency stability.'
  },
  {
    id: 'nuclear',
    name: 'Nuclear',
    capacityGW: 8.18,
    capacitySharePercent: 1.8,
    generationSharePercent: 2.8,
    cufPercent: 75.0,
    color: '#8b5cf6', // Violet-500
    category: 'clean',
    description: 'Zero-carbon baseload electricity with 75%+ continuous operating capacity factor.'
  },
  {
    id: 'other',
    name: 'Gas, Bio & Small RE',
    capacityGW: 44.5,
    capacitySharePercent: 9.9,
    generationSharePercent: 0.8,
    cufPercent: 14.0,
    color: '#10b981', // Emerald-500
    category: 'renewable',
    description: 'Gas peakers, biomass cogeneration, waste-to-energy, and small hydro.'
  }
];

export const summaryMetrics: MetricSummary[] = [
  {
    label: 'Total Installed Capacity',
    value: '450.3 GW',
    subtext: '44.3% Non-Fossil Sources',
    change: '+18.4 GW in last 12 months',
    isPositive: true
  },
  {
    label: 'Coal Generation Share',
    value: '73.8%',
    subtext: 'From 48.4% capacity (Baseload)',
    change: 'Supplies ~3 in 4 units of electricity',
    isPositive: false
  },
  {
    label: 'VRE Generation (Solar + Wind)',
    value: '13.0%',
    subtext: 'From 29.5% combined capacity',
    change: 'Gap due to ~20-25% average CUF',
    isPositive: true
  },
  {
    label: 'The CUF Disparity Gap',
    value: '3.1x',
    subtext: 'Coal produces ~3.1x more kWh/MW than Solar',
    change: 'Highlights urgent need for BESS & Storage',
    highlight: true
  }
];

export const comparativeChartData = [
  {
    fuel: 'Coal & Lignite',
    capacityShare: 48.4,
    generationShare: 73.8,
    capacityGW: 218.0,
    cuf: '68%'
  },
  {
    fuel: 'Solar PV',
    capacityShare: 19.0,
    generationShare: 7.2,
    capacityGW: 85.5,
    cuf: '21%'
  },
  {
    fuel: 'Wind Energy',
    capacityShare: 10.5,
    generationShare: 5.8,
    capacityGW: 47.2,
    cuf: '25%'
  },
  {
    fuel: 'Large Hydro',
    capacityShare: 10.4,
    generationShare: 9.6,
    capacityGW: 46.9,
    cuf: '34%'
  },
  {
    fuel: 'Nuclear',
    capacityShare: 1.8,
    generationShare: 2.8,
    capacityGW: 8.2,
    cuf: '75%'
  },
  {
    fuel: 'Gas & Others',
    capacityShare: 9.9,
    generationShare: 0.8,
    capacityGW: 44.5,
    cuf: '14%'
  }
];

export const historicalTrajectory: HistoricalDataPoint[] = [
  { year: '2019', coalCapacity: 198, renewableCapacity: 84, coalGeneration: 72.8, renewableGeneration: 9.2 },
  { year: '2020', coalCapacity: 205, renewableCapacity: 90, coalGeneration: 71.9, renewableGeneration: 10.7 },
  { year: '2021', coalCapacity: 209, renewableCapacity: 104, coalGeneration: 73.5, renewableGeneration: 11.5 },
  { year: '2022', coalCapacity: 211, renewableCapacity: 119, coalGeneration: 74.2, renewableGeneration: 12.1 },
  { year: '2023', coalCapacity: 214, renewableCapacity: 135, coalGeneration: 74.8, renewableGeneration: 12.5 },
  { year: '2024', coalCapacity: 216, renewableCapacity: 153, coalGeneration: 74.1, renewableGeneration: 12.8 },
  { year: '2025', coalCapacity: 218, renewableCapacity: 180, coalGeneration: 73.8, renewableGeneration: 13.0 }
];

export const regionalRenewables: RegionalRenewable[] = [
  {
    region: 'Western Region',
    states: 'Gujarat, Maharashtra, Madhya Pradesh',
    solarGW: 32.4,
    windGW: 20.8,
    hydroGW: 7.5,
    totalCleanGW: 60.7,
    shareOfNationalRE: 33.7
  },
  {
    region: 'Southern Region',
    states: 'Tamil Nadu, Karnataka, Andhra, Telangana',
    solarGW: 28.1,
    windGW: 22.3,
    hydroGW: 12.8,
    totalCleanGW: 63.2,
    shareOfNationalRE: 35.1
  },
  {
    region: 'Northern Region',
    states: 'Rajasthan, UP, Punjab, Haryana, HP, J&K',
    solarGW: 23.2,
    windGW: 4.1,
    hydroGW: 20.6,
    totalCleanGW: 47.9,
    shareOfNationalRE: 26.6
  },
  {
    region: 'Eastern & North-East',
    states: 'West Bengal, Odisha, Bihar, Assam, Sikkim',
    solarGW: 1.8,
    windGW: 0.0,
    hydroGW: 6.0,
    totalCleanGW: 7.8,
    shareOfNationalRE: 4.6
  }
];

export const gapInsights = [
  {
    title: 'The Capacity vs Generation Paradox',
    description: 'Renewable energy accounts for over 44% of India\'s installed power capacity, yet supplies only ~13% of actual electricity units consumed. This disparity is governed by Capacity Utilization Factor (CUF).',
    badge: 'Key Insight'
  },
  {
    title: 'The "Duck Curve" and Evening Peak',
    description: 'Peak solar generation peaks between 11:30 AM and 1:30 PM, but India\'s peak electricity demand occurs between 7:00 PM and 10:30 PM when solar is zero. Without storage, coal plants ramp up to cover the deficit.',
    badge: 'Grid Reality'
  },
  {
    title: 'The Storage Imperative: 47 GW BESS by 2032',
    description: 'According to the Central Electricity Authority (CEA) National Electricity Plan, India must install 47 GW / 236 GWh of Battery Energy Storage Systems (BESS) and Pumped Hydro to achieve 500 GW clean capacity.',
    badge: 'Decision Support'
  }
];
