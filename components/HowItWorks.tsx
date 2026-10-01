import React from 'react';
import { ClipboardListIcon, BoltIcon, MonitorIcon } from './Icons';

const STEPS = [
  {
    n: 'STAGE 01',
    icon: <ClipboardListIcon className="w-6 h-6 text-blue-400" />,
    title: 'ව්‍යාපාරයේ විස්තර ඇතුළත් කරන්න',
    en: 'System Parameter Entry',
    desc: 'ව්‍යාපාරයේ නම, ක්ෂේත්‍රය (Supermarket, Restaurant, Fashion etc.), දෛනික transaction volume සහ features තෝරන්න.',
  },
  {
    n: 'STAGE 02',
    icon: <BoltIcon className="w-6 h-6 text-amber-400" />,
    title: 'AI පද්ධතිය Workstation එක සකසයි',
    en: 'Automated POS Assembly',
    desc: 'ඔබේ ව්‍යාපාරයට අනන්‍ය වූ sample products, categories, stock tracking, barcodes සහ pricing ක්ෂණිකව generate කෙරේ.',
  },
  {
    n: 'STAGE 03',
    icon: <MonitorIcon className="w-6 h-6 text-emerald-400" />,
    title: 'සම්පූර්ණ POS පද්ධතිය අත්හදා බලන්න',
    en: 'Hardware Terminal Simulation',
    desc: 'Cart billing, discount application, multi-payment options, customer loyalty සහ thermal receipt generation සජීවීව පරික්ෂා කරන්න.',
  },
];

export function HowItWorks() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-24 px-4 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg skeuo-card text-xs font-mono font-bold text-blue-400 mb-4 border border-slate-700 shadow-md">
        <span className="skeuo-led-blue" />
        <span>THREE-STAGE INITIALIZATION PROCESS</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        තත්පර 30කින් Live POS Demonstration එකක්
      </h2>
      <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-12">
        කිසිදු තාක්ෂණික දැනුමක් අවශ්‍ය නැත. සරල පියවර 3කින් ඔබගේ වෙළඳසැලට ගැලපෙන මෘදුකාංග අත්දැකීම ලබාගන්න.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="skeuo-chassis-panel rounded-2xl p-6 relative flex flex-col justify-between"
          >
            {/* Corner Screws */}
            <div className="absolute top-2.5 left-2.5 skeuo-screw" />
            <div className="absolute top-2.5 right-2.5 skeuo-screw" />

            <div>
              <div className="flex items-center justify-between mb-5 pt-2">
                <span className="w-12 h-12 rounded-xl skeuo-inset-well flex items-center justify-center border border-slate-700">
                  {s.icon}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 shadow-inner">
                  {s.n}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {s.title}
              </h3>
              <p className="text-[11px] font-mono uppercase tracking-wider font-semibold text-blue-400 mb-3">
                {s.en}
              </p>
              <p className="font-abhaya text-slate-300 text-base leading-relaxed">
                {s.desc}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="skeuo-led-green" />
                <span>READY</span>
              </span>
              <span>VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
