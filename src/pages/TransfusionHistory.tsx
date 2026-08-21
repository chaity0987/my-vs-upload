import React, { useState } from 'react';
import { PageId, Patient, TransfusionRecord } from '../types';
import { TransfusionModal } from '../components/TransfusionModal';
import { formatDisplayDate } from '../utils/dateCalculation';
import {
  History,
  PlusCircle,
  Edit2,
  Trash2,
  Hospital,
  Droplet,
  Calendar,
  FileText,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface TransfusionHistoryProps {
  patient: Patient | null;
  transfusions: TransfusionRecord[];
  onSaveTransfusion: (record: Omit<TransfusionRecord, 'id' | 'createdAt'>, existingId?: string) => void;
  onDeleteTransfusion: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const TransfusionHistory: React.FC<TransfusionHistoryProps> = ({
  patient,
  transfusions,
  onSaveTransfusion,
  onDeleteTransfusion,
  onNavigate,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TransfusionRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: TransfusionRecord) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    onDeleteTransfusion(id);
    setDeleteConfirmId(null);
  };

  const totalUnits = transfusions.reduce((sum, t) => sum + (t.bloodUnits || 1), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fff8f8] p-6 sm:p-8 rounded-3xl border-2 border-red-200 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
            <History className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Medical Records Log
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Transfusion History
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              Track past blood transfusions, pre-Hb levels, and medical notes
            </p>
          </div>
        </div>

        <button
          id="history-add-record-btn"
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Transfusion Record</span>
        </button>
      </div>

      {/* Summary Stat Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#fff8f8] border-2 border-red-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Total Transfusions Logged
          </span>
          <span className="text-2xl font-black text-slate-900 font-display mt-1 block">
            {transfusions.length}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#fff8f8] border-2 border-red-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Total Blood Units Received
          </span>
          <span className="text-2xl font-black text-red-600 font-display mt-1 block">
            {totalUnits} Units
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#fff8f8] border-2 border-red-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Current Schedule
          </span>
          <span className="text-base font-bold text-slate-900 font-display mt-1.5 block">
            {patient ? `Every ${patient.transfusionIntervalDays} Days` : 'Not Set'}
          </span>
        </div>
      </div>

      {/* Transfusion Records List */}
      <div className="bg-[#fff8f8] rounded-3xl border-2 border-red-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-red-200/70 flex items-center justify-between">
          <h2 className="font-bold text-base text-slate-900 font-display">
            All Transfusion Entries ({transfusions.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">Sorted by most recent</span>
        </div>

        {transfusions.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-400 flex items-center justify-center mx-auto">
              <Droplet className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Transfusion Records Found</h3>
            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
              Click the button below to add your first transfusion record. This will calibrate your next due date reminder.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
            >
              Add First Record
            </button>
          </div>
        ) : (
          <div className="divide-y divide-red-100">
            {transfusions.map((record, index) => (
              <div
                key={record.id}
                id={`transfusion-row-${record.id}`}
                className="p-5 sm:p-6 hover:bg-red-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-base text-slate-900">
                      {formatDisplayDate(record.transfusionDate)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
                      {record.bloodUnits} {record.bloodUnits === 1 ? 'Unit' : 'Units'} (Bag)
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        Latest Transfusion
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Hospital className="w-3.5 h-3.5 text-red-500" />
                      <span>{record.hospitalName}</span>
                    </div>

                    {record.preTransfusionHb && (
                      <div className="flex items-center gap-1.5 font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Pre-Transfusion Hb: {record.preTransfusionHb} g/dL</span>
                      </div>
                    )}

                    {record.donorName && (
                      <div className="text-slate-600 font-medium">
                        Donor: <strong>{record.donorName}</strong>
                      </div>
                    )}
                  </div>

                  {record.notes && (
                    <p className="text-xs text-slate-600 italic pt-1 font-medium">
                      Note: {record.notes}
                    </p>
                  )}
                </div>

                {/* Actions: Edit & Delete */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-red-100">
                  <button
                    id={`edit-transfusion-${record.id}`}
                    type="button"
                    onClick={() => handleOpenEdit(record)}
                    className="p-2 rounded-xl border border-red-200 hover:bg-white text-slate-700 transition-colors"
                    title="Edit record"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {deleteConfirmId === record.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        id={`confirm-delete-${record.id}`}
                        onClick={() => handleDelete(record.id)}
                        className="px-2.5 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1.5 border border-red-200 rounded-lg text-xs text-slate-700 bg-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      id={`delete-transfusion-${record.id}`}
                      type="button"
                      onClick={() => setDeleteConfirmId(record.id)}
                      className="p-2 rounded-xl border border-red-200 hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transfusion Modal for Adding or Editing */}
      <TransfusionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={onSaveTransfusion}
        initialRecord={editingRecord}
        patientHospital={patient?.hospitalName || ''}
      />
    </div>
  );
};
