import { Wrench, ArrowUpRight } from 'lucide-react';
import { PRODUCTOR } from '../config';

export default function TopBar() {
  return (
    <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800/90 relative z-50">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <span className="flex items-center gap-2.5 font-medium">
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-65" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span>
            <strong className="text-white font-semibold">{PRODUCTOR.nombreCompleto}</strong>
            <span className="text-slate-400"> · Matrícula SSN {PRODUCTOR.matricula}</span>
          </span>
        </span>
        <a
          href="#emergencia"
          className="group text-[#6DA6C9] hover:text-white transition-colors font-semibold inline-flex items-center gap-1.5"
        >
          <Wrench className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-rotate-12" />
          <span>Grúas y Siniestros 24 hs</span>
          <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>
    </div>
  );
}
