# India Green Grid 🇮🇳 🌱
**A Web-Based Decision-Support Platform for Accelerating India's Renewable Energy Transition**

> **CodeSpark 2026** National Hackathon  
> **Domain 4 – PS1**: Clean Energy & Sustainability Decision Support

---

## ⚡ Problem Overview & The "Clean Generation Paradox"

India has achieved extraordinary progress in renewable energy, crossing **198+ GW of installed non-fossil capacity (~44% of total grid capacity)** on its way toward the national **500 GW by 2030 target**.

However, grid operators and policymakers face a critical paradox:
- **Capacity ≠ Energy Generated**: While renewable capacity is ~44%, actual renewable electricity delivered is only **~13%** (Solar + Wind).
- **Baseload Reliance**: Coal accounts for 48.4% of capacity but generates **~74% of all electricity units** because thermal plants run at a ~68% Plant Load Factor (PLF), whereas solar runs at ~20-22% Capacity Utilization Factor (CUF) and wind at ~24-26%.
- **The Evening Peak & Duck Curve**: Peak solar occurs at 12:00 PM, but India's peak electrical demand surges between 7:00 PM and 10:30 PM (when solar output is 0 GW).

**India Green Grid** is an end-to-end decision-support platform designed to give policymakers, utilities (DISCOMs), corporate consumers, and citizens the analytics, simulation tools, and workforce pipeline needed to accelerate the transition.

---

## 🚀 Core Features (MVP)

### 1. 📊 Energy Mix Dashboard (`/`)
- **Capacity Breakdown**: Realistic approximate data (Coal 218 GW, Solar 85.5 GW, Wind 47.2 GW, Hydro 46.9 GW, Nuclear 8.2 GW, Other RE 44.5 GW) totaling **450+ GW**.
- **The Gap Visualizer**: Interactive side-by-side comparison illustrating why 48% coal capacity generates ~74% of energy while 29% solar+wind generates only 13%.
- **Interactive Recharts Charts**:
  - Donut chart with clickable slices for fuel deep-dives.
  - Double bar chart comparing Installed Capacity % vs Actual Generation %.
  - 2019–2025 multi-year growth trajectory.
  - Regional clean energy distribution (Southern & Western regions leading with ~69% of clean capacity).
- **Grid Storage Callouts**: Highlighting the CEA 2032 mandate for 47 GW / 236 GWh of BESS (Battery Storage) and Pumped Storage Hydro.

### 2. 🎯 RPO Compliance Tracker (`/rpo`)
- **Statutory 2025–2030 Trajectory**: Implements the Ministry of Power statutory trajectory (29.91% in 2024-25 escalating to 43.33% by 2029-30).
- **Sub-Obligation Breakdown**: Wind RPO, Hydro Power Obligation (HPO), and Other RPO (Solar/Bio/Distributed) + Energy Storage Obligation (ESO).
- **Interactive Simulator**:
  - Procurement slider (5% to 50%) with presets for typical DISCOMs, leading states (Gujarat GUVNL), and corporate RE100 buyers.
  - Real-time statutory shortfall/surplus (%) calculation.
  - Volume deficit in Million Units (MU) & MWh.
  - Financial liability calculator for Renewable Energy Certificate (REC) procurement at statutory CERC floor price (₹1,000/REC).
- **Line Chart with Reference Line**: Visualizes the national compliance curve with a dynamic reference line marking the user's current achievement.
- **DISCOM Benchmarks Table**: Official performance evaluation across major Indian power utilities (GUVNL, BESCOM, TANGEDCO, MSEDCL, UPPCL, TPDDL).

### 3. ☀️ Rooftop Solar ROI & Subsidy Calculator (`/solar`)
- **PM Surya Ghar: Muft Bijli Yojana Engine**:
  - Automatic subsidy calculation: Up to 2 kW = ₹30,000/kW (₹60,000 for 2 kW), 3 kW & above = ₹78,000 flat maximum central DBT subsidy.
  - State-specific additional subsidies (e.g., Delhi, Gujarat, UP).
- **Interactive Sizing Parameters**:
  - Monthly electricity bill (₹1,000 to ₹20,000+).
  - Shadow-free roof area in sq. ft (1 kW ~ 100 sq. ft constraint).
  - State selector with localized solar insolation (peak sun hours) and DISCOM tariff rates.
- **Detailed Financial & Environmental Outputs**:
  - Recommended system size (kW) and monthly generation (units).
  - Gross cost vs Central Subsidy vs Net out-of-pocket investment.
  - Simple payback period (typically 3.2 to 4.2 years).
  - 25-Year wealth creation chart (Recharts AreaChart comparing net solar savings vs grid bills).
  - Carbon footprint reduction: Tonnes of CO₂ avoided annually (CEA 0.82 kg CO₂/kWh factor) and equivalent trees planted.
- **National Portal 4-Step Application Checklist**.

### 4. 💼 Green Jobs Board (`/jobs`)
- **Clean Energy Talent Corridor**:
  - Dedicated job portal bridging the projected 500,000+ clean energy workforce demand by 2030.
- **Filters & Search**:
  - Search by role title, company (Tata Power, Suzlon, ReNew, L&T, Ather, SolarSquare), skills (PVsyst, BESS, SCADA, OCPP, BRSR), or location.
  - Filter by Sector (Solar PV, Wind, BESS & Storage, Green Hydrogen, Grid & EV, ESG & Carbon).
  - Filter by Experience Level (Entry, Mid, Senior).
- **Interactive Job Cards**:
  - Badges for hot/featured positions, work mode (Hybrid, Onsite, Remote), salary in ₹ LPA, and openings.
  - Interactive "Apply Now" modal with application form, instant validation, and confirmation state.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom emerald/green brand design system
- **Data Visualization**: [Recharts](https://recharts.org/) (PieChart, BarChart, LineChart, AreaChart, ReferenceLine)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Management**: Modular TypeScript data models (`src/data/`) with zero external DB latency

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css               # Tailwind directives & smooth styling
│   ├── layout.tsx                # Root layout, navigation & footer
│   ├── page.tsx                  # Energy Mix Dashboard & Gap Analytics
│   ├── rpo/
│   │   └── page.tsx              # RPO Compliance Tracker & REC Simulator
│   ├── solar/
│   │   └── page.tsx              # Rooftop Solar ROI & PM Surya Ghar Calculator
│   └── jobs/
│       └── page.tsx              # Green Jobs & Clean Tech Talent Board
├── components/
│   └── Navbar.tsx                # Responsive navigation & live grid telemetry
└── data/
    ├── energy.ts                 # CEA capacity, generation & CUF metrics
    ├── rpo.ts                    # MoP 2025-2030 RPO trajectory & DISCOM data
    ├── solar.ts                  # State solar tariffs, radiation & subsidy rules
    └── jobs.ts                   # Verified green energy career postings
```

---

## 🏁 Getting Started (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Open the application
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Regulatory & Data Citations
- **Central Electricity Authority (CEA)**: Monthly Generation Reports & National Electricity Plan (NEP 2022-2032).
- **Ministry of Power (MoP)**: Order No. 23/03/2023-R&R (RPO & Energy Storage Obligation Trajectory).
- **Ministry of New and Renewable Energy (MNRE)**: PM Surya Ghar Muft Bijli Yojana Guidelines.
- **GRID-INDIA (POSOCO)**: National Power Grid Frequency and Dispatch Reports.
- **Central Electricity Regulatory Commission (CERC)**: REC Floor Price & Trading Mechanism.
