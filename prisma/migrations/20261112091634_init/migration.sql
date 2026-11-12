-- CreateEnum
CREATE TYPE "FuelCategory" AS ENUM ('FOSSIL', 'RENEWABLE', 'CLEAN');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('COMPLIANT', 'MODERATE_RISK', 'CRITICAL_SHORTFALL');

-- CreateEnum
CREATE TYPE "JobSector" AS ENUM ('SOLAR_PV', 'WIND_ENERGY', 'BESS_STORAGE', 'GREEN_HYDROGEN', 'GRID_EV', 'ESG_CARBON');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('ONSITE', 'HYBRID', 'REMOTE');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('ENTRY', 'MID', 'SENIOR');

-- CreateTable
CREATE TABLE "fuel_capacity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacityGW" DOUBLE PRECISION NOT NULL,
    "capacitySharePercent" DOUBLE PRECISION NOT NULL,
    "generationSharePercent" DOUBLE PRECISION NOT NULL,
    "cufPercent" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "category" "FuelCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuel_capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metric_summary" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "subtext" TEXT NOT NULL,
    "change" TEXT,
    "isPositive" BOOLEAN NOT NULL DEFAULT true,
    "highlight" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metric_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historical_data_point" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "coalCapacity" DOUBLE PRECISION NOT NULL,
    "renewableCapacity" DOUBLE PRECISION NOT NULL,
    "coalGeneration" DOUBLE PRECISION NOT NULL,
    "renewableGeneration" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historical_data_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regional_renewable" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "states" TEXT NOT NULL,
    "solarGW" DOUBLE PRECISION NOT NULL,
    "windGW" DOUBLE PRECISION NOT NULL,
    "hydroGW" DOUBLE PRECISION NOT NULL,
    "totalCleanGW" DOUBLE PRECISION NOT NULL,
    "shareOfNationalRE" DOUBLE PRECISION NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regional_renewable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gap_insight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gap_insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rpo_trajectory_year" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "financialYear" TEXT NOT NULL,
    "totalRPOTarget" DOUBLE PRECISION NOT NULL,
    "windRPO" DOUBLE PRECISION NOT NULL,
    "hydroRPO" DOUBLE PRECISION NOT NULL,
    "otherRPO" DOUBLE PRECISION NOT NULL,
    "storageObligationMWh" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rpo_trajectory_year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discom_benchmark" (
    "id" TEXT NOT NULL,
    "discom" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "achievedPercent" DOUBLE PRECISION NOT NULL,
    "target2025" DOUBLE PRECISION NOT NULL,
    "shortfall" DOUBLE PRECISION NOT NULL,
    "status" "ComplianceStatus" NOT NULL,
    "annualDemandMU" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discom_benchmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state_solar_data" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "avgSunHoursPerDay" DOUBLE PRECISION NOT NULL,
    "avgTariffPerKWh" DOUBLE PRECISION NOT NULL,
    "stateAdditionalSubsidyPerKW" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discomName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "state_solar_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "green_job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "sector" "JobSector" NOT NULL,
    "location" TEXT NOT NULL,
    "workMode" "WorkMode" NOT NULL,
    "experience" "ExperienceLevel" NOT NULL,
    "salaryRange" TEXT NOT NULL,
    "postedDate" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "skills" TEXT[],
    "description" TEXT NOT NULL,
    "openings" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "green_job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_application" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,
    "applicantPhone" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "historical_data_point_year_key" ON "historical_data_point"("year");

-- CreateIndex
CREATE UNIQUE INDEX "regional_renewable_region_key" ON "regional_renewable"("region");

-- CreateIndex
CREATE UNIQUE INDEX "rpo_trajectory_year_year_key" ON "rpo_trajectory_year"("year");

-- CreateIndex
CREATE UNIQUE INDEX "discom_benchmark_discom_key" ON "discom_benchmark"("discom");

-- CreateIndex
CREATE UNIQUE INDEX "state_solar_data_state_key" ON "state_solar_data"("state");

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "green_job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
