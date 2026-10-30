import './globals.css';

export const metadata = {
  title: 'FocusFlow — Personal Learning Journey Tracker',
  description: 'Track your personal learning accountability, daily commitments, tasks, and streaks with a visual calendar dashboard.',
  keywords: ['learning tracker', 'habit tracker', 'calendar', 'focusflow', 'productivity', 'accountability'],
  authors: [{ name: 'FocusFlow' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-500/30 selection:text-indigo-950">
        {/* Full-bleed scenic nature background layer */}
        <div className="nature-app-background" />
        <div className="nature-app-overlay" />
        
        {children}
      </body>
    </html>
  );
}
