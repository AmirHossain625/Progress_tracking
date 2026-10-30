'use client';

import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart2,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Sidebar({
  activeNav = 'dashboard',
  onSelectNav,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    onSelectNav(id);
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:static top-0 bottom-0 left-0 z-50
          flex flex-col justify-between
          h-full
          bg-white/40 lg:bg-white/35 backdrop-blur-2xl
          border-r border-white/60
          shadow-[0_8px_32px_0_rgba(31,38,135,0.06),inset_-1px_0_0_0_rgba(255,255,255,0.4)]
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          p-4 sm:p-5
        `}
      >
        {/* Top: Logo & Collapse Button */}
        <div>
          <div className="flex items-center justify-between pb-6">
            <div
              className={`flex items-center gap-3 cursor-pointer overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              {/* 3D Layered Isometric Logo */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 p-2 shrink-0 border border-white/40">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="currentColor"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-tight">
                    FocusFlow
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Learning Tracker
                  </span>
                </div>
              )}
            </div>

            {/* Collapse toggle button (desktop) */}
            {!isCollapsed && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Collapsed expand button */}
          {isCollapsed && (
            <div className="hidden lg:flex justify-center pb-4">
              <button
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-colors"
                title="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Menu Section */}
          <div className="mt-2">
            {!isCollapsed && (
              <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400 px-3 mb-2">
                MENU
              </p>
            )}

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl
                      text-sm font-medium transition-all duration-200 group
                      ${isCollapsed ? 'justify-center px-0' : ''}
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-indigo-900 border border-indigo-400/40 shadow-[0_4px_16px_rgba(99,102,241,0.15)] font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 border border-transparent'
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive
                          ? 'text-indigo-600'
                          : 'text-slate-500 group-hover:text-slate-800'
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 text-left">{item.label}</span>
                    )}

                    {!isCollapsed && isActive && (
                      <ChevronRight className="w-4 h-4 text-indigo-500" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Promo Card: "Small Steps Big Results" */}
        {!isCollapsed && (
          <div className="relative mt-auto pt-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/70 shadow-lg shadow-black/10 group">
              {/* Background mountain photo */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url('/images/mountain-promo.jpg')`,
                }}
              />
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />

              <div className="relative p-4 flex items-end justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-base leading-snug drop-shadow-md">
                    Small
                    <br />
                    Steps
                  </h4>
                  <p className="text-slate-200 text-xs font-medium drop-shadow-sm mt-0.5">
                    Big Results
                  </p>
                </div>

                <button
                  onClick={() => handleNavClick('progress')}
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition-transform group-hover:translate-x-0.5"
                  title="View Progress"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
