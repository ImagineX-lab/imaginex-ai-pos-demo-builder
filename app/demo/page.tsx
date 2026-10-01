'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PosConfig } from '@/lib/types';
import PosDemo from '@/components/PosDemo';
import { SparkleIcon } from '@/components/AiUi';
import { ClipboardListIcon } from '@/components/Icons';

export default function DemoPage() {
  const [config, setConfig] = useState<PosConfig | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('posConfig');
      if (!raw) {
        setNotFound(true);
        return;
      }
      setConfig(JSON.parse(raw));
    } catch {
      setNotFound(true);
    }
  }, []);

  if (notFound) {
    return (
      <main className="min-h-screen bg-corporate flex flex-col items-center justify-center gap-5 px-4 text-center corporate-grid">
        <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
          <span className="text-2xl font-mono">!</span>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">Demo Data Not Found</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-sm">
            ප්‍රශ්නාවලිය සම්පූර්ණ කිරීමෙන් පසු demo terminal එක සක්‍රිය වේ. කරුණාකර නැවත generate කරන්න.
          </p>
        </div>
        <Link
          href="/wizard"
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-sm"
        >
          Demo නැවත Generate කරන්න →
        </Link>
      </main>
    );
  }

  if (!config) {
    return (
      <main className="min-h-screen bg-corporate flex flex-col items-center justify-center gap-4 corporate-grid">
        <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 text-xs font-mono">Initializing POS Terminal Workstation...</p>
      </main>
    );
  }

  return <PosDemo config={config} />;
}
