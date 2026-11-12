/**
 * prisma/seed.ts
 *
 * Populates all Prisma tables from the existing static data files in src/data/.
 * Run with:  npm run db:seed
 *
 * Enum mapping:
 *   FuelCategory:    'fossil' → FOSSIL, 'renewable' → RENEWABLE, 'clean' → CLEAN
 *   ComplianceStatus:'Compliant' → COMPLIANT, 'Moderate Risk' → MODERATE_RISK,
 *                    'Critical Shortfall' → CRITICAL_SHORTFALL
 *   JobSector:       'Solar PV' → SOLAR_PV, 'Wind Energy' → WIND_ENERGY, etc.
 *   WorkMode:        'On-site' → ONSITE, 'Hybrid' → HYBRID, 'Remote' → REMOTE
 *   ExperienceLevel: 'Entry (0-2 yrs)' → ENTRY, 'Mid (3-5 yrs)' → MID, 'Senior (6+ yrs)' → SENIOR
 */

import { PrismaClient, FuelCategory, ComplianceStatus, JobSector, WorkMode, ExperienceLevel } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local so DATABASE_URL is available when running via tsx outside Next.js
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// ---------------------------------------------------------------------------
// Import source data (paths are relative to this seed file inside prisma/)
// ---------------------------------------------------------------------------
import {
  installedCapacityData,
  summaryMetrics,
  historicalTrajectory,
  regionalRenewables,
  gapInsights,
} from '../src/data/energy';

import {
  rpoTrajectoryData,
  discomBenchmarks,
} from '../src/data/rpo';

import { indianStatesSolarData } from '../src/data/solar';

import { greenJobsData } from '../src/data/jobs';

// ---------------------------------------------------------------------------
// Enum conversion helpers
// ---------------------------------------------------------------------------

function toFuelCategory(cat: string): FuelCategory {
  const map: Record<string, FuelCategory> = {
    fossil:    FuelCategory.FOSSIL,
    renewable: FuelCategory.RENEWABLE,
    clean:     FuelCategory.CLEAN,
  };
  const result = map[cat.toLowerCase()];
  if (!result) throw new Error(`Unknown FuelCategory: "${cat}"`);
  return result;
}

function toComplianceStatus(status: string): ComplianceStatus {
  const map: Record<string, ComplianceStatus> = {
    'Compliant':          ComplianceStatus.COMPLIANT,
    'Moderate Risk':      ComplianceStatus.MODERATE_RISK,
    'Critical Shortfall': ComplianceStatus.CRITICAL_SHORTFALL,
  };
  const result = map[status];
  if (!result) throw new Error(`Unknown ComplianceStatus: "${status}"`);
  return result;
}

function toJobSector(sector: string): JobSector {
  const map: Record<string, JobSector> = {
    'Solar PV':       JobSector.SOLAR_PV,
    'Wind Energy':    JobSector.WIND_ENERGY,
    'BESS & Storage': JobSector.BESS_STORAGE,
    'Green Hydrogen': JobSector.GREEN_HYDROGEN,
    'Grid & EV':      JobSector.GRID_EV,
    'ESG & Carbon':   JobSector.ESG_CARBON,
  };
  const result = map[sector];
  if (!result) throw new Error(`Unknown JobSector: "${sector}"`);
  return result;
}

function toWorkMode(mode: string): WorkMode {
  const map: Record<string, WorkMode> = {
    'On-site': WorkMode.ONSITE,
    'Hybrid':  WorkMode.HYBRID,
    'Remote':  WorkMode.REMOTE,
  };
  const result = map[mode];
  if (!result) throw new Error(`Unknown WorkMode: "${mode}"`);
  return result;
}

function toExperienceLevel(exp: string): ExperienceLevel {
  const map: Record<string, ExperienceLevel> = {
    'Entry (0-2 yrs)': ExperienceLevel.ENTRY,
    'Mid (3-5 yrs)':   ExperienceLevel.MID,
    'Senior (6+ yrs)': ExperienceLevel.SENIOR,
  };
  const result = map[exp];
  if (!result) throw new Error(`Unknown ExperienceLevel: "${exp}"`);
  return result;
}

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

const prisma = new PrismaClient();

