import { useId } from 'react';
import { Car, Bike, CheckCircle2, Sparkles } from 'lucide-react';
import { COBERTURAS_POR_RAMO } from '../data/coberturas';
import Reveal from './ui/Reveal';
import SegmentedControl from './ui/SegmentedControl';

function NivelCobertura({ nivel = 1, dark = false }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Nivel de cobertura ${nivel} de 3`}
      title={`Nivel de protección ${nivel} de 3`}
    >
      {[1, 2, 3].map((step) => {
        const active = step <= nivel;
        return (
          <span
            key={step}
            className={`h-1.5 rounded-full transition-all ${
              step === 3 ? 'w-4' : 'w-3'
            } ${
              active
                ? dark
                  ? 'bg-[#6DA6C9]'
                  : 'bg-[#21699B]'
                : dark
                ? 'bg-white/15'
                : 'bg-stone-200'
            }`}
          />
        );
      })}
    </div>
  );
}

function handleSpotlightMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

function PlanCard({ plan, ramo, onSeleccionarPlan }) {
  const isDestacado = Boolean(plan.destacado);
  const isObligatorio = plan.badge.includes('Obligatorio');

  const contenido = (
    <>
      {isDestacado && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(109,166,201,0.18),transparent_60%)]"
        />
      )}

      <div
        aria-hidden="true"
        style={{
          '--spot-color': isDestacado
            ? 'rgba(109, 166, 201, 0.16)'
            : 'rgba(33, 105, 155, 0.06)'
        }}
        className="plan-spotlight pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isDestacado
                ? 'text-[#6DA6C9]'
                : isObligatorio
                ? 'text-slate-600'
                : 'text-[#21699B]'
            }`}
          >
            {plan.badge}
          </span>
          <NivelCobertura nivel={plan.nivel} dark={isDestacado} />
        </div>

        <h3
          className={`text-xl font-serif-brand font-bold mt-1.5 ${
            isDestacado ? 'text-white' : 'text-[#0F172A]'
          }`}
        >
          {plan.titulo}
        </h3>

        {plan.idealPara && (
          <p
            className={`text-xs mt-1 mb-4 ${
              isDestacado ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {plan.idealPara}
          </p>
        )}

        <ul
          className={`space-y-3 text-sm mb-7 ${
            isDestacado ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {plan.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isDestacado
                    ? 'bg-[#6DA6C9]/15 text-[#6DA6C9]'
                    : isObligatorio
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-[#21699B]/10 text-[#21699B]'
                }`}
              >
                <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5" />
              </span>
              <span>
                {item.negrita ? (
                  <strong
                    className={`font-semibold ${
                      isDestacado ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.texto}
                  </strong>
                ) : (
                  item.texto
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => onSeleccionarPlan(ramo, plan.valor)}
        className={
          isDestacado
            ? 'btn-shimmer relative w-full bg-[#6DA6C9] hover:bg-[#7DB3D4] text-[#0F172A] text-center font-bold py-3.5 rounded-xl text-sm shadow-[0_8px_22px_-6px_rgba(109,166,201,0.5)] active:scale-[0.985] transition-all cursor-pointer'
            : 'relative w-full py-3.5 px-4 rounded-xl border border-slate-300 hover:border-[#0F172A] hover:bg-[#0F172A] text-slate-800 hover:text-white font-semibold text-sm text-center active:scale-[0.985] transition-all duration-200 cursor-pointer'
        }
      >
        {plan.botonTexto}
      </button>
    </>
  );

  if (isDestacado) {
    return (
      <div
        onMouseMove={handleSpotlightMove}
        className="group order-first md:order-none relative rounded-[25px] p-[1.5px] bg-gradient-to-b from-[#6DA6C9] via-[#6DA6C9]/40 to-[#21699B]/70 shadow-[0_24px_54px_-16px_rgba(15,23,42,0.45)] hover:-translate-y-1.5 transition-all duration-300 flex"
      >
        <div className="absolute -top-3.5 right-5 z-20 bg-gradient-to-r from-[#6DA6C9] to-[#87BBD9] text-[#0F172A] text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase shadow-md inline-flex items-center gap-1">
          <Sparkles aria-hidden="true" className="w-3 h-3" />
          <span>{plan.tagDestacado}</span>
        </div>

        <div className="relative overflow-hidden w-full rounded-[23.5px] bg-gradient-to-b from-[#16233E] via-[#0F172A] to-[#0B1220] text-white p-6 sm:p-7 flex flex-col justify-between">
          {contenido}
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleSpotlightMove}
      className="group relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:border-[#6DA6C9]/75 hover:shadow-[0_18px_38px_-14px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col justify-between"
    >
      {contenido}
    </div>
  );
}

export default function Planes({ ramo, onRamoChange, onSeleccionarPlan }) {
  const idPrefix = useId();
  const panelId = `${idPrefix}-panel`;
  const planesOrdenados = [...COBERTURAS_POR_RAMO[ramo]].sort(
    (a, b) => (a.ordenDesktop ?? 99) - (b.ordenDesktop ?? 99)
  );

  const tabOptions = [
    { id: `${idPrefix}-tab-auto`, value: 'auto', label: 'Autos', icon: Car, controls: panelId },
    { id: `${idPrefix}-tab-moto`, value: 'moto', label: 'Motos', icon: Bike, controls: panelId }
  ];

  return (
    <section id="coberturas" className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 py-13 sm:py-16">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#21699B]">
              Coberturas disponibles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#0F172A] mt-1 tracking-tight">
              Elegí qué cobertura querés cotizar
            </h2>
          </div>

          <SegmentedControl
            options={tabOptions}
            value={ramo}
            onChange={onRamoChange}
            variant="pill"
            mode="tablist"
            ariaLabel="Filtrar coberturas por tipo de vehículo"
            className="self-start sm:self-auto"
          />
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${ramo}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch"
        >
          {planesOrdenados.map((plan) => (
            <PlanCard
              key={`${ramo}-${plan.valor}`}
              plan={plan}
              ramo={ramo}
              onSeleccionarPlan={onSeleccionarPlan}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
