'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import CalendarCell from '@/components/calendar/CalendarCell';
import DailyTasksCard from '@/components/tasks/DailyTasksCard';
import DailyNotesCard from '@/components/notes/DailyNotesCard';
import { getMonthCalendarGrid, getDayTaskStatus } from '@/lib/calendar-utils';
import { formatMonthYear, formatFriendlyDate, toDateKey } from '@/lib/date-utils';

export default function CalendarView({
  activeDateKey,
  onSelectDate,
  tasks = {},
  notes = {},
  stats,
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onSaveNote,
}) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // October

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

  const activeDateTasks = tasks[activeDateKey] || [];
  const activeDateNote = notes[activeDateKey] || '';

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header */}
      <GlassCard className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            Full Learning Calendar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse your multi-month learning timeline, streaks, and day-by-day accountability records.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md rounded-2xl p-1.5 border border-white/70 shadow-xs">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-xl hover:bg-white/80 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-slate-800 px-3 min-w-[130px] text-center select-none">
            {formatMonthYear(currentYear, currentMonthIndex)}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-xl hover:bg-white/80 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>

      {/* 2-Column Calendar & Selected Day Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Expanded Calendar Grid (8 cols) */}
        <div className="xl:col-span-8">
          <GlassCard className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-3 text-center">
              {weekDayLabels.map((day) => (
                <span key={day} className="text-xs font-bold text-slate-500 py-1 uppercase tracking-wider">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3">
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
          </GlassCard>
        </div>

        {/* Day Inspector: Tasks and Notes for selected date (4 cols) */}
        <div className="xl:col-span-4 space-y-5">
          <DailyTasksCard
            activeDateKey={activeDateKey}
            tasks={activeDateTasks}
            onToggleTask={onToggleTask}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />

          <DailyNotesCard
            activeDateKey={activeDateKey}
            note={activeDateNote}
            onSaveNote={onSaveNote}
          />
        </div>
      </div>
    </div>
  );
}
