import { ShieldCheck, ExternalLink, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { PRODUCTOR } from '../config';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 relative overflow-hidden border-t border-slate-800/90 text-xs">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#6DA6C9]/45 to-transparent"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-11 sm:py-12 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-7">
        <div className="flex flex-col items-center sm:items-start gap-2.5">
          <BrandLogo darkBg={true} />
          <p className="mt-1.5 text-slate-200 font-semibold text-sm">
            {PRODUCTOR.nombreCompleto} — {PRODUCTOR.cargo}
          </p>
          <p className="text-slate-400 max-w-sm text-center sm:text-left leading-relaxed">
            Atención personalizada, comparativa entre aseguradoras líderes y gestión integral de siniestros en Córdoba.
          </p>
        </div>

        <div className="text-center sm:text-right space-y-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-4">
          <p className="text-white font-semibold text-sm inline-flex items-center gap-1.5 justify-center sm:justify-end">
            <ShieldCheck className="w-4 h-4 text-[#6DA6C9]" />
            <span>Matrícula SSN N° {PRODUCTOR.matricula}</span>
          </p>
          <p className="text-slate-300">
            Superintendencia de Seguros de la Nación
            <span className="block text-slate-400">Órgano de Control de la Actividad Aseguradora</span>
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 pt-0.5 text-slate-400">
            <a
              href="tel:08006668400"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#6DA6C9]" />
              <span>0800-666-8400</span>
            </a>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <a
              href="https://www.argentina.gob.ar/ssn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>argentina.gob.ar/ssn</span>
              <ExternalLink className="w-3 h-3 text-[#6DA6C9]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
