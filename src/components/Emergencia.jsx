import { useState } from 'react';
import { AlertTriangle, Wrench, PhoneCall } from 'lucide-react';
import { COMPANIAS } from '../data/companias';

export default function Emergencia() {
  const [activeTab, setActiveTab] = useState('choque');

  return (
    <section id="emergencia" className="bg-white border-t border-stone-200 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">Estamos cuando las papas queman</span>
          <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-[#0F172A] mt-1">
            Guía rápida de Siniestros y Asistencia 24 hs
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Si tuviste un choque o te quedaste en la ruta, seguí estos pasos o llamá directo a tu grúa.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('choque')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition cursor-pointer ${
              activeTab === 'choque'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-[#F5F2EB] text-slate-700 hover:bg-stone-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#6DA6C9]" /> Qué hacer si chocás
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('grua')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition cursor-pointer ${
              activeTab === 'grua'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-[#F5F2EB] text-slate-700 hover:bg-stone-200'
            }`}
          >
            <Wrench className="w-4 h-4 text-[#6DA6C9]" /> Teléfonos de Grúa 24 hs
          </button>
        </div>

        {activeTab === 'choque' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F5F2EB] p-6 sm:p-8 rounded-3xl border border-stone-200/90">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/70 space-y-2">
              <span className="inline-block bg-[#21699B] text-white text-xs font-bold px-2.5 py-1 rounded-lg">PASO 1</span>
              <h4 className="font-serif-brand font-bold text-lg">Pedí estos 4 datos</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sacale foto al <strong>Carnet de conducir</strong>, <strong>Cédula del auto</strong> y <strong>Certificado de seguro</strong> del otro conductor, más su número de teléfono.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200/70 space-y-2">
              <span className="inline-block bg-[#21699B] text-white text-xs font-bold px-2.5 py-1 rounded-lg">PASO 2</span>
              <h4 className="font-serif-brand font-bold text-lg">Sacá fotos claras</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tomá al menos 2 fotos donde se vean claramente la <strong>patente y los daños</strong> de los vehículos involucrados.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200/70 space-y-2">
              <span className="inline-block bg-[#21699B] text-white text-xs font-bold px-2.5 py-1 rounded-lg">PASO 3</span>
              <h4 className="font-serif-brand font-bold text-lg">Mandanos un audio</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tenés 72 hs hábiles. No reniegues con formularios: pasanos las fotos y un audio por WhatsApp y nosotros gestionamos la denuncia.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {COMPANIAS.map((c, idx) => (
              <div
                key={c.nombre}
                className={`bg-[#F5F2EB] p-6 rounded-2xl border border-stone-200 flex flex-col justify-between items-center text-center gap-4 ${
                  idx === COMPANIAS.length - 1 ? 'sm:col-span-2 md:col-span-1' : ''
                }`}
              >
                <div>
                  <span className="font-serif-brand font-bold text-lg text-slate-900 block">{c.nombre}</span>
                  <span className="text-xs text-slate-500">Asistencia Mecánica 24 hs</span>
                </div>
                {c.grua ? (
                  <a
                    href={`tel:${c.grua.replace(/-/g, '')}`}
                    className="w-full bg-[#21699B] hover:bg-[#19527A] text-white font-bold py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {c.grua}
                  </a>
                ) : (
                  <span className="w-full bg-stone-200 text-slate-600 font-semibold py-3 px-4 rounded-xl text-xs">
                    Consultá tu póliza
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
