import BrandLogo from './BrandLogo';
import { PRODUCTOR } from '../config';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <BrandLogo darkBg={true} />
          <p className="mt-2 text-slate-300 font-medium">
            {PRODUCTOR.nombreCompleto} — {PRODUCTOR.cargo}
          </p>
          <p className="text-slate-400">
            Atención personalizada y gestión integral de siniestros.
          </p>
        </div>
        <div className="text-center sm:text-right space-y-1.5">
          <p className="text-slate-200 font-semibold text-sm">Matrícula SSN N° {PRODUCTOR.matricula}</p>
          <p>Superintendencia de Seguros de la Nación — Órgano de Control de la Actividad Aseguradora</p>
          <p className="text-slate-500">0800-666-8400 — www.argentina.gob.ar/ssn</p>
        </div>
      </div>
    </footer>
  );
}
