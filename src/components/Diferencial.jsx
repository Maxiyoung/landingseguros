import { FileText, MessageCircle } from 'lucide-react';
import { linkWhatsApp } from '../utils/whatsapp';

export default function Diferencial() {
  return (
    <section id="diferencial" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <div className="bg-gradient-to-br from-[#1B4B72] via-[#133553] to-[#0F172A] rounded-[32px] p-8 sm:p-12 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6DA6C9] bg-white/10 px-3 py-1 rounded-full">
              <FileText className="w-4 h-4" /> Revisión sin cargo de tu póliza actual
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif-brand font-bold leading-tight">
              ¿Sentís que tu seguro aumenta sin control o contrataste en un banco?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Los bancos y concesionarias suelen recargar comisiones y dejarte sin asesoramiento cuando tenés un siniestro. Mandanos una foto del frente de tu póliza actual: verificamos que tu suma asegurada sea la correcta y te conseguimos una propuesta superadora en <strong>Galicia, Mercantil Andina, Provincia, Sancor o El Norte</strong>.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              href={linkWhatsApp(
                'Hola! Te mando foto de mi póliza actual para ver si podemos mejorar el precio o la cobertura.'
              )}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white text-[#0F172A] hover:bg-[#6DA6C9] hover:text-[#0F172A] font-bold px-7 py-4 rounded-full shadow-lg transition flex items-center justify-center gap-2.5 text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5 text-[#21699B]" />
              <span>Mandar foto de mi póliza</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
