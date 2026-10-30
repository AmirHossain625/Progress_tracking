'use client';

import { useState } from 'react';
import { useFocusFlow } from '@/hooks/useFocusFlow';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import CommandPalette from '@/components/layout/CommandPalette';
import OnboardingView from '@/components/onboarding/OnboardingView';
import DashboardView from '@/components/views/DashboardView';
import TasksView from '@/components/views/TasksView';
import CalendarView from '@/components/views/CalendarView';
import AnalyticsView from '@/components/views/AnalyticsView';
import NotesView from '@/components/views/NotesView';
import SettingsView from '@/components/views/SettingsView';
import TaskModal from '@/components/tasks/TaskModal';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function Home() {
  const {
    isHydrated,
    journey,
    tasks,
    notes,
    activities,
    activeDateKey,
    setActiveDateKey,
    activeNav,
    setActiveNav,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    activeDateTasks,
    activeDateNote,
    stats,
    updateJourney,
    toggleTask,
    addTask,
    editTask,
    deleteTask,
    saveNote,
    loadDemoData,
    resetToClean,
  } = useFocusFlow();

  const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false);

  // Prevent SSR hydration mismatch
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/70 shadow-2xl flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-sm font-bold text-slate-800">Loading FocusFlow...</span>
        </div>
      </div>
    );
  }

  // Show Onboarding if not initialized
  if (!journey?.isInitialized) {
    return (
      <OnboardingView
        onComplete={(newJourney) => updateJourney(newJourney)}
        onLoadDemo={loadDemoData}
      />
    );
  }

  // Render view corresponding to active navigation tab
  const renderActiveView = () => {
    switch (activeNav) {
      case 'tasks':
        return (
          <TasksView
            tasks={tasks}
            activeDateKey={activeDateKey}
            onSelectDate={setActiveDateKey}
            onToggleTask={toggleTask}
            onAddTask={addTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
          />
        );
      case 'calendar':
        return (
          <CalendarView
            activeDateKey={activeDateKey}
            onSelectDate={setActiveDateKey}
            tasks={tasks}
            notes={notes}
            stats={stats}
            onToggleTask={toggleTask}
            onAddTask={addTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onSaveNote={saveNote}
          />
        );
      case 'progress':
        return (
          <AnalyticsView
            stats={stats}
            journey={journey}
            tasks={tasks}
          />
        );
      case 'notes':
        return (
          <NotesView
            notes={notes}
            activeDateKey={activeDateKey}
            onSelectDate={setActiveDateKey}
            onSaveNote={saveNote}
          />
        );
      case 'settings':
        return (
          <SettingsView
            journey={journey}
            onUpdateJourney={updateJourney}
            onLoadDemo={loadDemoData}
            onResetData={resetToClean}
          />
        );
      case 'dashboard':
      default:
        return (
          <DashboardView
            journey={journey}
            stats={stats}
            activeDateKey={activeDateKey}
            onSelectDate={setActiveDateKey}
            tasks={tasks}
            notes={notes}
            activities={activities}
            activeDateTasks={activeDateTasks}
            activeDateNote={activeDateNote}
            onToggleTask={toggleTask}
            onAddTask={addTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onSaveNote={saveNote}
            onOpenEditGoal={() => setIsEditGoalModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* 1. Left Glass Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Workspace (Topbar + Dynamic View) */}
      <main className="flex-1 flex flex-col min-w-0 p-3 sm:p-5 lg:p-6 lg:pl-8 space-y-4">
        {/* Topbar */}
        <Topbar
          userName={journey?.userName || 'Kim So Men'}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onLoadDemo={loadDemoData}
          onResetData={resetToClean}
          onSelectNav={setActiveNav}
        />

        {/* Dynamic View Body */}
        <div className="flex-1 pt-1">
          {renderActiveView()}
        </div>
      </main>

      {/* 3. Global Command Palette / Search Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={setIsSearchOpen}
        tasks={tasks}
        notes={notes}
        onSelectDate={setActiveDateKey}
        onSelectNav={setActiveNav}
      />

      {/* Quick Edit Goal Modal */}
      {isEditGoalModalOpen && (
        <Modal
          isOpen={isEditGoalModalOpen}
          onClose={() => setIsEditGoalModalOpen(false)}
          title="Edit Learning Goal"
          subtitle="Update your core learning topic and motivation"
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Learning Skill / Subject
              </label>
              <input
                type="text"
                defaultValue={journey?.topic}
                id="editTopicInput"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-slate-300 text-sm font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Motivation (Why?)
              </label>
              <input
                type="text"
                defaultValue={journey?.motivation}
                id="editMotivationInput"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-slate-300 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Consequence (If not?)
              </label>
              <textarea
                rows={2}
                defaultValue={journey?.consequence}
                id="editConsequenceInput"
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 border border-slate-300 text-sm text-slate-900 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <Button variant="ghost" size="sm" onClick={() => setIsEditGoalModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const topicEl = document.getElementById('editTopicInput');
                  const motEl = document.getElementById('editMotivationInput');
                  const conEl = document.getElementById('editConsequenceInput');
                  if (topicEl && motEl && conEl) {
                    const newTopic = topicEl.value.trim();
                    const newKeyword = newTopic.includes(' ') ? newTopic.split(' ')[0] : newTopic;
                    updateJourney({
                      topic: newTopic,
                      keyword: newKeyword,
                      goalTitle: `${journey?.durationDays || 30} Days of ${newTopic}`,
                      motivation: motEl.value.trim(),
                      consequence: conEl.value.trim(),
                    });
                  }
                  setIsEditGoalModalOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
