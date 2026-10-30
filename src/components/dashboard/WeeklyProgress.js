'use client';

import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function WeeklyProgress({ weeklyData = [] }) {
  const [selectedRange, setSelectedRange] = useState('This Week');

  // Fallback default days if weeklyData is empty
  const defaultDays = [
    { day: 'Mon', percentage: 40, isComplete: false },
    { day: 'Tue', percentage: 45, isComplete: false },
    { day: 'Wed', percentage: 30, isComplete: false },
    { day: 'Thu', percentage: 65, isComplete: false },
    { day: 'Fri', percentage: 100, isComplete: true },
    { day: 'Sat', percentage: 50, isComplete: false },
    { day: 'Sun', percentage: 40, isComplete: false },
  ];

  const days = weeklyData.length > 0 ? weeklyData : defaultDays;

  return (
    <GlassCard className="p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/50">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Weekly Progress
          </h3>
        </div>

        {/* Dropdown Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/60 hover:bg-white/80 border border-white/80 text-xs font-semibold text-slate-700 cursor-pointer shadow-xs">
          <span>{selectedRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>

      {/* Chart Canvas with Y-Axis and 3D Rounded Bars */}
      <div className="pt-4 flex items-end gap-3 h-40">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between h-28 text-[10px] font-semibold text-slate-400 select-none pb-1">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>

        {/* Vertical Bars Container */}
        <div className="flex-1 grid grid-cols-7 gap-2 sm:gap-3 items-end h-28 pb-1 border-b border-slate-200/50">
          {days.map((item, index) => {
            const heightPercent = Math.max(15, item.percentage || 15);
            const isFull = item.percentage === 100 || item.isComplete || item.day === 'Fri';

            return (
              <div key={index} className="flex flex-col items-center h-full justify-end group">
                {/* 3D Glass Pill Bar */}
                <div className="relative w-full max-w-[28px] h-full flex items-end">
                  <div
                    className={`
                      w-full rounded-xl transition-all duration-500 ease-out relative overflow-hidden
                      border shadow-sm group-hover:scale-[1.03]
                      ${
                        isFull
                          ? 'bg-gradient-to-t from-emerald-500 to-emerald-400 border-emerald-300 shadow-emerald-500/20'
                          : 'bg-gradient-to-t from-indigo-500 to-blue-400 border-indigo-300/80 shadow-indigo-500/15'
                      }
                    `}
                    style={{ height: `${heightPercent}%` }}
                  >
                    {/* Glass sheen highlight */}
                    <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                  </div>
                </div>

                {/* Day Label */}
                <span className="text-[11px] font-medium text-slate-600 mt-2 block">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
