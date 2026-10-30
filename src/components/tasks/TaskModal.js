'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { TASK_CATEGORIES } from '@/constants/config';

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
  targetDate = '',
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Study');
  const [timeEst, setTimeEst] = useState(45);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setCategory(taskToEdit.category || 'Study');
      setTimeEst(taskToEdit.timeEst || 45);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Study');
      setTimeEst(45);
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      timeEst: Number(timeEst) || 30,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? 'Edit Learning Task' : 'Add New Task'}
      subtitle={`For ${targetDate || 'Selected Date'}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            required
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Study Node.js Event Loop"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm text-slate-900"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {TASK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`
                  px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all
                  ${
                    category === cat.id
                      ? `${cat.bg} ${cat.text} ${cat.border} ring-2 ring-indigo-500/30 shadow-xs`
                      : 'bg-white/50 text-slate-600 border-white/80 hover:bg-white/80'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time Estimate */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Estimated Duration (Minutes)
          </label>
          <div className="flex items-center gap-2">
            {[15, 30, 45, 60, 90].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setTimeEst(mins)}
                className={`
                  flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all
                  ${
                    timeEst === mins
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white/50 text-slate-700 border-white/80 hover:bg-white/80'
                  }
                `}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Notes / Description (Optional)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Key concepts, documentation link, or exercises to practice..."
            className="w-full px-3.5 py-2 rounded-xl bg-white/70 border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm text-slate-900 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3">
          <Button variant="ghost" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button variant="primary" type="submit" size="sm">
            {taskToEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
