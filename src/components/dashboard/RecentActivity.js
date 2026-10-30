'use client';

import { CheckCircle2, PlusCircle, Edit3, Calendar, MoreVertical, ListCollapse } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function RecentActivity({ activities = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case 'complete':
        return (
          <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-400/30">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'add':
        return (
          <div className="w-7 h-7 rounded-full bg-blue-500/15 text-blue-600 flex items-center justify-center shrink-0 border border-blue-400/30">
            <PlusCircle className="w-4 h-4" />
          </div>
        );
      case 'edit':
        return (
          <div className="w-7 h-7 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Edit3 className="w-4 h-4" />
          </div>
        );
      case 'calendar':
      default:
        return (
          <div className="w-7 h-7 rounded-full bg-indigo-500/15 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-400/30">
            <Calendar className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <GlassCard className="p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/50">
        <div className="flex items-center gap-2">
          <ListCollapse className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Recent Activity
          </h3>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="pt-3 space-y-3">
        {activities.slice(0, 4).map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between gap-3 text-xs group"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              {getIcon(activity.type)}
              <span className="font-semibold text-slate-800 truncate">
                {activity.text}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-medium text-slate-500">
                {activity.time}
              </span>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 transition-opacity">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-4">
            No activity yet. Complete a task to start your log!
          </p>
        )}
      </div>
    </GlassCard>
  );
}
