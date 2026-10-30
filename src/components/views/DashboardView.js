'use client';

import JourneyHeader from '@/components/dashboard/JourneyHeader';
import StatsRow from '@/components/dashboard/StatsRow';
import LearningCalendar from '@/components/calendar/LearningCalendar';
import WeeklyProgress from '@/components/dashboard/WeeklyProgress';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DailyTasksCard from '@/components/tasks/DailyTasksCard';
import DailyNotesCard from '@/components/notes/DailyNotesCard';

export default function DashboardView({
  journey,
  stats,
  activeDateKey,
  onSelectDate,
  tasks,
  notes,
  activities,
  activeDateTasks,
  activeDateNote,
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onSaveNote,
  onOpenEditGoal,
}) {
  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* 1. Learning Journey Header Card */}
      <JourneyHeader
        journey={journey}
        stats={stats}
        onEditGoal={onOpenEditGoal}
      />

      {/* 2. Four Statistics Cards Row */}
      <StatsRow stats={stats} />

      {/* 3. Main Split Layout (Left: Calendar & Lower Row, Right: Tasks & Notes) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left Column (approx 7.5 of 12) */}
        <div className="xl:col-span-8 space-y-5">
          {/* Learning Calendar */}
          <LearningCalendar
            activeDateKey={activeDateKey}
            onSelectDate={onSelectDate}
            tasks={tasks}
            stats={stats}
          />

          {/* Lower Row: Weekly Progress & Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <WeeklyProgress weeklyData={stats?.weeklyData} />
            <RecentActivity activities={activities} />
          </div>
        </div>

        {/* Right Column (approx 4 of 12) */}
        <div className="xl:col-span-4 space-y-5 flex flex-col justify-between">
          {/* Today's Tasks Card */}
          <div className="flex-1">
            <DailyTasksCard
              activeDateKey={activeDateKey}
              tasks={activeDateTasks}
              onToggleTask={onToggleTask}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          </div>

          {/* Today's Notes Card */}
          <div>
            <DailyNotesCard
              activeDateKey={activeDateKey}
              note={activeDateNote}
              onSaveNote={onSaveNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
