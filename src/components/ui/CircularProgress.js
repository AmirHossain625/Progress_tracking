'use client';

export default function CircularProgress({
  percentage = 40,
  size = 110,
  strokeWidth = 9,
  label = 'Completed',
  sublabel = '',
  gradientId = 'circleGradient',
  startColor = '#6366F1',
  endColor = '#3B82F6',
  className = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(226, 232, 240, 0.55)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Indicator */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-none">
            {percentage}%
          </span>
          {label && (
            <span className="text-[10px] md:text-xs font-medium text-slate-500 mt-0.5 leading-none">
              {label}
            </span>
          )}
        </div>
      </div>

      {sublabel && (
        <span className="text-xs font-medium text-slate-600 mt-2">
          {sublabel}
        </span>
      )}
    </div>
  );
}
