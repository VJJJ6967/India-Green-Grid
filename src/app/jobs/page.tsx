'use client';

import React, { useState, useMemo } from 'react';
import { 
  greenJobsData, 
  jobSectors, 
  GreenJob 
} from '@/data/jobs';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Building, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  Users, 
  Clock, 
  Send,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function GreenJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<GreenJob | null>(null);
  
  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return greenJobsData.filter((job) => {
      // Sector filter
      if (selectedSector !== 'All' && job.sector !== selectedSector) {
        return false;
      }
      
      // Experience filter
      if (selectedExperience !== 'All' && !job.experience.startsWith(selectedExperience)) {
        return false;
      }

      // Search Query filter (matches title, company, location, or skills)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesLocation = job.location.toLowerCase().includes(query);
        const matchesSkills = job.skills.some(skill => skill.toLowerCase().includes(query));
        return matchesTitle || matchesCompany || matchesLocation || matchesSkills;
      }

      return true;
    });
  }, [searchQuery, selectedSector, selectedExperience]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setAppliedSuccess(true);
    setTimeout(() => {
      // Reset after a delay
      setAppliedSuccess(false);
      setSelectedJobForModal(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-emerald-900/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>India Clean Tech Talent Corridor</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Green Energy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300">
              Careers &amp; Jobs Board
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            As India heads toward <strong>500 GW of clean energy by 2030</strong>, over <strong>500,000+ new high-skilled green jobs</strong> are being created across Solar PV, Wind Energy, Battery Storage (BESS), and Green Hydrogen.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{greenJobsData.length} Active Positions Verified</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Average Salary: ₹6 LPA – ₹35 LPA</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by role title, company (e.g. Tata, ReNew), skills (e.g. PVsyst, BESS), or city (e.g. Bengaluru, Gujarat)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sector Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sector:
          </span>
          {jobSectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedSector === sector
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Experience Level Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="font-semibold text-slate-500 mr-2">Experience:</span>
          {['All', 'Entry', 'Mid', 'Senior'].map((exp) => (
            <button
              key={exp}
              onClick={() => setSelectedExperience(exp)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedExperience === exp
                  ? 'bg-slate-800 text-white font-medium'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {exp === 'All' ? 'All Experience Levels' : `${exp} Level`}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500">
            Showing <strong>{filteredJobs.length}</strong> jobs
          </span>
        </div>
      </div>

      {/* Jobs Listing Grid */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">No green jobs found matching your criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search terms or resetting the sector filter to explore all available clean-energy opportunities.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSector('All');
                setSelectedExperience('All');
              }}
              className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 relative group"
              >
                {job.featured && (
                  <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200">
                    High Demand
                  </span>
                )}

                <div className="space-y-3">
                  {/* Top info */}
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-medium text-emerald-700 mb-1">
                      <span className="px-2 py-0.5 bg-emerald-50 rounded-md font-semibold border border-emerald-100">
                        {job.sector}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">{job.postedDate}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm text-slate-700 mt-1">
                      <Building className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold">{job.company}</span>
                    </div>
                  </div>

                  {/* Meta Pills */}
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md font-medium text-emerald-800">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{job.salaryRange}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.experience}</span>
                    </span>
                    <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-500">
                      {job.workMode}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-50 border border-slate-200 text-slate-600 text-[11px] px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Apply Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {job.openings} open {job.openings === 1 ? 'position' : 'positions'}
                  </span>

                  <button
                    onClick={() => setSelectedJobForModal(job)}
                    className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm transition-all hover:translate-y-[-1px]"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Application Modal */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedJobForModal(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {appliedSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your profile has been forwarded to <strong>{selectedJobForModal.company}</strong> for the role of <em>{selectedJobForModal.title}</em>.
                </p>
                <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 py-2 rounded-xl">
                  Confirmation sent to {applicantEmail}
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Direct Application Portal
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedJobForModal.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                    <span>{selectedJobForModal.company}</span>
                    <span>•</span>
                    <span>{selectedJobForModal.location}</span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-700">{selectedJobForModal.salaryRange}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Attach Resume / CV (PDF or Word)
                    </label>
                    <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center text-xs text-slate-500 hover:border-emerald-400 cursor-pointer">
                      <span>Click to upload or drag &amp; drop (Max 5MB)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/30 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Talent Ecosystem Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-bold text-slate-900 text-lg">
            Hiring for Renewable Energy &amp; Climate Tech?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Partner with India Green Grid to connect with certified solar PV technicians, wind turbine engineers, BESS system specialists, and ESG consultants across India.
          </p>
        </div>
        <div className="shrink-0">
          <button 
            onClick={() => alert("Thank you for your interest! In the production version, employers can post clean energy job openings via the India Green Grid partner portal.")}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            Post a Green Job Opening
          </button>
        </div>
      </div>

    </div>
  );
}
