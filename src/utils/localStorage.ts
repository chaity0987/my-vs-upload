import { Donor, Patient, TransfusionRecord, BloodRequest, ContactMessage } from '../types';

export const STORAGE_KEYS = {
  PATIENT: 'thalcare_patient',
  DONORS: 'thalcare_donors',
  TRANSFUSIONS: 'thalcare_transfusions',
  BLOOD_REQUESTS: 'thalcare_blood_requests',
  MESSAGES: 'thalcare_messages',
  MY_DONOR_IDS: 'thalcare_my_donor_ids',
} as const;

export function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
  }
}

export function getData<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error reading data for key "${key}":`, error);
    return defaultValue;
  }
}

export function updateData<T>(key: string, updater: (current: T) => T, defaultValue: T): T {
  const current = getData<T>(key, defaultValue);
  const updated = updater(current);
  saveData(key, updated);
  return updated;
}

export function deleteData(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}":`, error);
  }
}

// Sample Bangladeshi Fictional Donors for demonstration
export const INITIAL_DEMO_DONORS: Donor[] = [
  {
    id: 'DON-101',
    fullName: 'Tanvir Ahmed',
    age: 26,
    gender: 'Male',
    bloodGroup: 'B+',
    phoneNumber: '01711234567',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    lastDonationDate: '2026-05-12',
    availabilityStatus: 'Available',
    totalDonations: 8,
    registeredAt: '2026-01-10',
    isFictionalDemo: true,
  },
  {
    id: 'DON-102',
    fullName: 'Fatema Tuz Zohra',
    age: 24,
    gender: 'Female',
    bloodGroup: 'O+',
    phoneNumber: '01822334455',
    district: 'Dhaka',
    upazila: 'Mirpur',
    lastDonationDate: '2026-04-20',
    availabilityStatus: 'Available',
    totalDonations: 5,
    registeredAt: '2026-02-14',
    isFictionalDemo: true,
  },
  {
    id: 'DON-103',
    fullName: 'Rahat Hossain',
    age: 29,
    gender: 'Male',
    bloodGroup: 'A+',
    phoneNumber: '01933445566',
    district: 'Chattogram',
    upazila: 'Agrabad',
    lastDonationDate: '2026-06-01',
    availabilityStatus: 'Available',
    totalDonations: 12,
    registeredAt: '2025-11-20',
    isFictionalDemo: true,
  },
  {
    id: 'DON-104',
    fullName: 'Nusrat Jahan',
    age: 23,
    gender: 'Female',
    bloodGroup: 'AB+',
    phoneNumber: '01644556677',
    district: 'Sylhet',
    upazila: 'Sylhet Sadar',
    lastDonationDate: '2026-03-15',
    availabilityStatus: 'Available',
    totalDonations: 4,
    registeredAt: '2026-03-01',
    isFictionalDemo: true,
  },
  {
    id: 'DON-105',
    fullName: 'Mahmudul Hasan',
    age: 31,
    gender: 'Male',
    bloodGroup: 'O-',
    phoneNumber: '01755667788',
    district: 'Rajshahi',
    upazila: 'Boalia',
    lastDonationDate: '2026-05-25',
    availabilityStatus: 'Available',
    totalDonations: 15,
    registeredAt: '2025-08-15',
    isFictionalDemo: true,
  },
  {
    id: 'DON-106',
    fullName: 'Sabrina Akter',
    age: 27,
    gender: 'Female',
    bloodGroup: 'A-',
    phoneNumber: '01866778899',
    district: 'Dhaka',
    upazila: 'Uttara',
    lastDonationDate: '2026-07-28',
    availabilityStatus: 'Currently Unavailable',
    totalDonations: 6,
    registeredAt: '2026-01-25',
    isFictionalDemo: true,
  },
  {
    id: 'DON-107',
    fullName: 'Asif Rahman',
    age: 28,
    gender: 'Male',
    bloodGroup: 'B-',
    phoneNumber: '01977889900',
    district: 'Khulna',
    upazila: 'Sonadanga',
    lastDonationDate: '2026-04-10',
    availabilityStatus: 'Available',
    totalDonations: 9,
    registeredAt: '2025-10-05',
    isFictionalDemo: true,
  },
  {
    id: 'DON-108',
    fullName: 'Fahim Shakil',
    age: 25,
    gender: 'Male',
    bloodGroup: 'AB-',
    phoneNumber: '01588990011',
    district: 'Barishal',
    upazila: 'Barishal Sadar',
    lastDonationDate: '2026-05-18',
    availabilityStatus: 'Available',
    totalDonations: 3,
    registeredAt: '2026-04-02',
    isFictionalDemo: true,
  },
  {
    id: 'DON-109',
    fullName: 'Shamsul Alam',
    age: 33,
    gender: 'Male',
    bloodGroup: 'B+',
    phoneNumber: '01799001122',
    district: 'Mymensingh',
    upazila: 'Mymensingh Sadar',
    lastDonationDate: '2026-06-14',
    availabilityStatus: 'Available',
    totalDonations: 11,
    registeredAt: '2025-09-12',
    isFictionalDemo: true,
  },
  {
    id: 'DON-110',
    fullName: 'Mehnaz Chowdhury',
    age: 26,
    gender: 'Female',
    bloodGroup: 'O+',
    phoneNumber: '01811223344',
    district: 'Rangpur',
    upazila: 'Rangpur Sadar',
    lastDonationDate: '2026-05-02',
    availabilityStatus: 'Available',
    totalDonations: 7,
    registeredAt: '2026-02-18',
    isFictionalDemo: true,
  }
];

