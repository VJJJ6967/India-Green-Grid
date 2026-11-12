export interface GreenJob {
  id: string;
  title: string;
  company: string;
  sector: 'Solar PV' | 'Wind Energy' | 'BESS & Storage' | 'Green Hydrogen' | 'Grid & EV' | 'ESG & Carbon';
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  experience: 'Entry (0-2 yrs)' | 'Mid (3-5 yrs)' | 'Senior (6+ yrs)';
  salaryRange: string;
  postedDate: string;
  featured?: boolean;
  skills: string[];
  description: string;
  openings: number;
}

export const greenJobsData: GreenJob[] = [
  {
    id: 'job-1',
    title: 'Senior Solar PV Design & Yield Engineer',
    company: 'Tata Power Renewable Energy',
    sector: 'Solar PV',
    location: 'Bengaluru, Karnataka',
    workMode: 'Hybrid',
    experience: 'Mid (3-5 yrs)',
    salaryRange: '₹12 - ₹18 LPA',
    postedDate: '2 days ago',
    featured: true,
    skills: ['PVsyst', 'AutoCAD Solar', 'Single Line Diagrams (SLD)', 'Grid Interconnection', 'CUF Simulation'],
    description: 'Lead engineering design, string inverter sizing, 3D shadow analysis, and energy generation modeling for 100MW+ utility-scale and C&I rooftop solar installations across southern India.',
    openings: 3
  },
  {
    id: 'job-2',
    title: 'Wind Turbine O&M Field Specialist',
    company: 'Suzlon Energy Ltd',
    sector: 'Wind Energy',
    location: 'Kutch / Rajkot, Gujarat',
    workMode: 'On-site',
    experience: 'Entry (0-2 yrs)',
    salaryRange: '₹5 - ₹8 LPA',
    postedDate: 'Just now',
    featured: true,
    skills: ['SCADA Wind', 'Turbine Pitch Diagnostics', 'Hydraulic Systems', 'Electrical Maintenance', 'GWO Certified'],
    description: 'Inspect, troubleshoot, and optimize 2.1MW to 3.1MW high-yield wind turbines across wind parks in Gujarat. Ensure 98%+ plant availability during the peak southwest monsoon season.',
    openings: 5
  },
  {
    id: 'job-3',
    title: 'Battery Energy Storage (BESS) Systems Lead',
    company: 'ReNew Power',
    sector: 'BESS & Storage',
    location: 'Gurugram / Delhi NCR',
    workMode: 'Hybrid',
    experience: 'Senior (6+ yrs)',
    salaryRange: '₹24 - ₹35 LPA',
    postedDate: '1 day ago',
    featured: true,
    skills: ['BMS Architecture', 'LFP Cell Chemistry', 'Peak Shaving Algorithms', 'CEA Grid Compliance', 'Inverter BMS Integration'],
    description: 'Design utility-scale standalone and co-located Battery Energy Storage Systems (BESS) up to 250 MWh to address peak power supply agreements (RTC tenders) for SECI and state DISCOMs.',
    openings: 2
  },
  {
    id: 'job-4',
    title: 'Electrolyzer & Green Hydrogen Process Specialist',
    company: 'L&T Clean Energy',
    sector: 'Green Hydrogen',
    location: 'Hazira / Mumbai, Maharashtra',
    workMode: 'On-site',
    experience: 'Mid (3-5 yrs)',
    salaryRange: '₹14 - ₹22 LPA',
    postedDate: '3 days ago',
    featured: false,
    skills: ['PEM Electrolyzers', 'Alkaline Stacks', 'Hydrogen Compression', 'Aspen Plus', 'Process Safety Hazard (HAZOP)'],
    description: 'Work on cutting-edge gigawatt-scale Green Hydrogen & Green Ammonia plants under the National Green Hydrogen Mission. Manage electrolyzer stack testing and balance of plant integration.',
    openings: 4
  },
  {
    id: 'job-5',
    title: 'Rooftop Solar Installation & Net-Metering Technician',
    company: 'SolarSquare Energy',
    sector: 'Solar PV',
    location: 'Pune / Mumbai, Maharashtra',
    workMode: 'On-site',
    experience: 'Entry (0-2 yrs)',
    salaryRange: '₹3.6 - ₹5.5 LPA',
    postedDate: 'Today',
    featured: false,
    skills: ['PM Surya Ghar Guidelines', 'Net Meter Commissioning', 'Earthing & Lightning Arrestors', 'Rooftop Safety Standards'],
    description: 'Execute PM Surya Ghar residential solar installations (3 kW - 10 kW), coordinate DISCOM inspection, meter testing, and sync customer monitoring dashboards.',
    openings: 8
  },
  {
    id: 'job-6',
    title: 'EV Fast-Charging Infrastructure Grid Planner',
    company: 'Ather Grid / Tata Passenger Electric Mobility',
    sector: 'Grid & EV',
    location: 'Chennai, Tamil Nadu',
    workMode: 'Hybrid',
    experience: 'Mid (3-5 yrs)',
    salaryRange: '₹10 - ₹16 LPA',
    postedDate: '4 days ago',
    featured: false,
    skills: ['Open Charge Point Protocol (OCPP)', '11kV Substation Sizing', 'Peak Load Shifting', 'GIS Mapping', 'Smart EV Charging'],
    description: 'Design EV charging hub grid tie-ins, demand-side management systems, and solar-integrated DC fast chargers along major national highway freight corridors.',
    openings: 3
  },
  {
    id: 'job-7',
    title: 'Corporate Carbon Accounting & ESG Consultant',
    company: 'EY Climate Change & Sustainability Services',
    sector: 'ESG & Carbon',
    location: 'Hyderabad, Telangana',
    workMode: 'Hybrid',
    experience: 'Senior (6+ yrs)',
    salaryRange: '₹18 - ₹28 LPA',
    postedDate: '2 days ago',
    featured: false,
    skills: ['GHG Protocol Scope 1-2-3', 'BRSR Reporting', 'CERC Carbon Credit Trading Scheme (CCTS)', 'Science Based Targets (SBTi)'],
    description: 'Advise top 1000 NSE-listed companies on SEBI BRSR Core disclosures, carbon footprint reduction pathways, voluntary carbon offsets, and domestic CCTS compliance mechanisms.',
    openings: 2
  },
  {
    id: 'job-8',
    title: 'Power System Modeler (RE Grid Integration)',
    company: 'GRID-INDIA (POSOCO)',
    sector: 'Grid & EV',
    location: 'New Delhi / Remote',
    workMode: 'Hybrid',
    experience: 'Mid (3-5 yrs)',
    salaryRange: '₹15 - ₹22 LPA',
    postedDate: '5 days ago',
    featured: true,
    skills: ['PSS/E', 'DIgSILENT PowerFactory', 'Grid Code Dynamic Stability', 'Ancillary Services', 'Inertia Emulation'],
    description: 'Analyze interstate transmission system (ISTS) renewable intermittency, frequency response curves, and grid inertia challenges to support India\'s 500 GW clean energy mandate.',
    openings: 2
  }
];

export const jobSectors = [
  'All',
  'Solar PV',
  'Wind Energy',
  'BESS & Storage',
  'Green Hydrogen',
  'Grid & EV',
  'ESG & Carbon'
] as const;
