'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { PosConfig, PosProduct, CartLine, Customer, HeldOrder, Transaction } from '@/lib/types';
import { soundFx } from '@/lib/sound';
import {
  ShoppingCartIcon,
  SearchIcon,
  PauseIcon,
  ClipboardListIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  ChartBarIcon,
  ReceiptIcon,
  UserIcon,
  StarIcon,
  BanknotesIcon,
  CreditCardIcon,
  QrCodeIcon,
  BoxIcon,
} from './Icons';

// ── Utility ──────────────────────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function now() {
  const d = new Date();
  return {
    date: d.toLocaleDateString('en-GB'),
    time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  };
}

function fmtMoney(n: number, currency = 'Rs.') {
  return `${currency} ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Stock Badge ───────────────────────────────────────────────────────────────
function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold stock-zero">OUT</span>;
  if (stock <= 10)
    return <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold stock-low">{stock} LEFT</span>;
  return <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold stock-ok">{stock} IN STOCK</span>;
}

// ── Tier Badge ────────────────────────────────────────────────────────────────
function TierBadge({ tier }: { tier: Customer['tier'] }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono tier-${tier} bg-slate-900 border border-slate-700 shadow-inner`}>
      {tier}
    </span>
  );
}

// ── Authentic Skeuomorphic Thermal Receipt Modal ──────────────────────────────
function ReceiptModal({
  tx,
  config,
  onClose,
}: {
  tx: Transaction;
  config: PosConfig;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Physical Thermal Paper Ticket with Serrated Perforations */}
      <div
        className="skeuo-receipt-paper rounded-lg max-w-sm w-full p-6 text-xs text-slate-900 font-mono relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top & Bottom Serrated Tear Edges */}
        <div className="skeuo-receipt-tear-top" />
        <div className="skeuo-receipt-tear-bottom" />

        {/* Paper Header */}
        <div className="text-center pb-3 border-b-2 border-dashed border-slate-400">
          <div
            className="w-11 h-11 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-lg font-bold shadow-md"
            style={{ backgroundColor: config.brandColor }}
          >
            {config.businessName.charAt(0)}
          </div>
          <p className="font-extrabold text-sm tracking-wider uppercase">{config.businessName}</p>
          {config.tagline && <p className="text-[10px] text-slate-600 mt-0.5">{config.tagline}</p>}
          <div className="flex justify-between text-[10px] text-slate-600 mt-3 pt-1 border-t border-slate-300">
            <span>DATE: {tx.date} {tx.time}</span>
            <span>TX #{tx.receiptNumber}</span>
          </div>
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>REGISTER: #01</span>
            <span>CASHIER: {tx.cashier}</span>
          </div>
        </div>

        {/* Itemised Table */}
        <div className="my-3 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px] font-extrabold border-b border-slate-400 pb-1">
            <span>PARTICULARS</span>
            <span>AMOUNT</span>
          </div>
          {tx.items.map((l) => (
            <div key={l.id} className="flex justify-between text-xs py-0.5">
              <span className="text-slate-900 truncate pr-2 font-medium">
                {l.name} × {l.qty}
              </span>
              <span className="font-bold whitespace-nowrap">{fmtMoney(l.price * l.qty, config.currency)}</span>
            </div>
          ))}
        </div>

        {/* Financial Breakdown */}
        <div className="mt-3 pt-2 border-t-2 border-dashed border-slate-400 space-y-1 text-xs">
          <div className="flex justify-between text-slate-700">
            <span>SUBTOTAL</span>
            <span>{fmtMoney(tx.subtotal, config.currency)}</span>
          </div>
          {tx.discountAmount > 0 && (
            <div className="flex justify-between text-red-700 font-bold">
              <span>DISCOUNT ({tx.discountPct}%)</span>
              <span>- {fmtMoney(tx.discountAmount, config.currency)}</span>
            </div>
          )}
          {tx.taxAmount > 0 && (
            <div className="flex justify-between text-slate-700">
              <span>TAX/VAT ({config.taxRate}%)</span>
              <span>{fmtMoney(tx.taxAmount, config.currency)}</span>
            </div>
          )}
          <div className="flex justify-between font-black text-sm border-t-2 border-slate-900 pt-1 mt-1">
            <span>TOTAL DUE</span>
            <span>{fmtMoney(tx.total, config.currency)}</span>
          </div>
          <div className="flex justify-between text-slate-700 pt-1">
            <span>TENDER TYPE</span>
            <span className="uppercase font-bold">{tx.paymentMethod}</span>
          </div>
          {tx.paymentMethod === 'cash' && (
            <>
              <div className="flex justify-between text-slate-700">
                <span>CASH TENDERED</span>
                <span>{fmtMoney(tx.amountTendered, config.currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900">
                <span>CHANGE RETURNED</span>
                <span>{fmtMoney(tx.change, config.currency)}</span>
              </div>
            </>
          )}
        </div>

        {/* Loyalty Section */}
        {tx.customer && (
          <div className="mt-3 py-2 px-3 rounded bg-slate-200/80 border border-slate-300 text-[11px]">
            <div className="flex justify-between font-bold">
              <span>LOYALTY: {tx.customer.name}</span>
              <span>+{Math.floor(tx.total / 100)} PTS</span>
            </div>
          </div>
        )}

        {/* Paper Footer with Simulated Barcode Lines */}
        <div className="text-center mt-4 pt-3 border-t-2 border-dashed border-slate-400 text-[10px] text-slate-600">
          <div className="h-7 w-3/4 mx-auto my-1.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-around px-2">
            {[...Array(24)].map((_, i) => (
              <span key={i} className={`h-full ${i % 2 === 0 ? 'w-1 bg-white' : 'w-0.5 bg-black'}`} />
            ))}
          </div>
          <p className="font-bold">THANK YOU FOR YOUR PATRONAGE</p>
          <p className="text-[9px] mt-0.5">IMAGINEX SKEUOMORPHIC TERMINAL SYSTEM</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-lg skeuo-btn-neutral text-xs font-mono font-bold tracking-wider"
        >
          TEAR & CLOSE RECEIPT
        </button>
      </div>
    </div>
  );
}

// ── Customer Select Modal ─────────────────────────────────────────────────────
function CustomerModal({
  customers,
  onSelect,
  onClose,
}: {
  customers: Customer[];
  onSelect: (c: Customer) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="skeuo-chassis-panel rounded-2xl p-6 max-w-md w-full border-2 border-slate-700 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2.5 left-2.5 skeuo-screw" />
        <div className="absolute top-2.5 right-2.5 skeuo-screw" />

        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/80">
          <h3 className="text-white font-mono font-bold text-sm tracking-wide">LOYALTY CUSTOMER REGISTRY</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-mono font-bold">✕</button>
        </div>

        <input
          type="text"
          placeholder="SEARCH CUSTOMER / TELEPHONE..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full skeuo-inset-well rounded-xl px-4 py-2.5 text-white text-xs font-mono mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => { onSelect(c); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl skeuo-register-key text-left"
            >
              <div>
                <p className="text-white font-bold text-xs">{c.name}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{c.phone}</p>
              </div>
              <div className="text-right">
                <TierBadge tier={c.tier} />
                <p className="text-[10px] text-amber-400 font-mono font-bold mt-1">★ {c.points} PTS</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Held Orders Panel ─────────────────────────────────────────────────────────
function HeldOrdersPanel({
  orders,
  config,
  onResume,
  onDelete,
  onClose,
}: {
  orders: HeldOrder[];
  config: PosConfig;
  onResume: (o: HeldOrder) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="skeuo-chassis-panel rounded-2xl p-6 max-w-lg w-full border-2 border-slate-700 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2.5 left-2.5 skeuo-screw" />
        <div className="absolute top-2.5 right-2.5 skeuo-screw" />

        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/80">
          <h3 className="text-white font-mono font-bold text-sm tracking-wide">HELD ORDERS BUFFER ({orders.length})</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-mono font-bold">✕</button>
        </div>

        {orders.length === 0 ? (
          <p className="text-center py-8 text-xs font-mono text-slate-500">NO ORDERS CURRENTLY SUSPENDED IN BUFFER.</p>
        ) : (
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {orders.map((o) => {
              const total = o.cart.reduce((s, l) => s + l.price * l.qty, 0);
              return (
                <div key={o.id} className="p-3.5 rounded-xl skeuo-card border border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs font-bold font-mono">{o.label}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{o.cart.length} ITEMS • {o.timestamp}</p>
                    <p className="text-xs font-mono text-emerald-400 font-bold mt-0.5">{fmtMoney(total, config.currency)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { onResume(o); onClose(); }}
                      className="px-3.5 py-1.5 rounded-lg skeuo-btn-primary text-xs font-mono font-bold"
                    >
                      RESUME
                    </button>
                    <button
                      onClick={() => onDelete(o.id)}
                      className="px-2.5 py-1.5 rounded-lg skeuo-btn-neutral text-xs font-mono text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main POS Terminal Component ───────────────────────────────────────────────
export default function PosDemo({ config }: { config: PosConfig }) {
  const [activeTab, setActiveTab] = useState<'pos' | 'history'>('pos');
  const [mobilePanel, setMobilePanel] = useState<'products' | 'cart'>('products');
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [discountPct, setDiscountPct] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr'>('cash');
  const [cashTendered, setCashTendered] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
  const [txHistory, setTxHistory] = useState<Transaction[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastTx, setLastTx] = useState<Transaction | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showHeldOrders, setShowHeldOrders] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const cartBottomRef = useRef<HTMLDivElement>(null);

  const hasFeature = (f: string) => config.features.includes(f) || config.features.length === 0;

  // Sound helpers
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Product lists
  const currentCategoryProducts = useMemo(() => {
    if (!config.categories || config.categories.length === 0) return [];
    return config.categories[activeCategory]?.products || [];
  }, [config.categories, activeCategory]);

  const allProducts = useMemo(() => {
    return (config.categories || []).flatMap((c) => c.products);
  }, [config.categories]);

  const displayedProducts = useMemo(() => {
    if (!searchQuery.trim()) return currentCategoryProducts;
    const q = searchQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.barcode && p.barcode.includes(q))
    );
  }, [searchQuery, currentCategoryProducts, allProducts]);

  // Add to cart
  const addToCart = useCallback((product: PosProduct) => {
    if (product.stock === 0) return;
    soundFx.playScanBeep();
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 300);

    setCart((prev) => {
      const idx = prev.findIndex((l) => l.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const changeQty = (id: string, delta: number) => {
    soundFx.playClick();
    setCart((prev) => {
      return prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0);
    });
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((s, l) => s + l.price * l.qty, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPct) / 100;
  }, [subtotal, discountPct]);

  const taxRate = config.taxRate || 0;
  const taxAmount = useMemo(() => {
    return ((subtotal - discountAmount) * taxRate) / 100;
  }, [subtotal, discountAmount, taxRate]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + taxAmount);
  }, [subtotal, discountAmount, taxAmount]);

  const change = useMemo(() => {
    const tendered = parseFloat(cashTendered) || 0;
    return Math.max(0, tendered - total);
  }, [cashTendered, total]);

  const loyaltyEarned = useMemo(() => {
    return Math.floor(total / 100);
  }, [total]);

  const todaySales = useMemo(() => {
    return txHistory.reduce((s, t) => s + t.total, 0);
  }, [txHistory]);

  // Hold order
  const handleHoldOrder = () => {
    if (cart.length === 0) return;
    const order: HeldOrder = {
      id: uid(),
      label: customer ? `${customer.name}'s Order` : `Order #${heldOrders.length + 1}`,
      timestamp: now().time,
      cart,
      customer: customer ?? undefined,
      orderType: 'walk-in',
      discountPct,
    };
    setHeldOrders((prev) => [...prev, order]);
    setCart([]);
    setDiscountPct(0);
    setCustomer(null);
  };

  const handleResumeOrder = (o: HeldOrder) => {
    setCart(o.cart);
    setDiscountPct(o.discountPct || 0);
    if (o.customer) setCustomer(o.customer);
    setHeldOrders((prev) => prev.filter((h) => h.id !== o.id));
  };

  // Complete checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    soundFx.playSuccessChime();
    const { date, time } = now();
    const tx: Transaction = {
      id: uid(),
      receiptNumber: String(1001 + txHistory.length),
      date,
      time,
      items: [...cart],
      subtotal,
      discountPct,
      discountAmount,
      taxAmount,
      total,
      paymentMethod,
      amountTendered: paymentMethod === 'cash' ? (parseFloat(cashTendered) || total) : total,
      change: paymentMethod === 'cash' ? change : 0,
      customer: customer ?? undefined,
      cashier: 'Kasun P.',
      orderType: 'walk-in',
    };
    setLastTx(tx);
    setTxHistory((prev) => [tx, ...prev].slice(0, 50));
    if (hasFeature('receipt')) setShowReceipt(true);

    setCart([]);
    setDiscountPct(0);
    setCashTendered('');
    setCustomer(null);
  };

  const cashShortcuts = [100, 200, 500, 1000, 2000, 5000];

  return (
    <div
      className="h-screen-safe flex flex-col bg-skeuo-chassis"
      style={{ ['--brand-color' as string]: config.brandColor }}
    >
      {/* Modals */}
      {showReceipt && lastTx && (
        <ReceiptModal tx={lastTx} config={config} onClose={() => setShowReceipt(false)} />
      )}
      {showCustomerModal && (
        <CustomerModal
          customers={config.sampleCustomers}
          onSelect={setCustomer}
          onClose={() => setShowCustomerModal(false)}
        />
      )}
      {showHeldOrders && (
        <HeldOrdersPanel
          orders={heldOrders}
          config={config}
          onResume={handleResumeOrder}
          onDelete={(id) => setHeldOrders((p) => p.filter((h) => h.id !== id))}
          onClose={() => setShowHeldOrders(false)}
        />
      )}

      {/* ── Skeuomorphic Heavy Console Top Bar ──────────────────────────────── */}
      <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 skeuo-chassis-panel flex-shrink-0 relative gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 flex-shrink-0 rounded-xl skeuo-card flex items-center justify-center text-white font-mono font-black text-base border border-slate-600 shadow-md"
            style={{ backgroundColor: config.brandColor }}
          >
            {config.businessName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-white font-mono font-bold text-xs sm:text-sm leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate max-w-[120px] sm:max-w-none">
                {config.businessName}
              </h1>
              <span className="skeuo-led-green flex-shrink-0" />
            </div>
            <p className="text-slate-400 text-[9px] sm:text-[10px] font-mono tracking-wider mt-0.5 hidden sm:block">
              HARDWARE REGISTER TERMINAL #01 • READY
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 text-xs font-mono">
          <span className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg skeuo-card border border-slate-700 text-slate-300">
            <span>TURNOVER:</span>
            <strong className="text-emerald-400">{fmtMoney(todaySales, config.currency)}</strong>
            <span className="text-[10px] text-slate-500 font-normal">({txHistory.length} TX)</span>
          </span>

          {/* Sound toggle */}
          <button
            id="btn-sound-toggle"
            onClick={() => setSoundEnabled((v) => !v)}
            title={soundEnabled ? 'Mute terminal audio' : 'Unmute audio'}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg skeuo-btn-neutral text-slate-200"
          >
            {soundEnabled ? (
              <VolumeUpIcon className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <VolumeOffIcon className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Audit Log Switch */}
          <button
            id="btn-tab-history"
            onClick={() => setActiveTab((t) => (t === 'history' ? 'pos' : 'history'))}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg skeuo-btn-neutral text-slate-200 font-bold"
          >
            <ChartBarIcon className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xs:inline">{activeTab === 'history' ? 'POS' : 'LOG'}</span>
          </button>

          <Link
            href="/wizard"
            className="px-2 sm:px-3 py-1.5 rounded-lg skeuo-btn-neutral text-slate-300 text-[10px] sm:text-xs"
          >
            ← RECONFIG
          </Link>
        </div>
      </header>

      {/* ── Tabs (Audit Log vs Register Terminal) ──────────────────────────── */}
      {activeTab === 'history' ? (
        <section className="flex-1 p-6 overflow-y-auto max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-700/80">
            <div>
              <h2 className="text-white font-mono font-bold text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                HARDWARE TRANSACTION AUDIT LOG
              </h2>
              <p className="text-xs font-mono text-slate-400">Memory buffer of all settled transaction tapes.</p>
            </div>
            <button
              onClick={() => setActiveTab('pos')}
              className="px-4 py-2 rounded-xl skeuo-btn-primary text-xs font-mono font-bold"
            >
              RETURN TO REGISTER
            </button>
          </div>

          {txHistory.length === 0 ? (
            <div className="text-center py-20 text-slate-500 skeuo-chassis-panel rounded-2xl p-8">
              <ClipboardListIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-mono font-bold">NO AUDIT TAPES IN MEMORY BUFFER.</p>
              <p className="text-xs font-mono text-slate-600 mt-1">Settled sales will be stamped into this log.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {txHistory.map((tx) => (
                <div key={tx.id} className="skeuo-card rounded-xl p-4 border border-slate-700 font-mono">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-blue-400">TX #{tx.receiptNumber}</span>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {tx.date} • {tx.time} • METHOD: <strong className="text-white uppercase">{tx.paymentMethod}</strong>
                      </p>
                      {tx.customer && (
                        <p className="text-xs mt-1 text-amber-400 flex items-center gap-1">
                          <UserIcon className="w-3 h-3 text-amber-400" />
                          <span>CUSTOMER: {tx.customer.name} ({tx.customer.tier})</span>
                        </p>
                      )}
                    </div>
                    <p className="text-emerald-400 font-black text-base">{fmtMoney(tx.total, config.currency)}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-700/80">
                    {tx.items.map((l) => (
                      <span key={l.id} className="text-[11px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700 shadow-inner">
                        {l.name} ×{l.qty}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        /* ── POS Terminal Workstation Layout ─────────────────────────────────── */
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Mobile panel tab switcher — only visible on small screens */}
          <div className="flex lg:hidden border-b-2 border-slate-800 flex-shrink-0">
            <button
              onClick={() => setMobilePanel('products')}
              className={`flex-1 py-2.5 text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                mobilePanel === 'products' ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400'
              }`}
            >
              <BoxIcon className="w-3.5 h-3.5" />
              PRODUCT KEYPAD
            </button>
            <button
              onClick={() => setMobilePanel('cart')}
              className={`flex-1 py-2.5 text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all relative ${
                mobilePanel === 'cart' ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400'
              }`}
            >
              <ShoppingCartIcon className="w-3.5 h-3.5" />
              REGISTER TAPE
              {cart.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                  {cart.reduce((s, l) => s + l.qty, 0)}
                </span>
              )}
            </button>
          </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] overflow-hidden min-h-0">
          
          {/* ── Left Column: Keypad & Product Grid ────────────────────────────── */}
          <section className={`flex flex-col overflow-hidden border-r-2 border-slate-800 ${
            mobilePanel === 'cart' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Control Bar: Search & Sub-actions */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 space-y-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                {/* Search Bar in Inset Well */}
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <SearchIcon className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                  <input
                    id="product-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={hasFeature('barcode') ? 'SCAN BARCODE OR SEARCH SKU/NAME...' : 'SEARCH CATALOGUE...'}
                    className="w-full skeuo-inset-well rounded-xl pl-8 pr-8 py-2.5 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Hold bill button */}
                {hasFeature('holdOrder') && (
                  <button
                    id="btn-hold-order"
                    onClick={handleHoldOrder}
                    disabled={cart.length === 0}
                    title="Suspend active bill"
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl skeuo-btn-neutral disabled:opacity-40 text-xs font-mono font-bold"
                  >
                    <PauseIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>HOLD BILL</span>
                  </button>
                )}

                {/* Queue buffer button */}
                {hasFeature('holdOrder') && (
                  <button
                    id="btn-show-held"
                    onClick={() => setShowHeldOrders(true)}
                    title="View suspended buffer"
                    className="relative flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl skeuo-btn-neutral text-xs font-mono font-bold"
                  >
                    <ClipboardListIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>QUEUE</span>
                    {heldOrders.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow">
                        {heldOrders.length}
                      </span>
                    )}
                  </button>
                )}
              </div>

              {/* Category Hardware Buttons */}
              {!searchQuery && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {config.categories.map((cat, i) => (
                    <button
                      key={cat.id}
                      id={`cat-tab-${cat.id}`}
                      onClick={() => { soundFx.playClick(); setActiveCategory(i); }}
                      className={`whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        i === activeCategory
                          ? 'skeuo-btn-primary'
                          : 'skeuo-btn-neutral'
                      }`}
                    >
                      <span>{cat.name.toUpperCase()}</span>
                      <span className="opacity-70 text-[10px]">({cat.products.length})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Inventory status ticker */}
            {hasFeature('inventory') && !searchQuery && (
              <div className="px-5 py-1.5 bg-black/40 border-b border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="skeuo-led-green" />
                  <span>STOCK TELEMETRY ACTIVE</span>
                </span>
                <span>LOW STOCK TRIGGER ≤ 10 UNITS</span>
              </div>
            )}

            {/* Product Keypad Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {displayedProducts.length === 0 ? (
                <div className="text-center py-16 text-slate-500 font-mono">
                  <SearchIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold">NO MATCHING PRODUCTS IN MEMORY.</p>
                </div>
              ) : (
                <div className="product-grid">
                  {displayedProducts.map((product) => {
                    const inCart = cart.find((l) => l.id === product.id);
                    const isFlashing = justAdded === product.id;
                    const outOfStock = product.stock === 0;
                    return (
                      <button
                        key={product.id}
                        id={`product-${product.id}`}
                        onClick={() => addToCart(product)}
                        disabled={outOfStock}
                        className={`relative text-left rounded-xl p-3.5 skeuo-register-key flex flex-col justify-between ${
                          outOfStock
                            ? 'opacity-40 cursor-not-allowed'
                            : inCart
                            ? 'ring-2 ring-blue-500 border-blue-400'
                            : ''
                        } ${isFlashing ? 'pop' : ''}`}
                      >
                        {/* Qty Counter Badge */}
                        {inCart && (
                          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full text-white text-[11px] font-mono font-bold flex items-center justify-center bg-blue-600 shadow-md border border-white/20">
                            {inCart.qty}
                          </span>
                        )}

                        <div>
                          {/* Item SKU Badge */}
                          <div className="w-full h-11 rounded-lg skeuo-inset-well flex items-center justify-center mb-2.5 border border-slate-700">
                            <span className="text-[11px] font-mono font-bold text-blue-400">
                              {product.sku || 'SKU-00'}
                            </span>
                          </div>

                          {/* Item Name */}
                          <p className="text-slate-100 text-xs font-bold leading-tight line-clamp-2 min-h-[2rem] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {product.name}
                          </p>
                        </div>

                        {/* Price & Stock info */}
                        <div className="mt-3 pt-2 border-t border-slate-700/80 flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            {config.currency} {product.price.toLocaleString()}
                          </span>
                          {hasFeature('inventory') && <StockBadge stock={product.stock} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* ── Right Column: VFD Display, Ledger & Cash Drawer ───────────────── */}
          <aside className={`bg-[#181c24] flex-col overflow-hidden border-l border-slate-800 ${
            mobilePanel === 'products' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Top VFD Display Screen (Live Total Monitor) */}
            <div className="p-4 bg-slate-950 border-b-2 border-slate-800 flex-shrink-0">
              <div className="skeuo-vfd-screen rounded-xl p-4">
                <div className="flex justify-between text-[11px] text-emerald-400/80 mb-1 border-b border-emerald-950 pb-1">
                  <span>VFD REGISTER SCREEN #01</span>
                  <span>{cart.reduce((s, l) => s + l.qty, 0)} ITEMS</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-emerald-400">GRAND TOTAL:</span>
                  <span className="text-2xl font-bold font-mono text-emerald-300">
                    {fmtMoney(total, config.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer loyalty toolbar */}
            <div className="p-3 border-b border-slate-800 flex-shrink-0 bg-slate-900/60">
              <button
                id="btn-select-customer"
                onClick={() => setShowCustomerModal(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl skeuo-card border border-slate-700 text-left"
              >
                <UserIcon className="w-4 h-4 text-blue-400" />
                <div className="flex-1 min-w-0 font-mono">
                  {customer ? (
                    <>
                      <p className="text-white text-xs font-bold truncate">{customer.name}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <TierBadge tier={customer.tier} />
                        <span className="text-amber-400">★ {customer.points} PTS</span>
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                      LINK LOYALTY CUSTOMER
                    </p>
                  )}
                </div>
                {customer && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setCustomer(null); }}
                    className="text-slate-400 hover:text-white text-xs font-mono px-1 font-bold"
                  >
                    ✕
                  </button>
                )}
              </button>
            </div>

            {/* Cart item ledger */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/80 font-mono">
                <h2 className="text-white font-bold text-xs tracking-wider flex items-center gap-1.5">
                  <ShoppingCartIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>REGISTER TAPE</span>
                </h2>
                {cart.length > 0 && (
                  <button
                    id="btn-clear-cart"
                    onClick={() => { soundFx.playClick(); setCart([]); }}
                    className="text-xs text-red-400 hover:text-red-300 font-bold transition"
                  >
                    RESET TAPE
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-14 text-slate-600 font-mono">
                  <ShoppingCartIcon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <p className="text-xs font-bold">REGISTER DRAWER EMPTY.</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Ring items on keypad to begin.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((line) => (
                    <div
                      key={line.id}
                      className="flex items-center gap-2 p-2.5 rounded-xl skeuo-card border border-slate-700 font-mono"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold truncate">{line.name}</p>
                        <p className="text-slate-400 text-[10px]">
                          {config.currency} {line.price.toLocaleString()} ea.
                        </p>
                      </div>
                      
                      {/* Quantity Stepper Push Keys */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => changeQty(line.id, -1)}
                          className="w-6 h-6 rounded-lg skeuo-btn-neutral text-slate-200 text-xs flex items-center justify-center font-bold"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-white text-xs font-bold">{line.qty}</span>
                        <button
                          onClick={() => changeQty(line.id, 1)}
                          className="w-6 h-6 rounded-lg skeuo-btn-neutral text-slate-200 text-xs flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs font-bold text-emerald-400 w-20 text-right">
                        {config.currency} {(line.price * line.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div ref={cartBottomRef} />
                </div>
              )}
            </div>

            {/* Calculations & Physical Cash Tender Controls */}
            <div className="p-4 bg-slate-950 border-t-2 border-slate-800 space-y-3 flex-shrink-0 font-mono">
              {/* Promo Discount Selector */}
              {hasFeature('discounts') && cart.length > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">DISCOUNT:</span>
                  <div className="flex gap-1.5">
                    {[0, 5, 10, 15, 20].map((d) => (
                      <button
                        key={d}
                        id={`disc-${d}`}
                        onClick={() => { soundFx.playClick(); setDiscountPct(d); }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          discountPct === d
                            ? 'skeuo-btn-primary'
                            : 'skeuo-btn-neutral'
                        }`}
                      >
                        {d === 0 ? '0%' : `${d}%`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Mode Mechanical Switch Buttons */}
              {hasFeature('multiPayment') && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">TENDER:</span>
                  <div className="flex gap-1.5">
                    {(['cash', 'card', 'qr'] as const).map((m) => (
                      <button
                        key={m}
                        id={`pay-${m}`}
                        onClick={() => { soundFx.playClick(); setPaymentMethod(m); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                          paymentMethod === m
                            ? 'skeuo-btn-primary'
                            : 'skeuo-btn-neutral'
                        }`}
                      >
                        {m === 'cash' ? (
                          <>
                            <BanknotesIcon className="w-3.5 h-3.5" />
                            <span>CASH</span>
                          </>
                        ) : m === 'card' ? (
                          <>
                            <CreditCardIcon className="w-3.5 h-3.5" />
                            <span>CARD</span>
                          </>
                        ) : (
                          <>
                            <QrCodeIcon className="w-3.5 h-3.5" />
                            <span>QR</span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cash Drawer Calculator */}
              {paymentMethod === 'cash' && cart.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">CASH IN:</span>
                    <input
                      id="input-cash-tendered"
                      type="number"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(e.target.value)}
                      placeholder={`${config.currency} ${Math.ceil(total / 100) * 100}`}
                      className="w-36 skeuo-inset-well rounded-lg px-2.5 py-1 text-right text-white text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {cashShortcuts
                      .filter((v) => v >= total * 0.8)
                      .slice(0, 4)
                      .map((v) => (
                        <button
                          key={v}
                          id={`cash-shortcut-${v}`}
                          onClick={() => setCashTendered(String(v))}
                          className="text-[10px] px-2 py-0.5 rounded-md skeuo-btn-neutral font-bold"
                        >
                          {v.toLocaleString()}
                        </button>
                      ))}
                    <button
                      id="cash-exact"
                      onClick={() => setCashTendered(String(Math.ceil(total)))}
                      className="text-[10px] px-2 py-0.5 rounded-md skeuo-btn-neutral text-blue-400 font-bold"
                    >
                      EXACT
                    </button>
                  </div>
                  {cashTendered && parseFloat(cashTendered) >= total && (
                    <div className="flex justify-between text-xs px-1 text-emerald-400 font-bold border-t border-slate-800 pt-1">
                      <span>CHANGE DUE:</span>
                      <span>{fmtMoney(change, config.currency)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Calculations Subtotal / Tax Breakdown */}
              {cart.length > 0 && (
                <div className="space-y-1 text-xs border-t border-slate-800 pt-2 text-slate-400">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="text-white">{fmtMoney(subtotal, config.currency)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-red-400 font-bold">
                      <span>DISCOUNT ({discountPct}%)</span>
                      <span>− {fmtMoney(discountAmount, config.currency)}</span>
                    </div>
                  )}
                  {taxAmount > 0 && (
                    <div className="flex justify-between">
                      <span>TAX/VAT ({taxRate}%)</span>
                      <span className="text-white">{fmtMoney(taxAmount, config.currency)}</span>
                    </div>
                  )}
                  {hasFeature('loyalty') && (
                    <div className="flex justify-between text-amber-400 pt-0.5 items-center">
                      <span className="flex items-center gap-1">
                        <StarIcon className="w-3 h-3 text-amber-400" />
                        <span>LOYALTY ACCRUAL</span>
                      </span>
                      <span>+{loyaltyEarned} PTS</span>
                    </div>
                  )}
                </div>
              )}

              {/* Physical Push Checkout Action Button */}
              <button
                id="btn-checkout"
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl skeuo-btn-primary text-white text-sm font-black tracking-wider disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {cart.length === 0
                  ? 'INSERT ITEMS TO TRANSACT'
                  : `COMPLETE TRANSACTION • ${fmtMoney(total, config.currency)}`}
              </button>

              {/* Last Receipt Print Push Key */}
              {lastTx && hasFeature('receipt') && (
                <button
                  id="btn-reprint-receipt"
                  onClick={() => setShowReceipt(true)}
                  className="w-full py-2 rounded-lg skeuo-btn-neutral text-slate-300 text-xs font-bold tracking-wider flex items-center justify-center gap-1.5"
                >
                  <ReceiptIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>PRINT TICKET (#{lastTx.receiptNumber})</span>
                </button>
              )}
            </div>
          </aside>
        </div>
        </div>
      )}
    </div>
  );
}
