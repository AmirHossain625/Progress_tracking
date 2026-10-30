'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Save, RefreshCw, Download, Upload, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { exportDataAsJSON, importDataFromJSON } from '@/lib/storage';
import { DURATION_OPTIONS, DAILY_TIME_OPTIONS } from '@/constants/config';

export default function SettingsView({
  journey,
  onUpdateJourney,
  onLoadDemo,
  onResetData,
}) {
  const [userName, setUserName] = useState(journey?.userName || 'Kim So Men');
  const [topic, setTopic] = useState(journey?.topic || 'Node.js Backend Development');
  const [motivation, setMotivation] = useState(journey?.motivation || 'Essential for DevOps career');
  const [consequence, setConsequence] = useState(journey?.consequence || 'Will struggle with backend deployment and architecture.');
  const [durationDays, setDurationDays] = useState(journey?.durationDays || 30);
  const [dailyHours, setDailyHours] = useState(journey?.dailyHours || 2);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  const handleSaveGoal = (e) => {
    e.preventDefault();
    const keyword = topic.includes(' ') ? topic.split(' ')[0] : topic;
    const goalTitle = `${durationDays} Days of ${topic}`;
    const subtitle = `Building ${topic} skills for my career growth.`;

    onUpdateJourney({
      userName: userName.trim() || 'Learner',
      topic: topic.trim(),
      keyword,
      goalTitle,
      subtitle,
      motivation: motivation.trim(),
      consequence: consequence.trim(),
      durationDays: Number(durationDays),
      dailyHours: Number(dailyHours),
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const jsonStr = exportDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focusflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const success = importDataFromJSON(event.target.result);
        if (success) {
          setImportStatus('Data imported successfully! Reloading...');
          setTimeout(() => window.location.reload(), 1200);
        } else {
          setImportStatus('Failed to import data: invalid JSON structure.');
        }
      } catch (err) {
        setImportStatus('Error reading file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <GlassCard className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-indigo-600" />
          Settings & Journey Configuration
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Customize your learning goals, manage local browser storage, and configure backups.
        </p>
      </GlassCard>

      {/* Goal Edit Form */}
      <GlassCard className="p-6 sm:p-7">
        <form onSubmit={handleSaveGoal} className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/50">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Learning Goal Settings
            </h3>
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved Successfully
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs sm:text-sm text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Learning Skill / Subject
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs sm:text-sm text-slate-900 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Why do you want to learn this? (Motivation)
            </label>
            <input
              type="text"
              required
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs sm:text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              What happens if you don't learn this? (Consequence)
            </label>
            <textarea
              rows={2}
              required
              value={consequence}
              onChange={(e) => setConsequence(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs sm:text-sm text-slate-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Duration (Days)
              </label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs sm:text-sm text-slate-900 font-semibold"
              >
                {DURATION_OPTIONS.map((d) => (
                  <option key={d.days} value={d.days}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Daily Time Commitment
              </label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/60 border border-white/80 text-xs sm:text-sm text-slate-900 font-semibold"
              >
                {DAILY_TIME_OPTIONS.map((t) => (
                  <option key={t.hours} value={t.hours}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" type="submit" icon={Save}>
              Save Journey Changes
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* LocalStorage Data Management & Backups */}
      <GlassCard className="p-6 sm:p-7 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-white/50">
          Data Management & LocalStorage
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          FocusFlow operates completely client-side in your browser. No data leaves your machine. Use the controls below to backup, restore, or reset.
        </p>

        {importStatus && (
          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-800 font-medium">
            {importStatus}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Backup / Export */}
          <Button
            variant="glass"
            icon={Download}
            onClick={handleExportBackup}
            className="w-full justify-start py-3"
          >
            Export All Data as JSON
          </Button>

          {/* Restore / Import */}
          <label className="w-full">
            <div className="w-full inline-flex items-center justify-start px-4 py-3 text-sm font-medium rounded-xl gap-2 bg-white/60 hover:bg-white/80 text-slate-800 border border-white/80 shadow-sm cursor-pointer select-none">
              <Upload className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Import Data from JSON</span>
            </div>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          {/* Pre-populate Screenshot Demo Data */}
          <Button
            variant="secondary"
            icon={RefreshCw}
            onClick={onLoadDemo}
            className="w-full justify-start py-3"
          >
            Reload Screenshot Demo State
          </Button>

          {/* Reset All Data */}
          <Button
            variant="danger"
            icon={Trash2}
            onClick={() => {
              if (confirm('Are you sure you want to delete all saved data and restart onboarding? This cannot be undone.')) {
                onResetData();
              }
            }}
            className="w-full justify-start py-3"
          >
            Reset All Application Data
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
