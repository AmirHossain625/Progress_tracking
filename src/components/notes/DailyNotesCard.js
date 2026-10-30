'use client';

import { useState, useEffect } from 'react';
import { FileEdit, Check, Edit2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function DailyNotesCard({
  activeDateKey,
  note = '',
  onSaveNote,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note);

  useEffect(() => {
    setContent(note);
    setIsEditing(false);
  }, [note, activeDateKey]);

  const handleToggleEdit = () => {
    if (isEditing) {
      onSaveNote(activeDateKey, content);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <GlassCard className="p-5 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/50">
        <div className="flex items-center gap-2">
          <FileEdit className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Today's Notes
          </h3>
        </div>

        <Button
          variant="glass"
          size="xs"
          icon={isEditing ? Check : Edit2}
          onClick={handleToggleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      {/* Note Body */}
      <div className="pt-3 min-h-[90px] flex flex-col justify-center">
        {isEditing ? (
          <textarea
            autoFocus
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write what you learned today, breakthroughs, or plans for tomorrow..."
            className="w-full p-3 rounded-2xl bg-white/70 border border-indigo-200/80 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm text-slate-800 resize-none shadow-inner leading-relaxed"
          />
        ) : (
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
            {content || (
              <span className="text-slate-400 italic">
                No reflection notes added for this date. Click "Edit" to write your thoughts.
              </span>
            )}
          </p>
        )}
      </div>
    </GlassCard>
  );
}
