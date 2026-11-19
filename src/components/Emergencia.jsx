import { useId, useState } from 'react';
import { Wrench, AlertTriangle, PhoneCall, MessageCircle } from 'lucide-react';
import { COMPANIAS } from '../data/companias';
import { MENSAJES_WHATSAPP } from '../config';
import { linkWhatsApp } from '../utils/whatsapp';
import Reveal from './ui/Reveal';
import SegmentedControl from './ui/SegmentedControl';
import ExternalLink from './ui/ExternalLink';

const PASOS_SINIESTRO = [
  {
    numero: '01',
    titulo: 'DATOS DEL TERCERO',
    texto: 'Foto de Carnet, Cédula, Seguro y celular del otro conductor.'
  },
  {
    numero: '02',
    titulo: 'FOTOS DE LOS DAÑOS',
    texto: '2 fotos claras donde se vean la patente y los daños del vehículo.'
  },
  {
    numero: '03',
    titulo: 'MANDANOS WHATSAPP',
    texto: 'Enviá las fotos y un audio dentro de las 72 hs hábiles; nosotros cargamos la denuncia.'
  }
];

export default function Emergencia() {
  const idPrefix = useId();
  const [activeTab, setActiveTab] = useState('grua');
  const panelId = `${idPrefix}-panel`;

  const tabOptions = [
    {
      id: `${idPrefix}-tab-grua`,
      value: 'grua',
      label: 'Teléfonos de Grúa',
      icon: Wrench,
      iconClassName: 'w-3.5 h-3.5',
      controls: panelId
    },
    {
      id: `${idPrefix}-tab-choque`,
      value: 'choque',
      label: 'Qué hacer si chocás',
      icon: AlertTriangle,
      iconClassName: 'w-3.5 h-3.5',
      controls: panelId
    }
  ];

  return (
    <section id="emergencia" className="scroll-mt-24 bg-white">
      <div aria-hidden="true" className="section-divider" />
      <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 py-13 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#21699B]">
              Asistencia al asegurado
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#0F172A] mt-1 tracking-tight">
              Grúas 24 hs y Siniestros
            </h2>
          </div>

          <SegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={setActiveTab}
            variant="pillCream"
            mode="tablist"
            ariaLabel="Asistencia y siniestros"
            className="self-start sm:self-auto"
          />
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${activeTab}`}
        >
          {activeTab === 'grua' ? (
            <div key="grua" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 animate-panel-in">
              {COMPANIAS.map((c, idx) => (
                <div
                  key={c.nombre}
                  className={`group bg-[#FAF8F5] hover:bg-white p-4 rounded-2xl border border-stone-200/90 hover:border-[#6DA6C9] shadow-[0_2px_10px_-6px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_28px_-14px_rgba(33,105,155,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center gap-3.5 ${
                    idx === COMPANIAS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                      24 hs
                    </span>
                    <span className="font-serif-brand font-bold text-base text-[#0F172A] block pt-1">
                      {c.nombre}
                    </span>
                  </div>
                  {c.grua ? (
                    <a
                      href={`tel:${c.grua.replace(/-/g, '')}`}
                      className="w-full bg-[#21699B] hover:bg-[#19527A] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall
                        aria-hidden="true"
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12"
                      />
                      <span>{c.grua}</span>
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
            <div key="choque" className="space-y-4 animate-panel-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F5F2EB] p-4 sm:p-5 rounded-3xl border border-stone-200/90">
                {PASOS_SINIESTRO.map((paso) => (
                  <div
                    key={paso.numero}
                    className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_-6px_rgba(15,23,42,0.06)] relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold tracking-wider text-[#21699B]">
                        {paso.numero.replace(/^0/, '')}. {paso.titulo}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-serif-brand font-bold text-2xl leading-none text-stone-300 select-none"
                      >
                        {paso.numero}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {paso.texto}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center sm:justify-end">
                <ExternalLink
                  href={linkWhatsApp(MENSAJES_WHATSAPP.denunciaSiniestro)}
                  className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#21699B] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm transition-all"
                >
                  <MessageCircle aria-hidden="true" className="w-4 h-4 text-[#6DA6C9]" />
                  <span>Enviar denuncia por WhatsApp</span>
                </ExternalLink>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
