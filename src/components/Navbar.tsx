'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, 
  Sun, 
  BarChart3, 
  Calculator, 
  Briefcase, 
  Menu, 
  X, 
  Activity,
  Layers
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: 'Energy Mix',
      href: '/',
      icon: BarChart3,
      description: 'National Capacity vs Generation'
    },
    {
      name: 'RPO Tracker',
      href: '/rpo',
      icon: Layers,
      description: '2025-2030 Mandate & Compliance'
    },
    {
      name: 'Solar ROI & Subsidy',
      href: '/solar',
      icon: Calculator,
      description: 'PM Surya Ghar Savings Calculator'
    },
    {
      name: 'Green Jobs',
      href: '/jobs',
      icon: Briefcase,
      description: 'Clean Tech Careers in India'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sun className="w-5 h-5 text-amber-200 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  India <span className="text-emerald-600">Green Grid</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Decision Support
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Domain 4 • Renewable Energy Transition Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/60'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Real-time National Grid Badge */}
          <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-slate-200">
            <div className="flex items-center space-x-2 bg-emerald-50/80 border border-emerald-200/60 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="text-xs">
                <span className="text-slate-500 font-medium">Grid Freq:</span>{' '}
                <span className="font-semibold text-emerald-700">50.02 Hz</span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Target: <strong>500 GW by 2030</strong></span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  active
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <div className="text-sm font-medium">{link.name}</div>
                  <div className="text-xs text-slate-400">{link.description}</div>
                </div>
              </Link>
            );
          })}
          
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
            <div className="flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Grid Synced: 50.02 Hz</span>
            </div>
            <span className="text-emerald-700 font-medium">CodeSpark 2026</span>
          </div>
        </div>
      )}
    </nav>
  );
}
