import React from 'react';
import {
  calculateNextDueDate,
  calculateRemainingDays,
  getReminderStatus,
  formatDisplayDate,
} from '../utils/dateCalculation';
import { Clock, Calendar, AlertCircle, CheckCircle2, ChevronRight, Droplet } from 'lucide-react';

interface ReminderCardProps {
  lastTransfusionDate: string;
  intervalDays: number;
  onFindDonor?: () => void;
  onUpdateTransfusion?: () => void;
  compact?: boolean;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  lastTransfusionDate,
  intervalDays,
  onFindDonor,
  onUpdateTransfusion,
  compact = false,
}) => {
  const nextDueDate = calculateNextDueDate(lastTransfusionDate, intervalDays);
  const remainingDays = calculateRemainingDays(nextDueDate);
  const statusInfo = getReminderStatus(remainingDays);

  return (
    <div
      id="transfusion-reminder-card"
      className={`rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 shadow-sm relative overflow-hidden ${
        remainingDays <= 0
          ? 'bg-gradient-to-br from-red-100 via-rose-50 to-[#fff8f8] border-red-300'
          : remainingDays <= 3
          ? 'bg-gradient-to-br from-amber-100/70 via-yellow-50/60 to-[#fff8f8] border-amber-300'
          : 'bg-gradient-to-br from-emerald-100/70 via-emerald-50/40 to-[#fff8f8] border-emerald-200'
      }`}
    >
      {/* Background soft glow decoration */}
      <div
        className={`absolute -right-12 -top-12 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none ${
          remainingDays <= 0 ? 'bg-red-500' : remainingDays <= 3 ? 'bg-amber-400' : 'bg-emerald-400'
        }`}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          {/* Header Tag */}
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusInfo.badgeClass}`}
            >
              {remainingDays <= 0 ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              <span>{statusInfo.status}</span>
            </span>

            <span className="text-xs font-semibold text-slate-600">
              Interval: Every {intervalDays} days (~{Math.round(intervalDays / 7)} weeks)
            </span>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Next Blood Transfusion Schedule
            </p>
            <div className="flex items-baseline gap-3 mt-1">
              <span
                className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${
                  remainingDays < 0
                    ? 'text-red-800'
                    : remainingDays === 0
                    ? 'text-red-700'
                    : remainingDays <= 3
                    ? 'text-amber-700'
                    : 'text-slate-900'
                }`}
              >
                {remainingDays < 0
                  ? `${Math.abs(remainingDays)} DAYS OVERDUE`
                  : remainingDays === 0
                  ? 'DUE TODAY'
                  : `${remainingDays} ${remainingDays === 1 ? 'DAY' : 'DAYS'} LEFT`}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-red-600" />
              <span>Target Due Date: <strong className="text-slate-900">{formatDisplayDate(nextDueDate)}</strong></span>
            </p>
          </div>

          <p className="text-xs text-slate-700 font-medium max-w-xl leading-relaxed">
            {statusInfo.description}
          </p>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 pt-2 md:pt-0">
          {onFindDonor && (
            <button
              id="reminder-find-donor-btn"
              onClick={onFindDonor}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm shadow-red-600/20 transition-all active:scale-95"
            >
              <Droplet className="w-4 h-4 fill-white" />
              <span>Find Blood Donor</span>
            </button>
          )}

          {onUpdateTransfusion && (
            <button
              id="reminder-update-transfusion-btn"
              onClick={onUpdateTransfusion}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-[#fff8f8] hover:bg-red-50 text-slate-800 font-bold text-xs transition-colors"
            >
              <span>Record Transfusion</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
