import React, { useState, useEffect } from 'react';
import { TransfusionRecord } from '../types';
import { formatDateToISO } from '../utils/dateCalculation';
import { X, Calendar, Hospital, Droplet, FileText, Check } from 'lucide-react';

interface TransfusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Omit<TransfusionRecord, 'id' | 'createdAt'>, existingId?: string) => void;
  initialRecord?: TransfusionRecord | null;
  patientHospital?: string;
}

export const TransfusionModal: React.FC<TransfusionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialRecord,
  patientHospital = '',
}) => {
  const [transfusionDate, setTransfusionDate] = useState(formatDateToISO(new Date()));
  const [hospitalName, setHospitalName] = useState(patientHospital || '');
  const [bloodUnits, setBloodUnits] = useState(1);
  const [preTransfusionHb, setPreTransfusionHb] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRecord) {
      setTransfusionDate(initialRecord.transfusionDate);
      setHospitalName(initialRecord.hospitalName);
      setBloodUnits(initialRecord.bloodUnits);
      setPreTransfusionHb(initialRecord.preTransfusionHb ? String(initialRecord.preTransfusionHb) : '');
      setDonorName(initialRecord.donorName || '');
      setNotes(initialRecord.notes || '');
    } else {
      setTransfusionDate(formatDateToISO(new Date()));
      setHospitalName(patientHospital || '');
      setBloodUnits(1);
      setPreTransfusionHb('');
      setDonorName('');
      setNotes('');
    }
    setError('');
  }, [initialRecord, isOpen, patientHospital]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transfusionDate) {
      setError('Please select transfusion date.');
      return;
    }
    if (!hospitalName.trim()) {
      setError('Please enter hospital or clinic name.');
      return;
    }
    if (bloodUnits < 1 || bloodUnits > 5) {
      setError('Blood units must be between 1 and 5 bags.');
      return;
    }

    onSave(
      {
        patientId: initialRecord?.patientId || 'patient-me',
        transfusionDate,
        hospitalName: hospitalName.trim(),
        bloodUnits: Number(bloodUnits),
        preTransfusionHb: preTransfusionHb ? parseFloat(preTransfusionHb) : undefined,
        donorName: donorName.trim() || undefined,
        notes: notes.trim() || undefined,
      },
      initialRecord ? initialRecord.id : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f8] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-red-200 relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-red-200/70 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <Droplet className="w-5 h-5 fill-red-600 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-display">
                {initialRecord ? 'Edit Transfusion Record' : 'Record Blood Transfusion'}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Updates schedule calculation and medical log
              </p>
            </div>
          </div>

          <button
            id="modal-close-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-red-100/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 text-xs rounded-xl border border-red-300 font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Transfusion Date <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                id="input-transfusion-date"
                type="date"
                required
                value={transfusionDate}
                onChange={(e) => setTransfusionDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Hospital / Transfusion Center <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                id="input-hospital-name"
                type="text"
                required
                placeholder="e.g. BSMMU / Dhaka Shishu Hospital"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Blood Units (Bags) <span className="text-red-600">*</span>
              </label>
              <select
                id="select-blood-units"
                value={bloodUnits}
                onChange={(e) => setBloodUnits(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 bg-white"
              >
                <option value={1}>1 Unit (Bag)</option>
                <option value={2}>2 Units (Bags)</option>
                <option value={3}>3 Units (Bags)</option>
                <option value={4}>4 Units (Bags)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Pre-Hb Level (g/dL)
              </label>
              <input
                id="input-pre-hb"
                type="number"
                step="0.1"
                min="3"
                max="18"
                placeholder="e.g. 7.8"
                value={preTransfusionHb}
                onChange={(e) => setPreTransfusionHb(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Donor Name / Blood Bank Source (Optional)
            </label>
            <input
              id="input-donor-name"
              type="text"
              placeholder="e.g. Voluntary donor / Red Crescent"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Clinical Notes / Chelation Notes (Optional)
            </label>
            <textarea
              id="textarea-transfusion-notes"
              rows={2}
              placeholder="e.g. Transfusion completed smoothly. Desirox / Deferasirox continued."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 bg-white"
            />
          </div>

          <div className="pt-3 border-t border-red-200/70 flex items-center justify-end gap-3">
            <button
              id="modal-cancel-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-slate-700 hover:bg-red-50 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              id="modal-submit-btn"
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm shadow-red-600/20 transition-all"
            >
              {initialRecord ? 'Save Changes' : 'Save Transfusion Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
