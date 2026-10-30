'use client';

import { useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  Menu,
  Sparkles,
  BookOpen,
  LogOut,
  RefreshCw,
} from 'lucide-react';

export default function Topbar({
  userName = 'Kim So Men',
  onOpenSearch,
  onOpenMobileMenu,
  onLoadDemo,
  onResetData,
  onSelectNav,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  const initialLetter = userName ? userName.charAt(0).toUpperCase() : 'K';

  return (
    <header className="relative w-full z-30 flex items-center justify-between gap-4 py-2 px-1">
      {/* Left: Mobile Menu & Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile Hamburger */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2.5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 text-slate-700 hover:bg-white/70 shadow-sm"
          title="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar Pill */}
        <div
          onClick={onOpenSearch}
          className="
            flex-1 flex items-center justify-between gap-2
            px-4 py-2.5 rounded-full
            bg-white/45 backdrop-blur-xl
            border border-white/60
            shadow-[0_4px_20px_0_rgba(31,38,135,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.7)]
            text-slate-500 hover:text-slate-800 hover:bg-white/55
            cursor-pointer transition-all duration-200
          "
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs sm:text-sm font-normal text-slate-600 truncate">
              Search tasks, notes, or anything...
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/60 border border-white/80 text-[11px] font-semibold text-slate-500 shadow-xs">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls: Theme Toggle, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Theme Toggle (Sun) */}
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className="
            w-10 h-10 rounded-full
            bg-white/45 backdrop-blur-xl
            border border-white/60
            flex items-center justify-center
            text-slate-600 hover:text-slate-900 hover:bg-white/65
            shadow-[0_4px_16px_0_rgba(31,38,135,0.05)]
            transition-all duration-200
          "
          title="Toggle light / soft glow theme"
        >
          {isLightMode ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500" />
          )}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            className="
              relative w-10 h-10 rounded-full
              bg-white/45 backdrop-blur-xl
              border border-white/60
              flex items-center justify-center
              text-slate-600 hover:text-slate-900 hover:bg-white/65
              shadow-[0_4px_16px_0_rgba(31,38,135,0.05)]
              transition-all duration-200
            "
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {/* Red Notification Indicator Dot */}
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white/80" />
          </button>

          {/* Notifications Dropdown */}
          {showNotificationPopup && (
            <div className="absolute right-0 mt-2 w-72 p-3 bg-white/85 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-2xl z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 mb-2">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">
                  1 New
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 border border-white/80 text-xs">
                <p className="font-semibold text-slate-800">Daily Reminder</p>
                <p className="text-slate-500 mt-0.5">Keep up your 5-day streak! Complete today's learning goal.</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="
              flex items-center gap-2.5 p-1 sm:pr-3 rounded-full
              bg-white/45 backdrop-blur-xl
              border border-white/60
              hover:bg-white/65
              shadow-[0_4px_16px_0_rgba(31,38,135,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.8)]
              transition-all duration-200
            "
          >
            {/* Dark Circle Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-inner">
              {initialLetter}
            </div>

            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-900">
                {userName}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Learning Journey
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 p-2 bg-white/85 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-2xl z-50 animate-fade-in">
              <div className="px-3 py-2 border-b border-slate-200/60 mb-1">
                <p className="text-xs font-bold text-slate-900">{userName}</p>
                <p className="text-[11px] text-slate-500">FocusFlow Account</p>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onSelectNav('settings');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-white/70 font-medium text-left"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Learning Goals & Settings</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLoadDemo();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-white/70 font-medium text-left"
              >
                <RefreshCw className="w-4 h-4 text-emerald-600" />
                <span>Reload Screenshot Demo</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (confirm('Are you sure you want to reset all data and restart onboarding?')) {
                    onResetData();
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-medium text-left mt-1"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Reset Application</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
