'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WizardAnswers } from '@/lib/types';
import Link from 'next/link';
import { AiBubble, UserChip } from '@/components/AiUi';
import { AiGenerating } from '@/components/AiGenerating';

const BUSINESS_TYPES = [
  { value: 'grocery',     label: 'Grocery & Supermarket', code: 'RETAIL-01', desc: 'Rice, packaged goods, beverages, household supplies' },
  { value: 'restaurant',  label: 'Restaurant / Café / Hotel', code: 'DINE-02', desc: 'Dine-in meals, takeaway, short eats & drinks' },
  { value: 'clothing',    label: 'Clothing & Fashion Boutique', code: 'APPAREL-03', desc: "Men's, women's, kid's wear & accessories" },
  { value: 'pharmacy',    label: 'Pharmacy & Healthcare', code: 'PHARMA-04', desc: 'Medicines, supplements, diagnostics & cosmetics' },
  { value: 'salon',       label: 'Salon & Beauty Studio', code: 'CARE-05', desc: 'Hair, skincare, spa services & retail goods' },
  { value: 'bakery',      label: 'Bakery & Pastry Shop', code: 'BAKE-06', desc: 'Fresh breads, cakes, pastries, tea & coffee' },
  { value: 'electronics', label: 'Electronics & Mobile Tech', code: 'TECH-07', desc: 'Smartphones, accessories, computer parts' },
  { value: 'other',       label: 'Other Enterprise Business', code: 'GEN-08', desc: 'General retail or wholesale POS configuration' },
];

const SCALES = [
  { value: 'small',  label: 'දිනකට බිල්පත් 50ට අඩු', sub: 'Boutique / Small Retail', code: '< 50 bills/day' },
  { value: 'medium', label: 'දිනකට බිල්පත් 50 – 200', sub: 'Standard Active Retail', code: '50 - 200 bills/day' },
  { value: 'large',  label: 'දිනකට බිල්පත් 200+', sub: 'High Volume Enterprise', code: '200+ bills/day' },
];

const FEATURE_OPTIONS = [
  { value: 'inventory',    label: 'Stock / Inventory Tracking', icon: 'BOX', desc: 'Live stock level monitoring & low stock alerts' },
  { value: 'discounts',    label: 'Discounts & Promotions', icon: 'PROMO', desc: 'Apply % or flat promo discounts at checkout' },
  { value: 'receipt',      label: 'Thermal Receipt Printing', icon: 'RECEIPT', desc: 'Instant formatted customer receipt generation' },
  { value: 'multiPayment', label: 'Multi-Payment (Cash, Card, QR)', icon: 'PAYMENT', desc: 'Support cash drawer, credit cards & LankaQR' },
  { value: 'loyalty',      label: 'Customer Loyalty Points', icon: 'LOYALTY', desc: 'Reward repeat customer numbers with tiered points' },
  { value: 'holdOrder',    label: 'Hold & Resume Orders', icon: 'HOLD', desc: 'Pause active bills to serve subsequent customers' },
  { value: 'barcode',      label: 'Barcode / SKU Display', icon: 'BARCODE', desc: 'Product barcode numbers & fast search integration' },
];

const PRESET_COLORS = [
  '#2563eb', '#0ea5e9', '#059669', '#d97706',
  '#dc2626', '#7c3aed', '#db2777', '#0d9488',
  '#ea580c', '#4f46e5', '#65a30d', '#0891b2',
];

const STEPS = 5;

