'use client';

import { CheckCircle2, Flame, Calendar, Clock, Edit2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import CircularProgress from '@/components/ui/CircularProgress';
import ProgressBar from '@/components/ui/ProgressBar';
import IsometricCubes from '@/components/ui/IsometricCubes';
import { getGreeting } from '@/lib/date-utils';

export default function JourneyHeader({ journey, stats, onEditGoal }) {
  const greeting = getGreeting();
  
  // Format title with keyword highlighted if applicable
  const topic = journey?.topic || 'Node.js Backend Development';
  const keyword = journey?.keyword || 'Node.js';
  const duration = journey?.durationDays || 30;
  const dailyTime = journey?.dailyHours || 2;
  const completedDays = stats?.totalCompletedDays ?? 12;
  const percentage = stats?.overallPercentage ?? 40;

  // Render title with highlighted keyword
  const renderTitle = () => {
    if (journey?.goalTitle) {
      // Check if keyword is within title
      const parts = journey.goalTitle.split(new RegExp(`(${keyword})`, 'gi'));
      return (
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {parts.map((part, i) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
              <span
                key={i}
                className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h1>
      );
    }

    return (
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {duration} Days of{' '}
        <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {topic}
        </span>
      </h1>
    );
  };

  return (
    <GlassCard className="p-5 sm:p-6 lg:p-7 relative overflow-hidden group">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        {/* Left Side: Journey Info */}
        <div className="flex-1 space-y-3">
          {/* Greeting */}
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1.5">
              {greeting}
            </span>
            {onEditGoal && (
              <button
                onClick={onEditGoal}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 text-xs flex items-center gap-1"
                title="Edit Learning Goal"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit Goal</span>
              </button>
            )}
          </div>

          {/* Dynamic Title */}
          <div>{renderTitle()}</div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-2xl">
            {journey?.subtitle || 'Building backend engineering skills for my DevOps career.'}
          </p>

          {/* 4 Mini Glass Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 pt-2">
            {/* Tag 1: Why */}
            <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/45 backdrop-blur-md border border-white/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center shrink-0 border border-blue-400/30">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-900 leading-none">Why?</p>
                <p className="text-[10px] sm:text-[11px] text-slate-600 truncate mt-0.5">
                  {journey?.motivation || 'Essential for DevOps career'}
                </p>
              </div>
            </div>

            {/* Tag 2: If Not */}
            <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/45 backdrop-blur-md border border-white/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0 border border-amber-400/30">
                <Flame className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-900 leading-none">If not?</p>
                <p className="text-[10px] sm:text-[11px] text-slate-600 truncate mt-0.5">
                  {journey?.consequence || 'Will struggle with backend deployment and architecture.'}
                </p>
              </div>
            </div>

            {/* Tag 3: Duration */}
            <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/45 backdrop-blur-md border border-white/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-400/30">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 font-medium leading-none">Duration</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {duration} Days
                </p>
              </div>
            </div>

            {/* Tag 4: Daily Time */}
            <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/45 backdrop-blur-md border border-white/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-400/30">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 font-medium leading-none">Daily Time</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {dailyTime} Hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Circular Gauge, Isometric Cubes, and Pill Progress Bar */}
        <div className="flex flex-col items-center justify-center lg:pl-6 lg:border-l border-white/50 shrink-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <CircularProgress
              percentage={percentage}
              size={115}
              strokeWidth={9}
              label="Completed"
              startColor="#4F46E5"
              endColor="#3B82F6"
            />
            {/* 3D Glowing Translucent Isometric Cubes */}
            <div className="hidden sm:block">
              <IsometricCubes className="w-24 h-24" />
            </div>
          </div>

          {/* Timeline Bar below gauge */}
          <div className="w-full mt-3 sm:mt-4">
            <ProgressBar
              value={completedDays}
              max={duration}
              height="h-2"
              color="indigo"
            />
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600 mt-1">
              <span>Progress</span>
              <span>{completedDays} of {duration} days</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
