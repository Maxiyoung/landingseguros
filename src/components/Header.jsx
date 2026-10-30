import { MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { linkWhatsApp } from '../utils/whatsapp';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EB]/90 backdrop-blur-md border-b border-stone-300/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <a href="#cotizador" className="hover:text-[#21699B] transition">Cotizar</a>
          <a href="#coberturas" className="hover:text-[#21699B] transition">Planes Auto y Moto</a>
          <a href="#emergencia" className="hover:text-[#21699B] transition">Grúas 24 hs</a>
        </nav>

        <a
          href={linkWhatsApp('Hola! Quiero cotizar el seguro de mi vehículo.')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#21699B] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4 text-[#6DA6C9]" />
          <span>WhatsApp Directo</span>
        </a>
      </div>
    </header>
  );
}
