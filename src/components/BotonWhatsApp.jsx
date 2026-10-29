import { useState, useEffect } from 'react';
import { MessageCircle, Calculator } from 'lucide-react';
import { linkWhatsApp } from '../utils/whatsapp';

export default function BotonWhatsApp({ onIrAlCotizador }) {
  const [mostrarAtajoCotizador, setMostrarAtajoCotizador] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muestra el botón flotante de "Ir al cotizador" cuando el usuario bajó más allá del Hero (~650px)
      setMostrarAtajoCotizador(window.scrollY > 650);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 sm:right-5 z-50 flex items-center gap-2.5">
      {/* Atajo flotante para volver al cotizador cuando el usuario scrolleó hacia abajo */}
      {mostrarAtajoCotizador && (
        <button
          type="button"
          onClick={onIrAlCotizador}
          className="bg-[#0F172A] hover:bg-[#21699B] text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-full shadow-xl border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-[#6DA6C9]" />
          <span>Ir al Cotizador ↑</span>
        </button>
      )}

      {/* Botón de WhatsApp con cartelito discreto en escritorio */}
      <a
        href={linkWhatsApp('Hola! Quiero hacer una consulta sobre seguros.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chatear por WhatsApp"
        className="group bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6 fill-white shrink-0" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
          WhatsApp Directo
        </span>
      </a>
    </div>
  );
}
