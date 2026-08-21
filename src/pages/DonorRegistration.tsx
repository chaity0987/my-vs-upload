import React, { useState, useEffect } from 'react';
import { PageId, Donor, BloodGroup, AvailabilityStatus } from '../types';
import { ALL_DISTRICT_NAMES, getUpazilasForDistrict } from '../utils/bangladeshLocations';
import { validateDonorForm, DonorFormErrors } from '../utils/validation';
import { formatDateToISO } from '../utils/dateCalculation';
import { BloodGroupBadge } from '../components/BloodGroupBadge';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import {
  Heart,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Trash2,
  Phone,
  MapPin,
  Search,
  Check,
  Users,
} from 'lucide-react';

interface DonorRegistrationProps {
  onRegisterSuccess: (donor: Donor) => void;
  onNavigate: (page: PageId) => void;
  donors?: Donor[];
  myDonorIds?: string[];
  onDeleteDonor?: (donorId: string) => void;
}

export const DonorRegistration: React.FC<DonorRegistrationProps> = ({
  onRegisterSuccess,
  onNavigate,
  donors = [],
  myDonorIds = [],
  onDeleteDonor,
}) => {
  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<string>('24');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [upazila, setUpazila] = useState('Dhanmondi');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>('Available');
  const [totalDonations, setTotalDonations] = useState<number>(1);

  const [upazilaList, setUpazilaList] = useState<string[]>([]);
  const [errors, setErrors] = useState<DonorFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Deletion State
  const [donorToDelete, setDonorToDelete] = useState<Donor | null>(null);
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupResult, setLookupResult] = useState<Donor | null | 'not-found'>(null);

  // Find my registered donors
  const myRegisteredDonors = donors.filter(
    (d) => myDonorIds.includes(d.id) || (!d.isFictionalDemo && d.id.startsWith('DON-'))
  );

  useEffect(() => {
    const list = getUpazilasForDistrict(district);
    setUpazilaList(list);
    if (list.length > 0) {
      setUpazila(list[0]);
    } else {
      setUpazila('');
    }
  }, [district]);

  const handleLookupDonor = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = lookupPhone.trim();
    if (!cleanPhone) return;

    const found = donors.find(
      (d) => d.phoneNumber.replace(/\s+/g, '') === cleanPhone.replace(/\s+/g, '')
    );
    if (found) {
      setLookupResult(found);
    } else {
      setLookupResult('not-found');
    }
  };

  const handleFillDemoData = () => {
    setFullName('Tanvir Hasan');
    setAge('26');
    setGender('Male');
    setBloodGroup('O+');
    setPhoneNumber('01819876543');
    setDistrict('Dhaka');
    setUpazila('Mirpur');
    setLastDonationDate(formatDateToISO(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)));
    setAvailabilityStatus('Available');
    setTotalDonations(4);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const { isValid, errors: validationErrors } = validateDonorForm({
      fullName,
      age,
      gender,
      bloodGroup,
      phoneNumber,
      district,
      upazila,
    });

    if (!isValid) {
      setErrors(validationErrors);
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    const newDonor: Donor = {
      id: `DON-${Date.now()}`,
      fullName: fullName.trim(),
      age: parseInt(age, 10),
      gender,
      bloodGroup: bloodGroup as BloodGroup,
      phoneNumber: phoneNumber.trim(),
      district,
      upazila: upazila.trim(),
      lastDonationDate: lastDonationDate || '',
      availabilityStatus,
      totalDonations: totalDonations || 0,
      registeredAt: formatDateToISO(new Date()),
      isFictionalDemo: false,
    };

    onRegisterSuccess(newDonor);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
          <span>Voluntary Blood Donor Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Register as a Voluntary Donor
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Join our verified donor registry to help thalassemia patients in your district when blood is needed, or manage your existing donor profile.
        </p>
      </div>

      {/* 1. Existing Registered Profiles on this device */}
      {myRegisteredDonors.length > 0 && (
        <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-7 border-2 border-red-300 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Your Registered Donor Profile(s)
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  You are registered in the Thalcare BD donor directory. You can delete your profile anytime below.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-fit">
              {myRegisteredDonors.length} {myRegisteredDonors.length === 1 ? 'Profile Active' : 'Profiles Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {myRegisteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="p-4 rounded-2xl bg-white border-2 border-red-200 shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{donor.fullName}</h3>
                      <BloodGroupBadge group={donor.bloodGroup} size="sm" />
                    </div>
                    <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{donor.upazila}, {donor.district}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{donor.phoneNumber}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      donor.availabilityStatus === 'Available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {donor.availabilityStatus}
                  </span>
                </div>

                <div className="pt-3 border-t border-red-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Volunteered {donor.totalDonations} {donor.totalDonations === 1 ? 'time' : 'times'}
                  </span>

                  <button
                    id={`my-donor-delete-btn-${donor.id}`}
                    type="button"
                    onClick={() => setDonorToDelete(donor)}
                    className="px-3 py-1.5 rounded-xl border border-red-300 bg-red-50 hover:bg-red-600 hover:text-white text-red-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. New Donor Registration Form */}
      <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-10 border-2 border-red-200 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-red-200/80 pb-5 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">New Donor Details</h2>
            <p className="text-xs text-slate-600 font-medium">Join the network to save lives of thalassemia fighters.</p>
          </div>
          <button
            type="button"
            id="donor-autofill-btn"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-100/80 hover:bg-emerald-200 text-emerald-900 text-xs font-bold border border-emerald-300 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Fill Sample Data</span>
          </button>
        </div>

        {submitted && Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-100/70 border-2 border-red-300 text-red-900 text-xs">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Please correct the following fields before submitting:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 ml-1 font-medium">
              {Object.entries(errors).map(([key, err]) => (
                <li key={key}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Donor Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-red-200/60 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>1. Donor Personal Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Donor Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="donor-input-fullname"
                  type="text"
                  placeholder="e.g. Tanvir Hasan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                    submitted && errors.fullName
                      ? 'border-red-400 bg-red-50/40'
                      : 'border-red-200 focus:border-red-600'
                  }`}
                />
                {submitted && errors.fullName && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.fullName}</p>
                )}
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Age (Years) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="donor-input-age"
                    type="number"
                    min="18"
                    max="65"
                    placeholder="18-65"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                      submitted && errors.age
                        ? 'border-red-400 bg-red-50/40'
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
                    id="donor-select-gender"
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

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="donor-input-phone"
                  type="tel"
                  placeholder="017XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                    submitted && errors.phoneNumber
                      ? 'border-red-400 bg-red-50/40'
                      : 'border-red-200 focus:border-red-600'
                  }`}
                />
                <span className="text-[11px] text-slate-600 font-medium">Visible to patients searching for blood</span>
                {submitted && errors.phoneNumber && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Total Previous Donations */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Previous Blood Donations Count
                </label>
                <input
                  id="donor-input-total-donations"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 3"
                  value={totalDonations}
                  onChange={(e) => setTotalDonations(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                />
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
                    id={`donor-bg-select-${bg.replace('+', 'pos').replace('-', 'neg')}`}
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

          {/* Section 3: Location Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-red-200/60 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>2. Location & Availability</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  District <span className="text-red-600">*</span>
                </label>
                <select
                  id="donor-select-district"
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

              {/* Upazila */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Upazila / Area <span className="text-red-600">*</span>
                </label>
                {upazilaList.length > 0 ? (
                  <select
                    id="donor-select-upazila"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                  >
                    {upazilaList.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="donor-input-upazila"
                    type="text"
                    placeholder="Enter upazila"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
                  />
                )}
                {submitted && errors.upazila && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{errors.upazila}</p>
                )}
              </div>

              {/* Last Blood Donation Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Last Blood Donation Date (If any)
                </label>
                <input
                  id="donor-input-last-donation"
                  type="date"
                  value={lastDonationDate}
                  onChange={(e) => setLastDonationDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-red-200 bg-white text-sm focus:outline-none focus:border-red-600"
                />
                <span className="text-[11px] text-slate-600 font-medium">Leave blank if this is your first time</span>
              </div>

              {/* Availability Status Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Availability Status <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    id="donor-status-available-btn"
                    onClick={() => setAvailabilityStatus('Available')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      availabilityStatus === 'Available'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-[#fff8f8] text-slate-800 border-red-200 hover:bg-red-50'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Available</span>
                  </button>

                  <button
                    type="button"
                    id="donor-status-unavailable-btn"
                    onClick={() => setAvailabilityStatus('Currently Unavailable')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      availabilityStatus === 'Currently Unavailable'
                        ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                        : 'bg-[#fff8f8] text-slate-800 border-red-200 hover:bg-red-50'
                    }`}
                  >
                    <span>Currently Unavailable</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-red-200/60">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel & Return Home
            </button>

            <button
              id="donor-submit-btn"
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Join as Voluntary Donor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* 3. Lookup & Delete Existing Profile Panel */}
      <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-7 border-2 border-red-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <Trash2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Looking to Delete an Existing Donor Profile?
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              If you previously registered as a donor and wish to remove your phone number and profile from the search registry, search by mobile number below.
            </p>
          </div>
        </div>

        <form onSubmit={handleLookupDonor} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            id="donor-lookup-phone-input"
            type="tel"
            placeholder="Enter registered mobile (e.g. 017XXXXXXXX)"
            value={lookupPhone}
            onChange={(e) => setLookupPhone(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
          />
          <button
            id="donor-lookup-search-btn"
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find Profile</span>
          </button>
        </form>

        {lookupResult === 'not-found' && (
          <div className="p-3.5 rounded-xl bg-red-100/70 border border-red-200 text-xs text-red-800 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>No registered donor profile found with mobile "{lookupPhone}". Please verify the number.</span>
          </div>
        )}

        {lookupResult && lookupResult !== 'not-found' && (
          <div className="p-4 rounded-2xl bg-white border-2 border-red-300 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{lookupResult.fullName}</span>
                <BloodGroupBadge group={lookupResult.bloodGroup} size="sm" />
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {lookupResult.upazila}, {lookupResult.district} • Mobile: {lookupResult.phoneNumber}
              </p>
            </div>

            <button
              id={`lookup-delete-donor-${lookupResult.id}`}
              type="button"
              onClick={() => setDonorToDelete(lookupResult)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete This Profile</span>
            </button>
          </div>
        )}
      </div>

      {/* Delete Donor Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(donorToDelete)}
        onClose={() => setDonorToDelete(null)}
        onConfirm={() => {
          if (donorToDelete && onDeleteDonor) {
            onDeleteDonor(donorToDelete.id);
            if (lookupResult && lookupResult !== 'not-found' && lookupResult.id === donorToDelete.id) {
              setLookupResult(null);
              setLookupPhone('');
            }
          }
        }}
        title="Delete Donor Profile?"
        description="Are you sure you want to delete this voluntary donor profile? You will be completely removed from the blood donor directory and patients will no longer be able to contact you for emergency donations."
        itemName={donorToDelete ? `${donorToDelete.fullName} (${donorToDelete.bloodGroup}) - ${donorToDelete.district}` : undefined}
        confirmButtonText="Yes, Delete Donor Profile"
        warningNote="Your phone number and donation record will be removed from this registry immediately."
      />
    </div>
  );
};

