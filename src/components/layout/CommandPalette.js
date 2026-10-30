'use client';

import { useState, useEffect } from 'react';
import { Search, X, CheckSquare, Calendar, BarChart2, FileText, ArrowRight } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function CommandPalette({
  isOpen,
  onClose,
  tasks = {},
  notes = {},
  onSelectDate,
  onSelectNav,
}) {
  const [query, setQuery] = useState('');

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Flatten tasks for search
  const allTasksList = Object.entries(tasks).flatMap(([dateKey, list]) => 
    (list || []).map(t => ({ ...t, dateKey }))
  );

  const filteredTasks = query.trim()
    ? allTasksList.filter(t => t.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  const filteredNotes = query.trim()
    ? Object.entries(notes)
        .filter(([dateKey, content]) => content.toLowerCase().includes(query.toLowerCase()))
        .map(([dateKey, content]) => ({ dateKey, content }))
        .slice(0, 3)
    : [];

  const handleTaskClick = (task) => {
    onSelectDate(task.dateKey);
    onSelectNav('dashboard');
    onClose(false);
  };

  const handleNoteClick = (note) => {
    onSelectDate(note.dateKey);
    onSelectNav('dashboard');
    onClose(false);
  };

  const handleNavJump = (navId) => {
    onSelectNav(navId);
    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} title="Search FocusFlow" maxWidth="max-w-lg">
      <div className="space-y-4">
        {/* Search input field */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-indigo-500 absolute left-3.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a task, keyword, note, or view..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/70 border border-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800 text-sm shadow-inner"
          />
        </div>

        {/* Quick Nav Suggestions */}
        {!query && (
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavJump('dashboard')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 hover:bg-white text-xs font-medium text-slate-700 border border-white/70"
              >
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Dashboard Overview</span>
              </button>
              <button
                onClick={() => handleNavJump('tasks')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 hover:bg-white text-xs font-medium text-slate-700 border border-white/70"
              >
                <CheckSquare className="w-4 h-4 text-emerald-500" />
                <span>All Tasks</span>
              </button>
              <button
                onClick={() => handleNavJump('progress')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 hover:bg-white text-xs font-medium text-slate-700 border border-white/70"
              >
                <BarChart2 className="w-4 h-4 text-purple-500" />
                <span>Progress Analytics</span>
              </button>
              <button
                onClick={() => handleNavJump('notes')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 hover:bg-white text-xs font-medium text-slate-700 border border-white/70"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Notes Journal</span>
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {/* Task matches */}
            {filteredTasks.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Matching Tasks
                </p>
                <div className="space-y-1">
                  {filteredTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleTaskClick(t)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 hover:bg-white text-xs text-slate-800 border border-white/80 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <CheckSquare className={`w-3.5 h-3.5 ${t.completed ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <span className={t.completed ? 'line-through text-slate-400' : 'font-medium'}>
                          {t.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-medium">
                        {t.dateKey}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note matches */}
            {filteredNotes.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Matching Notes
                </p>
                <div className="space-y-1">
                  {filteredNotes.map((n) => (
                    <div
                      key={n.dateKey}
                      onClick={() => handleNoteClick(n)}
                      className="p-2.5 rounded-xl bg-white/60 hover:bg-white text-xs text-slate-800 border border-white/80 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900">{n.dateKey}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <p className="text-slate-500 truncate">{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredTasks.length === 0 && filteredNotes.length === 0 && (
              <p className="text-xs text-center text-slate-400 py-6">
                No matching tasks or notes found for "{query}".
              </p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
