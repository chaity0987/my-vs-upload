import React, { useState } from 'react';
import { PageId, Patient, TransfusionRecord } from '../types';
import { ReminderCard } from '../components/ReminderCard';
import { TransfusionModal } from '../components/TransfusionModal';
import {
  calculateNextDueDate,
  calculateRemainingDays,
  formatDisplayDate,
  formatFullDate,
  getReminderStatus,
} from '../utils/dateCalculation';
import {
  Clock,
  Calendar,
  Heart,
  Droplet,
  Search,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckSquare,
} from 'lucide-react';

interface ReminderPageProps {
  patient: Patient | null;
  onNavigate: (page: PageId, extraParam?: any) => void;
  onSaveTransfusion: (record: Omit<TransfusionRecord, 'id' | 'createdAt'>, existingId?: string) => void;
}

export const ReminderPage: React.FC<ReminderPageProps> = ({
  patient,
  onNavigate,
  onSaveTransfusion,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // If no patient registered yet
  if (!patient) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-slate-900/5 max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-display">
            Transfusion Schedule Reminder
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Please register your patient profile to activate your automated blood transfusion countdown reminder and visual timeline.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('patient-register')}
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/25 transition-all"
            >
              Register Patient Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextDueDate = calculateNextDueDate(
    patient.lastTransfusionDate,
    patient.transfusionIntervalDays
  );
  const remainingDays = calculateRemainingDays(nextDueDate);
  const statusInfo = getReminderStatus(remainingDays);

  // Timeline progress percentage (capped between 0% and 100%)
  const totalDaysInCycle = patient.transfusionIntervalDays || 21;
  const daysPassed = totalDaysInCycle - remainingDays;
  const progressPercent = Math.min(100, Math.max(0, (daysPassed / totalDaysInCycle) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-rose-600" />
          <span>Automated Schedule Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Blood Transfusion Reminder
        </h1>
        <p className="text-sm text-slate-600">
          Live schedule tracking calibrated for <strong>{patient.fullName}</strong> ({patient.bloodGroup})
        </p>
      </div>

      {/* 2. Large Central Countdown Box */}
      <div
        className={`rounded-3xl p-8 sm:p-12 border-2 text-center shadow-xl relative overflow-hidden transition-all ${
          remainingDays < 0
            ? 'bg-[#fff5f5] border-red-300 shadow-red-950/5'
            : remainingDays === 0
            ? 'bg-[#fff5f5] border-red-400 shadow-red-950/5'
            : remainingDays <= 3
            ? 'bg-[#fffbeb] border-amber-300 shadow-amber-950/5'
            : 'bg-[#f4fbf7] border-emerald-300 shadow-emerald-950/5'
        }`}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${statusInfo.badgeClass}`}
            >
              {remainingDays <= 0 ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              <span>{statusInfo.status}</span>
            </span>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-1">
              Transfusion Interval: Every {patient.transfusionIntervalDays} Days (~{Math.round(patient.transfusionIntervalDays / 7)} Weeks)
            </span>

            {/* Giant Countdown Number */}
            <div
              className={`text-5xl sm:text-7xl font-black font-display tracking-tight my-4 ${
                remainingDays < 0
                  ? 'text-red-700'
                  : remainingDays === 0
                  ? 'text-red-700 animate-pulse'
                  : remainingDays <= 3
                  ? 'text-amber-600'
                  : 'text-emerald-700'
              }`}
            >
              {remainingDays < 0
                ? `${Math.abs(remainingDays)} DAYS OVERDUE`
                : remainingDays === 0
                ? 'DUE TODAY'
                : `${remainingDays} DAYS LEFT`}
            </div>

            <p className="text-base sm:text-lg font-bold text-slate-800">
              Next Due Date: <span className="text-red-600">{formatFullDate(nextDueDate)}</span>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
            {statusInfo.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              id="reminder-search-donors-cta"
              onClick={() => onNavigate('donor-search', { bloodGroup: patient.bloodGroup, district: patient.district })}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Find Blood Donors for {patient.bloodGroup}</span>
            </button>

            <button
              id="reminder-log-transfusion-cta"
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white hover:bg-red-50 text-slate-800 font-bold text-xs border border-red-200 shadow-xs transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-red-600" />
              <span>Log Transfusion Done</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Visual Timeline: Last Transfusion -> Current Date -> Next Transfusion */}
      <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-10 border-2 border-red-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <span>Visual Transfusion Cycle Timeline</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            Progress tracker between your last transfusion and target due date
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-red-100/70 h-4 rounded-full overflow-hidden p-0.5 border border-red-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                remainingDays <= 0
                  ? 'bg-red-600'
                  : remainingDays <= 3
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-600">
            <span>Cycle Start (0%)</span>
            <span>{Math.round(progressPercent)}% of interval completed</span>
            <span>Target Due (100%)</span>
          </div>
        </div>

        {/* 3 Milestone Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Milestone 1: Last Transfusion */}
          <div className="p-4 rounded-2xl bg-white border border-red-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              1. Previous Transfusion
            </span>
            <span className="text-base font-bold text-slate-900 mt-1 block">
              {formatDisplayDate(patient.lastTransfusionDate)}
            </span>
            <span className="text-xs text-slate-600 mt-0.5 block font-medium">
              Hospital: {patient.hospitalName}
            </span>
          </div>

          {/* Milestone 2: Current Date */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
              2. Today's Date
            </span>
            <span className="text-base font-bold text-blue-950 mt-1 block">
              {formatDisplayDate(new Date().toISOString().split('T')[0])}
            </span>
            <span className="text-xs text-blue-700 mt-0.5 block font-medium">
              {remainingDays > 0
                ? `${daysPassed} days since last session`
                : 'Current cycle due'}
            </span>
          </div>

          {/* Milestone 3: Next Transfusion */}
          <div
            className={`p-4 rounded-2xl border ${
              remainingDays <= 0
                ? 'bg-red-50 border-red-300'
                : remainingDays <= 3
                ? 'bg-amber-50 border-amber-300'
                : 'bg-emerald-50 border-emerald-300'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-600">
              3. Next Transfusion Due
            </span>
            <span className="text-base font-bold text-slate-900 mt-1 block">
              {formatDisplayDate(nextDueDate)}
            </span>
            <span className="text-xs font-bold text-red-600 mt-0.5 block">
              {remainingDays <= 0 ? 'Urgent Attention Required' : `${remainingDays} days remaining`}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Preparation Checklist for Transfusion Day */}
      <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-8 border-2 border-red-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transfusion Day Preparation Checklist</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-white border border-red-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-red-600" />
              <span>1. Donor & Cross-Matching</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Ensure donor completes screening 24–48 hours in advance for mandatory viral markers (HIV, HBV, HCV, Syphilis, Malaria).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-red-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-red-600" />
              <span>2. Leuko-Depletion Filter</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Use leukocyte reduction filters during blood infusion to prevent allergic reactions and antibody development.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-red-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-red-600" />
              <span>3. Iron Chelation Routine</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Maintain prescribed iron chelators (Deferasirox / Desferal) under your hematologist's routine ferritin monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* Transfusion Modal */}
      <TransfusionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={onSaveTransfusion}
        patientHospital={patient.hospitalName}
      />
    </div>
  );
};
