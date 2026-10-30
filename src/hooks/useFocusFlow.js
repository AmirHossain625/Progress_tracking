'use client';

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/constants/config';
import { safeGetStorage, safeSetStorage, resetAppData } from '@/lib/storage';
import { INITIAL_JOURNEY, INITIAL_TASKS, INITIAL_NOTES, INITIAL_ACTIVITIES } from '@/lib/initial-data';
import { calculateProgressStats } from '@/lib/progress-utils';
import { formatActivityTime, toDateKey } from '@/lib/date-utils';

export function useFocusFlow() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [journey, setJourney] = useState(INITIAL_JOURNEY);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  
  // Default active selected date is Oct 13, 2026 to match screenshot reference
  const [activeDateKey, setActiveDateKey] = useState('2026-10-13');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize from LocalStorage upon mount
  useEffect(() => {
    try {
      const storedJourney = safeGetStorage(STORAGE_KEYS.JOURNEY, null);
      const storedTasks = safeGetStorage(STORAGE_KEYS.TASKS, null);
      const storedNotes = safeGetStorage(STORAGE_KEYS.NOTES, null);
      const storedActivities = safeGetStorage(STORAGE_KEYS.ACTIVITIES, null);

      if (storedJourney) setJourney(storedJourney);
      if (storedTasks) setTasks(storedTasks);
      if (storedNotes) setNotes(storedNotes);
      if (storedActivities) setActivities(storedActivities);
    } catch (err) {
      console.warn('Failed to load initial data from storage:', err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Helper to append activity
  const addActivity = useCallback((text, type = 'complete') => {
    const newAct = {
      id: `act-${Date.now()}`,
      text,
      type,
      time: formatActivityTime(new Date()),
      timestamp: Date.now(),
    };
    setActivities(prev => {
      const updated = [newAct, ...(prev || [])].slice(0, 15);
      safeSetStorage(STORAGE_KEYS.ACTIVITIES, updated);
      return updated;
    });
  }, []);

  // Save journey
  const updateJourney = useCallback((newJourney) => {
    const updated = { ...journey, ...newJourney, isInitialized: true };
    setJourney(updated);
    safeSetStorage(STORAGE_KEYS.JOURNEY, updated);
    addActivity(`Updated learning goal: ${updated.topic}`, 'edit');
  }, [journey, addActivity]);

  // Toggle task completion
  const toggleTask = useCallback((dateKey, taskId) => {
    setTasks(prev => {
      const currentList = prev[dateKey] || [];
      const updatedList = currentList.map(task => {
        if (task.id === taskId) {
          const nextState = !task.completed;
          return { ...task, completed: nextState };
        }
        return task;
      });

      const updatedAll = { ...prev, [dateKey]: updatedList };
      safeSetStorage(STORAGE_KEYS.TASKS, updatedAll);

      const target = currentList.find(t => t.id === taskId);
      if (target) {
        const actionWord = !target.completed ? 'Completed' : 'Uncompleted';
        addActivity(`${actionWord} task: ${target.title}`, !target.completed ? 'complete' : 'edit');
      }

      return updatedAll;
    });
  }, [addActivity]);

  // Add task to a specific date
  const addTask = useCallback((dateKey, taskData) => {
    const newTask = {
      id: `t-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: taskData.title.trim(),
      description: taskData.description || '',
      category: taskData.category || 'Study',
      completed: false,
      timeEst: Number(taskData.timeEst) || 30,
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => {
      const currentList = prev[dateKey] || [];
      const updatedList = [...currentList, newTask];
      const updatedAll = { ...prev, [dateKey]: updatedList };
      safeSetStorage(STORAGE_KEYS.TASKS, updatedAll);
      return updatedAll;
    });

    addActivity(`Added new task: ${newTask.title}`, 'add');
  }, [addActivity]);

  // Edit task
  const editTask = useCallback((dateKey, taskId, updatedData) => {
    setTasks(prev => {
      const currentList = prev[dateKey] || [];
      const updatedList = currentList.map(task => 
        task.id === taskId ? { ...task, ...updatedData } : task
      );
      const updatedAll = { ...prev, [dateKey]: updatedList };
      safeSetStorage(STORAGE_KEYS.TASKS, updatedAll);
      return updatedAll;
    });
    addActivity(`Updated task details`, 'edit');
  }, [addActivity]);

  // Delete task
  const deleteTask = useCallback((dateKey, taskId) => {
    setTasks(prev => {
      const currentList = prev[dateKey] || [];
      const target = currentList.find(t => t.id === taskId);
      const updatedList = currentList.filter(t => t.id !== taskId);
      const updatedAll = { ...prev, [dateKey]: updatedList };
      safeSetStorage(STORAGE_KEYS.TASKS, updatedAll);
      if (target) {
        addActivity(`Removed task: ${target.title}`, 'edit');
      }
      return updatedAll;
    });
  }, [addActivity]);

  // Save note for a date
  const saveNote = useCallback((dateKey, content) => {
    setNotes(prev => {
      const updated = { ...prev, [dateKey]: content };
      safeSetStorage(STORAGE_KEYS.NOTES, updated);
      return updated;
    });
    addActivity(`Saved note for ${dateKey}`, 'edit');
  }, [addActivity]);

  // Reset to screenshot demo
  const loadDemoData = useCallback(() => {
    resetAppData(true);
    setJourney(INITIAL_JOURNEY);
    setTasks(INITIAL_TASKS);
    setNotes(INITIAL_NOTES);
    setActivities(INITIAL_ACTIVITIES);
    setActiveDateKey('2026-10-13');
  }, []);

  // Reset to empty for clean user onboarding
  const resetToClean = useCallback(() => {
    resetAppData(false);
    const emptyJourney = { isInitialized: false };
    setJourney(emptyJourney);
    setTasks({});
    setNotes({});
    setActivities([]);
    setActiveDateKey(toDateKey(new Date()));
  }, []);

  // Derived calculations
  const stats = calculateProgressStats(journey, tasks, activeDateKey);

  // Active date's tasks
  const activeDateTasks = tasks[activeDateKey] || [];
  const activeDateNote = notes[activeDateKey] || '';

  return {
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
  };
}
