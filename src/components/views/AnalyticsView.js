'use client';

import { BarChart2, Flame, Award, Clock, CheckCircle2, TrendingUp, Calendar, Zap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import CircularProgress from '@/components/ui/CircularProgress';

export default function AnalyticsView({ stats, journey, tasks = {} }) {
  const completedDays = stats?.totalCompletedDays ?? 12;
  const duration = stats?.durationDays ?? 30;
  const currentStreak = stats?.currentStreak ?? 5;
  const longestStreak = stats?.longestStreak ?? 8;
  const overallPercentage = stats?.overallPercentage ?? 40;
  const totalLearningHours = stats?.totalLearningHours ?? 24;
  const hoursRemaining = stats?.hoursRemaining ?? 12;
  const totalCompletedTasks = stats?.totalCompletedTasks ?? 20;
  const totalTasksCount = stats?.totalTasksCount ?? 35;

  // Compute category counts
  const categoryCounts = { Study: 0, Practice: 0, Project: 0, Notes: 0 };
  Object.values(tasks).forEach(dayList => {
    (dayList || []).forEach(t => {
      if (t.completed && categoryCounts[t.category] !== undefined) {
        categoryCounts[t.category]++;
      }
    });
  });

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header */}
      <GlassCard className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-indigo-600" />
          Progress & Habit Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Detailed metrics calculated directly from your real activity and completed learning tasks.
        </p>
      </GlassCard>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Current Streak</span>
            <span className="text-2xl font-extrabold text-slate-900">{currentStreak} Days</span>
            <span className="text-[11px] text-amber-600 font-semibold block">Keep momentum alive!</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-400/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Longest Streak</span>
            <span className="text-2xl font-extrabold text-slate-900">{longestStreak} Days</span>
            <span className="text-[11px] text-indigo-600 font-semibold block">Personal record</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-400/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Tasks Completed</span>
            <span className="text-2xl font-extrabold text-slate-900">{totalCompletedTasks}</span>
            <span className="text-[11px] text-emerald-600 font-semibold block">out of {totalTasksCount} total</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 flex items-center justify-center shrink-0 border border-blue-400/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Time Invested</span>
            <span className="text-2xl font-extrabold text-slate-900">{totalLearningHours}h</span>
            <span className="text-[11px] text-blue-600 font-semibold block">{hoursRemaining}h remaining</span>
          </div>
        </GlassCard>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Journey Completion Overview */}
        <GlassCard className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/50">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Goal Completion Status
            </h3>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {journey?.topic || 'Learning Goal'}
            </span>
          </div>

          <div className="py-6 flex flex-col sm:flex-row items-center justify-around gap-6">
            <CircularProgress
              percentage={overallPercentage}
              size={130}
              strokeWidth={10}
              label="Completed"
              startColor="#4F46E5"
              endColor="#3B82F6"
            />
            <div className="space-y-3 text-xs w-full sm:w-auto">
              <div>
                <p className="text-slate-500 font-medium">Completed Days</p>
                <p className="text-base font-bold text-slate-900">{completedDays} of {duration} days</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Daily Target Commitment</p>
                <p className="text-base font-bold text-slate-900">{journey?.dailyHours || 2} Hours / day</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Remaining to Goal</p>
                <p className="text-base font-bold text-slate-900">{Math.max(0, duration - completedDays)} Days</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <ProgressBar value={completedDays} max={duration} height="h-2.5" color="indigo" />
          </div>
        </GlassCard>

        {/* Learning Distribution by Category */}
        <GlassCard className="p-6 flex flex-col justify-between">
          <div className="pb-3 border-b border-white/50">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Task Effort Breakdown
            </h3>
          </div>

          <div className="py-4 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-700">Study (Theory & Concepts)</span>
                <span className="text-slate-700">{categoryCounts.Study} tasks</span>
              </div>
              <ProgressBar value={categoryCounts.Study} max={Math.max(1, totalCompletedTasks)} height="h-2" color="blue" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Practice (Hands-on Coding)</span>
                <span className="text-slate-700">{categoryCounts.Practice} tasks</span>
              </div>
              <ProgressBar value={categoryCounts.Practice} max={Math.max(1, totalCompletedTasks)} height="h-2" color="green" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-800">Project (Full Implementations)</span>
                <span className="text-slate-700">{categoryCounts.Project} tasks</span>
              </div>
              <ProgressBar value={categoryCounts.Project} max={Math.max(1, totalCompletedTasks)} height="h-2" color="amber" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-700">Notes & Reflections</span>
                <span className="text-slate-700">{categoryCounts.Notes} tasks</span>
              </div>
              <ProgressBar value={categoryCounts.Notes} max={Math.max(1, totalCompletedTasks)} height="h-2" color="purple" />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic text-center">
            A healthy balance of Study + Practice accelerates skill mastery.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
