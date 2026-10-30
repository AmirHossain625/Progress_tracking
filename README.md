# FocusFlow — Personal Learning Journey Tracker

> **FocusFlow** is a client-side, glassmorphism-designed personal learning accountability and daily progress tracking application built with **Next.js (App Router)**, **React**, and **Tailwind CSS**.

---

## 🌟 Key Features

1. **Ultra-Premium Glassmorphism Aesthetic**
   - Translucent frosted glass panels with `backdrop-filter: blur(20px)`.
   - Subtle glowing white borders and multi-layered depth shadows.
   - High-contrast charcoal/navy typography ensuring readability over a soft-focused nature landscape.
   - Seamless responsive design across desktop, tablet, and mobile screens.

2. **Single-Page Onboarding Experience**
   - All 5 questions presented on **one clean page** (no multi-step wizard):
     1. Learning Topic (Curated chips + custom input)
     2. Motivation ("Why?")
     3. Consequence ("If not?")
     4. Duration (7 to 90 days)
     5. Daily Commitment (30 mins to 4 hours)
   - Automatically derives the dynamic journey title and subtitle.

3. **Interactive Learning Calendar**
   - Month-by-month navigation with jump to "Today".
   - Color-coded daily completion engine:
     - 🟢 **Complete**: All planned tasks finished (minimum 1 task).
     - 🟡 **Partial**: At least 1 task finished, but some remain.
     - ⚪ **Pending**: Tasks exist but 0 finished, or date has no records.
     - 🔵 **Today / Selected**: Vibrant royal blue active highlight.
   - Clicking any calendar date instantly synchronizes the Tasks and Notes panels.

4. **Task & Notes Management**
   - Checkbox interactions with real-time recalculation of day completion status and streaks.
   - Categorized tags: `Study`, `Practice`, `Project`, `Notes`, `Reading`.
   - Add, edit, and delete tasks with duration estimates.
   - Date-linked daily engineering notes and reflection journal.

5. **Accurate Progress & Streak Engine**
   - Real streak calculation based strictly on fully completed days.
   - 3D rounded bar charts displaying weekly velocity (Mon - Sun).
   - Real-time audit log of recent activity.

6. **SSR-Safe LocalStorage Architecture**
   - 100% private: all data stays inside your browser.
   - Zero hydration mismatch safeguards.
   - Full JSON Export and Import for backups.
   - One-click reload for the approved screenshot demo state (Node.js 30-day journey).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, JavaScript)
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom glassmorphism plugins
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Next.js Static Export (`output: 'export'`) for GitHub Pages

---

## 🚀 Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 GitHub Pages Deployment Guide

FocusFlow is fully configured for zero-configuration deployment to **GitHub Pages** using Next.js static HTML export.

### Automatic Deployment (GitHub Actions)

1. Push this repository to GitHub (branch `main` or `master`).
2. Go to **Repository Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The included workflow `.github/workflows/deploy.yml` will automatically:
   - Run `npm ci`
   - Detect repository name and set `NEXT_PUBLIC_BASE_PATH`
   - Run `npm run build` to generate the `./out` static export directory
   - Deploy directly to your GitHub Pages URL (`https://<username>.github.io/<repo-name>/`)

### Manual Production Build & Export

To test the static export locally:

```bash
npm run build
```

This compiles static assets into the `out/` folder, which can be served by any static web server (such as Nginx, GitHub Pages, or Netlify).
