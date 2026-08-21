import React, { useState } from 'react';
import { Donor } from '../types';
import { BloodGroupBadge } from './BloodGroupBadge';
import { formatDisplayDate } from '../utils/dateCalculation';
import { Phone, MapPin, Calendar, Heart, Check, Copy, CheckCircle2, XCircle, Trash2, User } from 'lucide-react';

interface DonorCardProps {
  donor: Donor;
  onCallInitiated?: (donor: Donor) => void;
  isMyProfile?: boolean;
  onDelete?: (donor: Donor) => void;
}

export const DonorCard: React.FC<DonorCardProps> = ({
  donor,
  onCallInitiated,
  isMyProfile,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);

  const isAvailable = donor.availabilityStatus === 'Available';

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(donor.phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id={`donor-card-${donor.id}`}
      className={`rounded-2xl p-5 border-2 bg-[#fff8f8] shadow-xs transition-all duration-200 hover:shadow-md flex flex-col justify-between relative ${
        isMyProfile
          ? 'border-red-400 ring-2 ring-red-300/50'
          : isAvailable
          ? 'border-red-200 hover:border-red-400'
          : 'border-slate-300 bg-slate-100/60 opacity-90'
      }`}
    >
      {isMyProfile && (
        <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
          <User className="w-3 h-3" />
          <span>My Registered Profile</span>
        </div>
      )}

      <div>
        {/* Card Header: Name + Blood Group */}
        <div className="flex items-start justify-between gap-3 mb-3.5 mt-1">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 line-clamp-1">{donor.fullName}</h3>
              {donor.gender && (
                <span className="text-[11px] font-semibold text-slate-600 bg-red-100/70 px-1.5 py-0.5 rounded">
                  {donor.gender}, {donor.age}y
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>{donor.upazila}, {donor.district}</span>
            </div>
          </div>

          <BloodGroupBadge group={donor.bloodGroup} size="lg" variant="solid" />
        </div>

        {/* Status Badge & Donation Info */}
        <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-red-50/60 border border-red-100 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Availability</span>
            <div className="flex items-center gap-1.5 mt-0.5 font-bold">
              {isAvailable ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700">Available</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-600">Currently Unavailable</span>
                </>
              )}
            </div>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Last Donated</span>
            <div className="flex items-center gap-1.5 mt-0.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{donor.lastDonationDate ? formatDisplayDate(donor.lastDonationDate) : 'Not recorded'}</span>
            </div>
          </div>
        </div>

        {donor.totalDonations && donor.totalDonations > 0 ? (
          <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold mb-3">
            <Heart className="w-3.5 h-3.5 fill-red-600" />
            <span>Volunteered {donor.totalDonations} {donor.totalDonations === 1 ? 'time' : 'times'} previously</span>
          </div>
        ) : null}
      </div>

      {/* Action Buttons: Direct Call & Copy Phone + Delete Profile if owner/handler */}
      <div className="pt-3 border-t border-red-200/70 flex items-center gap-2">
        <a
          id={`call-donor-${donor.id}`}
          href={`tel:${donor.phoneNumber}`}
          onClick={() => onCallInitiated?.(donor)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
            isAvailable
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs shadow-red-600/20'
              : 'bg-slate-300 hover:bg-slate-400 text-slate-800'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call: {donor.phoneNumber}</span>
        </a>

        <button
          id={`copy-donor-phone-${donor.id}`}
          type="button"
          onClick={copyPhoneNumber}
          className="p-2 border border-red-200 rounded-xl hover:bg-red-100/70 text-slate-700 transition-colors bg-[#fff8f8]"
          title="Copy phone number"
          aria-label="Copy phone number"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>

        {onDelete && (
          <button
            id={`delete-donor-btn-${donor.id}`}
            type="button"
            onClick={() => onDelete(donor)}
            className="p-2 border border-red-300 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors shadow-xs"
            title="Delete Donor Profile"
            aria-label="Delete Donor Profile"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
