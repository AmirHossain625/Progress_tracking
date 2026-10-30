import { parseDateKey, toDateKey } from './date-utils';
import { getDayTaskStatus } from './calendar-utils';

/**
 * Calculate comprehensive progress metrics based on real task records
 */
export function calculateProgressStats(journey, allTasks = {}, activeDateKey = null) {
  const durationDays = Number(journey?.durationDays) || 30;
  const dailyHours = Number(journey?.dailyHours) || 2;
  const startDate = journey?.startDate ? parseDateKey(journey.startDate) : new Date();

  // Find all dates that have at least one task
  const allRecordedDates = Object.keys(allTasks);

  // Completed days: days where getDayTaskStatus is 'complete'
  const completedDateKeys = allRecordedDates.filter(
    key => getDayTaskStatus(key, allTasks) === 'complete'
  );

  const totalCompletedDays = completedDateKeys.length;

  // Total completed tasks & total tasks
  let totalTasksCount = 0;
  let totalCompletedTasks = 0;
  let totalEstimatedMinutes = 0;

  Object.values(allTasks).forEach(dayTasks => {
    if (Array.isArray(dayTasks)) {
      dayTasks.forEach(task => {
        totalTasksCount++;
        if (task.completed) {
          totalCompletedTasks++;
          totalEstimatedMinutes += Number(task.timeEst) || 45;
        }
      });
    }
  });

  // Total learning time in hours
  // If user spent estimated time, or dailyHours * completedDays
  const totalLearningHours = Math.round(
    Math.max(totalEstimatedMinutes / 60, totalCompletedDays * dailyHours)
  );

  // Overall journey completion percentage
  const overallPercentage = Math.min(100, Math.round((totalCompletedDays / durationDays) * 100));

  // Streak calculations
  const { currentStreak, longestStreak } = calculateStreaks(completedDateKeys, activeDateKey);

  // Weekly progress (Mon - Sun for current active week)
  const weeklyData = calculateWeeklyDistribution(allTasks, activeDateKey);

  return {
    totalCompletedDays,
    durationDays,
    currentStreak,
    longestStreak,
    overallPercentage,
    totalCompletedTasks,
    totalTasksCount,
    totalLearningHours,
    dailyHours,
    weeklyData,
    daysRemaining: Math.max(0, durationDays - totalCompletedDays),
    hoursRemaining: Math.max(0, (durationDays - totalCompletedDays) * dailyHours),
  };
}

/**
 * Calculate current streak and longest streak from completed date keys
 */
export function calculateStreaks(completedDateKeys, referenceDateKey = null) {
  if (!completedDateKeys || completedDateKeys.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort completed dates ascending
  const sortedDates = [...new Set(completedDateKeys)]
    .map(parseDateKey)
    .sort((a, b) => a - b);

  let longest = 1;
  let running = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const curr = sortedDates[i];
    const diffTime = curr.getTime() - prev.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

    if (diffDays === 1) {
      running++;
      if (running > longest) longest = running;
    } else if (diffDays > 1) {
      running = 1;
    }
  }

  // Current streak calculation:
  // Check backwards from reference date (or today)
  const refDate = referenceDateKey ? parseDateKey(referenceDateKey) : new Date();
  const completedSet = new Set(completedDateKeys);

  let current = 0;
  let checkDate = new Date(refDate);

  // If reference date is complete, include it
  const refKey = toDateKey(checkDate);
  if (completedSet.has(refKey)) {
    current++;
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    // If today is not completed yet, check if yesterday was completed
    checkDate.setDate(checkDate.getDate() - 1);
    if (!completedSet.has(toDateKey(checkDate))) {
      // Streak broken
      return { currentStreak: 0, longestStreak: Math.max(longest, 0) };
    }
  }

  // Continue counting backwards
  while (completedSet.has(toDateKey(checkDate))) {
    current++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return {
    currentStreak: current,
    longestStreak: Math.max(longest, current),
  };
}

/**
 * Calculate Mon-Sun completion for the week containing referenceDateKey
 */
export function calculateWeeklyDistribution(allTasks, referenceDateKey) {
  const refDate = referenceDateKey ? parseDateKey(referenceDateKey) : new Date();
  
  // Find Monday of this week
  const dayOfWeek = refDate.getDay(); // 0 is Sun, 1 is Mon
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  const monday = new Date(refDate);
  monday.setDate(refDate.getDate() + diffToMonday);

  const daysLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return daysLabel.map((dayLabel, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const key = toDateKey(date);
    const dayTasks = allTasks[key] || [];

    let percentage = 0;
    if (dayTasks.length > 0) {
      const completed = dayTasks.filter(t => t.completed).length;
      percentage = Math.round((completed / dayTasks.length) * 100);
    }

    return {
      day: dayLabel,
      dateKey: key,
      percentage,
      taskCount: dayTasks.length,
      isComplete: percentage === 100 && dayTasks.length > 0,
      isFriday: dayLabel === 'Fri',
    };
  });
}
