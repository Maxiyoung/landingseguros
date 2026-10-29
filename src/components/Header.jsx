import { MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { linkWhatsApp } from '../utils/whatsapp';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EB]/85 backdrop-blur-md border-b border-stone-300/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <a href="#coberturas" className="hover:text-[#21699B] transition">Coberturas</a>
          <a href="#diferencial" className="hover:text-[#21699B] transition">Por qué elegirnos</a>
          <a href="#faq" className="hover:text-[#21699B] transition">Preguntas frecuentes</a>
          <a href="#emergencia" className="hover:text-[#21699B] transition">Siniestros y Grúa</a>
        </nav>

        <a
          href={linkWhatsApp('Hola! Tengo una consulta sobre seguros.')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#21699B] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-sm transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4 text-[#6DA6C9]" />
          <span>Contacto Directo</span>
        </a>
      </div>
    </header>
  );
}
