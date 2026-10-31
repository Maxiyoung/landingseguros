import { COMPANIAS } from '../data/companias';

export default function LogosCompanias() {
  return (
    <section className="py-8 bg-white/80 border-y border-stone-200/90">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-5">
          Cotizamos en compañías de primera línea
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {COMPANIAS.map((comp, idx) => (
            <div
              key={comp.nombre}
              className={`bg-white rounded-2xl p-4 h-24 sm:h-28 flex flex-col items-center justify-center border border-stone-200/80 hover:border-[#6DA6C9] transition-all ${
                idx === COMPANIAS.length - 1 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <img
                src={comp.logo}
                alt={comp.nombre}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
                className="max-h-14 sm:max-h-16 max-w-[160px] w-full object-contain"
              />
              <span className="hidden font-serif-brand font-bold text-slate-800 text-base text-center">
                {comp.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
