import React from 'react';
import { PageId } from '../types';
import {
  Heart,
  Droplet,
  ShieldCheck,
  Users,
  Target,
  Sparkles,
  Award,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>Our Vision & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          About Thalcare BD
        </h1>
        <p className="text-base text-rose-600 font-bold">
          “Connecting Care, Blood & Hope.”
        </p>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          A dedicated digital healthcare support platform designed specifically for thalassemia patients, their guardians, and voluntary blood donors across Bangladesh.
        </p>
      </div>

      {/* 2. Core Mission & Features Grid */}
      <div className="bg-[#fff8f8] rounded-3xl p-8 sm:p-12 border-2 border-red-200 shadow-xl space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-2xl font-black text-slate-900 font-display">
            Why Thalcare BD Exists
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            In Bangladesh, over <strong>60,000 children and adults</strong> live with Thalassemia Major, requiring lifetime regular blood transfusions every 2 to 4 weeks. Families often struggle with schedule tracking, remembering due dates, and urgently finding compatible voluntary blood donors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-white border border-red-200 space-y-2.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Manage Transfusion Schedules</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Automated interval calculations and reminders eliminate the risk of missing critical transfusion dates, preventing severe anemia.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-red-200 space-y-2.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Connect with Voluntary Donors</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Search vetted voluntary donors filtered by blood group, district, and upazila across all 64 districts in Bangladesh.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-red-200 space-y-2.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Submit Emergency Blood Requests</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Post urgent blood requirements directly with hospital and unit details for swift volunteer assistance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-red-200 space-y-2.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-base text-slate-900">Maintain Medical Logs</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Keep records of previous transfusions, hospital visits, and pre-transfusion hemoglobin levels easily accessible.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-red-200 space-y-2.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              5
            </div>
            <h3 className="font-bold text-base text-slate-900">Spread Thalassemia Awareness</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Promote pre-marital carrier testing, safe blood transfusion protocols, and iron chelation management.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-red-200 space-y-2.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-red-950 text-white flex items-center justify-center font-bold">
              6
            </div>
            <h3 className="font-bold text-base text-slate-900">100% Free & Community Driven</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Built purely as a humanitarian public support system with zero commercial intent and strong privacy protection.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Power of Voluntary Blood Donation in Bangladesh */}
      <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 space-y-6 border border-red-900/30">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-red-400">
            Social Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            The Vital Role of Voluntary Blood Donors in Bangladesh
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every year, Bangladesh requires nearly <strong>1 million units of blood</strong>. For thalassemia warriors, blood is not just emergency medical care—it is their continuous lifeline for survival. When you donate a single bag of blood, you give a thalassemia child 3 to 4 more weeks of laughter, school days, and dreams.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('donor-register')}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all flex items-center gap-2"
          >
            <span>Register as Voluntary Donor</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('donor-search')}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
          >
            Browse Blood Donor Directory
          </button>
        </div>
      </div>
    </div>
  );
};
