import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SocialButtons } from '@/components/SocialIcons';
import { PosGuide } from '@/components/PosGuide';
import { AiPromptDemo } from '@/components/AiPromptDemo';
import { SparkleIcon } from '@/components/AiUi';
import { PosPreview } from '@/components/PosPreview';
import { HowItWorks } from '@/components/HowItWorks';
import { BuildingStoreIcon } from '@/components/Icons';

const BUSINESS_TYPES = [
  {
    id: 'grocery',
    label: 'Grocery & Supermarket',
    sinLabel: 'සිල්ලර වෙළඳසැල් & සුපිරි වෙළඳසැල්',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    tag: 'RETAIL-01',
  },
  {
    id: 'restaurant',
    label: 'Restaurant & Cafe',
    sinLabel: 'ආපනශාලා & කැෆේ',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    tag: 'DINE-02',
  },
  {
    id: 'clothing',
    label: 'Clothing & Fashion',
    sinLabel: 'ඇඳුම් සාප්පු & Boutiques',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
    tag: 'APPAREL-03',
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy & Healthcare',
    sinLabel: 'ඖෂධසැල් & සෞඛ්‍ය සේවා',
    image: 'https://images.unsplash.com/photo-1586015554060-8dbdd6c8cc70?auto=format&fit=crop&w=600&q=80',
    tag: 'PHARMA-04',
  },
  {
    id: 'salon',
    label: 'Salon & Spa Studio',
    sinLabel: 'රූපලාවණ්‍යාගාර & Spa',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    tag: 'CARE-05',
  },
  {
    id: 'bakery',
    label: 'Bakery & Pastry Shop',
    sinLabel: 'බේකරි & Pastry සාප්පු',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    tag: 'BAKE-06',
  },
  {
    id: 'electronics',
    label: 'Electronics & Tech',
    sinLabel: 'ඉලෙක්ට්‍රොනික්ස් & Tech සාප්පු',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
    tag: 'TECH-07',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-skeuo-chassis flex flex-col justify-between text-slate-100 relative">
      {/* Top Skeuomorphic Console Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 relative">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto slide-up">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ඔබේ ව්‍යාපාරයට ගැළපෙන <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Tactile POS Hardware Demo
            </span>{' '}
            එකක්
          </h1>
          <p className="font-abhaya text-slate-300 text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto font-medium mb-2">
            ප්‍රශ්න 5ක් පමණි. AI මඟින් ඔබේ business type, products, inventory, payments,
            සහ loyalty points සහිතව සජීවී POS demonstration එකක් තත්පර කිහිපයකින් generate කරන්න.
          </p>
        </div>

        {/* AI Prompt Demonstration Generator Card */}
        <div className="mt-8 w-full slide-up">
          <AiPromptDemo />
        </div>

        {/* Live Workstation POS Terminal Preview */}
        <PosPreview />

        {/* Implementation Workflow */}
        <HowItWorks />

        {/* Social Connect Bar */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            CONNECT WITH IMAGINEX SYSTEMS
          </span>
          <SocialButtons size="md" showLabels={true} className="justify-center" />
        </div>

        {/* Supported Industry Solutions */}
        <div className="mt-20 w-full max-w-6xl mx-auto px-2 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg skeuo-card text-xs font-mono font-bold text-slate-300 border border-slate-700 mb-3 shadow-md">
            <BuildingStoreIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>INDUSTRY HARDWARE PRESETS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Supported Business Solutions
          </h2>
          <p className="font-abhaya text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
            ඔබේ ව්‍යාපාරයට අනන්‍ය වූ භාණ්ඩ, මිල ගණන් සහ ප්‍රවර්ග සහිතව Live Demo එකක් තත්පර කිහිපයකින් සාදාගන්න.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-left">
            {BUSINESS_TYPES.map((b) => (
              <Link
                key={b.id}
                href="/wizard"
                className="skeuo-card skeuo-card-interactive rounded-2xl overflow-hidden border border-slate-700/80 flex flex-col justify-between"
              >
                {/* Image Container with Real Photo */}
                <div className="relative w-full h-40 overflow-hidden bg-black border-b border-slate-700/80">
                  <Image
                    src={b.image}
                    alt={b.label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e232d] via-transparent to-transparent" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/95 text-blue-400 border border-slate-700 shadow-md">
                    {b.tag}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-sm font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {b.label}
                    </h3>
                    <p className="font-abhaya text-xs text-slate-400 mt-0.5">
                      {b.sinLabel}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs font-mono font-bold text-blue-400">
                    <span>INITIALIZE DEMO</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Informational POS Knowledge Guide Section */}
        <PosGuide />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
