import React from 'react';
import { PageId, BloodGroup, Donor, Patient, BloodRequest } from '../types';
import { BloodGroupBadge } from '../components/BloodGroupBadge';
import {
  Heart,
  Search,
  UserPlus,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Calendar,
  Users,
  Activity,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Droplet,
  CheckCircle2,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId, extraParam?: any) => void;
  donors: Donor[];
  patient: Patient | null;
  bloodRequests: BloodRequest[];
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  donors,
  patient,
  bloodRequests,
}) => {
  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const userPhotoUrl =
    'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/634/067/datas/original.png';

  // Calculate dynamic stats from local storage
  const registeredDonorsCount = donors.length;
  const availableDonorsCount = donors.filter((d) => d.availabilityStatus === 'Available').length;
  const registeredPatientsCount = patient ? 1 : 0;
  const bloodRequestsCount = bloodRequests.length;

  const handleBloodGroupClick = (bg: BloodGroup) => {
    onNavigate('donor-search', { bloodGroup: bg });
  };

  return (
    <div className="space-y-14 sm:space-y-18 pb-16">
      {/* 1. HERO SECTION WITH REQUESTED PICTURE AT THE FIRST */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 lg:pb-16 bg-gradient-to-b from-red-100/70 via-[#fdf4f4] to-[#fcf2f2] border-b border-red-200/80 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-950 text-xs font-black border border-red-300/80 shadow-xs">
                <Droplet className="w-4 h-4 text-red-600 fill-red-600 animate-bounce" />
                <span>Bangladesh National Thalassemia Lifeline</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display leading-[1.15]">
                “Every Drop Can Give Someone{' '}
                <span className="text-red-600 relative inline-block">
                  Another Tomorrow.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full text-red-300"
                    height="6"
                    viewBox="0 0 100 6"
                    preserveAspectRatio="none"
                    fill="currentColor"
                  >
                    <path d="M0 2.5 Q 50 6, 100 2.5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>”
              </h1>

              <p className="text-xs sm:text-sm italic text-slate-600 text-center mx-auto max-w-2xl leading-relaxed">
                Thalcare BD bridges <strong className="text-red-700 font-bold not-italic">60,000+ Thalassemia warriors</strong> with altruistic voluntary blood donors across 64 districts in Bangladesh, ensuring regular blood transfusions and real-time emergency care.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3.5 justify-center lg:justify-start">
                <button
                  id="hero-register-patient-btn"
                  onClick={() => onNavigate(patient ? 'dashboard' : 'patient-register')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-sm shadow-lg shadow-slate-900/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-red-400" />
                  <span>{patient ? 'View Patient Dashboard' : 'Register as Patient'}</span>
                </button>

                <button
                  id="hero-register-donor-btn"
                  onClick={() => onNavigate('donor-register')}
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Register as Donor</span>
                </button>

                <button
                  id="hero-find-donor-btn"
                  onClick={() => onNavigate('donor-search')}
                  className="px-5 py-3.5 rounded-xl bg-[#fff8f8] hover:bg-red-50 text-slate-900 font-black text-sm border-2 border-red-300 shadow-sm transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-red-600" />
                  <span>Find Blood Donor</span>
                </button>

                <button
                  id="hero-emergency-request-btn"
                  onClick={() => onNavigate('blood-request')}
                  className="px-5 py-3.5 rounded-xl bg-red-100/90 hover:bg-red-200 text-red-950 font-black text-sm border border-red-300 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Emergency Request</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-700 font-bold">
                <div className="flex items-center gap-1.5 bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verified 64 Districts Registry</span>
                </div>
                <div className="flex items-center gap-1.5 bg-red-100/90 px-3 py-1.5 rounded-lg border border-red-300 text-red-900">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>Automatic Interval Tracking</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-100/80 px-3 py-1.5 rounded-lg border border-amber-300 text-amber-950">
                  <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                  <span>100% Free Public Mission</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card with the requested Picture at the first */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-[#fff8f8] rounded-3xl p-4 sm:p-5 border-2 border-red-200 shadow-2xl shadow-red-950/15 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/60 rounded-bl-full opacity-60 pointer-events-none" />

                {/* Primary Requested Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-slate-900 border border-red-200 shadow-md mb-4 flex items-center justify-center">
                  <img
                    src={userPhotoUrl}
                    alt="Thalcare BD Blood Donation & Thalassemia Lifeline"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent flex items-end p-3.5">
                    <div className="text-white">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-red-600 text-[10px] font-black uppercase tracking-wider mb-1">
                        Thalassemia Lifeline Bangladesh
                      </span>
                      <p className="text-xs font-bold text-red-100">
                        Regular safe blood transfusion saves precious lives.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Micro Stats & Transfusion Interval */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-red-100/70 border border-red-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                        Transfusion Interval
                      </span>
                      <span className="font-black text-red-800 bg-[#fff8f8] px-2.5 py-0.5 rounded-md border border-red-300">
                        Every 14 – 28 Days
                      </span>
                    </div>
                    <div className="w-full bg-red-200 h-2 rounded-full mt-2 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-red-600 to-rose-600 h-full w-3/4 rounded-full animate-pulse" />
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium mt-1.5">
                      Timely blood prevents severe anemia, cardiac enlargement & organ failure.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-red-50/80 border border-red-200 text-center">
                      <span className="block text-2xl font-black text-red-600 font-display">60,000+</span>
                      <span className="text-[11px] text-slate-700 font-bold">Warriors in BD</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center">
                      <span className="block text-2xl font-black text-emerald-700 font-display">1 Unit</span>
                      <span className="text-[11px] text-slate-700 font-bold">Saves 3 Lives</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('awareness')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-red-950 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Read Thalassemia & Transfusion Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED DUAL REGISTRATION PORTALS: REGISTER AS PATIENT & REGISTER AS DONOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-red-600">
            Join The Thalcare Community
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
            Get Started on Thalcare BD
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Select your role to access customized transfusion tracking or voluntary blood donation tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Register as Patient */}
          <div
            id="home-register-patient-card"
            className="rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#fff8f8] via-white to-red-50/50 border-2 border-red-200 shadow-md hover:shadow-xl hover:border-red-400 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/25 group-hover:scale-105 transition-transform">
                  <UserPlus className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-extrabold border border-red-200">
                  For Patients & Families
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 font-display group-hover:text-red-700 transition-colors">
                  Register as Patient
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  Set up your medical transfusion profile to manage regular transfusion cycles, track pre-Hb levels, and connect with donors.
                </p>
              </div>

              <ul className="space-y-2 pt-2 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Automated 14–28 day interval countdown reminders</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Direct matching with donors in your Upazila / District</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Transfusion history log with pre-transfusion Hb tracking</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <button
                id="home-btn-register-patient"
                onClick={() => onNavigate(patient ? 'dashboard' : 'patient-register')}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-sm shadow-md shadow-slate-900/20 transition-all flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>{patient ? 'Open My Patient Dashboard' : 'Register as Patient'}</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>

          {/* Card 2: Register as Donor */}
          <div
            id="home-register-donor-card"
            className="rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#fff8f8] via-white to-red-100/40 border-2 border-red-300 shadow-md hover:shadow-xl hover:border-red-500 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                  <Heart className="w-7 h-7 fill-white" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold border border-emerald-200">
                  For Voluntary Donors
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 font-display group-hover:text-red-700 transition-colors">
                  Register as Donor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  Join Bangladesh's voluntary blood donor registry to directly support Thalassemia children in critical need of fresh blood.
                </p>
              </div>

              <ul className="space-y-2 pt-2 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Appear in verified voluntary donor directory across 64 districts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Receive emergency blood alerts when a child needs your group</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% voluntary, confidential & humanitarian mission</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <button
                id="home-btn-register-donor"
                onClick={() => onNavigate('donor-register')}
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>Register as Voluntary Donor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Quick Actions
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Fast access to all vital blood transfusion & emergency donor tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Find Blood Donor */}
          <div
            id="quick-action-find-donor"
            onClick={() => onNavigate('donor-search')}
            className="group p-6 rounded-2xl bg-[#fff8f8] border-2 border-red-200/80 shadow-sm hover:shadow-md hover:border-red-400 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-1 group-hover:text-red-600 transition-colors font-display">
                Find Blood Donor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Search available voluntary donors by blood group and location across 64 districts in Bangladesh.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-red-100 flex items-center text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
              <span>Search Donors</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: Register as Donor */}
          <div
            id="quick-action-register-donor"
            onClick={() => onNavigate('donor-register')}
            className="group p-6 rounded-2xl bg-[#fff8f8] border-2 border-red-200/80 shadow-sm hover:shadow-md hover:border-red-500 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 fill-red-600" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-1 group-hover:text-red-600 transition-colors font-display">
                Register as Donor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Become a verified voluntary blood donor. Help thalassemia children live healthy lives.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-red-100 flex items-center text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
              <span>Join Volunteer Registry</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: Blood Reminder */}
          <div
            id="quick-action-blood-reminder"
            onClick={() => onNavigate('reminder')}
            className="group p-6 rounded-2xl bg-[#fff8f8] border-2 border-red-200/80 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-1 group-hover:text-blue-700 transition-colors font-display">
                Blood Reminder
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Track your next transfusion date with automated interval countdowns and pre-transfusion alerts.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-red-100 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>View Schedule</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 4: Emergency Request */}
          <div
            id="quick-action-emergency-request"
            onClick={() => onNavigate('blood-request')}
            className="group p-6 rounded-2xl bg-red-100/60 border-2 border-red-300 shadow-sm hover:shadow-md hover:border-red-500 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md shadow-red-600/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-red-950 mb-1 font-display">
                Emergency Request
              </h3>
              <p className="text-xs text-red-900 leading-relaxed font-medium">
                Submit an urgent blood requirement for immediate assistance from nearby voluntary donors.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-red-200 flex items-center text-xs font-bold text-red-700 group-hover:translate-x-1 transition-transform">
              <span>Create Request</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATISTICS SECTION (Dynamic from Local Storage) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-red-900/60">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Live Platform Impact
            </h2>
            <p className="text-xs text-red-200 font-medium mt-1">
              Real-time counts stored and updated directly from registered profiles
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            <div className="p-4 rounded-2xl bg-slate-800/70 border border-red-900/50">
              <div className="text-3xl sm:text-4xl font-black text-red-400 font-display">
                {registeredDonorsCount}
              </div>
              <div className="text-xs text-slate-200 font-bold mt-1">
                Registered Donors
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/70 border border-emerald-900/50">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">
                {availableDonorsCount}
              </div>
              <div className="text-xs text-slate-200 font-bold mt-1">
                Available Donors
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/70 border border-blue-900/50">
              <div className="text-3xl sm:text-4xl font-black text-blue-400 font-display">
                {registeredPatientsCount}
              </div>
              <div className="text-xs text-slate-200 font-bold mt-1">
                Registered Patients
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/70 border border-amber-900/50">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
                {bloodRequestsCount}
              </div>
              <div className="text-xs text-slate-200 font-bold mt-1">
                Blood Requests
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THALCARE BD HELPS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-red-600">
            Simple Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
            How Thalcare BD Works
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            A seamless bridge between thalassemia patients, caregivers, and voluntary donors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-[#fff8f8] border-2 border-red-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-red-600 tracking-wider">01</span>
              <h3 className="text-lg font-black text-slate-900 mt-2 mb-2 font-display">
                Register
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Create a patient or donor profile with blood group, interval, and location in under 2 minutes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-100 text-xs text-slate-500 font-bold">
              Step 1: Onboarding
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-[#fff8f8] border-2 border-red-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-red-600 tracking-wider">02</span>
              <h3 className="text-lg font-black text-slate-900 mt-2 mb-2 font-display">
                Find Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Search and contact compatible voluntary blood donors in your upazila or district.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-100 text-xs text-slate-500 font-bold">
              Step 2: Donor Search
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-[#fff8f8] border-2 border-red-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-red-600 tracking-wider">03</span>
              <h3 className="text-lg font-black text-slate-900 mt-2 mb-2 font-display">
                Manage Transfusion
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Track previous transfusions, units, pre-Hb levels, and automatic live countdowns to next due dates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-100 text-xs text-slate-500 font-bold">
              Step 3: Schedule Control
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-[#fff8f8] border-2 border-red-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <span className="text-xs font-black text-red-600 tracking-wider">04</span>
              <h3 className="text-lg font-black text-slate-900 mt-2 mb-2 font-display">
                Request Blood
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Submit an urgent blood request with required units and hospital details during emergencies.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-100 text-xs text-slate-500 font-bold">
              Step 4: Emergency Alert
            </div>
          </div>
        </div>
      </section>

      {/* 5. BLOOD GROUP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-100/60 rounded-3xl p-8 sm:p-10 border-2 border-red-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-red-700">
              Quick Filter By Type
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
              Select Blood Group
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Click any blood group to instantly view available voluntary donors across Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
            {bloodGroups.map((bg) => {
              const countForBg = donors.filter(
                (d) => d.bloodGroup === bg && d.availabilityStatus === 'Available'
              ).length;

              return (
                <button
                  key={bg}
                  id={`home-bg-btn-${bg.replace('+', 'pos').replace('-', 'neg')}`}
                  onClick={() => handleBloodGroupClick(bg)}
                  className="p-4 rounded-2xl bg-[#fff8f8] border-2 border-red-200/90 hover:border-red-500 hover:shadow-md transition-all duration-200 text-center flex flex-col items-center group focus:outline-none"
                >
                  <BloodGroupBadge group={bg} size="lg" variant="solid" />
                  <span className="text-xs font-black text-slate-800 mt-2.5">
                    {countForBg} {countForBg === 1 ? 'Donor' : 'Donors'}
                  </span>
                  <span className="text-[10px] font-bold text-red-600 group-hover:underline mt-0.5">
                    Search &rarr;
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. THALASSEMIA AWARENESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border border-red-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/80 text-red-200 text-xs font-bold border border-red-700">
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                <span>Clinical Health Education & Guidelines</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white">
                Understanding Thalassemia in Bangladesh
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Thalassemia is an inherited genetic blood disorder where red blood cells fail to produce sufficient healthy hemoglobin. For patients with <strong>Thalassemia Major</strong>, lifelong regular blood transfusions every 2 to 4 weeks paired with iron chelation therapy are the cornerstone of survival.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-start gap-2 bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
                  <span><strong>Pre-marital Screening:</strong> A simple Hb Electrophoresis test prevents passing Thalassemia to future children.</span>
                </div>
                <div className="flex items-start gap-2 bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <span><strong>Safe Transfusion:</strong> Leuko-depleted blood filters minimize adverse reactions and antibody development.</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  id="home-learn-thalassemia-btn"
                  onClick={() => onNavigate('awareness')}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-lg shadow-red-600/40"
                >
                  <span>Read Complete Thalassemia Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/95 p-6 rounded-2xl border border-red-900/50 text-xs space-y-3">
                <div className="font-extrabold text-red-400 uppercase tracking-wider text-sm flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Key Facts for Bangladesh</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                  Over <strong>10%–12% of people in Bangladesh</strong> are healthy carriers (Thalassemia Trait). Carriers live normal lives, but when two carriers marry, their child has a <strong>25% chance</strong> of having Thalassemia Major.
                </p>
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-[12px] text-red-200 font-semibold">
                  Gold Standard Diagnostic Test: Hemoglobin (Hb) Electrophoresis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VOLUNTARY DONOR CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#fff8f8] to-red-100/70 border-2 border-red-300 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-md shadow-red-600/10">
              <Heart className="w-8 h-8 fill-red-600" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              “Your One Donation Can Save a Thalassemia Warrior.”
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              Every voluntary blood donation directly sustains a child or adult battling Thalassemia in Bangladesh. Join our verified donor registry today — it takes only 15 minutes to save a life.
            </p>

            <div className="pt-3 flex flex-wrap justify-center gap-3.5">
              <button
                id="home-cta-register-donor-btn"
                onClick={() => onNavigate('donor-register')}
                className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Register as Voluntary Donor</span>
              </button>

              <button
                id="home-cta-register-patient-btn"
                onClick={() => onNavigate(patient ? 'dashboard' : 'patient-register')}
                className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-xl shadow-slate-900/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-red-400" />
                <span>{patient ? 'View Patient Dashboard' : 'Register as Patient'}</span>
              </button>

              <button
                id="home-cta-find-donor-btn"
                onClick={() => onNavigate('donor-search')}
                className="px-6 py-3.5 rounded-xl bg-[#fff8f8] hover:bg-red-50 text-slate-900 font-bold text-sm border-2 border-red-200 shadow-xs transition-all hover:scale-105 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-red-600" />
                <span>Search Available Donors</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

