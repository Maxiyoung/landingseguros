import { Sparkles, ShieldCheck, UserCheck, Clock, ArrowDown } from 'lucide-react';
import Cotizador from './cotizador/Cotizador';
import { PRODUCTOR } from '../config';

export default function Hero({
  ramo,
  onRamoChange,
  formData,
  setFormData,
  marcaSelectRef
}) {
  const irAlCotizador = () => {
    const cotizadorEl = document.getElementById('cotizador');
    if (cotizadorEl) {
      cotizadorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      marcaSelectRef.current?.focus();
    }, 450);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Columna Izquierda */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-300/80 shadow-2xs text-[#1E567C] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#21699B]" />
            <span>Cotización multicotizador en el día · Autos y Motos</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif-brand font-bold text-[#0F172A] leading-[1.08] tracking-tight">
            {ramo === 'auto'
              ? 'Tu auto bien asegurado, al precio justo y con alguien que te atiende el teléfono.'
              : 'Tu moto protegida contra robo, al mejor precio y con gestión directa sin vueltas.'}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-normal">
            Asesoramiento humano y personalizado. No somos un bot ni un 0800 interminable: buscamos el mejor precio entre compañías de primera línea y respondemos por vos cuando nos necesitás.
          </p>

          {/* CTA Rápido exclusivo para Celular / Tablet para evitar scrollear sin ver el formulario */}
          <div className="lg:hidden pt-1">
            <button
              type="button"
              onClick={irAlCotizador}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#21699B] hover:bg-[#19527A] text-white font-bold py-3.5 px-6 rounded-full shadow-md transition-all text-sm cursor-pointer"
            >
              <span>Cotizar mi {ramo === 'auto' ? 'auto' : 'moto'} ahora</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>

          {/* Micro-beneficios */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-800 leading-snug">
                5 Aseguradoras líderes para comparar
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-800 leading-snug">
                Trato directo con {PRODUCTOR.nombreCorto} (MP {PRODUCTOR.matricula})
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-800 leading-snug">
                Gestión rápida ante cualquier siniestro
              </span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Cotizador Rápido */}
        <div className="lg:col-span-5" id="cotizador">
          <Cotizador
            ramo={ramo}
            onRamoChange={onRamoChange}
            formData={formData}
            setFormData={setFormData}
            marcaSelectRef={marcaSelectRef}
          />
        </div>
      </div>
    </section>
  );
}
