export interface RPOTrajectoryYear {
  year: string;
  financialYear: string;
  totalRPOTarget: number;
  windRPO: number;
  hydroRPO: number;
  otherRPO: number;
  storageObligationMWh?: number; // ESO in %
}

export interface DiscomBenchmark {
  discom: string;
  state: string;
  achievedPercent: number;
  target2025: number;
  shortfall: number;
  status: 'Compliant' | 'Moderate Risk' | 'Critical Shortfall';
  annualDemandMU: number; // Million Units
}

// Ministry of Power Statutory RPO Trajectory (Orders dated July 22, 2022 & Oct 2023)
export const rpoTrajectoryData: RPOTrajectoryYear[] = [
  {
    year: '2025',
    financialYear: '2024-25',
    totalRPOTarget: 29.91,
    windRPO: 0.67,
    hydroRPO: 1.08,
    otherRPO: 28.16,
    storageObligationMWh: 1.0
  },
  {
    year: '2026',
    financialYear: '2025-26',
    totalRPOTarget: 33.01,
    windRPO: 1.45,
    hydroRPO: 1.48,
    otherRPO: 30.08,
    storageObligationMWh: 1.5
  },
  {
    year: '2027',
    financialYear: '2026-27',
    totalRPOTarget: 35.95,
    windRPO: 2.27,
    hydroRPO: 1.80,
    otherRPO: 31.88,
    storageObligationMWh: 2.0
  },
  {
    year: '2028',
    financialYear: '2027-28',
    totalRPOTarget: 38.81,
    windRPO: 3.16,
    hydroRPO: 2.15,
    otherRPO: 33.50,
    storageObligationMWh: 2.5
  },
  {
    year: '2029',
    financialYear: '2028-29',
    totalRPOTarget: 41.36,
    windRPO: 4.09,
    hydroRPO: 2.51,
    otherRPO: 34.76,
    storageObligationMWh: 3.0
  },
  {
    year: '2030',
    financialYear: '2029-30',
    totalRPOTarget: 43.33,
    windRPO: 5.08,
    hydroRPO: 2.82,
    otherRPO: 35.43,
    storageObligationMWh: 4.0
  }
];

export const discomBenchmarks: DiscomBenchmark[] = [
  {
    discom: 'GUVNL (Gujarat Urja Vikas Nigam)',
    state: 'Gujarat',
    achievedPercent: 28.4,
    target2025: 29.91,
    shortfall: 1.51,
    status: 'Moderate Risk',
    annualDemandMU: 115000
  },
  {
    discom: 'BESCOM (Bangalore Electricity Supply)',
    state: 'Karnataka',
    achievedPercent: 30.2,
    target2025: 29.91,
    shortfall: 0.0,
    status: 'Compliant',
    annualDemandMU: 32000
  },
  {
    discom: 'TANGEDCO (Tamil Nadu Generation & Dist.)',
    state: 'Tamil Nadu',
    achievedPercent: 25.8,
    target2025: 29.91,
    shortfall: 4.11,
    status: 'Moderate Risk',
    annualDemandMU: 110000
  },
  {
    discom: 'MSEDCL (Maharashtra State Dist.)',
    state: 'Maharashtra',
    achievedPercent: 22.1,
    target2025: 29.91,
    shortfall: 7.81,
    status: 'Critical Shortfall',
    annualDemandMU: 145000
  },
  {
    discom: 'UPPCL (Uttar Pradesh Power Corp)',
    state: 'Uttar Pradesh',
    achievedPercent: 17.5,
    target2025: 29.91,
    shortfall: 12.41,
    status: 'Critical Shortfall',
    annualDemandMU: 130000
  },
  {
    discom: 'TPDDL (Tata Power Delhi Dist.)',
    state: 'Delhi (NCT)',
    achievedPercent: 31.5,
    target2025: 29.91,
    shortfall: 0.0,
    status: 'Compliant',
    annualDemandMU: 10500
  }
];

export const REC_FLOOR_PRICE_INR = 1000; // ₹1,000 per REC (1 MWh)
export const REC_FORBEARANCE_PRICE_INR = 2500; // Cap ceiling
