'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Clock, Calendar, CheckCircle2, Flame, User } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import {
  TOPIC_PRESETS,
  MOTIVATION_PRESETS,
  CONSEQUENCE_PRESETS,
  DURATION_OPTIONS,
  DAILY_TIME_OPTIONS,
} from '@/constants/config';
import { toDateKey } from '@/lib/date-utils';

export default function OnboardingView({ onComplete, onLoadDemo }) {
  // Form State
  const [userName, setUserName] = useState('Kim So Men');
  const [selectedTopic, setSelectedTopic] = useState('Node.js Backend Development');
  const [customTopic, setCustomTopic] = useState('');
  const [motivation, setMotivation] = useState('Essential for my DevOps career.');
  const [consequence, setConsequence] = useState('I will struggle with backend deployment and architecture if I do not learn it.');
  const [durationDays, setDurationDays] = useState(30);
  const [customDuration, setCustomDuration] = useState('');
  const [dailyHours, setDailyHours] = useState(2);
  const [customHours, setCustomHours] = useState('');
  const [startDate, setStartDate] = useState(toDateKey(new Date()));
  const [errors, setErrors] = useState({});

  const finalTopic = customTopic.trim() || selectedTopic;
  const finalDuration = customDuration ? Number(customDuration) : Number(durationDays);
  const finalDailyHours = customHours ? Number(customHours) : Number(dailyHours);

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!finalTopic) newErrors.topic = 'Please choose or type what you want to learn.';
    if (!motivation.trim()) newErrors.motivation = 'Please specify your motivation.';
    if (!consequence.trim()) newErrors.consequence = 'Please specify the consequence of not learning.';
    if (!finalDuration || finalDuration < 1) newErrors.duration = 'Please specify a valid duration.';
    if (!finalDailyHours || finalDailyHours <= 0) newErrors.dailyHours = 'Please specify your daily commitment.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Keyword extraction for title highlight
    const keyword = finalTopic.includes(' ') ? finalTopic.split(' ')[0] : finalTopic;
    const goalTitle = `${finalDuration} Days of ${finalTopic}`;
    const subtitle = `Building ${finalTopic} skills for my career growth.`;

    onComplete({
      topic: finalTopic,
      keyword,
      goalTitle,
      subtitle,
      motivation: motivation.trim(),
      consequence: consequence.trim(),
      durationDays: finalDuration,
      dailyHours: finalDailyHours,
      startDate,
      userName: userName.trim() || 'Learner',
      isInitialized: true,
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center animate-fade-in">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-xl border border-white/70 shadow-sm text-xs font-bold text-indigo-700">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Welcome to FocusFlow</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Design Your Personal Learning Journey
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Set your target, clarify your purpose, and build daily momentum. Everything is saved privately in your browser.
          </p>

          {/* Quick Demo Preload Banner */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onLoadDemo}
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white/60 hover:bg-white/80 px-4 py-2 rounded-2xl border border-indigo-200/60 shadow-xs transition-all"
            >
              <span>Want to inspect the approved UI demo immediately?</span>
              <span className="underline font-bold">Load 30 Days of Node.js Demo →</span>
            </button>
          </div>
        </div>

        {/* Single-Page Comprehensive Form */}
        <GlassCard className="p-6 sm:p-8 lg:p-10 shadow-glass-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Profile & Start Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-white/50">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-600" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Kim So Men"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Journey Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm font-semibold text-slate-900"
                />
              </div>
            </div>

            {/* Question 1: What do you want to learn? */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <label className="text-base font-bold text-slate-900">
                  What do you want to learn?
                </label>
              </div>

              {/* Predefined Topic Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {TOPIC_PRESETS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(topic);
                      setCustomTopic('');
                    }}
                    className={`
                      px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all duration-200
                      ${
                        selectedTopic === topic && !customTopic
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-transparent shadow-md shadow-indigo-600/25 scale-[1.02]'
                          : 'bg-white/50 text-slate-700 border-white/80 hover:bg-white/80'
                      }
                    `}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* Custom Topic Input */}
              <div className="pt-2">
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Or enter a custom skill / topic (e.g. Distributed Systems in Go)..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>
              {errors.topic && <p className="text-xs text-rose-600 font-medium">{errors.topic}</p>}
            </div>

            {/* Question 2: Why do you want to learn this? */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <label className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Why do you want to learn this? (Your Motivation)
                </label>
              </div>

              {/* Predefined Motivation Suggestions */}
              <div className="flex flex-wrap gap-2">
                {MOTIVATION_PRESETS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMotivation(item)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/50 hover:bg-white/80 text-slate-700 border border-white/70 transition-colors text-left"
                  >
                    "{item}"
                  </button>
                ))}
              </div>

              <input
                type="text"
                required
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Write your strong personal motivation..."
                className="w-full px-4 py-2.5 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs sm:text-sm text-slate-900"
              />
              {errors.motivation && <p className="text-xs text-rose-600 font-medium">{errors.motivation}</p>}
            </div>

            {/* Question 3: What happens if you don't learn this? */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <label className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  What happens if you don't learn this? (The Consequence)
                </label>
              </div>

              {/* Predefined Consequence Suggestions */}
              <div className="flex flex-wrap gap-2">
                {CONSEQUENCE_PRESETS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setConsequence(item)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/50 hover:bg-white/80 text-slate-700 border border-white/70 transition-colors text-left"
                  >
                    "{item}"
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                required
                value={consequence}
                onChange={(e) => setConsequence(e.target.value)}
                placeholder="What is the real cost or frustration of staying stagnant?"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs sm:text-sm text-slate-900 resize-none"
              />
              {errors.consequence && <p className="text-xs text-rose-600 font-medium">{errors.consequence}</p>}
            </div>

            {/* Question 4 & 5 Grid: Duration & Daily Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Question 4: Duration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <label className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    How many days to dedicate?
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.days}
                      type="button"
                      onClick={() => {
                        setDurationDays(opt.days);
                        setCustomDuration('');
                      }}
                      className={`
                        p-2.5 rounded-2xl text-xs font-bold border transition-all text-center
                        ${
                          durationDays === opt.days && !customDuration
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                            : 'bg-white/50 text-slate-700 border-white/80 hover:bg-white/80'
                        }
                      `}
                    >
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  min="1"
                  max="365"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="Or enter custom number of days..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs text-slate-800"
                />
              </div>

              {/* Question 5: Daily Commitment */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    5
                  </span>
                  <label className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Daily time commitment?
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {DAILY_TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.hours}
                      type="button"
                      onClick={() => {
                        setDailyHours(opt.hours);
                        setCustomHours('');
                      }}
                      className={`
                        p-2.5 rounded-2xl text-xs font-bold border transition-all text-center
                        ${
                          dailyHours === opt.hours && !customHours
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                            : 'bg-white/50 text-slate-700 border-white/80 hover:bg-white/80'
                        }
                      `}
                    >
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  max="12"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  placeholder="Or enter custom daily hours (e.g. 1.5)..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                You can adjust your goals, time commitments, and tasks anytime in Settings.
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>Launch My Learning Journey</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
