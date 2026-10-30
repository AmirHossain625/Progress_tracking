import { STORAGE_KEYS } from '@/constants/config';
import { INITIAL_JOURNEY, INITIAL_TASKS, INITIAL_NOTES, INITIAL_ACTIVITIES } from './initial-data';

/**
 * Check if window is available (client-side)
 */
export function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Safely read and parse item from LocalStorage
 */
export function safeGetStorage(key, defaultValue = null) {
  if (!isBrowser()) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[FocusFlow Storage] Failed to parse item for key "${key}":`, err);
    return defaultValue;
  }
}

/**
 * Safely serialize and write item to LocalStorage
 */
export function safeSetStorage(key, value) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[FocusFlow Storage] Failed to write item for key "${key}":`, err);
    return false;
  }
}

/**
 * Load all application state with fallback to initial screenshot demo or empty
 */
export function loadAllAppData() {
  if (!isBrowser()) {
    return {
      journey: INITIAL_JOURNEY,
      tasks: INITIAL_TASKS,
      notes: INITIAL_NOTES,
      activities: INITIAL_ACTIVITIES,
    };
  }

  const journey = safeGetStorage(STORAGE_KEYS.JOURNEY, null);
  const tasks = safeGetStorage(STORAGE_KEYS.TASKS, null);
  const notes = safeGetStorage(STORAGE_KEYS.NOTES, null);
  const activities = safeGetStorage(STORAGE_KEYS.ACTIVITIES, null);

  return {
    journey: journey || INITIAL_JOURNEY,
    tasks: tasks || INITIAL_TASKS,
    notes: notes || INITIAL_NOTES,
    activities: activities || INITIAL_ACTIVITIES,
  };
}

/**
 * Reset all application data to clean state or initial demo
 */
export function resetAppData(useDemo = true) {
  if (!isBrowser()) return;
  try {
    if (useDemo) {
      safeSetStorage(STORAGE_KEYS.JOURNEY, INITIAL_JOURNEY);
      safeSetStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      safeSetStorage(STORAGE_KEYS.NOTES, INITIAL_NOTES);
      safeSetStorage(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.JOURNEY);
      window.localStorage.removeItem(STORAGE_KEYS.TASKS);
      window.localStorage.removeItem(STORAGE_KEYS.NOTES);
      window.localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
      window.localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    }
    return true;
  } catch (err) {
    console.error('[FocusFlow Storage] Reset failed:', err);
    return false;
  }
}

/**
 * Export all data to JSON string for backup
 */
export function exportDataAsJSON() {
  if (!isBrowser()) return '{}';
  const data = {
    journey: safeGetStorage(STORAGE_KEYS.JOURNEY),
    tasks: safeGetStorage(STORAGE_KEYS.TASKS),
    notes: safeGetStorage(STORAGE_KEYS.NOTES),
    activities: safeGetStorage(STORAGE_KEYS.ACTIVITIES),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Import and validate JSON backup data
 */
export function importDataFromJSON(jsonString) {
  if (!isBrowser()) return false;
  try {
    const data = JSON.parse(jsonString);
    if (data.journey) safeSetStorage(STORAGE_KEYS.JOURNEY, data.journey);
    if (data.tasks) safeSetStorage(STORAGE_KEYS.TASKS, data.tasks);
    if (data.notes) safeSetStorage(STORAGE_KEYS.NOTES, data.notes);
    if (data.activities) safeSetStorage(STORAGE_KEYS.ACTIVITIES, data.activities);
    return true;
  } catch (err) {
    console.error('[FocusFlow Storage] Import failed:', err);
    return false;
  }
}
