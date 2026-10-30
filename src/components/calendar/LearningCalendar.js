'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import CircularProgress from '@/components/ui/CircularProgress';
import CalendarCell from './CalendarCell';
import { getMonthCalendarGrid, getDayTaskStatus } from '@/lib/calendar-utils';
import { formatMonthYear, toDateKey } from '@/lib/date-utils';

export default function LearningCalendar({
  activeDateKey,
  onSelectDate,
  tasks = {},
  stats,
}) {
  // Default to October 2026 matching the screenshot reference
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // 0-indexed, 9 = October

  const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const gridCells = getMonthCalendarGrid(currentYear, currentMonthIndex);

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const handleJumpToToday = () => {
    // Jump to the reference screenshot date: Oct 13, 2026
    setCurrentYear(2026);
    setCurrentMonthIndex(9);
    onSelectDate('2026-10-13');
  };

  const completedDays = stats?.totalCompletedDays ?? 12;
  const duration = stats?.durationDays ?? 30;
  const monthlyPercentage = stats?.overallPercentage ?? 40;

  return (
    <GlassCard className="p-5 sm:p-6 flex flex-col justify-between">
      {/* Top Header: Title & Month Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/50">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Learning Calendar
          </h2>
        </div>

        {/* Month Navigation & Today Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/50 backdrop-blur-md rounded-2xl p-1 border border-white/70 shadow-xs">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-xl hover:bg-white/80 text-slate-600 hover:text-slate-900 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs sm:text-sm font-bold text-slate-800 px-2 min-w-[110px] text-center select-none">
              {formatMonthYear(currentYear, currentMonthIndex)}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-1 rounded-xl hover:bg-white/80 text-slate-600 hover:text-slate-900 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleJumpToToday}
            className="px-3 py-1.5 rounded-xl bg-white/60 hover:bg-white/85 text-xs font-semibold text-slate-800 border border-white/80 shadow-xs transition-all active:scale-95"
          >
            Today
          </button>
        </div>
      </div>

      {/* Main Calendar Body: Days Grid + Legend/Progress Side */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4">
        {/* Days of Week & Calendar Grid (3 Columns) */}
        <div className="lg:col-span-3">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center">
            {weekDayLabels.map((day) => (
              <span
                key={day}
                className="text-[11px] sm:text-xs font-semibold text-slate-500 py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Grid cells */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {gridCells.map((cell) => {
              const status = getDayTaskStatus(cell.dateKey, tasks);
              const isSelected = activeDateKey === cell.dateKey;
              const isToday = cell.dateKey === '2026-10-13';

              return (
                <CalendarCell
                  key={cell.dateKey}
                  cell={cell}
                  isSelected={isSelected}
                  status={status}
                  isToday={isToday}
                  onClick={() => onSelectDate(cell.dateKey)}
                />
              );
            })}
          </div>
        </div>

        {/* Legend & Monthly Progress Gauge (1 Column) */}
        <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 lg:pl-4 lg:border-l border-white/50">
          {/* Status Legend */}
          <div className="space-y-2 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
              <span>Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs" />
              <span>Partial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-xs" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-xs" />
              <span>Today</span>
            </div>
          </div>

          {/* Monthly Progress Ring */}
          <div className="flex flex-col items-center text-center pt-2">
            <span className="text-[11px] font-bold text-slate-600 mb-2">
              Monthly Progress
            </span>
            <CircularProgress
              percentage={monthlyPercentage}
              size={90}
              strokeWidth={7}
              startColor="#4F46E5"
              endColor="#3B82F6"
            />
            <span className="text-[11px] font-medium text-slate-500 mt-2">
              {completedDays} of {duration} days
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
