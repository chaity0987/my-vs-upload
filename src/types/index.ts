export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type AvailabilityStatus = 'Available' | 'Currently Unavailable';

export type RequestStatus = 'Urgent' | 'Fulfilled' | 'In Progress';

export interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: BloodGroup;
  guardianName: string;
  phoneNumber: string;
  district: string;
  hospitalName: string;
  lastTransfusionDate: string; // YYYY-MM-DD
  transfusionIntervalDays: number; // e.g. 14, 21, 28, or custom
  intervalLabel?: string; // '2 weeks' | '3 weeks' | '4 weeks' | 'Custom'
  weightKg?: number;
  registeredAt: string;
}

export interface Donor {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: BloodGroup;
  phoneNumber: string;
  district: string;
  upazila: string;
  lastDonationDate: string; // YYYY-MM-DD or empty
  availabilityStatus: AvailabilityStatus;
  totalDonations?: number;
  registeredAt: string;
  isFictionalDemo?: boolean;
}

export interface TransfusionRecord {
  id: string;
  patientId?: string;
  transfusionDate: string; // YYYY-MM-DD
  hospitalName: string;
  bloodUnits: number;
  preTransfusionHb?: number; // e.g. 7.5 g/dL
  donorName?: string;
  notes?: string;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospitalName: string;
  requiredDate: string; // YYYY-MM-DD
  requiredUnits: number;
  contactNumber: string;
  district: string;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export type PageId =
  | 'home'
  | 'patient-register'
  | 'donor-register'
  | 'dashboard'
  | 'donor-search'
  | 'blood-request'
  | 'transfusion-history'
  | 'reminder'
  | 'awareness'
  | 'about'
  | 'contact';

export interface ToastInfo {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'emergency';
  title?: string;
  message: string;
}

export type ToastMessage = ToastInfo;
