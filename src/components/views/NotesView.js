'use client';

import { useState } from 'react';
import { FileText, Calendar, Search, Edit2, Check, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { formatFriendlyDate } from '@/lib/date-utils';

export default function NotesView({
  notes = {},
  activeDateKey,
  onSelectDate,
  onSaveNote,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDateKey, setEditingDateKey] = useState(null);
  const [editContent, setEditContent] = useState('');

  const noteEntries = Object.entries(notes)
    .filter(([_, content]) => content && content.trim())
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA));

  const filteredEntries = searchQuery.trim()
    ? noteEntries.filter(([_, content]) => content.toLowerCase().includes(searchQuery.toLowerCase()))
    : noteEntries;

  const handleStartEdit = (dateKey, currentContent) => {
    setEditingDateKey(dateKey);
    setEditContent(currentContent);
  };

  const handleSaveEdit = (dateKey) => {
    onSaveNote(dateKey, editContent);
    setEditingDateKey(null);
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header */}
      <GlassCard className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Daily Notes Journal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Capture concepts learned, debugging breakthroughs, and your daily engineering thoughts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your notes..."
            className="w-full pl-9 pr-3.5 py-2 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs sm:text-sm text-slate-800"
          />
        </div>
      </GlassCard>

      {/* Notes Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEntries.map(([dateKey, content]) => {
          const isCurrentlyEditing = editingDateKey === dateKey;

          return (
            <GlassCard key={dateKey} className="p-5 flex flex-col justify-between" hoverEffect>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/50 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">
                      {formatFriendlyDate(dateKey)}
                    </span>
                  </div>

                  <Button
                    variant="glass"
                    size="xs"
                    icon={isCurrentlyEditing ? Check : Edit2}
                    onClick={() =>
                      isCurrentlyEditing
                        ? handleSaveEdit(dateKey)
                        : handleStartEdit(dateKey, content)
                    }
                  >
                    {isCurrentlyEditing ? 'Done' : 'Edit'}
                  </Button>
                </div>

                {isCurrentlyEditing ? (
                  <textarea
                    rows={4}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/80 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm text-slate-800 resize-none leading-relaxed"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed whitespace-pre-wrap">
                    {content}
                  </p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-white/40 flex justify-between items-center text-[11px] text-slate-400">
                <span>{content.length} characters</span>
                <button
                  onClick={() => onSelectDate(dateKey)}
                  className="font-medium text-indigo-600 hover:text-indigo-800 underline"
                >
                  View in Calendar →
                </button>
              </div>
            </GlassCard>
          );
        })}

        {filteredEntries.length === 0 && (
          <div className="col-span-full">
            <GlassCard className="p-12 text-center">
              <p className="text-sm font-medium text-slate-500">
                No notes found matching your search.
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