export const INITIAL_DEMO_REQUESTS: BloodRequest[] = [
  {
    id: 'REQ-2026-801',
    patientName: 'Ayaan Haque (Age 7)',
    bloodGroup: 'B+',
    hospitalName: 'Dhaka Shishu (Children) Hospital',
    requiredDate: '2026-08-25',
    requiredUnits: 1,
    contactNumber: '01712987654',
    district: 'Dhaka',
    notes: 'Regular thalassemia transfusion requirement. Filtered fresh red blood cells needed.',
    status: 'Urgent',
    createdAt: '2026-08-20',
  },
  {
    id: 'REQ-2026-802',
    patientName: 'Sadia Karim (Age 12)',
    bloodGroup: 'O-',
    hospitalName: 'BSMMU (PG Hospital), Shahbagh',
    requiredDate: '2026-08-26',
    requiredUnits: 2,
    contactNumber: '01833449988',
    district: 'Dhaka',
    notes: 'Rare negative blood group required for child thalassemia patient.',
    status: 'Urgent',
    createdAt: '2026-08-19',
  },
  {
    id: 'REQ-2026-803',
    patientName: 'Tanvir Islam (Age 15)',
    bloodGroup: 'A+',
    hospitalName: 'Chattogram Medical College Hospital',
    requiredDate: '2026-08-28',
    requiredUnits: 1,
    contactNumber: '01922331100',
    district: 'Chattogram',
    notes: 'Transfusion due date approaching in 3 days. Patient Hb is 7.2 g/dL.',
    status: 'In Progress',
    createdAt: '2026-08-18',
  }
];

// Initialize default storage on first run
export function initializeStorage(forceReset = false): void {
  if (forceReset) {
    saveData(STORAGE_KEYS.DONORS, INITIAL_DEMO_DONORS);
    saveData(STORAGE_KEYS.BLOOD_REQUESTS, INITIAL_DEMO_REQUESTS);
    deleteData(STORAGE_KEYS.PATIENT);
    deleteData(STORAGE_KEYS.TRANSFUSIONS);
    deleteData(STORAGE_KEYS.MESSAGES);
    return;
  }

  // Check if donors exists
  const existingDonors = getData<Donor[]>(STORAGE_KEYS.DONORS, []);
  if (!existingDonors || existingDonors.length === 0) {
    saveData(STORAGE_KEYS.DONORS, INITIAL_DEMO_DONORS);
  }

  // Check if requests exists
  const existingRequests = getData<BloodRequest[]>(STORAGE_KEYS.BLOOD_REQUESTS, []);
  if (!existingRequests || existingRequests.length === 0) {
    saveData(STORAGE_KEYS.BLOOD_REQUESTS, INITIAL_DEMO_REQUESTS);
  }
}

// Patient Storage Helpers
export function getStoredPatient(): Patient | null {
  return getData<Patient | null>(STORAGE_KEYS.PATIENT, null);
}

export function saveStoredPatient(patient: Patient): void {
  saveData(STORAGE_KEYS.PATIENT, patient);
}

export function deleteStoredPatient(): void {
  deleteData(STORAGE_KEYS.PATIENT);
}

