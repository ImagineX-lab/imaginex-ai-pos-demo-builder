import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SocialButtons } from './SocialIcons';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

export function Footer() {
  const whatsapp = SOCIAL_LINKS.find((s) => s.id === 'whatsapp');

  return (
    <footer className="w-full skeuo-chassis-panel text-slate-400 relative z-20 mt-auto border-t border-slate-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-700/80 pb-10">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden skeuo-card p-1 border border-slate-600 shadow-md">
                <Image
                  src="/imaginex-logo.png"
                  alt="ImagineX Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-lg text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                IMAGINEX <span className="text-blue-400 font-mono">SKEUO-POS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-mono">
              TACTILE POINT-OF-SALE EMULATION & HARDWARE WORKSTATIONS BUILT BY IMAGINEX SOFTWARE SOLUTIONS.
            </p>
          </div>

          {/* Social Media Links section */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="skeuo-led-green" />
              SYSTEM COMMUNICATIONS
            </h3>
            <SocialButtons size="md" />
            <p className="text-[11px] font-mono text-slate-500 mt-2 text-center">
              Official IMAGINEX hardware channels
            </p>
          </div>

          {/* Quick Action / Contact */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3">
            {whatsapp && (
              <a
                href={whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg skeuo-btn-neutral font-mono font-bold text-xs"
              >
                <span className="skeuo-led-green" />
                <span>EXECUTIVE WHATSAPP DESK</span>
              </a>
            )}
            <Link
              href="/wizard"
              className="text-xs font-mono font-bold text-blue-400 hover:text-blue-300 transition"
            >
              LAUNCH WIZARD SETUP →
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} IMAGINEX Software Solutions. All physical rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-300 transition">
              OVERVIEW
            </Link>
            <span>•</span>
            <Link href="/wizard" className="hover:text-slate-300 transition">
              WIZARD
            </Link>
            <span>•</span>
            <Link href="/#pos-guide" className="hover:text-slate-300 transition">
              MANUAL
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
