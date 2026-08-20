'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Sparkles, Check } from 'lucide-react';

interface TravelDatePickerProps {
  selectedDate: string;
  onDateSelect: (dateStr: string) => void;
  durationDays?: number;
}

export function TravelDatePicker({ selectedDate, onDateSelect, durationDays = 1 }: TravelDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  const formatDateYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;

  // Calculate return date if multi-day
  const returnDateObj = selectedDateObj && durationDays > 1
    ? new Date(selectedDateObj.getTime() + (durationDays - 1) * 24 * 60 * 60 * 1000)
    : null;

  const returnDateStr = returnDateObj ? formatDateYMD(returnDateObj) : '';

  return (
    <div className="bg-zinc-950/80 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 font-sans">
      {/* Month Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-500" />
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
            {monthNames[month]} {year}
          </h4>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="w-7 h-7 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="w-7 h-7 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
        {daysOfWeek.map((dw) => (
          <div key={dw} className="py-1">
            {dw}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dateObj, idx) => {
          if (!dateObj) {
            return <div key={`empty-${idx}`} className="h-8 sm:h-9" />;
          }

          const isPast = dateObj < today;
          const dateStr = formatDateYMD(dateObj);
          const isSelected = selectedDate === dateStr;

          // In-range calculation
          let isInRange = false;
          if (selectedDateObj && returnDateObj && dateObj > selectedDateObj && dateObj <= returnDateObj) {
            isInRange = true;
          }

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isPast}
              onClick={() => onDateSelect(dateStr)}
              className={`h-8 sm:h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer relative ${
                isPast
                  ? 'text-zinc-600 dark:text-zinc-700 opacity-40 cursor-not-allowed'
                  : isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50 scale-105 z-10'
                  : isInRange
                  ? 'bg-emerald-500/20 text-emerald-300 dark:text-emerald-200 border border-emerald-500/30'
                  : 'text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600'
              }`}
            >
              <span>{dateObj.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Itinerary Dates Summary */}
      {selectedDate && (
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-zinc-600 dark:text-zinc-300">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider block">
              Confirmed Travel Window:
            </span>
            <p className="font-medium text-zinc-900 dark:text-white">
              <strong>Departure:</strong> {selectedDate}
              {durationDays > 1 && (
                <> &bull; <strong>Return:</strong> {returnDateStr} ({durationDays} Days / {durationDays - 1} Nights)</>
              )}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
            <Check className="w-3 h-3" /> Date Guaranteed
          </span>
        </div>
      )}
    </div>
  );
}
