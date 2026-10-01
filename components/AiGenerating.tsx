'use client';

import { useEffect, useState } from 'react';
import { SparkleIcon } from './AiUi';

const STEPS = [
  'ව්‍යාපාර වර්ගය සහ නාමාවලිය විශ්ලේෂණය',
  'Product categories & SKU codes නිර්මාණය',
  'Sample items, pricing & stock counts සැකසීම',
  'Payment gateways & discount modules සක්‍රිය කිරීම',
  'Tactile brand theme එක යෙදීම',
];

export function AiGenerating({ businessName, color }: { businessName: string; color: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => Math.min(a + 1, STEPS.length - 1)), 1300);
    return () => clearInterval(t);
  }, []);

  const pct = Math.round(((active + 1) / STEPS.length) * 94);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg skeuo-chassis-panel rounded-2xl p-6 sm:p-8 text-center border-2 border-slate-700 shadow-2xl">
        {/* 4 Hardware Screws */}
        <div className="absolute top-3 left-3 skeuo-screw" />
        <div className="absolute top-3 right-3 skeuo-screw" />
        <div className="absolute bottom-3 left-3 skeuo-screw" />
        <div className="absolute bottom-3 right-3 skeuo-screw" />

        {/* Top telemetry icon */}
        <div className="mx-auto w-14 h-14 rounded-xl skeuo-card flex items-center justify-center mb-5 text-blue-400 border border-slate-600 shadow-lg">
          <SparkleIcon className="w-7 h-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className="text-blue-400">{businessName || 'ඔබේ ව්‍යාපාරය'}</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-mono mt-1 mb-6">
          SKEUOMORPHIC HARDWARE CALIBRATION IN PROGRESS…
        </p>

        {/* Steps list in Inset Well */}
        <ul className="text-left space-y-2 mb-6 skeuo-inset-well p-3.5 rounded-xl">
          {STEPS.map((label, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li
                key={label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 border text-xs sm:text-sm font-mono transition-colors ${
                  current
                    ? 'border-blue-500 bg-slate-900 text-white font-bold'
                    : done
                    ? 'border-slate-800 bg-slate-950 text-slate-300'
                    : 'border-slate-900 bg-black/50 text-slate-600'
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {done ? (
                    <span className="skeuo-led-green" />
                  ) : current ? (
                    <span className="skeuo-led-amber animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                  )}
                </span>
                <span className="flex-1 font-abhaya text-base">{label}</span>
                <span className="text-[10px] text-slate-500">
                  {done ? 'LOADED' : current ? 'PROCESSING' : 'QUEUED'}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Tactile Progress bar in Inset Well */}
        <div className="skeuo-inset-well p-1.5 rounded-full mb-2">
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-blue-600 via-sky-400 to-amber-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="skeuo-led-blue" />
            <span>ROM SYNCHRONIZATION</span>
          </span>
          <span className="font-bold text-white font-mono">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
