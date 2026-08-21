/**
 * Date calculation and reminder utilities for Thalcare BD
 */

export function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  return new Date(dateStr);
}

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateNextDueDate(lastTransfusionDate: string, intervalDays: number): string {
  if (!lastTransfusionDate) return '';
  const lastDate = parseDate(lastTransfusionDate);
  const nextDate = new Date(lastDate);
  nextDate.setDate(lastDate.getDate() + (intervalDays || 21));
  return formatDateToISO(nextDate);
}

export function calculateRemainingDays(nextDueDateStr: string): number {
  if (!nextDueDateStr) return 0;
  const nextDate = parseDate(nextDueDateStr);
  const today = new Date();
  
  // Set to midnight for accurate day difference comparison
  const nextMidnight = new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = nextMidnight.getTime() - todayMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export type ReminderState = 'Upcoming' | 'Due Soon' | 'Due Today' | 'Overdue';

export function getReminderStatus(remainingDays: number): {
  status: ReminderState;
  colorClass: string;
  badgeClass: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  description: string;
} {
  if (remainingDays < 0) {
    return {
      status: 'Overdue',
      colorClass: 'text-red-700 bg-red-100 border-red-300',
      badgeClass: 'bg-red-600 text-white',
      bgClass: 'bg-red-50',
      textClass: 'text-red-700',
      borderClass: 'border-red-400',
      description: `Transfusion is overdue by ${Math.abs(remainingDays)} ${Math.abs(remainingDays) === 1 ? 'day' : 'days'}. Please contact your hospital or find a donor urgently.`
    };
  }
  
  if (remainingDays === 0) {
    return {
      status: 'Due Today',
      colorClass: 'text-rose-700 bg-rose-100 border-rose-300',
      badgeClass: 'bg-rose-600 text-white',
      bgClass: 'bg-rose-50',
      textClass: 'text-rose-700',
      borderClass: 'border-rose-400',
      description: 'Your blood transfusion is scheduled for today. Prepare for your hospital appointment.'
    };
  }
  
  if (remainingDays <= 3) {
    return {
      status: 'Due Soon',
      colorClass: 'text-amber-800 bg-amber-100 border-amber-300',
      badgeClass: 'bg-amber-500 text-white',
      bgClass: 'bg-amber-50',
      textClass: 'text-amber-700',
      borderClass: 'border-amber-400',
      description: `Transfusion is due in ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}. Ensure donor confirmation and hospital bed availability.`
    };
  }

  return {
    status: 'Upcoming',
    colorClass: 'text-emerald-800 bg-emerald-100 border-emerald-300',
    badgeClass: 'bg-emerald-600 text-white',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-300',
    description: `Your transfusion schedule is on track. ${remainingDays} days remaining.`
  };
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return 'Not recorded';
  const d = parseDate(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatFullDate(dateStr: string): string {
  if (!dateStr) return 'Not recorded';
  const d = parseDate(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getIntervalDaysFromLabel(label: string): number {
  switch (label) {
    case '2 weeks':
      return 14;
    case '3 weeks':
      return 21;
    case '4 weeks':
      return 28;
    default:
      return 21;
  }
}