export default function Wizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<WizardAnswers>({
    businessName: '',
    businessType: '',
    dailyItemsScale: '',
    features: [],
    brandColor: '#2563eb',
    currency: 'Rs.',
  });

  const canProceed = () => {
    if (step === 1) return answers.businessName.trim().length > 0;
    if (step === 2) return answers.businessType !== '';
    if (step === 3) return answers.dailyItemsScale !== '';
    if (step === 4) return true;
    if (step === 5) return answers.brandColor !== '';
    return false;
  };

  const toggleFeature = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter((f) => f !== value)
        : [...prev.features, value],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const [res] = await Promise.all([
        fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers),
        }),
        new Promise((r) => setTimeout(r, 6800)),
      ]);
      const config = await res.json();
      sessionStorage.setItem('posConfig', JSON.stringify(config));
      router.push('/demo');
    } catch {
      alert('Demo generate කරන්න බැරි උනා. ආයෙත් try කරන්න.');
      setLoading(false);
    }
  };

  const progressPct = Math.round((step / STEPS) * 100);

  return (
    <main className="min-h-screen bg-skeuo-chassis flex flex-col items-center justify-center px-4 py-10">
      {loading && <AiGenerating businessName={answers.businessName} color={answers.brandColor} />}
      
      {/* Top Breadcrumb Header */}
      <div className="w-full max-w-2xl mb-4 flex items-center justify-between px-1">
        <Link href="/" className="flex items-center gap-1 text-slate-300 hover:text-white text-xs font-mono font-bold tracking-wider transition">
          ← BACK TO CONSOLE
        </Link>
        <span className="text-xs font-mono font-bold text-slate-400">
          STEP {step} OF {STEPS}
        </span>
      </div>

      {/* Main Skeuomorphic Setup Console Card */}
      <div id="wizard-card" className="w-full max-w-2xl skeuo-chassis-panel rounded-2xl p-6 sm:p-9 shadow-2xl relative slide-up">
        {/* Corner Screws */}
        <div className="absolute top-3 left-3 skeuo-screw" />
        <div className="absolute top-3 right-3 skeuo-screw" />
        <div className="absolute bottom-3 left-3 skeuo-screw" />
        <div className="absolute bottom-3 right-3 skeuo-screw" />

        {/* Progress gauge */}
        <div className="mb-6 px-1">
          <div className="flex justify-between text-xs text-slate-300 mb-2 font-mono font-bold">
            <span>
              {step === 1 && 'CONFIG 1/5: HARDWARE IDENTITY'}
              {step === 2 && 'CONFIG 2/5: INDUSTRY PRESET'}
              {step === 3 && 'CONFIG 3/5: TRANSACTION SCALE'}
              {step === 4 && 'CONFIG 4/5: MODULE TOGGLES'}
              {step === 5 && 'CONFIG 5/5: ACCENT THEME'}
            </span>
            <span className="text-blue-400">{progressPct}%</span>
          </div>
          <div className="skeuo-inset-well p-1 rounded-full">
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-blue-600 to-sky-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* User answers breadcrumbs */}
        {step > 1 && (
          <div className="flex flex-wrap justify-end gap-1.5 mb-5 px-1">
            {answers.businessName && <UserChip>{answers.businessName}</UserChip>}
            {step > 2 && answers.businessType && (
              <UserChip>{BUSINESS_TYPES.find((t) => t.value === answers.businessType)?.label}</UserChip>
            )}
            {step > 3 && answers.dailyItemsScale && (
              <UserChip>{SCALES.find((x) => x.value === answers.dailyItemsScale)?.label}</UserChip>
            )}
            {step > 4 && <UserChip>{answers.features.length || 'ALL'} MODULES</UserChip>}
          </div>
        )}

        {/* Step 1 — Business name */}
        {step === 1 && (
          <div className="space-y-4 slide-up px-1">
            <AiBubble title="ඔබගේ ව්‍යාපාරයේ නම කුමක්ද?" hint="POS system header එකෙහි සහ receipts වල මුද්‍රණය වන නම." />
            <input
              id="input-business-name"
              autoFocus
              value={answers.businessName}
              onChange={(e) => setAnswers({ ...answers, businessName: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && canProceed() && setStep(2)}
              placeholder="උදා: Sanuka Supermarket, Liyana Cafe..."
              className="w-full skeuo-inset-well rounded-xl px-4 py-3.5 text-white placeholder-slate-500 text-base font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">Currency Unit</span>
              <div className="flex gap-2">
                {['Rs.'].map((c) => (
                  <button
                    key={c}
                    id={`currency-${c.replace('.','dot')}`}
                    onClick={() => setAnswers({ ...answers, currency: c })}
                    className="px-3.5 py-1.5 rounded-lg skeuo-btn-neutral text-xs font-mono font-bold text-blue-400"
                  >
                    {c} (LKR)
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Business type */}
        {step === 2 && (
          <div className="space-y-4 slide-up px-1">
            <AiBubble title="ව්‍යාපාර ක්ෂේත්‍රය තෝරන්න" hint="අදාළ business type එකට අනුව product catalogue සහ pricing සකස් කෙරේ." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {BUSINESS_TYPES.map((t) => (
                <button
                  key={t.value}
                  id={`btype-${t.value}`}
                  onClick={() => setAnswers({ ...answers, businessType: t.value })}
                  className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all ${
                    answers.businessType === t.value
                      ? 'skeuo-card ring-2 ring-blue-500 border-blue-400'
                      : 'skeuo-register-key'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-slate-900 border border-slate-700 text-blue-400 flex-shrink-0 mt-0.5 shadow-inner">
                    {t.code}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {t.label}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Scale */}
        {step === 3 && (
          <div className="space-y-4 slide-up px-1">
            <AiBubble title="දෛනික ගනුදෙනු ප්‍රමාණය (Transaction Volume)" hint="වෙළඳසැලේ දෛනික බිල්පත් සංඛ්‍යාව තෝරන්න." />
            <div className="grid grid-cols-1 gap-3">
              {SCALES.map((s) => (
                <button
                  key={s.value}
                  id={`scale-${s.value}`}
                  onClick={() => setAnswers({ ...answers, dailyItemsScale: s.value })}
                  className={`flex items-center gap-4 text-left p-4 rounded-xl border transition-all ${
                    answers.dailyItemsScale === s.value
                      ? 'skeuo-card ring-2 ring-blue-500 border-blue-400'
                      : 'skeuo-register-key'
                  }`}
                >
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-blue-400 font-bold shadow-inner">
                    {s.code}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {s.label}
                    </p>
                    <p className="text-xs text-slate-400">{s.sub}</p>
                  </div>
                  {answers.dailyItemsScale === s.value && (
                    <span className="text-blue-400 font-mono font-bold text-sm">SELECTED ✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Features */}
        {step === 4 && (
          <div className="space-y-4 slide-up px-1">
            <AiBubble title="අවශ්‍ය Modules & Features තෝරන්න" hint="Demo POS workstation එකෙහි සක්‍රිය විය යුතු අංග තෝරන්න." />
            <div className="grid grid-cols-1 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {FEATURE_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  id={`feat-${f.value}`}
                  onClick={() => toggleFeature(f.value)}
                  className={`flex items-center gap-3 text-left p-3.5 rounded-xl border transition-all ${
                    answers.features.includes(f.value)
                      ? 'skeuo-card ring-1 ring-blue-500 border-blue-400'
                      : 'skeuo-register-key'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-blue-400 border border-slate-700 shadow-inner">
                    {f.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {f.label}
                    </p>
                    <p className="text-[11px] text-slate-400">{f.desc}</p>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] font-mono font-bold ${
                      answers.features.includes(f.value)
                        ? 'bg-blue-600 border-blue-400 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-700 text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 — Color */}
        {step === 5 && (
          <div className="space-y-5 slide-up px-1">
            <AiBubble title="Hardware Accent Theme" hint="POS workstation header, buttons සහ accents සඳහා ප්‍රධාන වර්ණය." />

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  id={`color-${c.replace('#','')}`}
                  onClick={() => setAnswers({ ...answers, brandColor: c })}
                  style={{ backgroundColor: c }}
                  className={`h-11 rounded-xl transition-transform hover:scale-105 flex items-center justify-center shadow-lg border border-white/20 ${
                    answers.brandColor === c ? 'ring-4 ring-white ring-offset-2 ring-offset-slate-900' : ''
                  }`}
                >
                  {answers.brandColor === c && <span className="text-white text-xs font-bold">✓</span>}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <label className="text-xs font-mono text-slate-400 font-bold">HEX SPECIFIER:</label>
              <input
                type="color"
                value={answers.brandColor}
                onChange={(e) => setAnswers({ ...answers, brandColor: e.target.value })}
                className="w-9 h-9 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
              />
              <span className="text-xs font-mono text-slate-200 font-bold">{answers.brandColor}</span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 flex items-center justify-between px-1">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-5 py-2.5 rounded-xl skeuo-btn-neutral text-xs font-mono font-bold tracking-wider"
            >
              ← PREVIOUS
            </button>
          ) : (
            <div />
          )}

          {step < STEPS ? (
            <button
              id="btn-wizard-next"
              disabled={!canProceed()}
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-2.5 rounded-xl skeuo-btn-primary text-xs font-mono font-bold tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
            >
              NEXT STEP →
            </button>
          ) : (
            <button
              id="btn-wizard-submit"
              disabled={!canProceed()}
              onClick={handleSubmit}
              className="px-7 py-3 rounded-xl skeuo-btn-primary text-xs font-mono font-bold tracking-wider disabled:opacity-40"
            >
              ASSEMBLE HARDWARE DEMO →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
