'use client';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const sizeStyles = {
    xs: 'px-2.5 py-1 text-xs rounded-lg gap-1.5',
    sm: 'px-3 py-1.5 text-xs font-medium rounded-xl gap-1.5',
    md: 'px-4 py-2 text-sm font-medium rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-base font-semibold rounded-2xl gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/25 active:scale-[0.98]',
    glass:
      'bg-white/60 hover:bg-white/80 text-slate-800 border border-white/80 shadow-sm active:scale-[0.98]',
    secondary:
      'bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-900 border border-indigo-200/60 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-white/40 text-slate-700 active:scale-[0.98]',
    danger:
      'bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-200/60 active:scale-[0.98]',
    success:
      'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 border border-emerald-300/60 active:scale-[0.98]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200 select-none
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
