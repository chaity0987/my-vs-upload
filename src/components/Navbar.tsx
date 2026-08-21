import React, { useState } from 'react';
import { PageId, Patient } from '../types';
import { BloodGroupBadge } from './BloodGroupBadge';
import { Menu, X, HeartHandshake, Droplet, Clock, Search, HelpCircle, PhoneCall, Info, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  patient: Patient | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, patient }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Droplet className="w-4 h-4" /> },
    { id: 'donor-search', label: 'Find Donor', icon: <Search className="w-4 h-4" /> },
    { id: 'reminder', label: 'Blood Reminder', icon: <Clock className="w-4 h-4" /> },
    { id: 'blood-request', label: 'Blood Request', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'awareness', label: 'Awareness', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f8]/95 backdrop-blur-md border-b border-red-200/80 shadow-xs">
      {/* Top emergency micro-bar for quick helpline accessibility */}
      <div className="bg-red-950 text-red-100 text-xs py-1.5 px-4 hidden sm:block border-b border-red-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold">National Thalassemia & Blood Support Platform — Bangladesh</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span>24/7 Health Helpline: <a href="tel:16263" className="text-white hover:underline font-bold">16263</a></span>
            <span className="text-red-400">•</span>
            <span>National Emergency: <a href="tel:999" className="text-white hover:underline font-bold">999</a></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand Identity */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-transform focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              {/* Custom combined icon: Blood drop + Heart care */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                <path d="M12 11.5c-1.38-1.5-3.5-1.5-4.5 0s0 3 4.5 5.5c4.5-2.5 5.5-4 4.5-5.5s-3.12-1.5-4.5 0z" fill="#ffe4e6" opacity="0.95" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 font-display">
                  Thalcare <span className="text-red-600">BD</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-900 border border-red-200">
                  Lifeline
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Connecting Care, Blood & Hope
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-red-700 bg-red-100/70 font-bold border border-red-200/60'
                      : 'text-slate-700 hover:text-red-600 hover:bg-red-50/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Active Patient Dashboard Link (if registered) */}
          {patient && (
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                id="nav-patient-dashboard-btn"
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-bold transition-all border ${
                  currentPage === 'dashboard'
                    ? 'bg-red-700 text-white border-red-700 shadow-sm'
                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
                <BloodGroupBadge group={patient.bloodGroup} size="sm" variant="solid" />
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {patient && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="p-1.5 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold border border-rose-200"
              >
                {patient.bloodGroup}
              </button>
            )}
            <button
              id="nav-mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-red-200 bg-[#fff8f8] px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'text-red-700 bg-red-100/70 font-semibold'
                      : 'text-slate-700 hover:bg-red-50/50'
                  }`}
                >
                  <span className={isActive ? 'text-red-600' : 'text-slate-400'}>{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {patient && (
            <div className="pt-3 border-t border-red-100">
              <button
                id="mobile-nav-patient-dashboard"
                onClick={() => handleNavClick('dashboard')}
                className="w-full flex items-center justify-between px-4 py-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-red-600" />
                  <span>Patient Dashboard ({patient.fullName.split(' ')[0]})</span>
                </div>
                <BloodGroupBadge group={patient.bloodGroup} size="sm" variant="solid" />
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
