import { CheckCircle2, FileText, ChevronRight, BadgeCheck } from 'lucide-react';
import Cotizador from './cotizador/Cotizador';
import ExternalLink from './ui/ExternalLink';
import { MENSAJES_WHATSAPP, PRODUCTOR } from '../config';
import { linkWhatsApp } from '../utils/whatsapp';

const BENEFICIOS = [
  'Comparativa real en el día (sin robots ni 0800)',
  'Alta 100% digital con 4 fotos desde tu celular',
  `Trato directo con ${PRODUCTOR.nombreCorto} (MP ${PRODUCTOR.matricula})`
];

export default function Hero({
  ramo,
  onRamoChange,
  formData,
  setFormData,
  marcaSelectRef,
  cotizadorHighlight
}) {
  return (
    <section className="relative z-20 overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-editorial-grid [mask-image:radial-gradient(ellipse_78%_70%_at_50%_25%,#000_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-8%] w-[440px] h-[440px] rounded-full bg-[#6DA6C9]/18 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 -left-24 w-[360px] h-[360px] rounded-full bg-[#21699B]/8 blur-3xl"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-11 sm:pt-7 sm:pb-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-10 lg:gap-y-6 items-start">
          {/* 1. Encabezado compacto */}
          <div className="order-1 lg:col-span-6 lg:pt-3 space-y-3.5 sm:space-y-4 animate-hero-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-stone-300/80 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] text-[#1E567C] text-[11px] sm:text-xs font-bold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6DA6C9]" aria-hidden="true" />
              <span>Seguros de Autos y Motos · {PRODUCTOR.zona}</span>
            </div>

            <h1 className="text-[30px] sm:text-4xl lg:text-[46px] font-serif-brand font-bold text-[#0F172A] leading-[1.1] tracking-tight">
              {ramo === 'auto'
                ? 'Cotizá el seguro de tu auto '
                : 'Cotizá el seguro de tu moto '}
              <span className="relative inline-block italic font-semibold text-[#21699B] whitespace-nowrap">
                en 1 minuto.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 12"
                  fill="none"
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#6DA6C9]/75"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9.5C58 2.5 148 1.5 218 8.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-sm sm:text-[17px] text-slate-700 leading-relaxed max-w-md pt-0.5">
              Comparamos entre <strong className="text-[#0F172A] font-semibold">5 aseguradoras líderes</strong> y te enviamos la mejor opción por WhatsApp, con atención directa de tu productor.
            </p>
          </div>

          {/* 2. Cotizador Protagonista */}
          <div
            className="order-2 lg:col-span-6 lg:row-span-2 relative z-30 scroll-mt-24 animate-hero-in [animation-delay:90ms]"
            id="cotizador"
          >
            <Cotizador
              ramo={ramo}
              onRamoChange={onRamoChange}
              formData={formData}
              setFormData={setFormData}
              marcaSelectRef={marcaSelectRef}
              highlighted={cotizadorHighlight}
            />
          </div>

          {/* 3. Puntos de confianza + sello humano del productor + acceso rápido */}
          <div
            className="order-3 lg:col-span-6 relative z-10 space-y-4 animate-hero-in [animation-delay:160ms]"
          >
            <ul className="space-y-3 text-sm font-medium text-slate-800 bg-white/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none p-4 sm:p-5 lg:p-0 rounded-2xl border border-stone-200/90 lg:border-0 shadow-[0_6px_20px_-12px_rgba(15,23,42,0.08)] lg:shadow-none">
              {BENEFICIOS.map((texto) => (
                <li key={texto} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#21699B]/10 ring-1 ring-[#21699B]/15 text-[#21699B] flex items-center justify-center shrink-0">
                    <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5" />
                  </span>
                  <span>{texto}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm border border-stone-200/90 rounded-2xl px-4 py-3 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] max-w-md">
              <div className="relative shrink-0">
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] text-white font-serif-brand font-bold text-sm flex items-center justify-center shadow-xs"
                >
                  MY
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-2xs"
                >
                  <BadgeCheck className="w-3.5 h-3.5 text-[#21699B]" />
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0F172A] truncate">
                  {PRODUCTOR.nombreCompleto}
                </p>
                <p className="text-[11px] text-slate-600 truncate">
                  Productor Asesor Matriculado · SSN {PRODUCTOR.matricula} · {PRODUCTOR.zona}
                </p>
              </div>
            </div>

            <div className="pt-0.5 hidden lg:block">
              <ExternalLink
                href={linkWhatsApp(MENSAJES_WHATSAPP.revisarPoliza)}
                className="inline-flex items-center gap-3.5 bg-white/95 hover:bg-white border border-stone-300/80 hover:border-[#6DA6C9] rounded-2xl p-3.5 pr-4 shadow-[0_4px_16px_-6px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_28px_-10px_rgba(33,105,155,0.22)] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#21699B]/15 to-[#6DA6C9]/20 text-[#21699B] flex items-center justify-center shrink-0 ring-1 ring-[#21699B]/10">
                  <FileText aria-hidden="true" className="w-4 h-4" />
                </div>
                <div className="text-xs leading-snug">
                  <span className="font-bold text-slate-900 block">¿Ya tenés seguro y pagás caro?</span>
                  <span className="text-slate-600">Mandanos foto de tu póliza y mejoramos el costo</span>
                </div>
                <ChevronRight
                  aria-hidden="true"
                  className="w-4 h-4 text-slate-500 group-hover:text-[#21699B] group-hover:translate-x-1 transition-all"
                />
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
