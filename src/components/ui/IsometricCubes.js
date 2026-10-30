'use client';

export default function IsometricCubes({ className = 'w-24 h-24' }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_20px_rgba(99,102,241,0.25)]"
      >
        <defs>
          <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3730A3" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="cubeSmallTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cubeSmallLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="cubeSmallRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4338CA" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Cube 1 (Back / Top) */}
        <g transform="translate(70, 10)">
          {/* Top Face */}
          <polygon points="35,0 70,20 35,40 0,20" fill="url(#cubeTop)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          {/* Left Face */}
          <polygon points="0,20 35,40 35,80 0,60" fill="url(#cubeLeft)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          {/* Right Face */}
          <polygon points="35,40 70,20 70,60 35,80" fill="url(#cubeRight)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
        </g>

        {/* Cube 2 (Front / Bottom Right) */}
        <g transform="translate(85, 45)">
          {/* Top Face */}
          <polygon points="32,0 64,18 32,36 0,18" fill="url(#cubeSmallTop)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
          {/* Left Face */}
          <polygon points="0,18 32,36 32,72 0,54" fill="url(#cubeSmallLeft)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          {/* Right Face */}
          <polygon points="32,36 64,18 64,54 32,72" fill="url(#cubeSmallRight)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
        </g>

        {/* Cube 3 (Front / Left) */}
        <g transform="translate(15, 30)">
          {/* Top Face */}
          <polygon points="30,0 60,17 30,34 0,17" fill="url(#cubeSmallTop)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
          {/* Left Face */}
          <polygon points="0,17 30,34 30,68 0,51" fill="url(#cubeSmallLeft)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          {/* Right Face */}
          <polygon points="30,34 60,17 60,51 30,68" fill="url(#cubeSmallRight)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}
