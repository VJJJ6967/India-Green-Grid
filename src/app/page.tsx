'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  installedCapacityData, 
  summaryMetrics, 
  comparativeChartData, 
  historicalTrajectory, 
  regionalRenewables,
  gapInsights,
  FuelCapacity 
} from '@/data/energy';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Zap, 
  Sun, 
  Wind, 
  Flame, 
  Droplet, 
  Atom, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  BatteryCharging, 
  ShieldAlert,
  Info,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function EnergyMixDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState<FuelCapacity>(installedCapacityData[1]); // Solar by default
  const [activeTab, setActiveTab] = useState<'comparison' | 'trajectory' | 'regional'>('comparison');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Icon selector based on fuel
  const getFuelIcon = (id: string) => {
    switch (id) {
      case 'coal': return <Flame className="w-5 h-5 text-slate-500" />;
      case 'solar': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'wind': return <Wind className="w-5 h-5 text-cyan-500" />;
      case 'hydro': return <Droplet className="w-5 h-5 text-blue-500" />;
      case 'nuclear': return <Atom className="w-5 h-5 text-purple-500" />;
      default: return <Zap className="w-5 h-5 text-emerald-500" />;
    }
  };

  const pieColors = installedCapacityData.map(d => d.color);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-emerald-900/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>National Grid Decision-Support Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            India’s Energy Mix &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
              The Clean Generation Paradox
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            India has installed over <strong>198 GW of non-fossil capacity (44%)</strong>, advancing toward the 500 GW 2030 target. 
            However, due to weather intermittency and capacity factors, <strong>coal still powers ~74% of actual consumption</strong> while renewables generate only ~13%.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/rpo"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:translate-y-[-1px]"
            >
              <span>Test RPO Compliance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solar"
              className="inline-flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 font-medium px-5 py-2.5 rounded-xl transition-all"
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Rooftop Solar ROI Calculator</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryMetrics.map((metric, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl border transition-all ${
              metric.highlight 
                ? 'bg-gradient-to-br from-amber-500/10 via-white to-amber-50 border-amber-200/80 shadow-sm ring-1 ring-amber-400/30'
                : 'bg-white border-slate-200/80 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              <span>{metric.label}</span>
              {metric.highlight ? (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              )}
            </div>

            <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
              {metric.value}
            </div>

            <p className="text-xs font-medium text-slate-600 mb-2">
              {metric.subtext}
            </p>

            <div className={`text-xs font-medium pt-2 border-t border-slate-100 flex items-center space-x-1 ${
              metric.highlight 
                ? 'text-amber-700 font-semibold' 
                : metric.isPositive 
                  ? 'text-emerald-700' 
                  : 'text-slate-600'
            }`}>
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* The Central Gap Spotlight: Coal vs Renewables */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Core Problem Statement Insight</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              The Reality Check: Capacity Share ≠ Energy Delivered
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Renewables (Solar + Wind) make up <strong>29.5%</strong> of India’s nameplate capacity, but only 
              yield <strong>~13.0%</strong> of actual kilowatt-hours. Meanwhile, Coal (48.4% capacity) delivers 
              <strong> 73.8% of India’s electricity</strong> due to ~68% baseload utilization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0 sm:min-w-[340px]">
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-400 font-medium">Coal Generation</div>
              <div className="text-3xl font-extrabold text-rose-400 mt-1">73.8%</div>
              <div className="text-[11px] text-slate-400 mt-1">from 218 GW Capacity</div>
            </div>
            <div className="bg-slate-800/90 border border-emerald-800/50 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-400 font-medium">Solar+Wind Gen</div>
              <div className="text-3xl font-extrabold text-amber-400 mt-1">13.0%</div>
              <div className="text-[11px] text-slate-400 mt-1">from 132.7 GW Capacity</div>
            </div>
          </div>
        </div>

        {/* Progress Bar Visualizing the Gap */}
        <div className="mt-6 pt-6 border-t border-slate-700/80 space-y-3">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>Electricity Generation Mix by Fuel (Annual TWh)</span>
            <span className="text-emerald-400">Total: ~1,700 Billion Units</span>
          </div>
          <div className="w-full h-5 rounded-full overflow-hidden flex bg-slate-700 shadow-inner">
            <div 
              style={{ width: '73.8%' }} 
              className="bg-slate-600 hover:opacity-90 transition-all flex items-center justify-center text-[10px] text-white font-bold"
              title="Coal: 73.8%"
            >
              Coal (73.8%)
            </div>
            <div 
              style={{ width: '9.6%' }} 
              className="bg-blue-600 hover:opacity-90 transition-all flex items-center justify-center text-[10px] text-white font-bold"
              title="Hydro: 9.6%"
            >
              Hydro
            </div>
            <div 
              style={{ width: '7.2%' }} 
              className="bg-amber-500 hover:opacity-90 transition-all flex items-center justify-center text-[10px] text-white font-bold"
              title="Solar: 7.2%"
            >
              Solar
            </div>
            <div 
              style={{ width: '5.8%' }} 
              className="bg-cyan-500 hover:opacity-90 transition-all flex items-center justify-center text-[10px] text-white font-bold"
              title="Wind: 5.8%"
            >
              Wind
            </div>
            <div 
              style={{ width: '2.8%' }} 
              className="bg-purple-600 hover:opacity-90 transition-all flex items-center justify-center text-[10px] text-white font-bold"
              title="Nuclear: 2.8%"
            >
              Nuc
            </div>
            <div 
              style={{ width: '0.8%' }} 
              className="bg-emerald-500 hover:opacity-90 transition-all"
              title="Other: 0.8%"
            />
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span> Coal: 73.8%</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Hydro: 9.6%</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Solar: 7.2%</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Wind: 5.8%</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Nuclear: 2.8%</span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Pie Chart (Installed Capacity in GW) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Installed Capacity Breakdown</h3>
              <p className="text-xs text-slate-500">Total Grid Capacity: 450.3 GW (Central Electricity Authority)</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
              GW Scale
            </span>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={installedCapacityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="capacityGW"
                    nameKey="name"
                    onClick={(entry) => setSelectedFuel(entry)}
                  >
                    {installedCapacityData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke={selectedFuel.id === entry.id ? '#0f172a' : '#ffffff'}
                        strokeWidth={selectedFuel.id === entry.id ? 3 : 1}
                        className="cursor-pointer transition-all hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: any) => [`${value} GW`, name]}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Loading capacity chart...
              </div>
            )}
          </div>

          {/* Interactive Legend & Selector */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {installedCapacityData.map((fuel) => (
              <button
                key={fuel.id}
                onClick={() => setSelectedFuel(fuel)}
                className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between text-xs ${
                  selectedFuel.id === fuel.id
                    ? 'border-emerald-600 bg-emerald-50/70 font-semibold ring-1 ring-emerald-500/40'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: fuel.color }} />
                  <span className="truncate">{fuel.name}</span>
                </div>
                <span className="font-bold text-slate-800 shrink-0">{fuel.capacityGW} GW</span>
              </button>
            ))}
          </div>

          {/* Selected Fuel Deep-Dive Panel */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                {getFuelIcon(selectedFuel.id)}
                <span>{selectedFuel.name}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] uppercase ${
                selectedFuel.category === 'fossil' 
                  ? 'bg-rose-100 text-rose-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedFuel.category}
              </span>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              {selectedFuel.description}
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400">Capacity Share</div>
                <div className="font-bold text-slate-800 text-sm">{selectedFuel.capacitySharePercent}%</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400">Generation Share</div>
                <div className="font-bold text-emerald-700 text-sm">{selectedFuel.generationSharePercent}%</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400">Avg CUF / PLF</div>
                <div className="font-bold text-amber-600 text-sm">{selectedFuel.cufPercent}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bar Chart & Multi-View Analytics */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Capacity vs Generation Share Disparity</h3>
              <p className="text-xs text-slate-500">Comparing % share in installed capacity vs actual electrical energy produced</p>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Gap Bar Chart
              </button>
              <button
                onClick={() => setActiveTab('trajectory')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'trajectory'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2019-2025 Trend
              </button>
              <button
                onClick={() => setActiveTab('regional')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'regional'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Regional RE
              </button>
            </div>
          </div>

          {/* Tab 1: Comparison Bar Chart */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="h-80 w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparativeChartData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="fuel" 
                        stroke="#64748b" 
                        fontSize={11} 
                        tickLine={false} 
                      />
                      <YAxis 
                        unit="%" 
                        stroke="#64748b" 
                        fontSize={11} 
                        tickLine={false} 
                      />
                      <Tooltip 
                        formatter={(val: any) => [`${val}%`, '']}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                      />
                      <Legend 
                        verticalAlign="top" 
                        height={36} 
                        iconType="circle"
                        formatter={(value) => <span className="text-xs text-slate-600 font-medium">{value}</span>}
                      />
                      <Bar 
                        name="Installed Capacity %" 
                        dataKey="capacityShare" 
                        fill="#0ea5e9" 
                        radius={[6, 6, 0, 0]} 
                        barSize={20}
                      />
                      <Bar 
                        name="Actual Generation %" 
                        dataKey="generationShare" 
                        fill="#10b981" 
                        radius={[6, 6, 0, 0]} 
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                    Rendering bar chart...
                  </div>
                )}
              </div>

              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-amber-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Why does this gap exist?</strong> Solar runs ~5 to 6 peak hours a day (CUF 20-22%), and Wind is seasonal (CUF 24-26%). In contrast, Coal plants operate around the clock with 68%+ Plant Load Factor (PLF). Hence, meeting India’s net-zero transition requires massive Energy Storage Systems (BESS).
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Historical Trajectory */}
          {activeTab === 'trajectory' && (
            <div className="space-y-4">
              <div className="h-80 w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalTrajectory}
                      margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                      <YAxis unit="%" stroke="#64748b" fontSize={11} domain={[0, 85]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line 
                        name="Coal Generation Share (%)" 
                        type="monotone" 
                        dataKey="coalGeneration" 
                        stroke="#e11d48" 
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                      />
                      <Line 
                        name="Renewable Generation Share (%)" 
                        type="monotone" 
                        dataKey="renewableGeneration" 
                        stroke="#10b981" 
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
              <p className="text-xs text-slate-500">
                Data reflects CEA Power Generation reports (2019 to 2025). While renewable capacity surged by 114% (84 GW to 180 GW), renewable generation share grew from 9.2% to 13.0%.
              </p>
            </div>
          )}

          {/* Tab 3: Regional RE Breakdown */}
          {activeTab === 'regional' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {regionalRenewables.map((reg, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-sm">{reg.region}</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                        {reg.shareOfNationalRE}% of India RE
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{reg.states}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                      <div>Solar: <strong className="text-amber-600">{reg.solarGW} GW</strong></div>
                      <div>Wind: <strong className="text-cyan-600">{reg.windGW} GW</strong></div>
                      <div>Hydro: <strong className="text-blue-600">{reg.hydroGW} GW</strong></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 pt-2">
                Southern and Western regions host ~69% of all renewable installations in India due to high solar insolation and peninsular coastal winds.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Decision Support Insights & Solutions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Strategic Insights for Grid Planners &amp; Policymakers
            </h3>
            <p className="text-xs text-slate-500">Actionable recommendations to bridge India's 2030 Clean Energy gap</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gapInsights.map((insight, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-300 transition-all space-y-3"
            >
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                {insight.badge}
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                {insight.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Link 
          href="/rpo" 
          className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-bold">RPO Compliance Tracker</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Verify statutory Renewable Purchase Obligation (2025–2030) targets, shortfall risks, and penalty liabilities.
            </p>
          </div>
          <div className="pt-4 flex items-center space-x-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
            <span>Launch RPO Simulator</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        <Link 
          href="/solar" 
          className="group p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-bold">PM Surya Ghar Solar Calculator</h4>
            <p className="text-xs text-amber-100 leading-relaxed">
              Calculate rooftop system kW sizing, MNRE central subsidies up to ₹78,000, 25-yr ROI, and CO₂ savings.
            </p>
          </div>
          <div className="pt-4 flex items-center space-x-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
            <span>Calculate Solar ROI</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        <Link 
          href="/jobs" 
          className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-md hover:shadow-xl transition-all flex flex-col justify-between border border-slate-700"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-lg font-bold">Green Jobs Board</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Discover clean energy careers in BESS, Solar, Wind, and Green Hydrogen with India's top renewable energy employers.
            </p>
          </div>
          <div className="pt-4 flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Explore Open Roles</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

    </div>
  );
}
