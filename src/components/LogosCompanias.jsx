import { useState } from 'react';
import { COMPANIAS } from '../data/companias';
import Reveal from './ui/Reveal';

function LogoCard({ comp, spanFullMobile }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group bg-white rounded-2xl px-4 py-4 min-h-[112px] sm:min-h-[124px] flex flex-col items-center justify-between border border-stone-200/90 shadow-[0_2px_12px_-6px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-[#6DA6C9] hover:shadow-[0_16px_32px_-14px_rgba(33,105,155,0.22)] transition-all duration-300 ${
        spanFullMobile ? 'col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div className="flex-1 flex items-center justify-center w-full">
        {!imgError ? (
          <img
            src={comp.logo}
            alt={comp.nombre}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="max-h-11 sm:max-h-12 max-w-[148px] w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="font-serif-brand font-bold text-slate-800 text-base text-center">
            {comp.nombre}
          </span>
        )}
      </div>

      {comp.tag && (
        <span className="mt-2.5 text-[10px] font-medium text-slate-500 text-center leading-tight line-clamp-1 group-hover:text-[#1E567C] transition-colors">
          {comp.tag}
        </span>
      )}
    </div>
  );
}

export default function LogosCompanias() {
  return (
    <section className="relative z-10 bg-white/80 backdrop-blur-sm">
      <div aria-hidden="true" className="section-divider" />
      <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 py-9 sm:py-11">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-5">
          Cotizamos en compañías de primera línea
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {COMPANIAS.map((comp, idx) => (
            <LogoCard
              key={comp.nombre}
              comp={comp}
              spanFullMobile={idx === COMPANIAS.length - 1}
            />
          ))}
        </div>
      </Reveal>
      <div aria-hidden="true" className="section-divider" />
    </section>
  );
}