// User Registered Donors Tracker Helpers
export function getMyRegisteredDonorIds(): string[] {
  return getData<string[]>(STORAGE_KEYS.MY_DONOR_IDS, []);
}

export function saveMyRegisteredDonorIds(ids: string[]): void {
  saveData(STORAGE_KEYS.MY_DONOR_IDS, ids);
}

export function addMyRegisteredDonorId(id: string): void {
  const current = getMyRegisteredDonorIds();
  if (!current.includes(id)) {
    saveData(STORAGE_KEYS.MY_DONOR_IDS, [id, ...current]);
  }
}

export function removeMyRegisteredDonorId(id: string): void {
  const current = getMyRegisteredDonorIds();
  saveData(
    STORAGE_KEYS.MY_DONOR_IDS,
    current.filter((item) => item !== id)
  );
}

// Donors Storage Helpers
export function getStoredDonors(): Donor[] {
  const donors = getData<Donor[]>(STORAGE_KEYS.DONORS, []);
  if (!donors || donors.length === 0) {
    saveData(STORAGE_KEYS.DONORS, INITIAL_DEMO_DONORS);
    return INITIAL_DEMO_DONORS;
  }
  return donors;
}

export function saveStoredDonors(donors: Donor[]): void {
  saveData(STORAGE_KEYS.DONORS, donors);
}

export function addStoredDonor(donor: Donor): Donor[] {
  const current = getStoredDonors();
  const updated = [donor, ...current.filter((d) => d.id !== donor.id)];
  saveStoredDonors(updated);
  addMyRegisteredDonorId(donor.id);
  return updated;
}

export function deleteStoredDonor(id: string): Donor[] {
  const current = getStoredDonors();
  const updated = current.filter((d) => d.id !== id);
  saveStoredDonors(updated);
  removeMyRegisteredDonorId(id);
  return updated;
}

// Transfusion Records Storage Helpers
export function getStoredTransfusions(): TransfusionRecord[] {
  const list = getData<TransfusionRecord[]>(STORAGE_KEYS.TRANSFUSIONS, []);
  // Always return sorted by transfusionDate descending
  return [...list].sort(
    (a, b) => new Date(b.transfusionDate).getTime() - new Date(a.transfusionDate).getTime()
  );
}

export function saveStoredTransfusions(records: TransfusionRecord[]): void {
  const sorted = [...records].sort(
    (a, b) => new Date(b.transfusionDate).getTime() - new Date(a.transfusionDate).getTime()
  );
  saveData(STORAGE_KEYS.TRANSFUSIONS, sorted);
}

export function addStoredTransfusion(record: TransfusionRecord): TransfusionRecord[] {
  const current = getStoredTransfusions();
  const updated = [record, ...current];
  saveStoredTransfusions(updated);
  return getStoredTransfusions();
}

export function updateStoredTransfusion(record: TransfusionRecord): TransfusionRecord[] {
  const current = getStoredTransfusions();
  const updated = current.map((item) => (item.id === record.id ? record : item));
  saveStoredTransfusions(updated);
  return getStoredTransfusions();
}

export function deleteStoredTransfusion(id: string): TransfusionRecord[] {
  const current = getStoredTransfusions();
  const updated = current.filter((item) => item.id !== id);
  saveStoredTransfusions(updated);
  return updated;
}

// Blood Requests Storage Helpers
export function getStoredBloodRequests(): BloodRequest[] {
  const requests = getData<BloodRequest[]>(STORAGE_KEYS.BLOOD_REQUESTS, []);
  if (!requests || requests.length === 0) {
    saveData(STORAGE_KEYS.BLOOD_REQUESTS, INITIAL_DEMO_REQUESTS);
    return INITIAL_DEMO_REQUESTS;
  }
  return requests;
}

export function saveStoredBloodRequests(requests: BloodRequest[]): void {
  saveData(STORAGE_KEYS.BLOOD_REQUESTS, requests);
}

export function addStoredBloodRequest(request: BloodRequest): BloodRequest[] {
  const current = getStoredBloodRequests();
  const updated = [request, ...current];
  saveStoredBloodRequests(updated);
  return updated;
}

// Messages Storage Helpers
export function getStoredMessages(): ContactMessage[] {
  return getData<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
}

export function saveStoredMessages(messages: ContactMessage[]): void {
  saveData(STORAGE_KEYS.MESSAGES, messages);
}

export function resetAllDemoData(): void {
  initializeStorage(true);
}

