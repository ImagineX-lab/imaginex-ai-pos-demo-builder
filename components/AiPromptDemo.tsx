'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SparkleIcon } from './AiUi';

const PROMPTS = [
  'Colombo Supermarket POS demo — Barcode tracking, discounts, loyalty points & multi-payment',
  'Kandy Multi-cuisine Restaurant POS demo — Dine-in, kitchen billing & QR payments',
  'Galle Fashion Boutique POS demo — Size variations, hold orders & card checkout',
  'Retail Pharmacy POS demo — Batch expiry tracking, fast billing & customer credit',
];

const CHIPS = ['INVENTORY MODULE', 'TIERED DISCOUNTS', 'MULTI-PAYMENT', 'LOYALTY REWARDS', 'THERMAL PRINT'];

export function AiPromptDemo() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = PROMPTS[idx];
    let delay = deleting ? 16 : 38;

    if (!deleting && text === full) delay = 2000;
    if (deleting && text === '') delay = 400;

    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true);
      if (deleting && text === '') {
        setDeleting(false);
        return setIdx((i) => (i + 1) % PROMPTS.length);
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <div className="w-full max-w-3xl mx-auto skeuo-chassis-panel rounded-2xl p-5 sm:p-7 text-left relative">
      {/* 4 Corner Screws for Hardware Authenticity */}
      <div className="absolute top-3 left-3 skeuo-screw" />
      <div className="absolute top-3 right-3 skeuo-screw" />
      <div className="absolute bottom-3 left-3 skeuo-screw" />
      <div className="absolute bottom-3 right-3 skeuo-screw" />

      {/* Hardware Terminal Title Plate */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/80 px-4">
        <div className="flex items-center gap-2.5">
          <span className="skeuo-led-green" />
          <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
            IMAGINEX AI CONFIGURATOR CONSOLE • MODEL 8000
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
          <span>STATUS: READY</span>
        </div>
      </div>

      {/* VFD Glowing Screen Display (Recessed with glass reflection) */}
      <div className="skeuo-vfd-screen rounded-xl p-4 sm:p-5 min-h-[85px] sm:min-h-[75px] flex items-center mb-5 mx-2">
        <p className="text-sm sm:text-base leading-relaxed typing-caret text-emerald-300 font-mono tracking-wide">
          {text}
        </p>
      </div>

      {/* Mechanical Hardware Controls & Action */}
      <div className="pt-3 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <span
              key={c}
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 shadow-inner"
            >
              {c}
            </span>
          ))}
        </div>
        <Link
          href="/wizard"
          id="cta-start-wizard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl skeuo-btn-primary text-xs sm:text-sm font-bold tracking-wider whitespace-nowrap"
        >
          <SparkleIcon className="w-4 h-4 text-white" />
          <span>INITIALIZE SETUP WIZARD →</span>
        </Link>
      </div>
    </div>
  );
}
