/**
 * Form validation utilities for Thalcare BD
 */

export function isValidBDPhone(phone: string): boolean {
  if (!phone) return false;
  // Clean all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Standard BD format: 01XXXXXXXXX (11 digits), or 8801XXXXXXXXX (13 digits), or general 11-digit mobile
  const bdRegex = /^(?:88)?01[3-9]\d{8}$/;
  if (bdRegex.test(cleaned)) return true;
  // Fallback: any standard 10 to 14 digit mobile number
  return cleaned.length >= 10 && cleaned.length <= 14;
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidAge(age: number | string, min = 0, max = 120): boolean {
  const num = typeof age === 'string' ? parseInt(age, 10) : age;
  return !isNaN(num) && num >= min && num <= max;
}

export function isValidBloodGroup(bg: string): boolean {
  const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validGroups.includes(bg);
}

export interface PatientFormErrors {
  fullName?: string;
  age?: string;
  gender?: string;
  bloodGroup?: string;
  guardianName?: string;
  phoneNumber?: string;
  district?: string;
  hospitalName?: string;
  lastTransfusionDate?: string;
  transfusionInterval?: string;
}

export function validatePatientForm(data: {
  fullName: string;
  age: string | number;
  gender: string;
  bloodGroup: string;
  guardianName: string;
  phoneNumber: string;
  district: string;
  hospitalName: string;
  lastTransfusionDate: string;
  transfusionIntervalDays: number;
}): { isValid: boolean; errors: PatientFormErrors } {
  const errors: PatientFormErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter patient full name (at least 2 characters).';
  }

  if (!data.age || !isValidAge(data.age, 0, 100)) {
    errors.age = 'Please enter a valid age (0–100 years).';
  }

  if (!data.gender) {
    errors.gender = 'Please select a gender.';
  }

  if (!data.bloodGroup || !isValidBloodGroup(data.bloodGroup)) {
    errors.bloodGroup = 'Please select a valid blood group.';
  }

  if (!data.guardianName || data.guardianName.trim().length < 2) {
    errors.guardianName = 'Please enter parent or guardian name.';
  }

  if (!data.phoneNumber || !isValidBDPhone(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid 11-digit Bangladeshi mobile number (e.g., 01712345678).';
  }

  if (!data.district) {
    errors.district = 'Please select your district.';
  }

  if (!data.hospitalName || data.hospitalName.trim().length < 2) {
    errors.hospitalName = 'Please enter current hospital or transfusion center name.';
  }

  if (!data.lastTransfusionDate) {
    errors.lastTransfusionDate = 'Please select your last blood transfusion date.';
  }

  if (!data.transfusionIntervalDays || data.transfusionIntervalDays <= 0) {
    errors.transfusionInterval = 'Please specify transfusion interval in days.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface DonorFormErrors {
  fullName?: string;
  age?: string;
  gender?: string;
  bloodGroup?: string;
  phoneNumber?: string;
  district?: string;
  upazila?: string;
  availabilityStatus?: string;
}

export function validateDonorForm(data: {
  fullName: string;
  age: string | number;
  gender: string;
  bloodGroup: string;
  phoneNumber: string;
  district: string;
  upazila: string;
}): { isValid: boolean; errors: DonorFormErrors } {
  const errors: DonorFormErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!data.age || !isValidAge(data.age, 18, 65)) {
    errors.age = 'Blood donors must be between 18 and 65 years old.';
  }

  if (!data.gender) {
    errors.gender = 'Please select gender.';
  }

  if (!data.bloodGroup || !isValidBloodGroup(data.bloodGroup)) {
    errors.bloodGroup = 'Please select your blood group.';
  }

  if (!data.phoneNumber || !isValidBDPhone(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid 11-digit mobile number (e.g., 01812345678).';
  }

  if (!data.district) {
    errors.district = 'Please select your district.';
  }

  if (!data.upazila || data.upazila.trim().length === 0) {
    errors.upazila = 'Please select or enter your upazila/area.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface BloodRequestErrors {
  patientName?: string;
  bloodGroup?: string;
  hospitalName?: string;
  requiredDate?: string;
  requiredUnits?: string;
  contactNumber?: string;
  district?: string;
}

export function validateBloodRequestForm(data: {
  patientName: string;
  bloodGroup: string;
  hospitalName: string;
  requiredDate: string;
  requiredUnits: number;
  contactNumber: string;
  district: string;
}): { isValid: boolean; errors: BloodRequestErrors } {
  const errors: BloodRequestErrors = {};

  if (!data.patientName || data.patientName.trim().length < 2) {
    errors.patientName = 'Please enter patient name.';
  }

  if (!data.bloodGroup || !isValidBloodGroup(data.bloodGroup)) {
    errors.bloodGroup = 'Please select blood group.';
  }

  if (!data.hospitalName || data.hospitalName.trim().length < 2) {
    errors.hospitalName = 'Please enter hospital name with address or department.';
  }

  if (!data.requiredDate) {
    errors.requiredDate = 'Please select date when blood is required.';
  }

  if (!data.requiredUnits || data.requiredUnits < 1 || data.requiredUnits > 10) {
    errors.requiredUnits = 'Please enter required blood units (1 to 10 bags).';
  }

  if (!data.contactNumber || !isValidBDPhone(data.contactNumber)) {
    errors.contactNumber = 'Please enter a valid emergency contact number.';
  }

  if (!data.district) {
    errors.district = 'Please select hospital district.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
