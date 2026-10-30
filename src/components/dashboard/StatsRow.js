'use client';

import { Calendar, Flame, BarChart2, Clock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';

export default function StatsRow({ stats }) {
  const completedDays = stats?.totalCompletedDays ?? 12;
  const currentStreak = stats?.currentStreak ?? 5;
  const bestStreak = stats?.longestStreak ?? 8;
  const overallPercentage = stats?.overallPercentage ?? 40;
  const totalLearningHours = stats?.totalLearningHours ?? 24;
  const hoursRemaining = stats?.hoursRemaining ?? 12;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Completed Days */}
      <GlassCard className="p-4 sm:p-5 flex items-center justify-between gap-3" hoverEffect>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-400/30 shadow-xs">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none block">
              {completedDays}
            </span>
            <span className="text-xs font-medium text-slate-600 block mt-1">
              Completed Days
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              ↑ +2 this week
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Card 2: Current Streak */}
      <GlassCard className="p-4 sm:p-5 flex items-center justify-between gap-3" hoverEffect>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0 border border-amber-400/30 shadow-xs">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none block">
              {currentStreak}
            </span>
            <span className="text-xs font-medium text-slate-600 block mt-1">
              Current Streak
            </span>
            <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
              🏆 Best: {bestStreak} days
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Card 3: Overall Progress */}
      <GlassCard className="p-4 sm:p-5 flex flex-col justify-between" hoverEffect>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-600 flex items-center justify-center shrink-0 border border-purple-400/30 shadow-xs">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none block">
              {overallPercentage}%
            </span>
            <span className="text-xs font-medium text-slate-600 block mt-1">
              Overall Progress
            </span>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={overallPercentage} max={100} height="h-1.5" color="purple" />
        </div>
      </GlassCard>

      {/* Card 4: Total Learning Time */}
      <GlassCard className="p-4 sm:p-5 flex flex-col justify-between" hoverEffect>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 flex items-center justify-center shrink-0 border border-blue-400/30 shadow-xs">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none block">
              {totalLearningHours}h
            </span>
            <span className="text-xs font-medium text-slate-600 block mt-1">
              Total Learning Time
            </span>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="w-20">
            <ProgressBar value={totalLearningHours} max={totalLearningHours + hoursRemaining} height="h-1.5" color="blue" />
          </div>
          <span>{hoursRemaining}h remaining</span>
        </div>
      </GlassCard>
    </div>
  );
}
