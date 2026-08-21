import React, { useState } from 'react';
import { PageId, Patient, BloodGroup, TransfusionRecord } from '../types';
import { ALL_DISTRICT_NAMES } from '../utils/bangladeshLocations';
import { validatePatientForm, PatientFormErrors } from '../utils/validation';
import { BloodGroupBadge } from '../components/BloodGroupBadge';
import { formatDateToISO } from '../utils/dateCalculation';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { UserCheck, Heart, AlertCircle, Sparkles, ArrowRight, ShieldCheck, Trash2, LayoutDashboard } from 'lucide-react';

interface PatientRegistrationProps {
  onSavePatient?: (patient: Patient, initialTransfusion?: TransfusionRecord) => void;
  onRegisterSuccess?: (patient: Patient, initialTransfusion?: TransfusionRecord) => void;
  onDeletePatient?: () => void;
  onNavigate: (page: PageId) => void;
  existingPatient: Patient | null;
}

export const PatientRegistration: React.FC<PatientRegistrationProps> = ({
  onSavePatient,
  onRegisterSuccess,
  onDeletePatient,
  onNavigate,
  existingPatient,
}) => {
  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const [fullName, setFullName] = useState(existingPatient?.fullName || '');
  const [age, setAge] = useState<string>(existingPatient?.age ? String(existingPatient.age) : '');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(existingPatient?.gender || 'Male');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>(existingPatient?.bloodGroup || '');
  const [guardianName, setGuardianName] = useState(existingPatient?.guardianName || '');
  const [phoneNumber, setPhoneNumber] = useState(existingPatient?.phoneNumber || '');
  const [district, setDistrict] = useState(existingPatient?.district || 'Dhaka');
  const [hospitalName, setHospitalName] = useState(existingPatient?.hospitalName || '');
  const [lastTransfusionDate, setLastTransfusionDate] = useState(
    existingPatient?.lastTransfusionDate || formatDateToISO(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000))
  );
  const [intervalType, setIntervalType] = useState<'2 weeks' | '3 weeks' | '4 weeks' | 'Custom'>(
    existingPatient?.intervalLabel === 'Custom' ? 'Custom' : (existingPatient?.intervalLabel as any) || '3 weeks'
  );
  const [customIntervalDays, setCustomIntervalDays] = useState<number>(
    existingPatient?.transfusionIntervalDays || 21
  );

  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleFillDemoData = () => {
    setFullName('Ayaan Rahman');
    setAge('8');
    setGender('Male');
    setBloodGroup('B+');
    setGuardianName('Md. Mostafizur Rahman');
    setPhoneNumber('01712345678');
    setDistrict('Dhaka');
    setHospitalName('Bangladesh Shishu Hospital & Institute, Sher-e-Bangla Nagar');
    setLastTransfusionDate(formatDateToISO(new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)));
    setIntervalType('3 weeks');
    setCustomIntervalDays(21);
    setErrors({});
  };

  const getCalculatedIntervalDays = (): number => {
    switch (intervalType) {
      case '2 weeks':
        return 14;
      case '3 weeks':
        return 21;
      case '4 weeks':
        return 28;
      case 'Custom':
        return customIntervalDays > 0 ? customIntervalDays : 21;
      default:
        return 21;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const intervalDays = getCalculatedIntervalDays();

    const { isValid, errors: validationErrors } = validatePatientForm({
      fullName,
      age,
      gender,
      bloodGroup,
      guardianName,
      phoneNumber,
      district,
      hospitalName,
      lastTransfusionDate,
      transfusionIntervalDays: intervalDays,
    });

    if (!isValid) {
      setErrors(validationErrors);
      // Scroll to first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const patientData: Patient = {
      id: existingPatient?.id || `PAT-${Date.now()}`,
      fullName: fullName.trim(),
      age: parseInt(age, 10),
      gender,
      bloodGroup: bloodGroup as BloodGroup,
      guardianName: guardianName.trim(),
      phoneNumber: phoneNumber.trim(),
      district,
      hospitalName: hospitalName.trim(),
      lastTransfusionDate,
      transfusionIntervalDays: intervalDays,
      intervalLabel: intervalType,
      registeredAt: existingPatient?.registeredAt || formatDateToISO(new Date()),
    };

    // If new registration, create initial transfusion log
    let initialTransfusion: TransfusionRecord | undefined = undefined;
    if (!existingPatient && lastTransfusionDate) {
      initialTransfusion = {
        id: `TR-${Date.now()}`,
        patientId: patientData.id,
        transfusionDate: lastTransfusionDate,
        hospitalName: hospitalName.trim(),
        bloodUnits: 1,
        notes: 'Initial transfusion record logged during patient profile registration.',
        createdAt: formatDateToISO(new Date()),
      };
    }

    const saveHandler = onSavePatient || onRegisterSuccess;
    if (saveHandler) {
      saveHandler(patientData, initialTransfusion);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>Thalassemia Patient Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          {existingPatient ? 'Update Patient Profile' : 'Patient Registration'}
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Enter patient details to automatically schedule reminders, calculate next blood due dates, and quickly find matched donors in your area.
        </p>
      </div>

      {/* If existing patient, show active profile status banner with direct actions */}
      {existingPatient && (
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-red-100/80 via-red-50 to-white border-2 border-red-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-600/20 shrink-0">
              {existingPatient.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{existingPatient.fullName}</span>
                <BloodGroupBadge group={existingPatient.bloodGroup} size="sm" />
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Active Profile • {existingPatient.district} • Interval: {existingPatient.transfusionIntervalDays} days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              id="patient-top-open-dashboard-btn"
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-red-400" />
              <span>Dashboard</span>
            </button>
            <button
              id="patient-top-delete-profile-btn"
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-3.5 py-2 rounded-xl border border-red-300 hover:bg-red-100/70 text-red-700 text-xs font-bold transition-all flex items-center gap-1.5 bg-[#fff8f8]"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Delete Profile</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-10 border-2 border-red-200 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-red-200/80 pb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">Patient Details & Medical Schedule</h2>
            <p className="text-xs text-slate-600 font-medium">All fields with asterisk (*) are required for timeline calculations.</p>
          </div>
          {!existingPatient && (
            <button
              type="button"
              id="patient-autofill-btn"
              onClick={handleFillDemoData}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-100/80 hover:bg-red-200/80 text-red-800 text-xs font-bold border border-red-300 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Sample Data</span>
            </button>
          )}
        </div>

        {submitted && Object.keys(errors).length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-red-100/70 border-2 border-red-300 text-red-900 text-xs">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Please correct the following fields before proceeding:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 ml-1 font-medium">
              {Object.entries(errors).map(([key, err]) => (
                <li key={key}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          {/* Section 1: Patient Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-red-200/60 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-red-600" />
              <span>1. Patient & Guardian Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Patient Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="patient-input-fullname"
                  type="text"
                  placeholder="e.g. Ayaan Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                    submitted && errors.fullName
                      ? 'border-red-400 bg-red-50/60 focus:ring-2 focus:ring-red-200'
                      : 'border-red-200 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
                  }`}
                />
                {submitted && errors.fullName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Age (Years) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="patient-input-age"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 8"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                      submitted && errors.age
                        ? 'border-red-400 bg-red-50/60'
                        : 'border-red-200 focus:border-red-600'
                    }`}
                  />
                  {submitted && errors.age && (
                    <p className="text-xs text-red-600 mt-1 font-bold">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="patient-select-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Guardian Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Parent / Guardian Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="patient-input-guardian"
                  type="text"
                  placeholder="e.g. Md. Mostafizur Rahman"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                    submitted && errors.guardianName
                      ? 'border-red-400 bg-red-50/60'
                      : 'border-red-200 focus:border-red-600'
                  }`}
                />
                {submitted && errors.guardianName && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.guardianName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Contact Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="patient-input-phone"
                  type="tel"
                  placeholder="01712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                    submitted && errors.phoneNumber
                      ? 'border-red-400 bg-red-50/60'
                      : 'border-red-200 focus:border-red-600'
                  }`}
                />
                <span className="text-[11px] text-slate-600 font-medium">11-digit Bangladeshi mobile number</span>
                {submitted && errors.phoneNumber && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Blood Group Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Blood Group <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {bloodGroups.map((bg) => {
                const isSelected = bloodGroup === bg;
                return (
                  <button
                    key={bg}
                    type="button"
                    id={`patient-bg-select-${bg.replace('+', 'pos').replace('-', 'neg')}`}
                    onClick={() => setBloodGroup(bg)}
                    className={`py-3 rounded-2xl border-2 text-center font-bold text-sm transition-all focus:outline-none ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20 scale-105'
                        : 'bg-red-50/60 border-red-200 text-slate-800 hover:border-red-400 hover:bg-red-100'
                    }`}
                  >
                    {bg}
                  </button>
                );
              })}
            </div>
            {submitted && errors.bloodGroup && (
              <p className="text-xs text-red-600 flex items-center gap-1 font-bold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.bloodGroup}</span>
              </p>
            )}
          </div>

          {/* Section 3: Hospital & Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-red-200/60 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>2. Location & Hospital Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  District <span className="text-red-600">*</span>
                </label>
                <select
                  id="patient-select-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                >
                  {ALL_DISTRICT_NAMES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {submitted && errors.district && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.district}</p>
                )}
              </div>

              {/* Hospital Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Transfusion Hospital / Center <span className="text-red-600">*</span>
                </label>
                <input
                  id="patient-input-hospital"
                  type="text"
                  placeholder="e.g. BSMMU / Dhaka Shishu Hospital"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                    submitted && errors.hospitalName
                      ? 'border-red-400 bg-red-50/60'
                      : 'border-red-200 focus:border-red-600'
                  }`}
                />
                {submitted && errors.hospitalName && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.hospitalName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Transfusion Schedule Setup */}
          <div className="space-y-4 p-5 rounded-2xl bg-red-100/40 border border-red-200">
            <h3 className="text-sm font-bold text-red-950 uppercase tracking-wider pb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>3. Transfusion Schedule & Frequency</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Last Transfusion Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Last Blood Transfusion Date <span className="text-red-600">*</span>
                </label>
                <input
                  id="patient-input-last-transfusion"
                  type="date"
                  value={lastTransfusionDate}
                  onChange={(e) => setLastTransfusionDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-red-200 bg-white text-sm focus:outline-none focus:border-red-600"
                />
                {submitted && errors.lastTransfusionDate && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.lastTransfusionDate}</p>
                )}
              </div>

              {/* Transfusion Interval Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Transfusion Interval <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['2 weeks', '3 weeks', '4 weeks', 'Custom'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      id={`patient-interval-${opt.replace(' ', '-')}`}
                      onClick={() => setIntervalType(opt)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                        intervalType === opt
                          ? 'bg-red-600 text-white border-red-600 shadow-sm'
                          : 'bg-[#fff8f8] text-slate-800 border-red-200 hover:bg-red-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {intervalType === 'Custom' && (
                  <div className="mt-3">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Custom Interval in Days:
                    </label>
                    <input
                      id="patient-custom-interval-input"
                      type="number"
                      min="5"
                      max="90"
                      value={customIntervalDays}
                      onChange={(e) => setCustomIntervalDays(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-red-200 bg-white text-sm focus:outline-none focus:border-red-600"
                      placeholder="e.g. 25 days"
                    />
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 italic font-medium">
              * Thalcare BD will use this interval to automatically calculate your remaining days and next due date countdown.
            </p>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-red-200/60">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel & Return Home
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {existingPatient && (
                <button
                  id="patient-form-delete-btn"
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-3.5 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span>Delete Profile</span>
                </button>
              )}

              <button
                id="patient-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>{existingPatient ? 'Save Profile Changes' : 'Complete Registration & Open Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Danger Zone for Deleting Profile */}
      {existingPatient && (
        <div className="mt-8 bg-[#fff8f8] rounded-3xl p-6 sm:p-7 border-2 border-red-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-black text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-red-600" />
                <span>Delete Patient Profile & Schedule</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                Permanently removes your patient registration, personal details, and reminder schedule from this device.
              </p>
            </div>

            <button
              id="patient-danger-zone-delete-btn"
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-5 py-2.5 rounded-xl bg-red-100 hover:bg-red-600 hover:text-white text-red-700 font-bold text-xs border border-red-300 transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Patient Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (onDeletePatient) {
            onDeletePatient();
          }
        }}
        title="Delete Patient Profile?"
        description="Are you sure you want to delete this patient profile? You will lose all personalized transfusion schedule calculations and automated countdown reminders on this device."
        itemName={existingPatient ? `${existingPatient.fullName} (${existingPatient.bloodGroup})` : undefined}
        confirmButtonText="Yes, Permanently Delete Profile"
        warningNote="This action cannot be undone. You can create a new profile at any time."
      />
    </div>
  );
};
