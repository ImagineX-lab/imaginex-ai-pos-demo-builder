import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BoltIcon,
  BoxIcon,
  CreditCardIcon,
  StarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  MonitorIcon,
  BuildingStoreIcon,
  ReceiptIcon,
} from './Icons';

export function PosGuide() {
  const BENEFITS = [
    {
      icon: <BoltIcon className="w-5 h-5 text-amber-400" />,
      title: 'විදුලි වේගයෙන් බිල්පත් නිකුත් කිරීම',
      enTitle: 'High-Throughput Billing Engine',
      desc: 'Barcode scanner හෝ Touch Screen භාවිතයෙන් තත්පර කිහිපයකින් පාරිභෝගිකයාට බිල ලබා දී කඩයේ පෝලිම් සහ තදබදය නැති කරයි.',
      badge: 'SPEED: 0.8s/BILL',
    },
    {
      icon: <BoxIcon className="w-5 h-5 text-emerald-400" />,
      title: 'ස්වයංක්‍රීය තොග පාලනය (Inventory)',
      enTitle: 'Real-Time Stock Depletion Meter',
      desc: 'භාණ්ඩයක් විකිණෙන මොහොතේදීම Stock ප්‍රමාණය auto-update වේ. තොග අවසන් වීමට ආසන්න වූ විට Low Stock Alerts ලබා දේ.',
      badge: 'ACCURACY: 100%',
    },
    {
      icon: <CreditCardIcon className="w-5 h-5 text-blue-400" />,
      title: 'ඕනෑම ගෙවීම් ක්‍රමයකට සහය (Multi-Payment)',
      enTitle: 'Multi-Tender Drawer Gateway',
      desc: 'මුදල් (Cash), Debit/Credit Cards, QR Payments මෙන්ම පාරිභෝගික ණය (Customer Credit) නිවැරදිව සටහන් කර කළමනාකරණය කරයි.',
      badge: 'CHANNELS: CASH/CARD/QR',
    },
    {
      icon: <StarIcon className="w-5 h-5 text-amber-400" />,
      title: 'පාරිභෝගික විශ්වාසය සහ Loyalty Points',
      enTitle: 'Customer Retention Engine',
      desc: 'පාරිභෝගික දුරකථන අංකය මඟින් Points ලබා දීම, Promo Discounts සහ විශේෂ වට්ටම් ලබා දී ස්ථිර පාරිභෝගික පදනමක් ගොඩනැගීම.',
      badge: 'TIERED: BRONZE->VIP',
    },
    {
      icon: <ChartBarIcon className="w-5 h-5 text-blue-400" />,
      title: 'දෛනික හා මාසික ලාභ-අලාභ වාර්තා',
      enTitle: 'Hardware Audit & Analytics',
      desc: 'දවසේ මුළු ආදායම, ලාභය, වැඩිපුරම අලෙවි වූ භාණ්ඩ පිළිබඳ නිවැරදි වාර්තා ක්ෂණිකව ලබා ගෙන නිවැරදි තීරණ ගැනීමට උපකාරී වේ.',
      badge: 'REAL-TIME REPORTING',
    },
    {
      icon: <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />,
      title: 'මුදල් වංචා වැළැක්වීම සහ ආරක්ෂාව',
      enTitle: 'Cash Drawer Interlock Security',
      desc: 'අයකැමියන්ගේ ගනුදෙනු, Cash Drawer විවෘත කිරීම් සහ අස්ථානගතවීම් 100% ක් පාලනය කර ව්‍යාපාරයේ පූර්ණ පාලනය හිමිකර දෙයි.',
      badge: 'FULL AUDIT TRAIL',
    },
  ];

  return (
    <section id="pos-guide" className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-20 border-t border-slate-800">
      {/* Heavy Chassis Header Banner */}
      <div className="relative mb-14 rounded-2xl p-6 sm:p-10 skeuo-chassis-panel shadow-2xl overflow-hidden">
        {/* Corner Hardware Screws */}
        <div className="absolute top-3 left-3 skeuo-screw" />
        <div className="absolute top-3 right-3 skeuo-screw" />
        <div className="absolute bottom-3 left-3 skeuo-screw" />
        <div className="absolute bottom-3 right-3 skeuo-screw" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md skeuo-inset-well text-xs font-mono font-bold text-blue-400 mb-4 border border-slate-700">
              <span className="skeuo-led-green" />
              <span>POS HARDWARE ARCHITECTURE & ROI GUIDE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              POS System එකක් කියන්නේ කුමක්ද? <br className="hidden sm:inline" />
              <span className="text-blue-400">ඔබේ ව්‍යාපාරයට එය අත්‍යවශ්‍ය ඇයි?</span>
            </h2>

            <p className="font-abhaya text-slate-300 text-lg sm:text-xl leading-relaxed mb-6">
              සාම්ප්‍රදායික අතින් ලියන පොත්පත් ක්‍රමයෙන් මිදී, ව්‍යාපාරය ඩිජිටල් තාක්ෂණයෙන් ඉහළටම ගෙන යාමට POS පද්ධතියක් මඟින් ලැබෙන වටිනාකම මෙන්න.
            </p>

            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-6 text-xs font-mono text-slate-300">
              <span className="px-3 py-1.5 rounded-lg skeuo-card border border-slate-700 font-bold flex items-center gap-1.5">
                <BoltIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>FAST BILLING</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg skeuo-card border border-slate-700 font-bold flex items-center gap-1.5">
                <BoxIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>STOCK METRICS</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg skeuo-card border border-slate-700 font-bold flex items-center gap-1.5">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>DATA INTEGRITY</span>
              </span>
            </div>

            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl skeuo-btn-primary text-xs sm:text-sm font-bold font-mono tracking-wider"
            >
              <span>BUILD YOUR HARDWARE DEMO →</span>
            </Link>
          </div>

          {/* Right Column: Character Console Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[360px] aspect-[1/1] rounded-xl overflow-hidden skeuo-inset-well border border-slate-700 shadow-2xl p-2 bg-black">
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-800">
                <Image
                  src="/pos-guide-character.jpg"
                  alt="IMAGINEX POS Knowledge Guide"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3 Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {/* Card 1 */}
        <div className="skeuo-chassis-panel p-6 rounded-2xl flex flex-col justify-between relative">
          <div className="absolute top-2.5 right-2.5 skeuo-screw" />
          <div>
            <div className="w-12 h-12 rounded-xl skeuo-inset-well flex items-center justify-center mb-4 border border-slate-700">
              <MonitorIcon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              POS System එකක් යනු කුමක්ද?
            </h3>
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400 mb-3">
              WHAT IS A POS SYSTEM?
            </p>
            <p className="font-abhaya text-slate-300 text-base leading-relaxed mb-4">
              <strong>Point of Sale (POS)</strong> යනු පාරිභෝගිකයෙකු භාණ්ඩ මිලදී ගැනීමේදී මුදල් ගෙවීම්, බිල්පත් මුද්‍රණය සහ සියලු ගනුදෙනු පරිගණකගතව ක්ෂණිකව සිදුකරන ඩිජිටල් මෘදුකාංග පද්ධතියකි.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-700/80 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 flex items-center gap-1.5">
              <ReceiptIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Instant Receipts</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">Cloud Sync</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="skeuo-chassis-panel p-6 rounded-2xl flex flex-col justify-between relative">
          <div className="absolute top-2.5 right-2.5 skeuo-screw" />
          <div>
            <div className="w-12 h-12 rounded-xl skeuo-inset-well flex items-center justify-center mb-4 border border-slate-700">
              <BuildingStoreIcon className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Shop එකකට POS එකක් ඕනෙ ඇයි?
            </h3>
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
              WHY SHOPS NEED A POS?
            </p>
            <p className="font-abhaya text-slate-300 text-base leading-relaxed mb-4">
              අතින් ගණන් කිරීමේදී සහ බිල්පත් ලිවීමේදී සිදුවන <strong>මුදල් හා ගණනය කිරීමේ වැරදි 100% ක් නැති කර</strong>, ව්‍යාපාරයේ දෛනික ලාභය සහ පාරිභෝගික තෘප්තිය උපරිම කර ගැනීමට උපකාරී වේ.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-700/80 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">Zero Mistakes</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 flex items-center gap-1.5">
              <BoltIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>10x Speed</span>
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="skeuo-chassis-panel p-6 rounded-2xl flex flex-col justify-between relative">
          <div className="absolute top-2.5 right-2.5 skeuo-screw" />
          <div>
            <div className="w-12 h-12 rounded-xl skeuo-inset-well flex items-center justify-center mb-4 border border-slate-700">
              <ChartBarIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              ව්‍යාපාර වර්ධනයට මඟ පෙන්වීම
            </h3>
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3">
              SMART GROWTH & METRICS
            </p>
            <p className="font-abhaya text-slate-300 text-base leading-relaxed mb-4">
              ඔබගේ කඩයේ වැඩිපුරම විකිණෙන භාණ්ඩ, කාර්යබහුලම වේලාවන් සහ දෛනික ලාභය පිළිබඳ <strong>Real-time Analytics</strong> මඟින් ව්‍යාපාරයේ අනාගත තීරණ නිවැරදිව ගැනීමට මඟ පෙන්වයි.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-700/80 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">Daily Profit Ledger</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700">Telemetry</span>
          </div>
        </div>
      </div>

      {/* 6 Key Benefits Section */}
      <div className="mb-14">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            POS System එකක් භාවිතයෙන් ලැබෙන ප්‍රධාන වාසි 6
          </h3>
          <p className="text-slate-400 text-xs font-mono">SYSTEM SPECIFICATIONS & HARDWARE ADVANTAGES</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((item, index) => (
            <div
              key={index}
              className="skeuo-card p-5 rounded-xl border border-slate-700/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg skeuo-inset-well flex items-center justify-center border border-slate-700">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-blue-400 border border-slate-700 shadow-inner">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {item.title}
                </h4>
                <p className="text-[10px] font-mono font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  {item.enTitle}
                </p>
                <p className="font-abhaya text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Console */}
      <div className="rounded-2xl p-8 skeuo-chassis-panel shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative">
        <div className="absolute top-2.5 left-2.5 skeuo-screw" />
        <div className="absolute top-2.5 right-2.5 skeuo-screw" />
        <div>
          <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-blue-400 text-xs font-mono font-bold shadow-inner inline-block mb-3">
            HARDWARE EMULATOR ENGINE
          </span>
          <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ඔබේම ව්‍යාපාරයට ගැළපෙන POS Demo එකක් අත්හදා බලන්න
          </h4>
          <p className="font-abhaya text-slate-300 text-base">
            ප්‍රශ්න 5කට පිළිතුරු දී තත්පර කිහිපයකින් ඔබගේ කඩයට සුදුසු Interactive POS Demo එකක් Live අත්විඳින්න.
          </p>
        </div>

        <Link
          href="/wizard"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl skeuo-btn-primary text-xs sm:text-sm font-bold font-mono tracking-wider whitespace-nowrap"
        >
          <span>දැන්ම DEMO එක හදන්න →</span>
        </Link>
      </div>
    </section>
  );
}
