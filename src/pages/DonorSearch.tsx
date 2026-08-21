import React, { useState, useEffect, useMemo } from 'react';
import { PageId, Donor, BloodGroup } from '../types';
import { DonorCard } from '../components/DonorCard';
import { BloodGroupBadge } from '../components/BloodGroupBadge';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { ALL_DISTRICT_NAMES, getUpazilasForDistrict } from '../utils/bangladeshLocations';
import { Search, RotateCcw, AlertTriangle, Filter, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface DonorSearchProps {
  donors: Donor[];
  onNavigate: (page: PageId, extraParam?: any) => void;
  initialFilters?: {
    bloodGroup?: BloodGroup | '';
    district?: string;
  };
  myDonorIds?: string[];
  onDeleteDonor?: (donorId: string) => void;
}

export const DonorSearch: React.FC<DonorSearchProps> = ({
  donors,
  onNavigate,
  initialFilters,
  myDonorIds = [],
  onDeleteDonor,
}) => {
  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | ''>(
    initialFilters?.bloodGroup || ''
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    initialFilters?.district || ''
  );
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'Available' | 'Currently Unavailable'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [donorToDelete, setDonorToDelete] = useState<Donor | null>(null);

  // Update when initial filters change
  useEffect(() => {
    if (initialFilters?.bloodGroup) {
      setSelectedBloodGroup(initialFilters.bloodGroup);
    }
    if (initialFilters?.district) {
      setSelectedDistrict(initialFilters.district);
    }
  }, [initialFilters]);

  const upazilaOptions = useMemo(() => {
    if (!selectedDistrict) return [];
    return getUpazilasForDistrict(selectedDistrict);
  }, [selectedDistrict]);

  const handleDistrictChange = (d: string) => {
    setSelectedDistrict(d);
    setSelectedUpazila('');
  };

  const handleReset = () => {
    setSelectedBloodGroup('');
    setSelectedDistrict('');
    setSelectedUpazila('');
    setAvailabilityFilter('all');
    setSearchTerm('');
  };

  // Filtered Donors calculation
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      // Blood group filter
      if (selectedBloodGroup && donor.bloodGroup !== selectedBloodGroup) {
        return false;
      }

      // District filter
      if (selectedDistrict && donor.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }

      // Upazila filter
      if (selectedUpazila && donor.upazila.toLowerCase() !== selectedUpazila.toLowerCase()) {
        return false;
      }

      // Availability filter
      if (availabilityFilter !== 'all' && donor.availabilityStatus !== availabilityFilter) {
        return false;
      }

      // General Search query (Name, phone, or location)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = donor.fullName.toLowerCase().includes(query);
        const matchesPhone = donor.phoneNumber.includes(query);
        const matchesDistrict = donor.district.toLowerCase().includes(query);
        const matchesUpazila = donor.upazila.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesDistrict && !matchesUpazila) {
          return false;
        }
      }

      return true;
    });
  }, [donors, selectedBloodGroup, selectedDistrict, selectedUpazila, availabilityFilter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <Search className="w-3.5 h-3.5 text-rose-600" />
          <span>Voluntary Blood Donor Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Find a Blood Donor
        </h1>
        <p className="text-sm text-slate-600">
          Search verified voluntary donors by blood group, district, and upazila across Bangladesh.
        </p>
      </div>

      {/* Filter Control Box */}
      <div className="bg-[#fff8f8] rounded-3xl p-6 sm:p-8 border-2 border-red-200 shadow-xl space-y-6">
        {/* Blood Group Chips */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Filter by Blood Group
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="donor-filter-all-bg"
              onClick={() => setSelectedBloodGroup('')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedBloodGroup === ''
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-red-50 text-slate-700 border-red-200 hover:bg-red-100'
              }`}
            >
              All Blood Groups
            </button>

            {bloodGroups.map((bg) => {
              const isSelected = selectedBloodGroup === bg;
              return (
                <button
                  key={bg}
                  id={`donor-filter-bg-${bg.replace('+', 'pos').replace('-', 'neg')}`}
                  onClick={() => setSelectedBloodGroup(isSelected ? '' : bg)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20 scale-105'
                      : 'bg-red-50/60 text-slate-800 border-red-200 hover:border-red-400 hover:bg-red-100'
                  }`}
                >
                  {bg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* District Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              District
            </label>
            <select
              id="donor-search-district-select"
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
            >
              <option value="">All 64 Districts</option>
              {ALL_DISTRICT_NAMES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Upazila / Thana
            </label>
            <select
              id="donor-search-upazila-select"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrict || upazilaOptions.length === 0}
              className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">
                {selectedDistrict ? 'All Upazilas' : 'Select District First'}
              </option>
              {upazilaOptions.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Availability
            </label>
            <select
              id="donor-search-availability-select"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
            >
              <option value="all">Any Status</option>
              <option value="Available">Available Only (Ready to Donate)</option>
              <option value="Currently Unavailable">Currently Unavailable</option>
            </select>
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Keyword / Name
            </label>
            <input
              id="donor-search-keyword-input"
              type="text"
              placeholder="Search donor name or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:border-red-600 bg-white"
            />
          </div>
        </div>

        {/* Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-red-200/60">
          <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-red-600" />
            <span>
              Showing <strong>{filteredDonors.length}</strong> matching{' '}
              {filteredDonors.length === 1 ? 'donor' : 'donors'}
            </span>
          </div>

          <button
            id="donor-search-reset-btn"
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl border border-red-200 hover:bg-red-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div>
        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDonors.map((donor) => {
              const isMy = myDonorIds.includes(donor.id) || (!donor.isFictionalDemo && donor.id.startsWith('DON-'));
              return (
                <DonorCard
                  key={donor.id}
                  donor={donor}
                  isMyProfile={isMy}
                  onDelete={onDeleteDonor ? (d) => setDonorToDelete(d) : undefined}
                />
              );
            })}
          </div>
        ) : (
          /* Empty Search State with Emergency Blood Request Fallback CTA */
          <div className="bg-[#fff8f8] rounded-3xl p-8 sm:p-12 border-2 border-red-200 text-center max-w-2xl mx-auto space-y-5 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                No suitable donor found.
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                We could not find any voluntary donors matching your current filter criteria ({selectedBloodGroup || 'All Blood Groups'} in {selectedDistrict || 'all districts'}).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-left space-y-3">
              <p className="text-xs font-semibold text-red-900">
                You can submit an emergency blood request immediately:
              </p>
              <p className="text-xs text-red-700 leading-relaxed">
                Emergency requests are highlighted across the platform and made visible to all volunteers and coordinators.
              </p>

              <button
                id="search-empty-emergency-request-btn"
                onClick={() =>
                  onNavigate('blood-request', {
                    bloodGroup: selectedBloodGroup || undefined,
                    district: selectedDistrict || undefined,
                  })
                }
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Create Emergency Blood Request</span>
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Clear filters and view all donors
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
            setDonorToDelete(null);
          }
        }}
        title="Delete Donor Profile?"
        description="Are you sure you want to delete this voluntary donor profile? You will be removed from the blood donor search registry."
        itemName={donorToDelete ? `${donorToDelete.fullName} (${donorToDelete.bloodGroup})` : undefined}
        confirmButtonText="Yes, Delete Donor Profile"
      />
    </div>
  );
};
