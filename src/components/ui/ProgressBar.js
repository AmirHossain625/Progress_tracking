'use client';

export default function ProgressBar({
  value = 0,
  max = 100,
  height = 'h-2',
  color = 'indigo', // 'indigo', 'green', 'purple', 'blue', 'amber'
  className = '',
  showLabel = false,
  label = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100))) || 0;

  const colorGradients = {
    indigo: 'bg-gradient-to-r from-indigo-500 to-blue-500',
    green: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
    purple: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600',
    blue: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    amber: 'bg-gradient-to-r from-amber-400 to-amber-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
          <span>{label}</span>
          <span className="font-semibold text-slate-900">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200/60 rounded-full overflow-hidden backdrop-blur-sm ${height} p-[1px]`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out ${colorGradients[color] || colorGradients.indigo}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
