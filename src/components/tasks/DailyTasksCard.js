'use client';

import { useState } from 'react';
import { ListTodo, Plus } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { formatFriendlyDate } from '@/lib/date-utils';

export default function DailyTasksCard({
  activeDateKey,
  tasks = [],
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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
      onEditTask(activeDateKey, taskToEdit.id, taskData);
    } else {
      onAddTask(activeDateKey, taskData);
    }
  };

  return (
    <>
      <GlassCard className="p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/50">
            <div>
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Today's Tasks
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {formatFriendlyDate(activeDateKey)}
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={handleOpenAdd}
            >
              Add Task
            </Button>
          </div>

          {/* Task Items List */}
          <div className="pt-3.5 space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={(id) => onToggleTask(activeDateKey, id)}
                onEdit={handleOpenEdit}
                onDelete={(id) => onDeleteTask(activeDateKey, id)}
              />
            ))}

            {tasks.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-xs font-medium text-slate-500">
                  No tasks recorded for this date.
                </p>
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  + Add task for {activeDateKey}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="pt-4 mt-3 border-t border-white/50">
          <ProgressBar
            value={completedCount}
            max={totalCount || 1}
            height="h-2"
            color="green"
          />
          <div className="flex items-center justify-between text-xs font-bold mt-2">
            <span className="text-slate-600">
              {completedCount} / {totalCount} tasks
            </span>
            <span className="text-indigo-600 font-extrabold">
              {percentage}%
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        targetDate={formatFriendlyDate(activeDateKey)}
      />
    </>
  );
}
