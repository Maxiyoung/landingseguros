import { Car, Bike, CheckCircle2 } from 'lucide-react';
import { COBERTURAS_POR_RAMO } from '../data/coberturas';

export default function Planes({ ramo, onRamoChange, onSeleccionarPlan }) {
  const planesActuales = [
    COBERTURAS_POR_RAMO[ramo][1],
    COBERTURAS_POR_RAMO[ramo][0],
    COBERTURAS_POR_RAMO[ramo][2]
  ];

  return (
    <section id="coberturas" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">
            Coberturas disponibles
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#0F172A] mt-1">
            Elegí qué cobertura querés cotizar
          </h2>
        </div>

        {/* Selector de pestañas en Coberturas */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-white rounded-full border border-stone-300/80 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onRamoChange('auto')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              ramo === 'auto'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className={`w-4 h-4 ${ramo === 'auto' ? 'text-[#6DA6C9]' : 'text-slate-500'}`} />
            <span>Autos</span>
          </button>
          <button
            type="button"
            onClick={() => onRamoChange('moto')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              ramo === 'moto'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bike className={`w-4 h-4 ${ramo === 'moto' ? 'text-[#6DA6C9]' : 'text-slate-500'}`} />
            <span>Motos</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {planesActuales.map((plan) =>
          plan.destacado ? (
            <div
              key={plan.valor}
              className="bg-[#0F172A] text-white rounded-3xl p-6 border-2 border-[#6DA6C9] shadow-lg relative flex flex-col justify-between"
            >
              <div className="absolute -top-3 right-5 bg-[#6DA6C9] text-[#0F172A] text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase">
                {plan.tagDestacado}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6DA6C9]">
                  {plan.badge}
                </span>
                <h3 className="text-xl font-serif-brand font-bold mt-1 mb-3.5">{plan.titulo}</h3>
                <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
                  {plan.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#6DA6C9] shrink-0 mt-0.5" />
                      <span>
                        {item.negrita ? (
                          <strong className="text-white">{item.texto}</strong>
                        ) : (
                          item.texto
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onSeleccionarPlan(ramo, plan.valor)}
                className="w-full bg-[#6DA6C9] hover:bg-[#5B94B7] text-[#0F172A] text-center font-bold py-3 rounded-xl text-sm transition cursor-pointer"
              >
                {plan.botonTexto}
              </button>
            </div>
          ) : (
            <div
              key={plan.valor}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    plan.badge.includes('Obligatorio') ? 'text-slate-400' : 'text-[#21699B]'
                  }`}
                >
                  {plan.badge}
                </span>
                <h3 className="text-xl font-serif-brand font-bold text-slate-900 mt-1 mb-3.5">
                  {plan.titulo}
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                  {plan.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.badge.includes('Obligatorio') ? 'text-slate-400' : 'text-[#21699B]'
                        }`}
                      />
                      <span>
                        {item.negrita ? <strong>{item.texto}</strong> : item.texto}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onSeleccionarPlan(ramo, plan.valor)}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-[#21699B] text-slate-800 hover:text-[#21699B] font-semibold text-sm text-center transition cursor-pointer"
              >
                {plan.botonTexto}
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
