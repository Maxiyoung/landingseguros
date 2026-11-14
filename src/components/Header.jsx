import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { linkWhatsApp } from '../utils/whatsapp';

const NAV_LINKS = [
  { href: '#cotizador', label: 'Cotizar' },
  { href: '#coberturas', label: 'Planes Auto y Moto' },
  { href: '#emergencia', label: 'Grúas 24 hs' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#F5F2EB]/92 backdrop-blur-xl border-stone-300/80 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.14)]'
          : 'bg-[#F5F2EB]/75 backdrop-blur-md border-stone-300/50'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex justify-between items-center">
        <BrandLogo />

        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#0F172A] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#21699B] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-250"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={linkWhatsApp('Hola! Quiero cotizar el seguro de mi vehículo.')}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#21699B] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-[0_6px_18px_-6px_rgba(15,23,42,0.45)] hover:shadow-[0_10px_22px_-6px_rgba(33,105,155,0.5)] hover:-translate-y-0.5 active:translate-y-0 ring-1 ring-white/10 transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4 text-[#6DA6C9] group-hover:text-white group-hover:scale-110 transition-all duration-200" />
          <span>WhatsApp Directo</span>
        </a>
      </div>
    </header>
  );
}
