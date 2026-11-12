'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  Layers, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  FileText, 
  Building2, 
  IndianRupee, 
  Info,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export interface RPOTrajectoryYear {
  id?: string;
  year: string;
  financialYear: string;
  totalRPOTarget: number;
  windRPO: number;
  hydroRPO: number;
  otherRPO: number;
  storageObligationMWh?: number | null;
}

export interface DiscomBenchmark {
  id?: string;
  discom: string;
  state: string;
  achievedPercent: number;
  target2025: number;
  shortfall: number;
  status: string;
  annualDemandMU: number;
}

export default function RPOTrackerPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [rpoTrajectoryData, setRpoTrajectoryData] = useState<RPOTrajectoryYear[]>([]);
  const [discomBenchmarks, setDiscomBenchmarks] = useState<DiscomBenchmark[]>([]);
  const [recFloorPrice, setRecFloorPrice] = useState<number>(1000);

  const [achievementPercent, setAchievementPercent] = useState<number>(24.5);
  const [targetYear, setTargetYear] = useState<string>('2025');
  const [annualDemandMU, setAnnualDemandMU] = useState<number>(25000); // 25,000 Million Units (MU)

  useEffect(() => {
    setMounted(true);
    async function fetchRPOData() {
      try {
        const res = await fetch('/api/rpo');
        const json = await res.json();
        if (json.data) {
          setRpoTrajectoryData(json.data.trajectory || []);
          setDiscomBenchmarks(json.data.discomBenchmarks || []);
          if (json.data.recFloorPrice) {
            setRecFloorPrice(json.data.recFloorPrice);
          }
        }
      } catch (err) {
        console.error('Failed to load RPO data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRPOData();
  }, []);

  if (loading || rpoTrajectoryData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
        <div className="text-slate-500 font-medium">Loading...</div>
      </div>
    );
  }

  // Find target for the selected year
  const selectedYearData = rpoTrajectoryData.find(d => d.year === targetYear) || rpoTrajectoryData[0];
  const requiredTarget = selectedYearData.totalRPOTarget;
  
  // Calculate gap
  const shortfallPercent = Math.max(0, Number((requiredTarget - achievementPercent).toFixed(2)));
  const surplusPercent = achievementPercent >= requiredTarget ? Number((achievementPercent - requiredTarget).toFixed(2)) : 0;
  const isCompliant = achievementPercent >= requiredTarget;

  // Shortfall in MWh / Energy
  // 1 MU = 1,000 MWh
  const totalDemandMWh = annualDemandMU * 1000;
  const requiredRenewableMWh = (requiredTarget / 100) * totalDemandMWh;
  const actualProcuredMWh = (achievementPercent / 100) * totalDemandMWh;
  const shortfallMWh = Math.max(0, requiredRenewableMWh - actualProcuredMWh);
  
  // Estimated REC (Renewable Energy Certificate) Purchase Cost to bridge the gap
  // 1 REC = 1 MWh
  const estimatedRECCostINR = shortfallMWh * recFloorPrice;
  const estimatedRECCostCrores = (estimatedRECCostINR / 10000000).toFixed(2);

  // Status badge config
  const getStatusDetails = () => {
    if (isCompliant) {
      return {
        label: 'Fully Compliant',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        icon: CheckCircle2,
        desc: 'Procurement meets statutory Ministry of Power guidelines. Eligible for REC trading credits.'
      };
    } else if (shortfallPercent <= 5.0) {
      return {
        label: 'Moderate Deficit',
        color: 'text-amber-700 bg-amber-50 border-amber-300',
        icon: AlertTriangle,
        desc: 'Minor compliance deficit. Can be cleared via short-term REC purchases on power exchanges (IEX/PXIL).'
      };
    } else {
      return {
        label: 'Critical Shortfall Risk',
        color: 'text-rose-700 bg-rose-50 border-rose-300',
        icon: XCircle,
        desc: 'Substantial shortfall. High risk of SERC regulatory penalties under Energy Conservation Act 2022.'
      };
    }
  };

  const status = getStatusDetails();
  const StatusIcon = status.icon;

  const getBenchmarkStatusDisplay = (val: string) => {
    const upper = (val || '').toUpperCase();
    if (upper === 'COMPLIANT') return 'Compliant';
    if (upper === 'MODERATE_RISK') return 'Moderate Risk';
    if (upper === 'CRITICAL_SHORTFALL') return 'Critical Shortfall';
    return val;
  };

  const getBenchmarkStatusBadgeClass = (val: string) => {
    const upper = (val || '').toUpperCase();
    if (upper === 'COMPLIANT') return 'bg-emerald-100 text-emerald-800';
    if (upper === 'MODERATE_RISK') return 'bg-amber-100 text-amber-800';
    return 'bg-rose-100 text-rose-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Statutory Compliance Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Renewable Purchase Obligation (RPO) Tracker
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Simulate DISCOM and open-access corporate renewable procurement against the Ministry of Power mandated 2025–2030 trajectory (29.91% to 43.33%).
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Statutory Ref: MoP Order No. 23/03/2023-R&amp;R</span>
        </div>
      </div>

      {/* Simulator Section: Inputs on Left, Real-Time Assessment on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <span>Interactive Simulator Parameters</span>
          </div>

          {/* Input 1: Achievement % */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Current RE Achievement Level
              </label>
              <span className="text-lg font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {achievementPercent}%
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="50"
              step="0.5"
              value={achievementPercent}
              onChange={(e) => setAchievementPercent(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>5% (Low Procurement)</span>
              <span>29.91% (2025 Target)</span>
              <span>50% (Leader)</span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 self-center mr-1">Presets:</span>
              <button
                type="button"
                onClick={() => setAchievementPercent(18.5)}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md transition-colors"
              >
                Avg DISCOM (18.5%)
              </button>
              <button
                type="button"
                onClick={() => setAchievementPercent(28.4)}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md transition-colors"
              >
                Gujarat GUVNL (28.4%)
              </button>
              <button
                type="button"
                onClick={() => setAchievementPercent(35.0)}
                className="text-[11px] bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium px-2 py-1 rounded-md transition-colors"
              >
                RE100 Corporate (35%)
              </button>
            </div>
          </div>

          {/* Input 2: Target Evaluation Year */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Target Compliance Horizon
            </label>
            <div className="grid grid-cols-3 gap-2">
              {rpoTrajectoryData.map((item) => (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setTargetYear(item.year)}
                  className={`p-2 rounded-xl text-center border text-xs transition-all ${
                    targetYear === item.year
                      ? 'border-emerald-600 bg-emerald-600 text-white font-bold shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">{item.year}</div>
                  <div className={`text-[10px] ${targetYear === item.year ? 'text-emerald-100' : 'text-slate-500'}`}>
                    Target: {item.totalRPOTarget}%
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Input 3: Annual Consumption Demand */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Annual Power Portfolio Demand
              </label>
              <span className="text-xs font-bold text-slate-800">
                {annualDemandMU.toLocaleString()} MU
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="100"
                max="200000"
                step="1000"
                value={annualDemandMU}
                onChange={(e) => setAnnualDemandMU(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-800"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">
                Million Units (MU)
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              e.g., BESCOM ~32,000 MU; Large industrial open-access facility ~250–1,000 MU.
            </p>
          </div>

          {/* Sub-Target Breakdown for Selected Year */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-800 flex items-center justify-between">
              <span>{selectedYearData.financialYear} Statutory Sub-Targets</span>
              <span className="text-emerald-700 font-semibold">{selectedYearData.totalRPOTarget}% Total</span>
            </div>
            <div className="space-y-1.5 pt-1 text-slate-600">
              <div className="flex justify-between">
                <span>Wind RPO (specific mandate):</span>
                <span className="font-semibold text-cyan-700">{selectedYearData.windRPO}%</span>
              </div>
              <div className="flex justify-between">
                <span>Hydro Power Obligation (HPO):</span>
                <span className="font-semibold text-blue-700">{selectedYearData.hydroRPO}%</span>
              </div>
              <div className="flex justify-between">
                <span>Other RPO (Solar, Bio, Distributed):</span>
                <span className="font-semibold text-amber-700">{selectedYearData.otherRPO}%</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1 text-purple-700 font-medium">
                <span>Energy Storage Obligation (ESO):</span>
                <span>{selectedYearData.storageObligationMWh}% of total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Assessment & Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Assessment Summary Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Compliance Audit Status</h3>
                <p className="text-xs text-slate-500">Evaluation against FY {selectedYearData.financialYear} statutory guidelines</p>
              </div>
              
              <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${status.color}`}>
                <StatusIcon className="w-4 h-4" />
                <span>{status.label}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {status.desc}
            </p>

            {/* Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Box 1: Required vs Current */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">Target vs Current</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {requiredTarget}%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Current: <strong className="text-slate-800">{achievementPercent}%</strong>
                </div>
              </div>

              {/* Box 2: Deficit / Surplus % */}
              <div className={`p-4 rounded-xl border ${
                isCompliant 
                  ? 'bg-emerald-50/60 border-emerald-200' 
                  : 'bg-rose-50/60 border-rose-200'
              }`}>
                <div className="text-xs text-slate-500 font-medium">
                  {isCompliant ? 'Procurement Surplus' : 'Statutory Shortfall'}
                </div>
                <div className={`text-2xl font-black mt-1 ${isCompliant ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {isCompliant ? `+${surplusPercent}%` : `-${shortfallPercent}%`}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {isCompliant ? 'Buffer for future years' : 'Gap to statutory target'}
                </div>
              </div>

              {/* Box 3: REC Penalty / Purchase Liability */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">Est. REC Liability</div>
                <div className="text-2xl font-black text-amber-600 mt-1">
                  {isCompliant ? '₹0.00' : `₹${estimatedRECCostCrores} Cr`}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {isCompliant ? 'No penalty exposure' : `At ₹${recFloorPrice.toLocaleString()}/MWh REC floor`}
                </div>
              </div>
            </div>

            {/* Energy Volume Details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Statutory Clean Energy Mandate:</span>
                <span className="font-semibold text-slate-900">
                  {((requiredTarget / 100) * annualDemandMU).toFixed(1)} MU ({requiredRenewableMWh.toLocaleString()} MWh)
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Actual Clean Energy Procurement:</span>
                <span className="font-semibold text-slate-900">
                  {((achievementPercent / 100) * annualDemandMU).toFixed(1)} MU ({actualProcuredMWh.toLocaleString()} MWh)
                </span>
              </div>
              <div className="flex justify-between text-slate-700 border-t border-slate-200 pt-1.5 font-bold">
                <span>Net Clean Energy Deficit:</span>
                <span className={isCompliant ? 'text-emerald-700' : 'text-rose-600'}>
                  {isCompliant ? '0 MWh (Compliant)' : `${shortfallMWh.toLocaleString()} MWh shortfall`}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Trajectory Chart with Dynamic User Reference Line */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  RPO Trajectory (2025–2030) with Your Achievement
                </h3>
                <p className="text-xs text-slate-500">
                  Green dotted line marks your current {achievementPercent}% procurement
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-200">
                Ministry of Power
              </span>
            </div>

            <div className="h-72 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={rpoTrajectoryData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                    <YAxis unit="%" stroke="#64748b" fontSize={11} domain={[15, 50]} />
                    <Tooltip 
                      formatter={(val: any, name: any) => [`${val}%`, name]}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    
                    {/* The Mandated Statutory RPO Trajectory */}
                    <Line
                      name="Mandated RPO Target (%)"
                      type="monotone"
                      dataKey="totalRPOTarget"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#10b981' }}
                    />

                    {/* Wind RPO component */}
                    <Line
                      name="Wind RPO Mandate (%)"
                      type="monotone"
                      dataKey="windRPO"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 3 }}
                    />

                    {/* Dynamic Reference Line of the user's current achievement */}
                    <ReferenceLine 
                      y={achievementPercent} 
                      stroke="#0ea5e9" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      label={{ 
                        value: `Your Level: ${achievementPercent}%`, 
                        position: 'insideBottomRight', 
                        fill: '#0284c7', 
                        fontSize: 12,
                        fontWeight: 'bold' 
                      }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : null}
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <Info className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                By 2029-30, all Indian DISCOMs and Open Access entities must source <strong>43.33%</strong> of power from renewables, including 5.08% Wind and 4% Energy Storage Obligation.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* DISCOM Performance Benchmark Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              State DISCOM RPO Performance Benchmarks (2024-25)
            </h3>
            <p className="text-xs text-slate-500">
              Official compliance evaluation across major Indian power distribution utilities (Target: 29.91%)
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
            CEA &amp; Forum of Regulators Data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">DISCOM / Entity</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Annual Demand (MU)</th>
                <th className="px-4 py-3">Current RE Achieved</th>
                <th className="px-4 py-3">Statutory Shortfall</th>
                <th className="px-4 py-3">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {discomBenchmarks.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900 flex items-center space-x-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.discom}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{item.state}</td>
                  <td className="px-4 py-3.5 font-medium">{item.annualDemandMU.toLocaleString()} MU</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900">{item.achievedPercent}%</td>
                  <td className="px-4 py-3.5 font-semibold">
                    {item.shortfall > 0 ? (
                      <span className="text-rose-600">-{item.shortfall}%</span>
                    ) : (
                      <span className="text-emerald-700 font-bold">Compliant (0%)</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full font-semibold text-[11px] ${getBenchmarkStatusBadgeClass(item.status)}`}>
                      {getBenchmarkStatusDisplay(item.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
