import { useState } from 'react';
import { Camera, BadgePercent, ChevronDown } from 'lucide-react';
import { PREGUNTAS_FRECUENTES } from '../data/faq';

export default function PasosYFaq() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Columna izquierda: 3 pasos simples */}
        <div className="lg:col-span-5 space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">100% digital y sin vueltas</span>
          <h2 className="text-3xl font-serif-brand font-bold text-[#0F172A] leading-tight">
            Asegurá hoy desde tu celular en 3 pasos
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Olvidate de trámites presenciales o perder una mañana entera. Nosotros nos ocupamos de todo el alta.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-[#6DA6C9] flex items-center justify-center shrink-0 font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Comparás precios reales</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Te pasamos por WhatsApp las mejores opciones entre nuestras 5 aseguradoras líderes.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-[#6DA6C9] flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <span>Inspección por 4 fotos</span>
                  <Camera className="w-3.5 h-3.5 text-[#21699B]" />
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Sin llevar el vehículo a ningún lado: nos mandás fotos desde tu casa y emitimos en el acto.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-[#6DA6C9] flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <span>Póliza en el día y descuentos</span>
                  <BadgePercent className="w-3.5 h-3.5 text-[#21699B]" />
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Recibís tu certificado para circular al instante y accedés a bonificaciones con débito o tarjeta.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: Acordeón FAQ */}
        <div className="lg:col-span-7 space-y-3">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">Dudas frecuentes</span>
            <h3 className="text-2xl font-serif-brand font-bold text-[#0F172A] mt-1">
              Todo lo que necesitás saber antes de contratar
            </h3>
          </div>

          {PREGUNTAS_FRECUENTES.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.pregunta}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-[#21699B] transition cursor-pointer"
                >
                  <span>{faq.pregunta}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#21699B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
