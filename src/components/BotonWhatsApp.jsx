import { useState, useEffect } from 'react';
import { MessageCircle, Calculator } from 'lucide-react';
import { linkWhatsApp } from '../utils/whatsapp';

export default function BotonWhatsApp({ onIrAlCotizador }) {
  const [mostrarAtajoCotizador, setMostrarAtajoCotizador] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setMostrarAtajoCotizador(window.scrollY > 620);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-50 flex items-center gap-2.5">
      <button
        type="button"
        onClick={onIrAlCotizador}
        aria-hidden={!mostrarAtajoCotizador}
        tabIndex={mostrarAtajoCotizador ? 0 : -1}
        className={`bg-[#0F172A]/95 backdrop-blur-md hover:bg-[#21699B] text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-full shadow-[0_14px_30px_-8px_rgba(15,23,42,0.45)] border border-slate-700/80 transition-all duration-300 flex items-center gap-2 cursor-pointer ${
          mostrarAtajoCotizador
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
        }`}
      >
        <Calculator className="w-4 h-4 text-[#6DA6C9]" />
        <span>Ir al Cotizador ↑</span>
      </button>

      <a
        href={linkWhatsApp('Hola! Quiero hacer una consulta sobre seguros.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chatear por WhatsApp"
        className="relative group bg-gradient-to-br from-[#25D366] to-[#1DB954] hover:from-[#22C55E] hover:to-[#18A34A] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-[0_12px_28px_-6px_rgba(37,211,102,0.55)] hover:shadow-[0_16px_34px_-6px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
      >
        <span
          aria-hidden="true"
          className="motion-safe:animate-ping absolute inset-0 rounded-full bg-[#25D366] opacity-20 pointer-events-none"
        />
        <MessageCircle className="relative w-6 h-6 fill-white shrink-0" />
        <span className="relative hidden sm:inline text-xs font-bold tracking-wide pr-1">
          WhatsApp Directo
        </span>
      </a>
    </div>
  );
}
