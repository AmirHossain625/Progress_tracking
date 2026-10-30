'use client';

import { useState } from 'react';
import { Plus, CheckSquare, Calendar, Filter, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import TaskItem from '@/components/tasks/TaskItem';
import TaskModal from '@/components/tasks/TaskModal';
import { TASK_CATEGORIES } from '@/constants/config';
import { formatFriendlyDate } from '@/lib/date-utils';

export default function TasksView({
  tasks = {},
  activeDateKey,
  onSelectDate,
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'completed'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Flatten tasks with date information
  const allTasksList = Object.entries(tasks).flatMap(([dateKey, list]) =>
    (list || []).map((t) => ({ ...t, dateKey }))
  );

  const filteredTasks = allTasksList.filter((task) => {
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? task.completed
        : !task.completed;
    return matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskToEdit) {
      onEditTask(taskToEdit.dateKey || activeDateKey, taskToEdit.id, taskData);
    } else {
      onAddTask(activeDateKey, taskData);
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header */}
      <GlassCard className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            Task Management Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Organize, filter, and track all learning tasks across your entire curriculum.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
          Add New Task
        </Button>
      </GlassCard>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/60">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            All Categories
          </button>
          {TASK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-md p-1 rounded-2xl border border-white/60 text-xs font-medium">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterStatus === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({allTasksList.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterStatus === 'active' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterStatus === 'completed' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Task List Grid */}
      <div className="space-y-2.5">
        {filteredTasks.map((task) => (
          <div key={task.id} className="relative group">
            <TaskItem
              task={task}
              onToggle={(id) => onToggleTask(task.dateKey, id)}
              onEdit={handleOpenEdit}
              onDelete={(id) => onDeleteTask(task.dateKey, id)}
            />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400 pointer-events-none hidden md:block">
              {task.dateKey}
            </span>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <GlassCard className="p-12 text-center">
            <p className="text-slate-500 text-sm">
              No tasks found matching your filter criteria.
            </p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={handleOpenAdd}>
              Create a task
            </Button>
          </GlassCard>
        )}
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        targetDate={formatFriendlyDate(activeDateKey)}
      />
    </div>
  );
}
