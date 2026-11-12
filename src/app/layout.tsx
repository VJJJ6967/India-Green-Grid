import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Leaf, Award, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'India Green Grid | Renewable Energy Decision-Support Platform',
  description: 'Decision-support platform accelerating India’s clean energy transition. Energy Mix analytics, RPO Compliance tracker, PM Surya Ghar Solar ROI calculator, and Green Jobs portal for CodeSpark 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
        <Navbar />
        
        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Col 1: About */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-white font-bold text-lg tracking-tight">
                    India <span className="text-emerald-400">Green Grid</span>
                  </span>
                </div>
                <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                  A high-impact decision-support web platform engineered for <strong>CodeSpark 2026</strong>. 
                  Addressing <strong>Domain 4 – PS1</strong> to bridge India’s capacity-vs-generation gap, track statutory RPO mandates, enable rooftop solar adoption, and connect clean-tech talent.
                </p>
                <div className="flex items-center space-x-2 text-xs text-emerald-400 pt-2">
                  <Award className="w-4 h-4" />
                  <span>CodeSpark 2026 National Hackathon Project</span>
                </div>
              </div>

              {/* Col 2: Navigation Links */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Core Modules
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="hover:text-emerald-400 transition-colors">
                      Energy Mix Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/rpo" className="hover:text-emerald-400 transition-colors">
                      RPO Compliance Tracker
                    </Link>
                  </li>
                  <li>
                    <Link href="/solar" className="hover:text-emerald-400 transition-colors">
                      PM Surya Ghar Solar ROI
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobs" className="hover:text-emerald-400 transition-colors">
                      Green Jobs & Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Data Sources & Regulatory References */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Authoritative Data Sources
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Central Electricity Authority (CEA)</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Ministry of Power RPO Trajectory</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>MNRE PM Surya Ghar Portal</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>GRID-INDIA (POSOCO) Dispatch Reports</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
              <p>© 2026 India Green Grid Team. Built for CodeSpark 2026 Hackathon.</p>
              <p className="mt-2 sm:mt-0 flex items-center space-x-1">
                <span>Domain 4 (Clean Energy & Sustainability) • PS1</span>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
