import { ChevronRight } from 'lucide-react';
import { OTROS_RAMOS } from '../data/otrosRamos';
import { linkWhatsApp } from '../utils/whatsapp';

export default function OtrosRamos() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">Protección integral</span>
            <h3 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#0F172A] mt-1">
              También protegemos tu casa, tu negocio y tu trabajo
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Consultá descuentos especiales por asegurar más de un riesgo con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OTROS_RAMOS.map((item) => {
            const IconComponent = item.icono;
            return (
              <div
                key={item.nombre}
                className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200/80 flex flex-col justify-between gap-4 hover:border-[#6DA6C9] transition"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif-brand font-bold text-lg text-[#0F172A]">{item.nombre}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.descripcion}</p>
                </div>
                <a
                  href={linkWhatsApp(item.mensaje)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#21699B] hover:text-[#0F172A] transition"
                >
                  <span>Consultar por WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
