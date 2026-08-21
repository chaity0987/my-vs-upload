import React from 'react';
import { PageId } from '../types';
import { Phone, Mail, MapPin, Heart, ShieldAlert, RefreshCw } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onResetData }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-600/30">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  <path d="M12 11.5c-1.38-1.5-3.5-1.5-4.5 0s0 3 4.5 5.5c4.5-2.5 5.5-4 4.5-5.5s-3.12-1.5-4.5 0z" fill="#ffe4e6" />
                </svg>
              </div>
              <span className="text-xl font-black text-white tracking-tight font-display">
                Thalcare <span className="text-red-500">BD</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-red-400">
              “Connecting Care, Blood & Hope.”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A dedicated digital healthcare support platform for thalassemia patients, their families, and voluntary blood donors across Bangladesh. Helping manage transfusion schedules and locate compatible donors timely.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-slate-800 rounded-md border border-slate-700 text-slate-300">
                🇧🇩 Bangladesh Focused
              </span>
              <span className="px-2.5 py-1 bg-slate-800 rounded-md border border-slate-700 text-slate-300">
                100% Free & Voluntary
              </span>
              <span className="px-2.5 py-1 bg-slate-800 rounded-md border border-slate-700 text-slate-300">
                Privacy Protected
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('donor-search')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Find Blood Donor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reminder')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Transfusion Reminder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blood-request')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Emergency Blood Request
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('awareness')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Thalassemia Awareness
                </button>
              </li>
            </ul>
          </div>

          {/* Registrations & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('patient-register')}
                  className="hover:text-rose-400 transition-colors text-left text-slate-300"
                >
                  Register Patient Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('donor-register')}
                  className="hover:text-rose-400 transition-colors text-left text-slate-300"
                >
                  Join as Blood Donor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-rose-400 transition-colors text-left text-slate-300"
                >
                  About Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-rose-400 transition-colors text-left text-slate-300"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines in Bangladesh */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-rose-400">
              <ShieldAlert className="w-4 h-4" /> Emergency Helplines
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400 text-[11px]">National Health Call Center</div>
                <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                  <a href="tel:16263" className="hover:underline">16263</a> (24 Hours)
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400 text-[11px]">National Emergency Services</div>
                <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                  <a href="tel:999" className="hover:underline">999</a> (Ambulance/Police)
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-slate-400 text-xs">
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>support@thalcarebd.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Safety Disclaimer (Mandatory) */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 mb-8 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Medical Safety & Platform Disclaimer: </span>
            Thalcare BD is a voluntary blood connection, scheduling reminder, and awareness support platform. The information provided does not replace professional medical advice, clinical diagnosis, hospital blood cross-matching, or personalized treatment by registered healthcare professionals. Always consult your attending hematologist for medical protocols.
          </div>
        </div>

        {/* Bottom Bar with Academic Demo reset option */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Thalcare BD. Built for Bangladesh Thalassemia Community.
          </div>

          <div className="flex items-center gap-4">
            <button
              id="footer-reset-demo-btn"
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              title="Reset sample test data for university demonstration"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:underline">
              Academic Project
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
