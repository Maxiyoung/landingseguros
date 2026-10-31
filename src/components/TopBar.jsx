import { Wrench } from 'lucide-react';
import { PRODUCTOR } from '../config';

export default function TopBar() {
  return (
    <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <span className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            <strong className="text-white">{PRODUCTOR.nombreCompleto}</strong> · Matrícula SSN {PRODUCTOR.matricula}
          </span>
        </span>
        <a
          href="#emergencia"
          className="text-[#6DA6C9] hover:text-white transition font-semibold flex items-center gap-1.5"
        >
          <Wrench className="w-3.5 h-3.5" /> Grúas y Siniestros 24 hs
        </a>
      </div>
    </div>
  );
}
