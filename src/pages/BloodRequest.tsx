import React, { useState, useEffect } from 'react';
import { PageId, BloodRequest, BloodGroup, Patient } from '../types';
import { ALL_DISTRICT_NAMES } from '../utils/bangladeshLocations';
import { validateBloodRequestForm, BloodRequestErrors } from '../utils/validation';
import { BloodGroupBadge } from '../components/BloodGroupBadge';
import { formatDateToISO, formatDisplayDate } from '../utils/dateCalculation';
import {
  Flame,
  AlertTriangle,
  HeartHandshake,
  Hospital,
  Calendar,
  Phone,
  Droplet,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface BloodRequestPageProps {
  patient: Patient | null;
  bloodRequests: BloodRequest[];
  onSubmitRequest: (request: BloodRequest) => void;
  onNavigate: (page: PageId) => void;
  initialParams?: {
    bloodGroup?: BloodGroup;
    district?: string;
  };
}

export const BloodRequestPage: React.FC<BloodRequestPageProps> = ({
  patient,
  bloodRequests,
  onSubmitRequest,
  onNavigate,
  initialParams,
}) => {
  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const [patientName, setPatientName] = useState(patient?.fullName || '');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>(
    initialParams?.bloodGroup || patient?.bloodGroup || ''
  );
  const [hospitalName, setHospitalName] = useState(patient?.hospitalName || '');
  const [requiredDate, setRequiredDate] = useState(
    formatDateToISO(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))
  );
  const [requiredUnits, setRequiredUnits] = useState(1);
  const [contactNumber, setContactNumber] = useState(patient?.phoneNumber || '');
  const [district, setDistrict] = useState(
    initialParams?.district || patient?.district || 'Dhaka'
  );
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<BloodRequestErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  useEffect(() => {
    if (initialParams?.bloodGroup) {
      setBloodGroup(initialParams.bloodGroup);
    }
    if (initialParams?.district) {
      setDistrict(initialParams.district);
    }
  }, [initialParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const { isValid, errors: validationErrors } = validateBloodRequestForm({
      patientName,
      bloodGroup,
      hospitalName,
      requiredDate,
      requiredUnits,
      contactNumber,
      district,
    });

    if (!isValid) {
      setErrors(validationErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const uniqueId = `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: BloodRequest = {
      id: uniqueId,
      patientName: patientName.trim(),
      bloodGroup: bloodGroup as BloodGroup,
      hospitalName: hospitalName.trim(),
      requiredDate,
      requiredUnits: Number(requiredUnits),
      contactNumber: contactNumber.trim(),
      district,
      notes: notes.trim() || undefined,
      status: 'Urgent',
      createdAt: formatDateToISO(new Date()),
    };

    onSubmitRequest(newRequest);
    setSuccessBanner(`Your emergency blood request (${uniqueId}) has been recorded successfully.`);
    setNotes('');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header with Red Emergency Highlight */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-700 via-red-800 to-rose-950 text-white p-8 sm:p-10 shadow-xl shadow-rose-950/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-900/80 text-rose-200 text-xs font-bold border border-rose-600/60 shadow-xs">
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Urgent Blood Requirement Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Emergency Blood Request
          </h1>

          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed">
            Submit an urgent blood request for thalassemia transfusion. Your request will be instantly registered in the system so voluntary donors and volunteer networks can reach you.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-rose-200">
            <span>• No Fees Required</span>
            <span>• Verified Volunteer Network</span>
            <span>• 64 Districts Coverage</span>
          </div>
        </div>
      </div>

      {/* Success Banner if submitted */}
      {successBanner && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-sm flex items-start gap-3.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-sm text-emerald-950">Request Submitted</h4>
            <p className="text-xs text-emerald-800 mt-0.5">{successBanner}</p>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}
          {/* 2. Main Grid: Request Form + Active Requests List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7 bg-[#fff8f8] rounded-3xl p-6 sm:p-8 border-2 border-red-200 shadow-xl">
          <div className="mb-6 pb-4 border-b border-red-200/70">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-red-600" />
              <span>Submit Blood Requirement</span>
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Please enter patient and hospital coordinates accurately
            </p>
          </div>

          {/* Warning Notice */}
          <div className="mb-6 p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong>Important:</strong> Please verify the information carefully before submitting your request. Provide a reachable active phone number for donors to coordinate.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Patient Name <span className="text-red-600">*</span>
              </label>
              <input
                id="req-patient-name"
                type="text"
                placeholder="e.g. Sadia Islam (Child Patient)"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-white ${
                  submitted && errors.patientName
                    ? 'border-red-400 bg-red-50/40'
                    : 'border-red-200 focus:border-red-600'
                }`}
              />
              {submitted && errors.patientName && (
                <p className="text-xs text-red-600 mt-1 font-bold">{errors.patientName}</p>
              )}
            </div>

            {/* Blood Group Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Required Blood Group <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {bloodGroups.map((bg) => {
                  const isSelected = bloodGroup === bg;
                  return (
                    <button
                      key={bg}
                      type="button"
                      id={`req-bg-${bg.replace('+', 'pos').replace('-', 'neg')}`}
                      onClick={() => setBloodGroup(bg)}
                      className={`py-2.5 rounded-xl font-bold text-xs border-2 transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white border-red-600 shadow-sm scale-105'
                          : 'bg-red-50/60 border-red-200 text-slate-800 hover:border-red-400'
                      }`}
                    >
                      {bg}
                    </button>
                  );
                })}
              </div>
              {submitted && errors.bloodGroup && (
                <p className="text-xs text-red-600 mt-1 font-bold">{errors.bloodGroup}</p>
              )}
            </div>

            {/* Hospital & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  District <span className="text-red-600">*</span>
                </label>
                <select
                  id="req-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                >
                  {ALL_DISTRICT_NAMES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Hospital / Department <span className="text-red-600">*</span>
                </label>
                <input
                  id="req-hospital"
                  type="text"
                  placeholder="e.g. BSMMU Cabin / Ward 4"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-white ${
                    submitted && errors.hospitalName
                      ? 'border-red-400 bg-red-50/40'
                      : 'border-red-200 focus:border-red-600'
                  }`}
                />
                {submitted && errors.hospitalName && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.hospitalName}</p>
                )}
              </div>
            </div>

            {/* Units, Date & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Blood Units (Bags) <span className="text-red-600">*</span>
                </label>
                <select
                  id="req-units"
                  value={requiredUnits}
                  onChange={(e) => setRequiredUnits(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                >
                  <option value={1}>1 Unit</option>
                  <option value={2}>2 Units</option>
                  <option value={3}>3 Units</option>
                  <option value={4}>4 Units</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Required Date <span className="text-red-600">*</span>
                </label>
                <input
                  id="req-date"
                  type="date"
                  value={requiredDate}
                  onChange={(e) => setRequiredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                />
                {submitted && errors.requiredDate && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.requiredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Emergency Phone <span className="text-red-600">*</span>
                </label>
                <input
                  id="req-phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none bg-white ${
                    submitted && errors.contactNumber
                      ? 'border-red-400 bg-red-50/40'
                      : 'border-red-200 focus:border-red-600'
                  }`}
                />
                {submitted && errors.contactNumber && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.contactNumber}</p>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Special Medical Notes (Optional)
              </label>
              <textarea
                id="req-notes"
                rows={2}
                placeholder="e.g. Fresh washed packed red cells required. Cross-match sample ready at blood bank."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="submit-blood-request-btn"
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>Submit Emergency Blood Request</span>
              </button>
            </div>
          </form>
        </div>

        {/* Active Emergency Requests Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#fff8f8] rounded-3xl p-6 border-2 border-red-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Active Blood Requests</span>
              </h3>
              <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
                {bloodRequests.length} Total
              </span>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {bloodRequests.map((req) => (
                <div
                  key={req.id}
                  id={`request-item-${req.id}`}
                  className="p-4 rounded-2xl border border-red-200/90 bg-white hover:bg-red-50/50 transition-all space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <BloodGroupBadge group={req.bloodGroup} size="sm" variant="solid" />
                        <h4 className="font-bold text-sm text-slate-900">{req.patientName}</h4>
                      </div>
                      <div className="text-xs text-slate-600 mt-1 flex items-center gap-1 font-medium">
                        <Hospital className="w-3.5 h-3.5 text-red-500" />
                        <span>{req.hospitalName}, {req.district}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        req.status === 'Urgent'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 grid grid-cols-2 gap-1 pt-1 border-t border-red-100">
                    <div>
                      Required: <strong>{formatDisplayDate(req.requiredDate)}</strong>
                    </div>
                    <div>
                      Units: <strong>{req.requiredUnits} Bag(s)</strong>
                    </div>
                  </div>

                  {req.notes && (
                    <p className="text-[11px] text-slate-600 italic bg-red-50/50 p-2 rounded-lg border border-red-100">
                      "{req.notes}"
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <a
                      href={`tel:${req.contactNumber}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-xl transition-colors border border-red-200"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Contact: {req.contactNumber}</span>
                    </a>
                    <span className="text-[10px] text-slate-400 font-mono">{req.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
