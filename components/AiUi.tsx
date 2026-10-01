import React from 'react';

/** 4-point sparkle icon */
export function SparkleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2c.4 4.6 2.4 8.2 6 9.3-3.6 1.1-5.6 4.7-6 9.3-.4-4.6-2.4-8.2-6-9.3C9.6 10.2 11.6 6.6 12 2Z" />
      <path d="M19 2c.15 1.6.85 2.8 2 3.2-1.15.4-1.85 1.6-2 3.2-.15-1.6-.85-2.8-2-3.2 1.15-.4 1.85-1.6 2-3.2Z" opacity=".7" />
    </svg>
  );
}

/** Skeuomorphic hardware avatar with raised metallic bezel */
export function AiAvatar({ size = 38 }: { size?: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-lg skeuo-card p-1 flex items-center justify-center text-blue-400 border border-slate-600 shadow-md"
      style={{ width: size, height: size }}
    >
      <SparkleIcon className="w-5 h-5 text-blue-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

/** Skeuomorphic Question Module */
export function AiBubble({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex items-start gap-3.5 mb-2">
      <AiAvatar size={42} />
      <div className="flex-1 skeuo-inset-well rounded-xl p-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {title}
        </h2>
        {hint && <p className="text-slate-400 text-xs sm:text-sm mt-1">{hint}</p>}
      </div>
    </div>
  );
}

/** Skeuomorphic 3D tactile user chip */
export function UserChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 skeuo-btn-primary text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg">
      {children}
    </span>
  );
}

export function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label="thinking">
      <span className="skeuo-led-blue" />
      <span className="skeuo-led-green" />
      <span className="skeuo-led-amber" />
    </span>
  );
}
