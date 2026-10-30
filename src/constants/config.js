export const TOPIC_PRESETS = [
  'Node.js Backend Development',
  'Next.js',
  'FastAPI',
  'Docker',
  'Kubernetes',
  'DevOps',
  'Cloud Computing',
  'Cybersecurity',
  'System Design',
  'TypeScript Mastery',
];

export const MOTIVATION_PRESETS = [
  'Essential for my DevOps career.',
  'Needed to advance into a Senior Engineering role.',
  'Building full-stack SaaS projects independently.',
  'To crack high-tier software engineering interviews.',
  'To master backend deployment and microservices architecture.',
];

export const CONSEQUENCE_PRESETS = [
  'I will struggle with backend deployment and architecture.',
  'I will stay stuck in my current role and miss career growth.',
  'I will depend on others to build and deploy complex features.',
  'I will waste another month without tangible portfolio projects.',
];

export const DURATION_OPTIONS = [
  { days: 7, label: '7 Days', description: 'Sprint' },
  { days: 15, label: '15 Days', description: 'Kickstart' },
  { days: 30, label: '30 Days', description: 'Deep Dive (Recommended)' },
  { days: 45, label: '45 Days', description: 'Mastery' },
  { days: 60, label: '60 Days', description: 'Transformation' },
  { days: 90, label: '90 Days', description: 'Full Journey' },
];

export const DAILY_TIME_OPTIONS = [
  { hours: 0.5, label: '30 Minutes', minutes: 30 },
  { hours: 1, label: '1 Hour', minutes: 60 },
  { hours: 2, label: '2 Hours', minutes: 120 },
  { hours: 3, label: '3 Hours', minutes: 180 },
  { hours: 4, label: '4 Hours', minutes: 240 },
];

export const TASK_CATEGORIES = [
  { id: 'Study', label: 'Study', color: 'blue', bg: 'bg-blue-100/80', text: 'text-blue-700', border: 'border-blue-200/80' },
  { id: 'Practice', label: 'Practice', color: 'green', bg: 'bg-emerald-100/80', text: 'text-emerald-700', border: 'border-emerald-200/80' },
  { id: 'Project', label: 'Project', color: 'amber', bg: 'bg-amber-100/80', text: 'text-amber-800', border: 'border-amber-200/80' },
  { id: 'Notes', label: 'Notes', color: 'rose', bg: 'bg-rose-100/80', text: 'text-rose-700', border: 'border-rose-200/80' },
  { id: 'Reading', label: 'Reading', color: 'purple', bg: 'bg-purple-100/80', text: 'text-purple-700', border: 'border-purple-200/80' },
];

export const STORAGE_KEYS = {
  JOURNEY: 'focusflow_learning_journey',
  TASKS: 'focusflow_daily_tasks',
  NOTES: 'focusflow_daily_notes',
  SETTINGS: 'focusflow_settings',
  ACTIVITIES: 'focusflow_activities',
};
