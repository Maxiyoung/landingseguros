import { useState } from 'react';
import { Wrench, AlertTriangle, PhoneCall } from 'lucide-react';
import { COMPANIAS } from '../data/companias';

export default function Emergencia() {
  const [activeTab, setActiveTab] = useState('grua');

  return (
    <section id="emergencia" className="bg-white border-t border-stone-200 py-12 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">
              Asistencia al asegurado
            </span>
            <h2 className="text-2xl font-serif-brand font-bold text-[#0F172A] mt-0.5">
              Grúas 24 hs y Siniestros
            </h2>
          </div>

          <div className="inline-flex gap-2 bg-[#F5F2EB] p-1 rounded-full border border-stone-200/90 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('grua')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'grua'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-[#6DA6C9]" /> Teléfonos de Grúa
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('choque')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'choque'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#6DA6C9]" /> Qué hacer si chocás
            </button>
          </div>
        </div>

        {activeTab === 'grua' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
            {COMPANIAS.map((c, idx) => (
              <div
                key={c.nombre}
                className={`bg-[#F5F2EB] p-4 rounded-2xl border border-stone-200 flex flex-col justify-between items-center text-center gap-3 ${
                  idx === COMPANIAS.length - 1 ? 'sm:col-span-2 md:col-span-1' : ''
                }`}
              >
                <div>
                  <span className="font-serif-brand font-bold text-base text-slate-900 block">
                    {c.nombre}
                  </span>
                  <span className="text-[11px] text-slate-500">Asistencia 24 hs</span>
                </div>
                {c.grua ? (
                  <a
                    href={`tel:${c.grua.replace(/-/g, '')}`}
                    className="w-full bg-[#21699B] hover:bg-[#19527A] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    {c.grua}
                  </a>
                ) : (
                  <span className="w-full bg-stone-200 text-slate-600 font-semibold py-2.5 px-3 rounded-xl text-xs">
                    Consultá tu póliza
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F5F2EB] p-5 rounded-2xl border border-stone-200/90">
            <div className="bg-white p-4 rounded-xl border border-stone-200/70">
              <span className="text-[11px] font-bold text-[#21699B]">1. DATOS DEL TERCERO</span>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Foto de Carnet, Cédula, Seguro y celular del otro conductor.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200/70">
              <span className="text-[11px] font-bold text-[#21699B]">2. FOTOS DE LOS DAÑOS</span>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                2 fotos claras donde se vean la patente y los daños del vehículo.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200/70">
              <span className="text-[11px] font-bold text-[#21699B]">3. MANDANOS WHATSAPP</span>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Enviá las fotos y un audio dentro de las 72 hs hábiles; nosotros cargamos la denuncia.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
