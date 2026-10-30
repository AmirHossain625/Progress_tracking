/**
 * Default demonstration state matching the approved UI reference screenshot.
 * Target date anchor: October 2026 (Oct 13, 2026)
 */

export const INITIAL_JOURNEY = {
  topic: 'Node.js Backend Development',
  keyword: 'Node.js',
  goalTitle: '30 Days of Node.js Backend Development',
  subtitle: 'Building backend engineering skills for my DevOps career.',
  motivation: 'Essential for DevOps career',
  consequence: 'Will struggle with backend deployment and architecture.',
  durationDays: 30,
  dailyHours: 2,
  startDate: '2026-10-01',
  userName: 'Kim So Men',
  completedDaysCount: 12,
  isInitialized: true,
};

export const INITIAL_TASKS = {
  // Day 1 to 11 sample completed days
  '2026-10-01': [
    { id: 't-1-1', title: 'Install Node.js & NVM', category: 'Study', completed: true, timeEst: 30 },
    { id: 't-1-2', title: 'Learn CommonJS vs ES Modules', category: 'Study', completed: true, timeEst: 45 },
    { id: 't-1-3', title: 'Build CLI greeting script', category: 'Practice', completed: true, timeEst: 45 },
  ],
  '2026-10-02': [
    { id: 't-2-1', title: 'File System (fs/promises) module', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-2-2', title: 'Write log file reader script', category: 'Practice', completed: true, timeEst: 60 },
  ],
  '2026-10-05': [
    { id: 't-5-1', title: 'Buffer and Streams in Node.js', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-5-2', title: 'Create transform stream pipeline', category: 'Practice', completed: true, timeEst: 60 },
  ],
  '2026-10-06': [
    { id: 't-6-1', title: 'HTTP module fundamentals', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-6-2', title: 'Native HTTP server with routing', category: 'Practice', completed: true, timeEst: 60 },
  ],
  '2026-10-07': [
    { id: 't-7-1', title: 'Express.js installation & middleware', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-7-2', title: 'Custom logger & auth middleware', category: 'Practice', completed: true, timeEst: 60 },
  ],
  '2026-10-08': [
    { id: 't-8-1', title: 'RESTful API conventions & controllers', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-8-2', title: 'CRUD routes for user management', category: 'Practice', completed: true, timeEst: 60 },
  ],
  '2026-10-09': [
    { id: 't-9-1', title: 'Error handling in Express & async errors', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-9-2', title: 'Centralized error handler middleware', category: 'Practice', completed: true, timeEst: 60 },
  ],
  '2026-10-10': [
    { id: 't-10-1', title: 'Environment variables with dotenv & config validation', category: 'Practice', completed: true, timeEst: 60 },
    { id: 't-10-2', title: 'API documentation with Swagger / OpenAPI', category: 'Notes', completed: true, timeEst: 60 },
  ],
  '2026-10-11': [
    { id: 't-11-1', title: 'MongoDB connection & Mongoose schemas', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-11-2', title: 'Data validation and index creation', category: 'Practice', completed: true, timeEst: 60 },
  ],
  // Day 12: Partial day (yellow in calendar)
  '2026-10-12': [
    { id: 't-12-1', title: 'JWT Authentication implementation', category: 'Study', completed: true, timeEst: 60 },
    { id: 't-12-2', title: 'Password hashing with bcrypt', category: 'Practice', completed: true, timeEst: 45 },
    { id: 't-12-3', title: 'Refresh token rotation mechanism', category: 'Project', completed: false, timeEst: 60 },
  ],
  // Day 13: Selected/Current Date in screenshot (2 of 5 done = 40%)
  '2026-10-13': [
    { id: 't-13-1', title: 'Learn Node.js Event Loop', category: 'Study', completed: true, timeEst: 45 },
    { id: 't-13-2', title: 'Practice Express.js routing', category: 'Practice', completed: true, timeEst: 45 },
    { id: 't-13-3', title: 'Build a REST API', category: 'Project', completed: false, timeEst: 60 },
    { id: 't-13-4', title: 'Read documentation', category: 'Study', completed: false, timeEst: 30 },
    { id: 't-13-5', title: 'Write short notes', category: 'Notes', completed: false, timeEst: 20 },
  ],
};

export const INITIAL_NOTES = {
  '2026-10-13': 'Today I learned about Node.js event loop and practiced routing in Express.js. Need to improve error handling tomorrow.',
  '2026-10-12': 'Explored JWT authentication and bcrypt password salting. Need to finish refresh token rotation pattern.',
  '2026-10-09': 'Express async error handling needs careful wrapping or using express-async-errors package to catch rejected promises cleanly.',
};

export const INITIAL_ACTIVITIES = [
  { id: 'act-1', text: 'Completed 3 tasks', type: 'complete', time: 'Today, 8:30 PM', timestamp: Date.now() - 1000 * 60 * 30 },
  { id: 'act-2', text: 'Added new task: Build a REST API', type: 'add', time: 'Today, 6:12 PM', timestamp: Date.now() - 1000 * 60 * 150 },
  { id: 'act-3', text: 'Updated learning goal', type: 'edit', time: 'Yesterday, 9:41 PM', timestamp: Date.now() - 1000 * 60 * 60 * 24 },
  { id: 'act-4', text: 'Completed day 12', type: 'calendar', time: 'Oct 12, 2026', timestamp: Date.now() - 1000 * 60 * 60 * 30 },
];
