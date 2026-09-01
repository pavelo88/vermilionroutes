'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Check } from 'lucide-react';

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
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 font-sans">
      {/* Month Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-sm font-bold text-black dark:text-white">
            {monthNames[month]} {year}
          </h4>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="w-8 h-8 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        {daysOfWeek.map((dw) => (
          <div key={dw} className="py-1">
            {dw}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((dateObj, idx) => {
          if (!dateObj) {
            return <div key={`empty-${idx}`} className="h-9 sm:h-10" />;
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
              className={`h-9 sm:h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer relative ${
                isPast
                  ? 'text-zinc-400 dark:text-zinc-600 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 scale-105 z-10'
                  : isInRange
                  ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-500/30'
                  : 'text-black dark:text-zinc-100 hover:bg-emerald-100 dark:hover:bg-zinc-800 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <span>{dateObj.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Itinerary Dates Summary */}
      {selectedDate && (
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-zinc-700 dark:text-zinc-300">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">
              Fechas Seleccionadas:
            </span>
            <p className="font-medium text-zinc-900 dark:text-white">
              <strong>Salida:</strong> {selectedDate}
              {durationDays > 1 && (
                <> &bull; <strong>Retorno:</strong> {returnDateStr} ({durationDays} Días / {durationDays - 1} Noches)</>
              )}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
            <Check className="w-3.5 h-3.5" /> Salida Garantizada
          </span>
        </div>
      )}
    </div>
  );
}
