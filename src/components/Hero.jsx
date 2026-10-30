import { CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import Cotizador from './cotizador/Cotizador';
import { PRODUCTOR } from '../config';
import { linkWhatsApp } from '../utils/whatsapp';

export default function Hero({
  ramo,
  onRamoChange,
  formData,
  setFormData,
  marcaSelectRef
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Columna Izquierda: Mensaje corto y directo */}
        <div className="lg:col-span-6 lg:pt-4 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300/80 text-[#1E567C] text-xs font-bold tracking-wide uppercase">
            <span>Seguros de Autos y Motos</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif-brand font-bold text-[#0F172A] leading-[1.12] tracking-tight">
            {ramo === 'auto'
              ? 'Cotizá el seguro de tu auto en 1 minuto.'
              : 'Cotizá el seguro de tu moto en 1 minuto.'}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-md">
            Comparamos entre <strong>5 aseguradoras líderes</strong> y te enviamos la mejor opción por WhatsApp, con atención directa de tu productor.
          </p>

          {/* Puntos clave ultra simples */}
          <ul className="space-y-2.5 pt-1 text-sm font-medium text-slate-800">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#21699B] shrink-0" />
              <span>Comparativa real en el día (sin robots ni 0800)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#21699B] shrink-0" />
              <span>Alta 100% digital con 4 fotos desde tu celular</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#21699B] shrink-0" />
              <span>Trato directo con {PRODUCTOR.nombreCorto} (MP {PRODUCTOR.matricula})</span>
            </li>
          </ul>

          {/* Atajo compacto para mejorar póliza actual */}
          <div className="pt-2 hidden lg:block">
            <a
              href={linkWhatsApp(
                'Hola! Te mando foto de mi póliza actual para ver si podemos mejorar el precio o la cobertura.'
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-stone-50 border border-stone-300/90 rounded-2xl p-3.5 pr-4 shadow-2xs transition group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">¿Ya tenés seguro y pagás caro?</span>
                <span className="text-slate-600">Mandanos foto de tu póliza y mejoramos el costo</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#21699B] group-hover:translate-x-0.5 transition" />
            </a>
          </div>
        </div>

        {/* Columna Derecha: Cotizador Protagonista */}
        <div className="lg:col-span-6" id="cotizador">
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
