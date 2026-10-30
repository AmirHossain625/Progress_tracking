import { toDateKey } from './date-utils';

/**
 * Get full calendar matrix (6 weeks x 7 days) for a given month and year
 */
export function getMonthCalendarGrid(year, monthIndex) {
  // First day of target month
  const firstDay = new Date(year, monthIndex, 1);
  const startDayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
  
  // Last day of target month
  const lastDay = new Date(year, monthIndex + 1, 0);
  const totalDays = lastDay.getDate();

  // Days from previous month
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  
  const cells = [];

  // 1. Previous month trailing days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const date = new Date(year, monthIndex - 1, dayNum);
    cells.push({
      date,
      dayNum,
      dateKey: toDateKey(date),
      isCurrentMonth: false,
      isPrevMonth: true,
      isNextMonth: false,
    });
  }

  // 2. Current month days
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, monthIndex, d);
    cells.push({
      date,
      dayNum: d,
      dateKey: toDateKey(date),
      isCurrentMonth: true,
      isPrevMonth: false,
      isNextMonth: false,
    });
  }

  // 3. Next month leading days (fill up to multiple of 7, usually 35 or 42 cells)
  const remainingCells = (7 - (cells.length % 7)) % 7;
  // If we only have 35 cells, keep it, or pad to 35 minimum:
  const targetTotal = cells.length + remainingCells < 35 ? 35 : cells.length + remainingCells;
  const needNext = targetTotal - cells.length;

  for (let d = 1; d <= needNext; d++) {
    const date = new Date(year, monthIndex + 1, d);
    cells.push({
      date,
      dayNum: d,
      dateKey: toDateKey(date),
      isCurrentMonth: false,
      isPrevMonth: false,
      isNextMonth: true,
    });
  }

  return cells;
}

/**
 * Determine task completion status for a given date key:
 * - 'complete': at least 1 task and ALL completed
 * - 'partial': at least 1 task completed, but not all
 * - 'pending': tasks exist but 0 completed, OR no tasks recorded
 */
export function getDayTaskStatus(dateKey, allTasks = {}) {
  const tasksForDay = allTasks[dateKey] || [];
  if (tasksForDay.length === 0) {
    return 'none';
  }

  const completedCount = tasksForDay.filter(t => t.completed).length;
  if (completedCount === tasksForDay.length && tasksForDay.length > 0) {
    return 'complete';
  }
  if (completedCount > 0) {
    return 'partial';
  }
  return 'pending';
}