async function main() {
  console.log('\n🌱  Starting India Green Grid seed...\n');

  // ── 1. FuelCapacity ──────────────────────────────────────────────────────
  await prisma.fuelCapacity.deleteMany();
  const fuelRows = await prisma.fuelCapacity.createMany({
    data: installedCapacityData.map((f, i) => ({
      id:                     f.id,
      name:                   f.name,
      capacityGW:             f.capacityGW,
      capacitySharePercent:   f.capacitySharePercent,
      generationSharePercent: f.generationSharePercent,
      cufPercent:             f.cufPercent,
      color:                  f.color,
      category:               toFuelCategory(f.category),
      description:            f.description,
      sortOrder:              i,
    })),
  });
  console.log(`✅  FuelCapacity      — ${fuelRows.count} rows`);

  // ── 2. MetricSummary ─────────────────────────────────────────────────────
  await prisma.metricSummary.deleteMany();
  const metricRows = await prisma.metricSummary.createMany({
    data: summaryMetrics.map((m, i) => ({
      label:      m.label,
      value:      m.value,
      subtext:    m.subtext,
      change:     m.change ?? null,
      isPositive: m.isPositive ?? true,
      highlight:  m.highlight ?? false,
      sortOrder:  i,
    })),
  });
  console.log(`✅  MetricSummary     — ${metricRows.count} rows`);

  // ── 3. HistoricalDataPoint ───────────────────────────────────────────────
  await prisma.historicalDataPoint.deleteMany();
  const histRows = await prisma.historicalDataPoint.createMany({
    data: historicalTrajectory.map((h) => ({
      year:               h.year,
      coalCapacity:       h.coalCapacity,
      renewableCapacity:  h.renewableCapacity,
      coalGeneration:     h.coalGeneration,
      renewableGeneration: h.renewableGeneration,
    })),
  });
  console.log(`✅  HistoricalDataPoint — ${histRows.count} rows`);

  // ── 4. RegionalRenewable ─────────────────────────────────────────────────
  await prisma.regionalRenewable.deleteMany();
  const regionRows = await prisma.regionalRenewable.createMany({
    data: regionalRenewables.map((r, i) => ({
      region:           r.region,
      states:           r.states,
      solarGW:          r.solarGW,
      windGW:           r.windGW,
      hydroGW:          r.hydroGW,
      totalCleanGW:     r.totalCleanGW,
      shareOfNationalRE: r.shareOfNationalRE,
      sortOrder:        i,
    })),
  });
  console.log(`✅  RegionalRenewable  — ${regionRows.count} rows`);

  // ── 5. GapInsight ────────────────────────────────────────────────────────
  await prisma.gapInsight.deleteMany();
  const insightRows = await prisma.gapInsight.createMany({
    data: gapInsights.map((g, i) => ({
      title:       g.title,
      description: g.description,
      badge:       g.badge,
      sortOrder:   i,
    })),
  });
  console.log(`✅  GapInsight         — ${insightRows.count} rows`);

  // ── 6. RPOTrajectoryYear ─────────────────────────────────────────────────
  await prisma.rPOTrajectoryYear.deleteMany();
  const rpoRows = await prisma.rPOTrajectoryYear.createMany({
    data: rpoTrajectoryData.map((r) => ({
      year:                r.year,
      financialYear:       r.financialYear,
      totalRPOTarget:      r.totalRPOTarget,
      windRPO:             r.windRPO,
      hydroRPO:            r.hydroRPO,
      otherRPO:            r.otherRPO,
      storageObligationMWh: r.storageObligationMWh ?? null,
    })),
  });
  console.log(`✅  RPOTrajectoryYear  — ${rpoRows.count} rows`);

  // ── 7. DiscomBenchmark ───────────────────────────────────────────────────
  await prisma.discomBenchmark.deleteMany();
  const discomRows = await prisma.discomBenchmark.createMany({
    data: discomBenchmarks.map((d) => ({
      discom:          d.discom,
      state:           d.state,
      achievedPercent: d.achievedPercent,
      target2025:      d.target2025,
      shortfall:       d.shortfall,
      status:          toComplianceStatus(d.status),
      annualDemandMU:  d.annualDemandMU,
    })),
  });
  console.log(`✅  DiscomBenchmark    — ${discomRows.count} rows`);

  // ── 8. StateSolarData ────────────────────────────────────────────────────
  await prisma.stateSolarData.deleteMany();
  const solarRows = await prisma.stateSolarData.createMany({
    data: indianStatesSolarData.map((s) => ({
      state:                      s.state,
      avgSunHoursPerDay:          s.avgSunHoursPerDay,
      avgTariffPerKWh:            s.avgTariffPerKWh,
      stateAdditionalSubsidyPerKW: s.stateAdditionalSubsidyPerKW,
      discomName:                 s.discomName,
    })),
  });
  console.log(`✅  StateSolarData     — ${solarRows.count} rows`);

  // ── 9. GreenJob (delete applications first due to FK constraint) ─────────
  await prisma.jobApplication.deleteMany();
  await prisma.greenJob.deleteMany();
  const jobRows = await prisma.greenJob.createMany({
    data: greenJobsData.map((j) => ({
      id:          j.id,
      title:       j.title,
      company:     j.company,
      sector:      toJobSector(j.sector),
      location:    j.location,
      workMode:    toWorkMode(j.workMode),
      experience:  toExperienceLevel(j.experience),
      salaryRange: j.salaryRange,
      postedDate:  j.postedDate,
      featured:    j.featured ?? false,
      skills:      j.skills,
      description: j.description,
      openings:    j.openings,
    })),
  });
  console.log(`✅  GreenJob           — ${jobRows.count} rows`);
  console.log(`✅  JobApplication     — 0 rows (table seeded empty; filled by apply modal)`);

  console.log('\n🎉  Seed complete!\n');
}

main()
  .catch((e) => {
    console.error('\n❌  Seed failed:\n', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
