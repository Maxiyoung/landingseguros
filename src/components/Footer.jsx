import { ShieldCheck, ExternalLink as ExternalIcon, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';
import ExternalLink from './ui/ExternalLink';
import { PRODUCTOR, SSN_INFO } from '../config';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 relative overflow-hidden border-t border-slate-800/90 text-xs">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#6DA6C9]/45 to-transparent"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-11 sm:pt-12 pb-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-7">
          <div className="flex flex-col items-center sm:items-start gap-2.5">
            <BrandLogo darkBg={true} />
            <p className="mt-1.5 text-slate-200 font-semibold text-sm">
              {PRODUCTOR.nombreCompleto} — {PRODUCTOR.cargo}
            </p>
            <p className="text-slate-400 max-w-sm text-center sm:text-left leading-relaxed">
              Atención personalizada, comparativa entre aseguradoras líderes y gestión integral de siniestros en {PRODUCTOR.zona}.
            </p>
          </div>

          <div className="text-center sm:text-right space-y-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-4">
            <p className="text-white font-semibold text-sm inline-flex items-center gap-1.5 justify-center sm:justify-end">
              <ShieldCheck aria-hidden="true" className="w-4 h-4 text-[#6DA6C9]" />
              <span>Matrícula SSN N° {PRODUCTOR.matricula}</span>
            </p>
            <p className="text-slate-300">
              {SSN_INFO.nombre}
              <span className="block text-slate-400">{SSN_INFO.subtitulo}</span>
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 pt-0.5 text-slate-400">
              <a
                href={SSN_INFO.telefonoHref}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <Phone aria-hidden="true" className="w-3 h-3 text-[#6DA6C9]" />
                <span>{SSN_INFO.telefono}</span>
              </a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <ExternalLink
                href={SSN_INFO.webUrl}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>{SSN_INFO.webLabel}</span>
                <ExternalIcon aria-hidden="true" className="w-3 h-3 text-[#6DA6C9]" />
              </ExternalLink>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-5 text-[11px] text-slate-400 text-center sm:text-left leading-relaxed">
          <strong className="text-slate-300 font-semibold">Privacidad y uso de datos:</strong>{' '}
          Este sitio no utiliza cookies ni almacena información personal. Los datos que ingresás en el cotizador se envían únicamente mediante WhatsApp al productor para preparar tu presupuesto.
        </div>
      </div>
    </footer>
  );
}
