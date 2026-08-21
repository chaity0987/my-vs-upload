import React, { useState, useEffect } from 'react';
import {
  PageId,
  Patient,
  Donor,
  TransfusionRecord,
  BloodRequest,
  ContactMessage,
  ToastMessage,
  BloodGroup,
} from './types';
import {
  getStoredPatient,
  saveStoredPatient,
  deleteStoredPatient,
  getStoredDonors,
  saveStoredDonors,
  addStoredDonor,
  deleteStoredDonor,
  getMyRegisteredDonorIds,
  getStoredTransfusions,
  saveStoredTransfusions,
  addStoredTransfusion,
  updateStoredTransfusion,
  deleteStoredTransfusion,
  getStoredBloodRequests,
  saveStoredBloodRequests,
  addStoredBloodRequest,
  saveStoredMessages,
  getStoredMessages,
  resetAllDemoData,
} from './utils/localStorage';
import { formatDateToISO } from './utils/dateCalculation';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { PatientRegistration } from './pages/PatientRegistration';
import { DonorRegistration } from './pages/DonorRegistration';
import { Dashboard } from './pages/Dashboard';
import { DonorSearch } from './pages/DonorSearch';
import { BloodRequestPage } from './pages/BloodRequest';
import { TransfusionHistory } from './pages/TransfusionHistory';
import { ReminderPage } from './pages/Reminder';
import { AwarenessPage } from './pages/Awareness';
import { ContactPage } from './pages/Contact';
import { AboutPage } from './pages/About';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [extraParams, setExtraParams] = useState<any>(null);

  // Local Storage States
  const [patient, setPatient] = useState<Patient | null>(null);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [myDonorIds, setMyDonorIds] = useState<string[]>([]);
  const [transfusions, setTransfusions] = useState<TransfusionRecord[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const p = getStoredPatient();
      const d = getStoredDonors();
      const myIds = getMyRegisteredDonorIds();
      const t = getStoredTransfusions();
      const r = getStoredBloodRequests();

      setPatient(p);
      setDonors(d);
      setMyDonorIds(myIds);
      setTransfusions(t);
      setBloodRequests(r);
    } catch (e) {
      console.error('Failed to load initial localStorage data', e);
    }
  }, []);

  // Toast Helper
  const addToast = (
    title: string,
    message?: string,
    type: 'success' | 'error' | 'warning' | 'info' | 'emergency' = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message: message || '', type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Handler with scroll to top
  const handleNavigate = (page: PageId, params?: any) => {
    setCurrentPage(page);
    setExtraParams(params || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Patient Registration / Update
  const handleSavePatient = (newPatient: Patient, initialTransfusion?: TransfusionRecord) => {
    saveStoredPatient(newPatient);
    setPatient(newPatient);

    // If an initial transfusion record was passed or created, save it
    if (initialTransfusion) {
      const updatedTransfusions = [initialTransfusion, ...transfusions.filter((t) => t.id !== initialTransfusion.id)];
      saveStoredTransfusions(updatedTransfusions);
      setTransfusions(updatedTransfusions);
    } else if (transfusions.length === 0 && newPatient.lastTransfusionDate) {
      const initialRecord: TransfusionRecord = {
        id: `TR-${Date.now()}`,
        patientId: newPatient.id,
        transfusionDate: newPatient.lastTransfusionDate,
        hospitalName: newPatient.hospitalName,
        bloodUnits: 1,
        notes: 'Initial transfusion record from registration profile',
        createdAt: formatDateToISO(new Date()),
      };
      const updatedTransfusions = [initialRecord];
      saveStoredTransfusions(updatedTransfusions);
      setTransfusions(updatedTransfusions);
    }

    addToast(
      'Profile Saved Successfully!',
      `Patient profile for ${newPatient.fullName} (${newPatient.bloodGroup}) is now active.`,
      'success'
    );
    handleNavigate('dashboard');
  };

  // Delete Patient Profile
  const handleDeletePatient = () => {
    deleteStoredPatient();
    setPatient(null);
    addToast(
      'Patient Profile Deleted',
      'Your patient profile and personal data have been completely deleted from this device.',
      'info'
    );
    handleNavigate('home');
  };

  // Donor Registration
  const handleRegisterDonor = (newDonor: Donor) => {
    addStoredDonor(newDonor);
    setDonors((prev) => [newDonor, ...prev]);
    setMyDonorIds((prev) => (prev.includes(newDonor.id) ? prev : [newDonor.id, ...prev]));

    addToast(
      'Welcome to Voluntary Donor Registry!',
      `Thank you ${newDonor.fullName}. Your ${newDonor.bloodGroup} donor profile is now searchable.`,
      'success'
    );
    handleNavigate('donor-search', { bloodGroup: newDonor.bloodGroup, district: newDonor.district });
  };

  // Delete Donor Profile
  const handleDeleteDonor = (donorId: string) => {
    const updated = deleteStoredDonor(donorId);
    setDonors(updated);
    setMyDonorIds((prev) => prev.filter((id) => id !== donorId));

    addToast(
      'Donor Profile Deleted',
      'The voluntary donor profile has been removed from the registry directory.',
      'info'
    );
  };

  // Emergency Blood Request Submission
  const handleSubmitBloodRequest = (newRequest: BloodRequest) => {
    addStoredBloodRequest(newRequest);
    setBloodRequests((prev) => [newRequest, ...prev]);

    addToast(
      'Emergency Request Registered!',
      `Request ID: ${newRequest.id} for ${newRequest.bloodGroup} at ${newRequest.hospitalName}.`,
      'success'
    );
  };

  // Transfusion Log Management (Add/Edit)
  const handleSaveTransfusion = (
    recordData: Omit<TransfusionRecord, 'id' | 'createdAt'>,
    existingId?: string
  ) => {
    let updatedList: TransfusionRecord[];

    if (existingId) {
      const existing = transfusions.find((t) => t.id === existingId);
      const updatedRecord: TransfusionRecord = {
        ...recordData,
        id: existingId,
        createdAt: existing?.createdAt || formatDateToISO(new Date()),
      };
      updatedList = updateStoredTransfusion(updatedRecord);
    } else {
      const newRecord: TransfusionRecord = {
        ...recordData,
        id: `TR-${Date.now()}`,
        createdAt: formatDateToISO(new Date()),
      };
      updatedList = addStoredTransfusion(newRecord);
    }

    setTransfusions(updatedList);

    // Auto-update patient last transfusion date if the latest record date is newer or changed
    if (patient && updatedList.length > 0) {
      const latestRecord = updatedList[0];
      const updatedPatient: Patient = {
        ...patient,
        lastTransfusionDate: latestRecord.transfusionDate,
      };
      saveStoredPatient(updatedPatient);
      setPatient(updatedPatient);
    }

    addToast(
      existingId ? 'Transfusion Record Updated' : 'Transfusion Logged Successfully',
      'Your next due date reminder and schedule timeline have been recalibrated.',
      'success'
    );
  };

  // Delete Transfusion Record
  const handleDeleteTransfusion = (id: string) => {
    const updatedList = deleteStoredTransfusion(id);
    setTransfusions(updatedList);

    // If latest record changed, recalibrate patient last transfusion date
    if (patient) {
      if (updatedList.length > 0) {
        const latestRecord = updatedList[0];
        const updatedPatient: Patient = {
          ...patient,
          lastTransfusionDate: latestRecord.transfusionDate,
        };
        saveStoredPatient(updatedPatient);
        setPatient(updatedPatient);
      }
    }

    addToast('Record Deleted', 'The transfusion entry was removed.', 'info');
  };

  // Contact Message submission
  const handleSendMessage = (msg: ContactMessage) => {
    const existing = getStoredMessages();
    saveStoredMessages([msg, ...existing]);
    addToast('Message Sent', 'Thank you for reaching out to Thalcare BD support.', 'success');
  };

  // Render Current Page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            patient={patient}
            onNavigate={handleNavigate}
            donors={donors}
            bloodRequests={bloodRequests}
          />
        );

      case 'patient-register':
        return (
          <PatientRegistration
            existingPatient={patient}
            onSavePatient={handleSavePatient}
            onDeletePatient={handleDeletePatient}
            onNavigate={handleNavigate}
          />
        );

      case 'donor-register':
        return (
          <DonorRegistration
            donors={donors}
            myDonorIds={myDonorIds}
            onRegisterSuccess={handleRegisterDonor}
            onDeleteDonor={handleDeleteDonor}
            onNavigate={handleNavigate}
          />
        );

      case 'dashboard':
        return (
          <Dashboard
            patient={patient}
            transfusions={transfusions}
            bloodRequests={bloodRequests}
            onNavigate={handleNavigate}
            onSaveTransfusion={handleSaveTransfusion}
            onDeletePatient={handleDeletePatient}
          />
        );

      case 'donor-search':
        return (
          <DonorSearch
            donors={donors}
            myDonorIds={myDonorIds}
            onDeleteDonor={handleDeleteDonor}
            onNavigate={handleNavigate}
            initialFilters={extraParams}
          />
        );

      case 'blood-request':
        return (
          <BloodRequestPage
            patient={patient}
            bloodRequests={bloodRequests}
            onSubmitRequest={handleSubmitBloodRequest}
            onNavigate={handleNavigate}
            initialParams={extraParams}
          />
        );

      case 'transfusion-history':
        return (
          <TransfusionHistory
            patient={patient}
            transfusions={transfusions}
            onSaveTransfusion={handleSaveTransfusion}
            onDeleteTransfusion={handleDeleteTransfusion}
            onNavigate={handleNavigate}
          />
        );

      case 'reminder':
        return (
          <ReminderPage
            patient={patient}
            onNavigate={handleNavigate}
            onSaveTransfusion={handleSaveTransfusion}
          />
        );

      case 'awareness':
        return <AwarenessPage onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactPage onSendMessage={handleSendMessage} onNavigate={handleNavigate} />;

      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;

      default:
        return (
          <Home
            patient={patient}
            onNavigate={handleNavigate}
            donors={donors}
            bloodRequests={bloodRequests}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf4f4] font-sans text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        patient={patient}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-16">{renderPage()}</main>

      {/* Persistent Footer with Disclaimer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
