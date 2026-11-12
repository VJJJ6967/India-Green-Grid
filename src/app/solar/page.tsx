'use client';

import React, { useState, useEffect } from 'react';
import { 
  indianStatesSolarData, 
  calculateCentralSubsidy, 
  BENCHMARK_COST_PER_KW, 
  SQFT_PER_KW, 
  CO2_KG_PER_KWH, 
  CO2_KG_PER_TREE_YEAR,
  StateSolarData 
} from '@/data/solar';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Sun, 
  Calculator, 
  IndianRupee, 
  Home, 
  Sparkles, 
  TrendingUp, 
  Leaf, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  FileCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

export default function SolarCalculatorPage() {
  const [mounted, setMounted] = useState(false);
  
  // User Inputs
  const [monthlyBill, setMonthlyBill] = useState<number>(3500); // INR
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(400); // Sq ft
  const [selectedStateName, setSelectedStateName] = useState<string>('Gujarat');
  const [consumerCategory, setConsumerCategory] = useState<'residential' | 'commercial'>('residential');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find selected state data
  const stateData: StateSolarData = indianStatesSolarData.find(s => s.state === selectedStateName) || indianStatesSolarData[0];

  // Calculations:
  // 1. Monthly energy consumption (units / kWh) = monthlyBill / avgTariffPerKWh
  const tariff = stateData.avgTariffPerKWh;
  const monthlyConsumptionUnits = Math.round(monthlyBill / tariff);
  const dailyConsumptionUnits = monthlyConsumptionUnits / 30;

  // 2. System sizing based on energy demand
  // 1 kW solar in India generates ~ 4.2 units/day (varies with state avgSunHoursPerDay)
  // Daily generation per kW = stateData.avgSunHoursPerDay * 0.8 (system efficiency factor)
  const dailyGenPerKW = stateData.avgSunHoursPerDay * 0.8;
  const requiredKWFromBill = dailyConsumptionUnits / dailyGenPerKW;

  // 3. System sizing limit based on available roof area
  // ~100 sq ft shadow free required per 1 kW
  const maxKWFromRoof = roofAreaSqFt / SQFT_PER_KW;

  // Recommended system size in kW (rounded to 1 decimal place, minimum 1 kW, capped by roof area)
  const recommendedKW = Math.min(
    Math.max(1, parseFloat(requiredKWFromBill.toFixed(1))),
    parseFloat(maxKWFromRoof.toFixed(1))
  );

  // 4. Financials
  const grossCost = recommendedKW * BENCHMARK_COST_PER_KW;
  const centralSubsidy = consumerCategory === 'residential' ? calculateCentralSubsidy(recommendedKW) : 0;
  const stateSubsidy = consumerCategory === 'residential' ? (stateData.stateAdditionalSubsidyPerKW * Math.min(recommendedKW, 3)) : 0;
  const totalSubsidy = centralSubsidy + stateSubsidy;
  const netCustomerCost = Math.max(0, grossCost - totalSubsidy);

  // 5. Energy Generation & Savings
  // Annual generation (kWh) = recommendedKW * dailyGenPerKW * 365
  const annualGenUnits = Math.round(recommendedKW * dailyGenPerKW * 365);
  const monthlyGenUnits = Math.round(annualGenUnits / 12);
  const annualBillSavings = Math.round(annualGenUnits * tariff);
  const monthlySavings = Math.round(annualBillSavings / 12);

  // 6. Payback period (Years)
  const paybackPeriodYears = annualBillSavings > 0 ? (netCustomerCost / annualBillSavings).toFixed(1) : '0';

  // 7. 25-Year Cumulative Savings
  // Solar panels carry 25-year performance warranties.
  // Assuming 4% annual grid tariff escalation
  const lifetimeSavings = Math.round(annualBillSavings * 25 * 1.35) - netCustomerCost;

  // 8. Environmental Impact
  const annualCO2AvoidedKg = Math.round(annualGenUnits * CO2_KG_PER_KWH);
  const annualCO2AvoidedTonnes = (annualCO2AvoidedKg / 1000).toFixed(2);
  const equivalentTrees = Math.round(annualCO2AvoidedKg / CO2_KG_PER_TREE_YEAR);

  // 25-Year Projection Chart Data
  const projectionChartData = [];
  let cumSavingsWithSolar = -netCustomerCost;
  let cumBillWithoutSolar = 0;
  let currentTariff = tariff;

  for (let year = 1; year <= 25; year++) {
    const yearBillWithoutSolar = annualGenUnits * currentTariff;
    cumBillWithoutSolar += yearBillWithoutSolar;
    
    // Degradation 0.7% per year for panels
    const genThisYear = annualGenUnits * (1 - 0.007 * (year - 1));
    const savingsThisYear = genThisYear * currentTariff;
    cumSavingsWithSolar += savingsThisYear;

    currentTariff *= 1.035; // 3.5% grid tariff escalation

    if (year % 5 === 0 || year === 1 || year === Number(paybackPeriodYears)) {
      projectionChartData.push({
        year: `Yr ${year}`,
        netSavingsSolar: Math.round(Math.max(0, cumSavingsWithSolar)),
        costWithoutSolar: Math.round(cumBillWithoutSolar)
      });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            <span>PM Surya Ghar: Muft Bijli Yojana Integrated</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Rooftop Solar ROI &amp; Subsidy Calculator
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Simulate solar system sizing, central government Direct Benefit Transfer (DBT) subsidies up to ₹78,000, net out-of-pocket investment, payback period, and 25-year lifetime electricity bill savings.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>MNRE Benchmark Cost &amp; DBT Guidelines</span>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Visual Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>Rooftop Configuration</span>
          </div>

          {/* Consumer Category */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Premises Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConsumerCategory('residential')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-2 ${
                  consumerCategory === 'residential'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500/40'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Residential (Subsidy)</span>
              </button>
              <button
                type="button"
                onClick={() => setConsumerCategory('commercial')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-2 ${
                  consumerCategory === 'commercial'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500/40'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Commercial / C&amp;I</span>
              </button>
            </div>
          </div>

          {/* Input 1: Monthly Electricity Bill */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Average Monthly Electricity Bill
              </label>
              <span className="text-base font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                ₹{monthlyBill.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹1,000 (~140 units)</span>
              <span>₹10,000</span>
              <span>₹20,000+</span>
            </div>
          </div>

          {/* Input 2: Available Roof Area */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Shadow-Free Roof Area
              </label>
              <span className="text-base font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                {roofAreaSqFt} sq.ft
              </span>
            </div>

            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={roofAreaSqFt}
              onChange={(e) => setRoofAreaSqFt(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>100 sq.ft (1 kW)</span>
              <span>500 sq.ft (5 kW)</span>
              <span>2,000 sq.ft</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Rule of thumb: 1 kW of solar PV modules requires ~100 sq.ft of unshaded flat or sloped rooftop.
            </p>
          </div>

          {/* Input 3: State Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              State / Union Territory
            </label>
            <select
              value={selectedStateName}
              onChange={(e) => setSelectedStateName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-800 bg-white"
            >
              {indianStatesSolarData.map((s) => (
                <option key={s.state} value={s.state}>
                  {s.state} — (Tariff: ₹{s.avgTariffPerKWh}/unit, {s.avgSunHoursPerDay} Sun Hrs)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Utility / DISCOM: <strong>{stateData.discomName}</strong>. Peak solar insolation: {stateData.avgSunHoursPerDay} kWh/m²/day.
            </p>
          </div>

          {/* PM Surya Ghar Policy Highlights */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
            <div className="font-bold text-amber-900 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>PM Surya Ghar Subsidy Slabs</span>
            </div>
            <ul className="space-y-1 text-slate-700 list-disc list-inside">
              <li>1 kW system: <strong>₹30,000</strong> central subsidy</li>
              <li>2 kW system: <strong>₹60,000</strong> central subsidy</li>
              <li>3 kW &amp; above: <strong>₹78,000</strong> maximum flat subsidy</li>
              {stateData.stateAdditionalSubsidyPerKW > 0 && (
                <li className="text-emerald-800 font-semibold">
                  {stateData.state} bonus state grant: +₹{stateData.stateAdditionalSubsidyPerKW}/kW
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Output Dashboard (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Hero Recommendation Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl border border-emerald-800/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Recommended System Capacity
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1 flex items-baseline space-x-2">
                  <span>{recommendedKW}</span>
                  <span className="text-2xl font-bold text-emerald-400">kW On-Grid</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Generates ~<strong>{monthlyGenUnits} units/month</strong>, covering ~<strong>{Math.min(100, Math.round((monthlyGenUnits / monthlyConsumptionUnits) * 100))}%</strong> of your monthly bill.
                </p>
              </div>

              <div className="bg-emerald-900/60 border border-emerald-500/40 rounded-xl p-4 text-center shrink-0">
                <div className="text-xs text-emerald-200 font-medium">Estimated Payback</div>
                <div className="text-3xl font-extrabold text-white mt-0.5">{paybackPeriodYears} <span className="text-sm font-normal text-emerald-300">Years</span></div>
                <div className="text-[10px] text-emerald-300 mt-0.5">Free electricity thereafter</div>
              </div>
            </div>

            {/* Financial Cost Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                <div className="text-xs text-slate-400 font-medium">Gross Project Cost</div>
                <div className="text-2xl font-bold text-slate-200 mt-1">₹{grossCost.toLocaleString()}</div>
                <div className="text-[11px] text-slate-400 mt-1">At ₹{BENCHMARK_COST_PER_KW.toLocaleString()}/kW</div>
              </div>

              <div className="bg-emerald-950/80 rounded-xl p-4 border border-emerald-600/50">
                <div className="text-xs text-emerald-300 font-medium">Total Subsidy (DBT)</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">-₹{totalSubsidy.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-300/80 mt-1">Central + State grant</div>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-4 border border-emerald-500/40">
                <div className="text-xs text-slate-400 font-medium">Net Out-of-Pocket Cost</div>
                <div className="text-2xl font-extrabold text-amber-300 mt-1">₹{netCustomerCost.toLocaleString()}</div>
                <div className="text-[11px] text-slate-400 mt-1">Direct customer investment</div>
              </div>
            </div>

            {/* Monthly and Annual Savings Metric Pills */}
            <div className="pt-2 border-t border-emerald-800/60 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center space-x-1.5 bg-slate-800/70 px-3 py-1.5 rounded-lg border border-slate-700">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                <span>Monthly Bill Savings: <strong className="text-white">₹{monthlySavings.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/70 px-3 py-1.5 rounded-lg border border-slate-700">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Annual Savings: <strong className="text-white">₹{annualBillSavings.toLocaleString()} / year</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/70 px-3 py-1.5 rounded-lg border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>25-Yr Net Savings: <strong className="text-amber-300">₹{lifetimeSavings.toLocaleString()}</strong></span>
              </div>
            </div>
          </div>

          {/* Environmental Impact Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Your Annual Green Footprint</h3>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
                CEA Grid Emission Factor: 0.82 kg/kWh
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-center">
                <div className="text-xs text-emerald-800 font-medium">Clean Energy Generated</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">{annualGenUnits.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500 mt-1">kWh units / year</div>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-center">
                <div className="text-xs text-teal-800 font-medium">CO₂ Emissions Avoided</div>
                <div className="text-2xl font-black text-teal-700 mt-1">{annualCO2AvoidedTonnes}</div>
                <div className="text-[11px] text-slate-500 mt-1">Tonnes CO₂ / year</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-center">
                <div className="text-xs text-amber-800 font-medium">Equivalent Forest Offset</div>
                <div className="text-2xl font-black text-amber-700 mt-1">~{equivalentTrees}</div>
                <div className="text-[11px] text-slate-500 mt-1">Mature trees planted / yr</div>
              </div>
            </div>
          </div>

          {/* 25-Year Cumulative Savings Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">25-Year Wealth Creation with Solar</h3>
                <p className="text-xs text-slate-500">Cumulative money saved compared to staying on grid electricity</p>
              </div>
              <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
                3.5% Grid Tariff Escalation
              </span>
            </div>

            <div className="h-64 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={projectionChartData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={11} 
                      tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`} 
                    />
                    <Tooltip 
                      formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Area 
                      type="monotone" 
                      dataKey="netSavingsSolar" 
                      name="Net Wealth Saved with Solar (₹)" 
                      stroke="#10b981" 
                      fill="#a7f3d0" 
                      strokeWidth={2.5}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="costWithoutSolar" 
                      name="Grid Bills Paid Without Solar (₹)" 
                      stroke="#f59e0b" 
                      fill="#fef3c7" 
                      strokeWidth={2}
                      strokeDasharray="4 4"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : null}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                By year {paybackPeriodYears}, your rooftop system completely recoups your investment. Over 25 years, you generate approximately <strong>₹{lifetimeSavings.toLocaleString()} in net tax-free returns</strong>.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Step-by-Step PM Surya Ghar Application Checklist */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            How to Claim Your PM Surya Ghar Subsidy in 4 Steps
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Simplified workflow for Indian residential consumers to register on the National Portal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Register on Portal</h4>
            <p className="text-xs text-slate-600">
              Visit pmsuryaghar.gov.in, select your state ({stateData.state}) and DISCOM ({stateData.discomName}), and enter consumer account number.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Feasibility Approval</h4>
            <p className="text-xs text-slate-600">
              DISCOM reviews technical feasibility for {recommendedKW} kW on-grid connection and approves sanction letter online.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Empaneled Installation</h4>
            <p className="text-xs text-slate-600">
              Select any registered vendor to install ALMM/DCR-certified solar panels and a bidirectional net meter.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Direct Bank Subsidy</h4>
            <p className="text-xs text-slate-600">
              Submit commissioning report. The central subsidy of ₹{totalSubsidy.toLocaleString()} is directly credited to your bank account via DBT within 30 days.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
