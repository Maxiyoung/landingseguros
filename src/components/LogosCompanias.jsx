import { COMPANIAS } from '../data/companias';

export default function LogosCompanias() {
  return (
    <section className="py-12 bg-white/80 border-y border-stone-200/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-7">
          Respaldo oficial en las aseguradoras más sólidas del mercado
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {COMPANIAS.map((comp, idx) => (
            <div
              key={comp.nombre}
              className={`bg-white rounded-2xl p-6 h-32 sm:h-36 flex flex-col items-center justify-center border border-stone-200/80 hover:border-[#6DA6C9] hover:shadow-md transition-all group ${
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
                className="max-h-16 sm:max-h-20 max-w-[195px] w-full object-contain group-hover:scale-105 transition duration-300"
              />
              <span className="hidden font-serif-brand font-bold text-slate-800 text-lg text-center">
                {comp.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
