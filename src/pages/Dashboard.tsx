import React, { useState } from 'react';
import { PageId, Patient, TransfusionRecord, BloodRequest } from '../types';
import { ReminderCard } from '../components/ReminderCard';
import { BloodGroupBadge } from '../components/BloodGroupBadge';
import { TransfusionModal } from '../components/TransfusionModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import {
  calculateNextDueDate,
  calculateRemainingDays,
  formatDisplayDate,
  getReminderStatus,
} from '../utils/dateCalculation';
import {
  User,
  Calendar,
  Clock,
  Heart,
  Droplet,
  Search,
  AlertTriangle,
  History,
  PlusCircle,
  Hospital,
  ChevronRight,
  ShieldCheck,
  Edit,
  Phone,
  FileText,
  Trash2,
} from 'lucide-react';

interface DashboardProps {
  patient: Patient | null;
  transfusions: TransfusionRecord[];
  bloodRequests: BloodRequest[];
  onNavigate: (page: PageId, extraParam?: any) => void;
  onSaveTransfusion: (record: Omit<TransfusionRecord, 'id' | 'createdAt'>, existingId?: string) => void;
  onDeletePatient?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  patient,
  transfusions,
  bloodRequests,
  onNavigate,
  onSaveTransfusion,
  onDeletePatient,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // If no patient registered yet
  if (!patient) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-[#fff8f8] rounded-3xl p-8 sm:p-12 border-2 border-red-200 shadow-xl max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-display">
            No Patient Profile Found
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            Please register your patient profile to track blood transfusion schedules, receive automated reminders, and maintain your transfusion history.
          </p>
          <div className="pt-2">
            <button
              id="dashboard-register-patient-cta"
              onClick={() => onNavigate('patient-register')}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/25 transition-all"
            >
              Register Patient Profile Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate metrics
  const nextDueDate = calculateNextDueDate(
    patient.lastTransfusionDate,
    patient.transfusionIntervalDays
  );
  const remainingDays = calculateRemainingDays(nextDueDate);
  const statusInfo = getReminderStatus(remainingDays);

  // Filter requests submitted by or relevant for this patient
  const myRequests = bloodRequests.filter(
    (req) =>
      req.patientName.toLowerCase().includes(patient.fullName.toLowerCase()) ||
      req.contactNumber === patient.phoneNumber
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#fff8f8] p-6 sm:p-8 rounded-3xl border-2 border-red-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl font-black shadow-md shadow-red-600/20">
            {patient.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-red-700 uppercase tracking-wider">
                Patient Dashboard
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
              <span className="text-xs text-slate-600 font-semibold">{patient.district}, Bangladesh</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-0.5">
              Welcome back, {patient.fullName}
            </h1>
            <p className="text-xs text-slate-700 mt-1 font-medium">
              Guardian: <strong className="text-slate-900">{patient.guardianName}</strong> • Age: {patient.age}y • Hospital: {patient.hospitalName}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="dashboard-edit-profile-btn"
            onClick={() => onNavigate('patient-register')}
            className="px-3.5 py-2 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Edit className="w-3.5 h-3.5 text-slate-600" />
            <span>Edit Profile</span>
          </button>

          <button
            id="dashboard-delete-profile-top-btn"
            onClick={() => setShowDeleteModal(true)}
            className="px-3.5 py-2 rounded-xl border border-red-300 hover:bg-red-100/80 text-red-700 text-xs font-bold transition-colors flex items-center gap-1.5 bg-[#fff8f8]"
            title="Delete Patient Profile"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            <span>Delete Profile</span>
          </button>

          <button
            id="dashboard-record-transfusion-top-btn"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs shadow-red-600/20 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Transfusion</span>
          </button>
        </div>
      </div>

      {/* 2. Priority Reminder Card */}
      <ReminderCard
        lastTransfusionDate={patient.lastTransfusionDate}
        intervalDays={patient.transfusionIntervalDays}
        onFindDonor={() => onNavigate('donor-search', { bloodGroup: patient.bloodGroup, district: patient.district })}
        onUpdateTransfusion={() => setModalOpen(true)}
      />

      {/* 3. Summary 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Blood Group */}
        <div className="p-5 rounded-2xl bg-[#fff8f8] border-2 border-red-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Blood Group
            </span>
            <span className="text-2xl font-black text-slate-900 font-display mt-1 block">
              {patient.bloodGroup}
            </span>
            <span className="text-[11px] text-red-600 font-bold">Verified Type</span>
          </div>
          <BloodGroupBadge group={patient.bloodGroup} size="lg" variant="solid" />
        </div>

        {/* Last Transfusion */}
        <div className="p-5 rounded-2xl bg-[#fff8f8] border-2 border-red-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Last Transfusion
          </span>
          <span className="text-lg font-black text-slate-900 font-display mt-1 block">
            {formatDisplayDate(patient.lastTransfusionDate)}
          </span>
          <span className="text-[11px] text-slate-600 font-semibold">
            {transfusions.length} total logged
          </span>
        </div>

        {/* Next Blood Due */}
        <div className="p-5 rounded-2xl bg-[#fff8f8] border-2 border-red-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Next Blood Due
          </span>
          <span className="text-lg font-black text-slate-900 font-display mt-1 block">
            {formatDisplayDate(nextDueDate)}
          </span>
          <span className="text-[11px] text-red-700 font-bold">
            Every {patient.transfusionIntervalDays} days
          </span>
        </div>

        {/* Remaining Days */}
        <div className={`p-5 rounded-2xl border-2 shadow-xs ${statusInfo.bgClass} ${statusInfo.borderClass}`}>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Remaining Days
          </span>
          <span className={`text-2xl font-black font-display mt-1 block ${statusInfo.textClass}`}>
            {remainingDays < 0
              ? `${Math.abs(remainingDays)}d Overdue`
              : remainingDays === 0
              ? 'Due Today'
              : `${remainingDays} Days`}
          </span>
          <span className="text-[11px] font-bold text-slate-700">
            Status: {statusInfo.status}
          </span>
        </div>
      </div>

      {/* 4. Dashboard Quick Actions */}
      <div className="bg-[#fff8f8] p-6 sm:p-7 rounded-3xl border-2 border-red-200 shadow-xs">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-600" />
          <span>Dashboard Quick Actions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            id="dash-action-find-donor"
            onClick={() => onNavigate('donor-search', { bloodGroup: patient.bloodGroup, district: patient.district })}
            className="p-4 rounded-xl border border-red-200 hover:border-red-400 bg-red-50/40 hover:bg-red-50 text-left transition-all group flex items-start justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-red-600 font-display">
                Find Blood Donor
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Matched for {patient.bloodGroup} in {patient.district}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="dash-action-emergency-request"
            onClick={() => onNavigate('blood-request')}
            className="p-4 rounded-xl border-2 border-red-300 bg-red-100/60 hover:bg-red-100 text-left transition-all group flex items-start justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-red-950 font-display">
                Emergency Blood Request
              </h4>
              <p className="text-xs text-red-900 font-medium mt-0.5">
                Urgent requirement alert
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="dash-action-update-transfusion"
            onClick={() => setModalOpen(true)}
            className="p-4 rounded-xl border border-blue-200 hover:border-blue-400 bg-blue-50/40 hover:bg-blue-50 text-left transition-all group flex items-start justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 font-display">
                Update Transfusion
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Log units and date
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="dash-action-view-history"
            onClick={() => onNavigate('transfusion-history')}
            className="p-4 rounded-xl border border-purple-200 hover:border-purple-400 bg-purple-50/40 hover:bg-purple-50 text-left transition-all group flex items-start justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <History className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-purple-700 font-display">
                View Transfusion History
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {transfusions.length} records saved
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5. Blood Request History & Recent Transfusions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blood Requests */}
        <div className="bg-[#fff8f8] p-6 rounded-3xl border-2 border-red-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 font-display flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Blood Request History</span>
            </h3>
            <button
              onClick={() => onNavigate('blood-request')}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              + Create New Request
            </button>
          </div>

          {bloodRequests.length === 0 ? (
            <div className="p-8 text-center bg-red-50/50 rounded-2xl border border-red-100 text-xs text-slate-600 font-medium">
              No emergency requests recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {bloodRequests.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl border border-red-200/80 bg-red-50/40 hover:bg-[#fff8f8] hover:shadow-xs transition-all flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <BloodGroupBadge group={req.bloodGroup} size="sm" variant="solid" />
                      <span className="font-bold text-sm text-slate-900">{req.patientName}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                      <Hospital className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.hospitalName}, {req.district}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Required Date: <strong>{formatDisplayDate(req.requiredDate)}</strong> • {req.requiredUnits} Unit(s)
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        req.status === 'Urgent'
                          ? 'bg-red-100 text-red-800'
                          : req.status === 'Fulfilled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">{req.id}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transfusion Logs */}
        <div className="bg-[#fff8f8] p-6 rounded-3xl border-2 border-red-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 font-display flex items-center gap-2">
              <History className="w-4 h-4 text-purple-600" />
              <span>Recent Transfusion Records</span>
            </h3>
            <button
              onClick={() => onNavigate('transfusion-history')}
              className="text-xs font-bold text-purple-600 hover:underline"
            >
              View All ({transfusions.length})
            </button>
          </div>

          {transfusions.length === 0 ? (
            <div className="p-8 text-center bg-red-50/50 rounded-2xl border border-red-100 text-xs text-slate-600 font-medium">
              No previous transfusion logs found. Click "Log Transfusion" above to add.
            </div>
          ) : (
            <div className="space-y-3">
              {transfusions.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl border border-red-200/80 bg-red-50/40 hover:bg-[#fff8f8] hover:shadow-xs transition-all flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {formatDisplayDate(t.transfusionDate)}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[11px] font-bold">
                        {t.bloodUnits} {t.bloodUnits === 1 ? 'Unit' : 'Units'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                      <Hospital className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.hospitalName}</span>
                    </div>
                    {t.preTransfusionHb && (
                      <div className="text-[11px] text-slate-500 mt-1">
                        Pre-Hb: <strong>{t.preTransfusionHb} g/dL</strong>
                      </div>
                    )}
                  </div>

                  <div className="text-right text-[11px] text-slate-400">
                    {t.donorName ? `Donor: ${t.donorName}` : 'Recorded'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Management / Danger Zone */}
      <div className="bg-[#fff8f8] p-6 sm:p-7 rounded-3xl border-2 border-red-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-red-950 uppercase tracking-wider flex items-center gap-1.5">
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>Delete Patient Profile</span>
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
            Permanently delete <strong className="text-slate-800">{patient.fullName}</strong>'s profile and schedule from this device.
          </p>
        </div>

        <button
          id="dashboard-danger-zone-delete-btn"
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2.5 rounded-xl bg-red-100 hover:bg-red-600 hover:text-white text-red-700 font-bold text-xs border border-red-300 transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Profile</span>
        </button>
      </div>

      {/* Transfusion Modal */}
      <TransfusionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={onSaveTransfusion}
        patientHospital={patient.hospitalName}
      />

      {/* Delete Patient Profile Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (onDeletePatient) {
            onDeletePatient();
          }
        }}
        title="Delete Patient Profile?"
        description={`Are you sure you want to delete the profile for ${patient.fullName}? This will erase your personal details and active transfusion countdown schedule on this device.`}
        itemName={`${patient.fullName} (${patient.bloodGroup})`}
        confirmButtonText="Yes, Delete Profile"
        warningNote="You will need to register again if you wish to track transfusion schedules or receive automated reminders."
      />
    </div>
  );
};
