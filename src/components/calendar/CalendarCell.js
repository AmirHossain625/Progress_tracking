'use client';

export default function CalendarCell({
  cell,
  isSelected,
  status = 'none', // 'complete', 'partial', 'pending', 'none'
  isToday,
  onClick,
}) {
  const { dayNum, isCurrentMonth } = cell;

  // Determine background and text colors matching screenshot
  let cellStyle = 'bg-white/30 text-slate-700 border-white/40 hover:bg-white/60';
  let dotColor = null;

  if (isSelected) {
    cellStyle = 'bg-indigo-600 text-white font-extrabold shadow-lg shadow-indigo-600/30 border-indigo-400 scale-[1.04] ring-2 ring-white/70';
    dotColor = 'bg-white';
  } else if (status === 'complete') {
    cellStyle = 'bg-emerald-400/30 text-emerald-950 font-bold border-emerald-400/50 hover:bg-emerald-400/45';
    dotColor = 'bg-emerald-500';
  } else if (status === 'partial') {
    cellStyle = 'bg-amber-300/40 text-amber-950 font-bold border-amber-400/60 hover:bg-amber-300/55';
    dotColor = 'bg-amber-500';
  } else if (status === 'pending') {
    cellStyle = 'bg-white/45 text-slate-800 border-white/60 hover:bg-white/70';
    dotColor = 'bg-slate-400';
  } else if (!isCurrentMonth) {
    cellStyle = 'bg-white/15 text-slate-400/60 border-transparent hover:bg-white/30';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative aspect-square rounded-2xl
        flex flex-col items-center justify-center
        border transition-all duration-200
        text-xs sm:text-sm
        ${cellStyle}
      `}
    >
      <span className="leading-none">{dayNum}</span>

      {/* Tiny indicator dot below date */}
      {dotColor && (
        <span
          className={`w-1.5 h-1.5 rounded-full mt-1 ${dotColor}`}
        />
      )}
    </button>
  );
}
