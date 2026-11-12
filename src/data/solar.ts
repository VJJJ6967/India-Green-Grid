export interface StateSolarData {
  state: string;
  avgSunHoursPerDay: number; // Peak Sun Hours
  avgTariffPerKWh: number; // INR / unit
  stateAdditionalSubsidyPerKW: number; // Additional state grant
  discomName: string;
}

export const indianStatesSolarData: StateSolarData[] = [
  {
    state: 'Delhi (NCT)',
    avgSunHoursPerDay: 4.9,
    avgTariffPerKWh: 7.2,
    stateAdditionalSubsidyPerKW: 2000,
    discomName: 'BSES Rajdhani / TPDDL'
  },
  {
    state: 'Gujarat',
    avgSunHoursPerDay: 5.5,
    avgTariffPerKWh: 6.8,
    stateAdditionalSubsidyPerKW: 3000,
    discomName: 'GUVNL / Torrent Power'
  },
  {
    state: 'Maharashtra',
    avgSunHoursPerDay: 5.1,
    avgTariffPerKWh: 8.5,
    stateAdditionalSubsidyPerKW: 0,
    discomName: 'MSEDCL / Adani Mumbai'
  },
  {
    state: 'Karnataka',
    avgSunHoursPerDay: 5.2,
    avgTariffPerKWh: 7.5,
    stateAdditionalSubsidyPerKW: 0,
    discomName: 'BESCOM / HESCOM'
  },
  {
    state: 'Tamil Nadu',
    avgSunHoursPerDay: 5.3,
    avgTariffPerKWh: 6.9,
    stateAdditionalSubsidyPerKW: 0,
    discomName: 'TANGEDCO'
  },
  {
    state: 'Rajasthan',
    avgSunHoursPerDay: 5.7,
    avgTariffPerKWh: 7.4,
    stateAdditionalSubsidyPerKW: 1000,
    discomName: 'JVVNL / AVVNL'
  },
  {
    state: 'Uttar Pradesh',
    avgSunHoursPerDay: 4.8,
    avgTariffPerKWh: 7.0,
    stateAdditionalSubsidyPerKW: 5000, // UP adds up to ₹15,000 state grant
    discomName: 'UPPCL'
  },
  {
    state: 'Telangana',
    avgSunHoursPerDay: 5.2,
    avgTariffPerKWh: 7.3,
    stateAdditionalSubsidyPerKW: 0,
    discomName: 'TSSPDCL'
  },
  {
    state: 'Madhya Pradesh',
    avgSunHoursPerDay: 5.3,
    avgTariffPerKWh: 7.1,
    stateAdditionalSubsidyPerKW: 0,
    discomName: 'MPPKVVCL'
  },
  {
    state: 'West Bengal',
    avgSunHoursPerDay: 4.6,
    avgTariffPerKWh: 7.8,
    stateAdditionalSubsidyPerKW: 0,
    discomName: 'WBSEDCL / CESC'
  }
];

// PM Surya Ghar Muft Bijli Yojana Central Subsidy Calculation
export function calculateCentralSubsidy(systemCapacityKW: number): number {
  if (systemCapacityKW <= 0) return 0;
  if (systemCapacityKW <= 1) {
    return 30000;
  } else if (systemCapacityKW <= 2) {
    return 60000;
  } else {
    // 3 kW or higher gets capped at 78,000 for residential
    return 78000;
  }
}

export const BENCHMARK_COST_PER_KW = 58000; // Average ₹58,000 / kW in India for DCR ALMM modules + inverter
export const SQFT_PER_KW = 100; // ~100 sq ft shadow-free area per kW
export const CO2_KG_PER_KWH = 0.82; // CEA Indian Grid emission factor: 0.82 kg CO2 / kWh
export const CO2_KG_PER_TREE_YEAR = 20; // 1 tree offsets ~20 kg CO2 / year
