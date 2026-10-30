'use client';

export default function Badge({
  children,
  category = 'Study',
  variant,
  className = '',
  size = 'sm',
}) {
  const categoryStyles = {
    Study: 'bg-blue-100/80 text-blue-700 border-blue-200/80',
    Practice: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/80',
    Project: 'bg-amber-100/90 text-amber-800 border-amber-200/80',
    Notes: 'bg-rose-100/80 text-rose-700 border-rose-200/80',
    Reading: 'bg-purple-100/80 text-purple-700 border-purple-200/80',
    Complete: 'bg-emerald-100/90 text-emerald-800 border-emerald-300/80',
    Partial: 'bg-amber-100/90 text-amber-800 border-amber-300/80',
    Pending: 'bg-slate-100/80 text-slate-700 border-slate-200/80',
  };

  const currentStyle = variant ? categoryStyles[variant] : (categoryStyles[category] || categoryStyles.Study);

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px] font-medium',
    sm: 'px-2.5 py-0.5 text-xs font-medium',
    md: 'px-3 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full border backdrop-blur-md
        transition-colors
        ${sizeStyles[size] || sizeStyles.sm}
        ${currentStyle}
        ${className}
      `}
    >
      {children || category}
    </span>
  );
}
