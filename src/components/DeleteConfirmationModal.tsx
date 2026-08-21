import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName?: string;
  confirmButtonText?: string;
  warningNote?: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  confirmButtonText = 'Yes, Delete Profile',
  warningNote,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="delete-confirmation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="delete-confirmation-modal-dialog"
        className="bg-[#fff8f8] rounded-3xl max-w-md w-full p-6 sm:p-7 border-2 border-red-300 shadow-2xl space-y-5 text-slate-900 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="delete-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-red-100/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>

        {itemName && (
          <div className="p-3.5 rounded-xl bg-red-100/70 border border-red-200 text-xs font-bold text-red-950 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Target Profile: <span className="underline">{itemName}</span></span>
          </div>
        )}

        {warningNote && (
          <p className="text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-200/80 leading-relaxed font-medium">
            {warningNote}
          </p>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            id="delete-modal-cancel-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
          >
            Cancel & Keep
          </button>
          <button
            id="delete-modal-confirm-btn"
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/25 transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>{confirmButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
