'use client';

export default function GlassCard({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl md:rounded-3xl
        bg-white/45 backdrop-blur-xl
        border border-white/60
        shadow-[0_8px_32px_0_rgba(31,38,135,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.8)]
        transition-all duration-300
        ${hoverEffect ? 'hover:bg-white/55 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)] hover:-translate-y-0.5' : ''}
        ${glow ? 'shadow-[0_0_30px_-5px_rgba(99,102,241,0.25)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
