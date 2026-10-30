'use client';

import { useState } from 'react';
import { Check, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`
        relative flex items-center justify-between gap-3 p-3 rounded-2xl
        transition-all duration-200 group
        ${
          task.completed
            ? 'bg-white/40 border border-white/50 text-slate-800'
            : 'bg-white/55 hover:bg-white/70 border border-white/70 text-slate-900 shadow-xs'
        }
      `}
    >
      {/* Left: Custom Checkbox & Title */}
      <div className="flex items-center gap-3 overflow-hidden flex-1">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`
            w-5 h-5 rounded-lg flex items-center justify-center shrink-0
            transition-all duration-200 border
            ${
              task.completed
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                : 'bg-white/60 border-slate-300 hover:border-indigo-400'
            }
          `}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
        </button>

        <span
          onClick={() => onToggle(task.id)}
          className={`
            text-xs sm:text-sm font-medium cursor-pointer truncate select-none
            ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}
          `}
        >
          {task.title}
        </span>
      </div>

      {/* Right: Category Badge & 3-Dots Action Menu */}
      <div className="flex items-center gap-2 shrink-0">
        <Badge category={task.category || 'Study'} size="xs" />

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Context Action Menu */}
          {showMenu && (
            <div
              className="absolute right-0 top-full mt-1 w-32 p-1.5 bg-white/90 backdrop-blur-2xl border border-white/80 shadow-xl rounded-xl z-30 animate-fade-in"
              onMouseLeave={() => setShowMenu(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onEdit(task);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onDelete(task.id);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
