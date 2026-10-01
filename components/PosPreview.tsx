import React from 'react';
import { ShoppingCartIcon, ReceiptIcon } from './Icons';

const ITEMS = [
  { code: 'RICE-01', n: 'Basmati Rice 1kg', p: 'Rs. 420.00', stock: '45 PCS' },
  { code: 'MILK-02', n: 'Fresh Milk 1L', p: 'Rs. 340.00', stock: '18 BTL' },
  { code: 'BRED-03', n: 'Sandwich Bread', p: 'Rs. 180.00', stock: '08 PCK' },
  { code: 'EGGS-04', n: 'Eggs (10 pack)', p: 'Rs. 520.00', stock: '32 PCK' },
  { code: 'TEA-05',  n: 'Ceylon Tea 200g', p: 'Rs. 690.00', stock: '24 PCK' },
  { code: 'DISH-06', n: 'Dish Wash 500ml', p: 'Rs. 310.00', stock: '12 BTL' },
];

export function PosPreview() {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-14 px-2 slide-up">
      {/* Heavy Industrial Metal Chassis Frame */}
      <div className="rounded-2xl skeuo-chassis-panel p-4 sm:p-6 relative">
        {/* Hardware Screws at 4 corners */}
        <div className="absolute top-3 left-3 skeuo-screw" />
        <div className="absolute top-3 right-3 skeuo-screw" />
        <div className="absolute bottom-3 left-3 skeuo-screw" />
        <div className="absolute bottom-3 right-3 skeuo-screw" />

        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-3 pb-3 mb-4 border-b border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg skeuo-card flex items-center justify-center font-bold text-white border border-slate-600">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-white text-sm font-bold font-mono tracking-wide">
                  SANUKA SUPERMARKET & RETAIL
                </h4>
                <span className="skeuo-led-green" />
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                TERMINAL-01 • SCANNER ACTIVE • PRINTER ONLINE
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 shadow-inner">
              CASH DRAWER: CLOSED
            </span>
          </div>
        </div>

        {/* Dual Display Layout: Left Catalog Hardware, Right VFD Register */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 text-left">
          {/* Left: Product Keypad Panel */}
          <div className="skeuo-inset-well rounded-xl p-4 sm:p-5">
            {/* Category Hardware Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {['ALL ITEMS', 'GRAINS & FLOUR', 'DAIRY & EGGS', 'BEVERAGES'].map((cat, i) => (
                <button
                  key={cat}
                  className={`text-xs font-mono font-bold px-3.5 py-2 rounded-lg transition-all ${
                    i === 0
                      ? 'skeuo-btn-primary'
                      : 'skeuo-btn-neutral'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tactile Keypad Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ITEMS.map((it, i) => (
                <div
                  key={it.n}
                  className={`p-3 rounded-xl skeuo-register-key flex flex-col justify-between ${
                    i === 0 ? 'ring-2 ring-blue-500/80' : ''
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono font-bold text-blue-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                        {it.code}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        {it.stock}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-100 leading-snug mt-1">
                      {it.n}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-700/80 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {it.p}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded skeuo-btn-neutral">
                      RING +
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: VFD Register & Receipt Chamber */}
          <div className="flex flex-col justify-between space-y-4">
            {/* VFD Digital Readout Screen */}
            <div className="skeuo-vfd-screen rounded-xl p-4">
              <div className="flex justify-between text-[11px] font-mono text-emerald-400/80 mb-2 border-b border-emerald-950 pb-1">
                <span>ACTIVE BILL (2 ITEMS)</span>
                <span>REG-01</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>1. FRESH MILK 1L x2</span>
                  <span>Rs. 680.00</span>
                </div>
                <div className="flex justify-between">
                  <span>2. SANDWICH BREAD x1</span>
                  <span>Rs. 180.00</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-900/80 flex justify-between font-bold text-sm text-emerald-300">
                <span>TOTAL DUE:</span>
                <span>Rs. 860.00</span>
              </div>
            </div>

            {/* Thermal Printer Output Slot Simulation */}
            <div className="skeuo-card rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700 text-xs font-mono font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ReceiptIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>PRINTER CHAMBER</span>
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="skeuo-led-green" />
                  <span>READY</span>
                </span>
              </div>
              <div className="p-3 bg-[#fbfbf9] text-slate-900 font-mono text-[10px] rounded shadow-inner border border-slate-300 space-y-1">
                <p className="text-center font-bold">SANUKA SUPERMARKET</p>
                <p className="text-center text-[9px] text-slate-500">RECEIPT #1001 • 30/09/2026</p>
                <div className="border-t border-dashed border-slate-400 my-1" />
                <div className="flex justify-between font-bold">
                  <span>TOTAL PAID</span>
                  <span>Rs. 860.00</span>
                </div>
              </div>
              <button className="mt-3 w-full py-2.5 rounded-lg skeuo-btn-primary text-xs font-bold font-mono tracking-wider">
                TRANSACT (F12)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
