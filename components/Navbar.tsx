import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SocialButtons } from './SocialIcons';
import { SparkleIcon } from './AiUi';
import { BookOpenIcon } from './Icons';

export function Navbar() {
  return (
    <header className="w-full skeuo-chassis-panel sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left Side: Stamped Metal Logo Plate */}
        <div className="flex items-center gap-3">
          {/* Metallic Corner Screw */}
          <div className="hidden sm:block skeuo-screw mr-1" />

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden skeuo-card p-1 border border-slate-600/80 shadow-md">
              <Image
                src="/imaginex-logo.png"
                alt="ImagineX Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-wider text-base sm:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  IMAGINEX
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-slate-900 border border-slate-700 text-blue-400 shadow-inner flex items-center gap-1.5">
                  <span className="skeuo-led-blue" />
                  <span>SKEUO-POS v2.4</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider hidden sm:block">
                HARDWARE SYSTEMS & POS SIMULATOR
              </p>
            </div>
          </Link>
        </div>

        {/* Right side: Hardware Buttons & Indicators */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/#pos-guide"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg skeuo-btn-neutral text-xs sm:text-sm font-semibold"
          >
            <BookOpenIcon className="w-4 h-4 text-blue-400" />
            <span className="font-abhaya text-sm sm:text-base font-bold">POS යනු කුමක්ද?</span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 border-r border-slate-700/80 pr-4">
            <span className="text-xs font-mono text-slate-400">CHANNELS:</span>
            <SocialButtons size="sm" />
          </div>

          <Link
            href="/wizard"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg skeuo-btn-primary text-xs sm:text-sm font-bold tracking-wide"
          >
            <SparkleIcon className="w-4 h-4 text-white" />
            <span>GENERATE DEMO</span>
          </Link>

          {/* Right Corner Metallic Screw */}
          <div className="hidden sm:block skeuo-screw ml-1" />
        </div>
      </div>
    </header>
  );
}
