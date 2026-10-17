import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, PhoneCall, MessageCircle, Car, Bike, Wrench, 
  CheckCircle2, AlertTriangle, FileText, 
  Sparkles, UserCheck, Clock, ChevronRight
} from 'lucide-react';

// COMPONENTE DEL LOGO CLAVADO AL MILÍMETRO
function BrandLogo({ size = 'normal', darkBg = false }) {
  const isLarge = size === 'large';
  const mainColor = darkBg ? 'text-white' : 'text-[#141414]';
  const subColor = darkBg ? 'text-slate-200' : 'text-[#141414]';

  return (
    <a href="#" className="inline-flex flex-col select-none group">
      {/* Fila superior: SOMOSMAS */}
      <div className={`${isLarge ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[28px]'} font-serif-brand font-bold leading-none tracking-tight flex`}>
        <span className={mainColor}>SOMOS</span>
        <span className="text-[#6DA6C9]">MAS</span>
      </div>
      {/* Fila inferior: s e g u r o s distribuido exactamente al 100% del ancho de arriba */}
      <div 
        className={`w-full flex justify-between font-serif-brand font-bold leading-none mt-1 ${
          isLarge ? 'text-sm sm:text-base' : 'text-xs sm:text-[13px]'
        } ${subColor}`}
        aria-label="seguros"
      >
        {'seguros'.split('').map((letra, index) => (
          <span key={index}>{letra}</span>
        ))}
      </div>
    </a>
  );
}

const COBERTURAS_POR_RAMO = {
  auto: [
    {
      valor: 'Terceros Completo Full (Granizo + Cristales)',
      labelSelect: 'Cobertura: Terceros Completo Full',
      badge: 'Mejor relación precio / protección',
      titulo: 'Terceros Completo Full',
      destacado: true,
      tagDestacado: 'El más elegido',
      botonTexto: 'Cotizar Terceros Full',
      items: [
        { texto: 'Robo y Hurto Total o Parcial' },
        { texto: 'Incendio Total/Parcial y Destrucción Total (80%)' },
        { texto: 'Granizo, Cristales, Parabrisas y Cerraduras', sufijo: ' sin tope', negrita: true },
        { texto: 'Reposición de ruedas sin depreciación' }
      ]
    },
    {
      valor: 'Responsabilidad Civil',
      labelSelect: 'Cobertura: Responsabilidad Civil',
      badge: 'Obligatorio para circular',
      titulo: 'Responsabilidad Civil',
      destacado: false,
      botonTexto: 'Seleccionar este plan',
      items: [
        { texto: 'Daños materiales y lesiones a terceros' },
        { texto: 'Extensión automática a países del Mercosur' },
        { texto: 'Auxilio mecánico y remolque básico' }
      ]
    },
    {
      valor: 'Todo Riesgo con Franquicia',
      labelSelect: 'Cobertura: Todo Riesgo con Franquicia',
      badge: 'Protección superior',
      titulo: 'Todo Riesgo con Franquicia',
      destacado: false,
      botonTexto: 'Seleccionar este plan',
      items: [
        { texto: 'Todo lo incluido en Terceros Completo Full' },
        { texto: 'Daños parciales por accidente', sufijo: ' (incluso si chocás solo o tenés la culpa)', negrita: true },
        { texto: 'Franquicia fija o variable adaptada a tu bolsillo' }
      ]
    }
  ],
  moto: [
    {
      valor: 'Robo + Incendio Total + Responsabilidad Civil',
      labelSelect: 'Cobertura: Robo e Incendio Total + RC',
      badge: 'Mejor relación precio / protección',
      titulo: 'Robo e Incendio Premium',
      destacado: true,
      tagDestacado: 'El más elegido',
      botonTexto: 'Cotizar Robo e Incendio',
      items: [
        { texto: 'Robo y Hurto Total de la unidad', negrita: true },
        { texto: 'Incendio Total y Destrucción Total por accidente' },
        { texto: 'Responsabilidad Civil hacia terceros y acompañante' },
        { texto: 'Asistencia mecánica y remolque 24 hs en ruta' }
      ]
    },
    {
      valor: 'Responsabilidad Civil Moto',
      labelSelect: 'Cobertura: Responsabilidad Civil (Básico)',
      badge: 'Obligatorio para circular',
      titulo: 'Responsabilidad Civil',
      destacado: false,
      botonTexto: 'Seleccionar este plan',
      items: [
        { texto: 'Daños materiales y lesiones a terceros transportados y no transportados' },
        { texto: 'Certificado digital al instante para circular hoy mismo' },
        { texto: 'Cobertura en todo el territorio nacional y Mercosur' }
      ]
    },
    {
      valor: 'Moto Full (Robo + Destrucción Total + Granizo)',
      labelSelect: 'Cobertura: Moto Full (Alta Cilindrada)',
      badge: 'Protección superior',
      titulo: 'Moto Full / Alta Gama',
      destacado: false,
      botonTexto: 'Seleccionar este plan',
      items: [
        { texto: 'Todo lo incluido en el plan Robo e Incendio Premium' },
        { texto: 'Reposición de unidad 0km', sufijo: ' (en motos nuevas durante el 1° año)', negrita: true },
        { texto: 'Adicional por daños de granizo e inundación y kilometraje de grúa ampliado' }
      ]
    }
  ]
};

export default function App() {
  const [ramo, setRamo] = useState('auto'); // 'auto' | 'moto'
  const [formData, setFormData] = useState({
    vehiculo: '',
    anio: '',
    gnc: false,
    cilindrada: 'Hasta 250cc',
    localidad: 'Córdoba Capital',
    cobertura: COBERTURAS_POR_RAMO.auto[0].valor
  });

  const [activeTab, setActiveTab] = useState('choque');
  const vehiculoInputRef = useRef(null);

  // Reemplazar con el número real (formato internacional sin +)
  const WHATSAPP_NUMBER = '5493515449977';

  const handleRamoChange = (nuevoRamo) => {
    setRamo(nuevoRamo);
    setFormData((prev) => ({
      ...prev,
      cobertura: COBERTURAS_POR_RAMO[nuevoRamo][0].valor
    }));
  };

  const handleSeleccionarPlan = (nuevoRamo, valorCobertura) => {
    setRamo(nuevoRamo);
    setFormData((prev) => ({
      ...prev,
      cobertura: valorCobertura
    }));
    const cotizadorEl = document.getElementById('cotizador');
    if (cotizadorEl) {
      cotizadorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      vehiculoInputRef.current?.focus();
    }, 450);
  };

  const handleCotizar = (e) => {
    e.preventDefault();
    const esMoto = ramo === 'moto';
    const iconoRamo = esMoto ? '🏍️' : '🚗';
    const nombreRamo = esMoto ? 'moto' : 'auto';
    const detalleExtra = esMoto
      ? `⚙️ *Cilindrada:* ${formData.cilindrada}%0A`
      : `⛽ *¿Tiene GNC?:* ${formData.gnc ? 'Sí (con GNC)' : 'No'}%0A`;

    const mensaje = `¡Hola! Estuve viendo la web de *SOMOSMAS Seguros* y quiero cotizar mi ${nombreRamo}:%0A%0A` +
      `${iconoRamo} *${esMoto ? 'Moto' : 'Vehículo'}:* ${formData.vehiculo || 'A confirmar'}%0A` +
      `📅 *Año:* ${formData.anio || 'A confirmar'}%0A` +
      detalleExtra +
      `📍 *Localidad:* ${formData.localidad}%0A` +
      `🛡️ *Cobertura:* ${formData.cobertura}%0A%0A` +
      `¿Me podrás pasar opciones? ¡Gracias!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
  };

  const companias = [
    { 
      nombre: 'Galicia Seguros', 
      logo: '/img/galicia.png', 
      grua: '0800-555-9998',
      tag: 'Respaldo Grupo Financiero Galicia'
    },
    { 
      nombre: 'Mercantil Andina', 
      logo: '/img/mercantil.png', 
      grua: '0800-777-2634',
      tag: 'Más de 100 años en el país'
    },
    { 
      nombre: 'Provincia Seguros', 
      logo: '/img/provincia.png', 
      grua: '0800-333-0520',
      tag: 'Solidez y cobertura nacional'
    },
    { 
      nombre: 'Sancor Seguros', 
      logo: '/img/sancor.png', 
      grua: '0800-777-4643',
      tag: 'Líder en respuesta de siniestros'
    },
    {
      nombre: 'El Norte Seguros',
      logo: '/img/elnorte.png',
      tag: 'Protección y respaldo para tu seguro'
    }
  ];

  // Ordenar para mostrar [Plan 2 (Básico), Plan 1 (Destacado al centro), Plan 3 (Superior)] en la grilla
  const planesActuales = [
    COBERTURAS_POR_RAMO[ramo][1],
    COBERTURAS_POR_RAMO[ramo][0],
    COBERTURAS_POR_RAMO[ramo][2]
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EB] text-[#0F172A] selection:bg-[#6DA6C9]/30 relative">
      
      {/* TOPBAR OFICIAL */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2.5 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Productor Asesor de Seguros Matriculado — Atención directa sin intermediarios
          </span>
          <a 
            href="#emergencia" 
            className="text-[#6DA6C9] hover:text-white transition font-semibold flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Kit de Siniestros y Grúas 24 hs <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#F5F2EB]/85 backdrop-blur-md border-b border-stone-300/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          
          <BrandLogo />

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#coberturas" className="hover:text-[#21699B] transition">Coberturas</a>
            <a href="#diferencial" className="hover:text-[#21699B] transition">Por qué elegirnos</a>
            <a href="#emergencia" className="hover:text-[#21699B] transition">Siniestros y Grúa</a>
          </nav>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Tengo%20una%20consulta%20sobre%20seguros.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#21699B] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-sm transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-[#6DA6C9]" />
            <span>Contacto Directo</span>
          </a>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Columna Izquierda */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-300/80 shadow-2xs text-[#1E567C] text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#21699B]" />
                <span>Cotización multicotizador en el día · Autos y Motos</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif-brand font-bold text-[#0F172A] leading-[1.08] tracking-tight">
                {ramo === 'auto'
                  ? 'Tu auto bien asegurado, al precio justo y con alguien que te atiende el teléfono.'
                  : 'Tu moto protegida contra robo, al mejor precio y con gestión directa sin vueltas.'}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-normal">
                Asesoramiento humano y personalizado. No somos un bot ni un 0800 interminable: buscamos el mejor precio entre compañías de primera línea y respondemos por vos cuando nos necesitás.
              </p>

              {/* Micro-beneficios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    5 Aseguradoras líderes para comparar
                  </span>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    Trato directo con tu productor asesor
                  </span>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    Gestión rápida ante cualquier siniestro
                  </span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Cotizador Rápido con Pestañas Auto / Moto */}
            <div className="lg:col-span-5" id="cotizador">
              <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.10)] border border-stone-200/80 relative">
                
                {/* PESTAÑAS DE RAMO: AUTOMOTORES / MOTOS */}
                <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#F5F2EB] rounded-2xl border border-stone-200/90 mb-6" role="tablist" aria-label="Seleccionar tipo de vehículo">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ramo === 'auto'}
                    onClick={() => handleRamoChange('auto')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      ramo === 'auto'
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Car className={`w-4 h-4 ${ramo === 'auto' ? 'text-[#6DA6C9]' : 'text-slate-500'}`} />
                    <span>Automotores</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ramo === 'moto'}
                    onClick={() => handleRamoChange('moto')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      ramo === 'moto'
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Bike className={`w-4 h-4 ${ramo === 'moto' ? 'text-[#6DA6C9]' : 'text-slate-500'}`} />
                    <span>Motos</span>
                  </button>
                </div>

                <div className="mb-5">
                  <h2 className="text-2xl font-serif-brand font-bold text-[#0F172A]">
                    {ramo === 'auto' ? 'Cotizador Rápido de Auto' : 'Cotizador Rápido de Moto'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Completá los datos y recibí comparativa por WhatsApp
                  </p>
                </div>

                <form onSubmit={handleCotizar} className="space-y-4">
                  <div>
                    <input
                      ref={vehiculoInputRef}
                      type="text"
                      required
                      aria-label="Marca y Modelo"
                      placeholder={
                        ramo === 'auto'
                          ? 'Marca y Modelo (Ej: VW Gol Trend 1.6)'
                          : 'Marca y Modelo (Ej: Honda Wave 110 / Tornado 250)'
                      }
                      value={formData.vehiculo}
                      onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      required
                      min="1990"
                      max="2027"
                      aria-label="Año del vehículo"
                      placeholder={ramo === 'auto' ? 'Año (Ej: 2019)' : 'Año (Ej: 2023)'}
                      value={formData.anio}
                      onChange={(e) => setFormData({ ...formData, anio: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-500"
                    />
                  </div>

                  {/* Condicional según pestaña: ¿Tiene GNC? para Auto / Cilindrada para Moto */}
                  {ramo === 'auto' ? (
                    <div className="flex items-center justify-between py-1 px-1">
                      <span className="text-sm font-semibold text-slate-800">¿Tiene GNC?</span>
                      <div className="inline-flex rounded-full border border-slate-300 p-0.5 bg-slate-100">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, gnc: true })}
                          className={`px-5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                            formData.gnc
                              ? 'bg-[#21699B] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Sí
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, gnc: false })}
                          className={`px-5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                            !formData.gnc
                              ? 'bg-[#21699B] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 py-1 px-1">
                      <span className="text-sm font-semibold text-slate-800 shrink-0">Cilindrada</span>
                      <div className="inline-flex rounded-full border border-slate-300 p-0.5 bg-slate-100">
                        {['Hasta 250cc', 'Más de 250cc'].map((cil) => (
                          <button
                            key={cil}
                            type="button"
                            onClick={() => setFormData({ ...formData, cilindrada: cil })}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                              formData.cilindrada === cil
                                ? 'bg-[#21699B] text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {cil}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      required
                      aria-label="Localidad"
                      placeholder="Localidad (Ej: Córdoba Capital)"
                      value={formData.localidad}
                      onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <select
                      aria-label="Cobertura"
                      value={formData.cobertura}
                      onChange={(e) => setFormData({ ...formData, cobertura: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-800 font-medium"
                    >
                      {COBERTURAS_POR_RAMO[ramo].map((plan) => (
                        <option key={plan.valor} value={plan.valor}>
                          {plan.labelSelect}
                        </option>
                      ))}
                      <option value="Quiero asesoramiento">No sé cuál elegir, asesórenme</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#21699B] hover:bg-[#19527A] text-white font-semibold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer mt-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>
                      {ramo === 'auto' ? 'Cotizar Auto por WhatsApp' : 'Cotizar Moto por WhatsApp'}
                    </span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* GRILLA DE COMPAÑÍAS ASEGURADORAS */}
        <section className="py-10 bg-white/80 border-y border-stone-200/90">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
              Respaldo oficial en las aseguradoras más sólidas del mercado
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {companias.map((comp) => (
                <div
                  key={comp.nombre}
                  className="bg-[#FAF8F5] rounded-2xl p-5 h-28 flex flex-col items-center justify-center border border-stone-200/80 hover:border-[#6DA6C9] hover:bg-white hover:shadow-md transition-all group"
                >
                  <img
                    src={comp.logo}
                    alt={comp.nombre} loading="lazy" decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                    className="max-h-12 max-w-[165px] object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
                  />
                  <span className="hidden font-serif-brand font-bold text-slate-800 text-lg text-center">
                    {comp.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARADOR DE COBERTURAS CON PESTAÑAS SINCRONIZADAS */}
        <section id="coberturas" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">Planes a medida</span>
            <h2 className="text-3xl sm:text-4xl font-serif-brand font-bold text-[#0F172A] mt-1 mb-3">
              Coberturas claras, sin letra chica
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Te explicamos en simple qué cubre cada alternativa para que elijas con tranquilidad sabiendo exactamente por qué estás pagando.
            </p>

            {/* Selector de pestañas en Coberturas */}
            <div className="inline-flex items-center gap-2 p-1.5 bg-white rounded-full border border-stone-300/80 shadow-2xs mt-6">
              <button
                type="button"
                onClick={() => handleRamoChange('auto')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  ramo === 'auto'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Car className={`w-4 h-4 ${ramo === 'auto' ? 'text-[#6DA6C9]' : 'text-slate-500'}`} />
                <span>Planes para Autos</span>
              </button>
              <button
                type="button"
                onClick={() => handleRamoChange('moto')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  ramo === 'moto'
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bike className={`w-4 h-4 ${ramo === 'moto' ? 'text-[#6DA6C9]' : 'text-slate-500'}`} />
                <span>Planes para Motos</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {planesActuales.map((plan) =>
              plan.destacado ? (
                /* Plan Destacado (Centro) */
                <div
                  key={plan.valor}
                  className="bg-[#0F172A] text-white rounded-3xl p-7 border-2 border-[#6DA6C9] shadow-xl relative flex flex-col justify-between md:-translate-y-2"
                >
                  <div className="absolute -top-3.5 right-6 bg-[#6DA6C9] text-[#0F172A] text-[11px] font-extrabold tracking-wider px-3.5 py-1 rounded-full uppercase">
                    {plan.tagDestacado}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6DA6C9]">
                      {plan.badge}
                    </span>
                    <h3 className="text-2xl font-serif-brand font-bold mt-1 mb-4">{plan.titulo}</h3>
                    <ul className="space-y-3 text-sm text-slate-300 mb-6">
                      {plan.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#6DA6C9] shrink-0 mt-0.5" />
                          <span>
                            {item.negrita ? (
                              <>
                                <strong className="text-white">{item.texto}</strong>
                                {item.sufijo || ''}
                              </>
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
                    onClick={() => handleSeleccionarPlan(ramo, plan.valor)}
                    className="w-full bg-[#6DA6C9] hover:bg-[#5B94B7] text-[#0F172A] text-center font-bold py-3.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
                  >
                    {plan.botonTexto}
                  </button>
                </div>
              ) : (
                /* Planes Laterales */
                <div
                  key={plan.valor}
                  className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        plan.badge.includes('Obligatorio') ? 'text-slate-400' : 'text-[#21699B]'
                      }`}
                    >
                      {plan.badge}
                    </span>
                    <h3 className="text-xl font-serif-brand font-bold text-slate-900 mt-1 mb-4">
                      {plan.titulo}
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600 mb-6">
                      {plan.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              plan.badge.includes('Obligatorio') ? 'text-slate-400' : 'text-[#21699B]'
                            }`}
                          />
                          <span>
                            {item.negrita ? (
                              <>
                                <strong>{item.texto}</strong>
                                {item.sufijo || ''}
                              </>
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
                    onClick={() => handleSeleccionarPlan(ramo, plan.valor)}
                    className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-[#21699B] text-slate-800 hover:text-[#21699B] font-semibold text-sm text-center transition cursor-pointer"
                  >
                    {plan.botonTexto}
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* DIFERENCIAL: PRODUCTOR VS BANCO + RECOTIZACIÓN */}
        <section id="diferencial" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
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
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Te%20mando%20foto%20de%20mi%20póliza%20actual%20para%20ver%20si%20podemos%20mejorar%20el%20precio%20o%20la%20cobertura.`}
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

        {/* KIT DE EMERGENCIA EN RUTA / SINIESTROS */}
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

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-8">
              <button
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
                {companias.map((c) => (
                  <div key={c.nombre} className="bg-[#F5F2EB] p-6 rounded-2xl border border-stone-200 flex flex-col justify-between items-center text-center gap-4">
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
      </main>

      {/* FOOTER LEGAL SSN */}
      <footer className="bg-[#0F172A] text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <BrandLogo darkBg={true} />
            <p className="mt-2 text-slate-400">
              Productor Asesor de Seguros — Atención personalizada.
            </p>
          </div>
          <div className="text-center sm:text-right space-y-1.5">
            <p className="text-slate-200 font-semibold text-sm">N° de Inscripción SSN: [Completar Matrícula]</p>
            <p>Superintendencia de Seguros de la Nación — Órgano de Control de la Actividad Aseguradora</p>
            <p className="text-slate-500">0800-666-8400 — www.argentina.gob.ar/ssn</p>
          </div>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20hacer%20una%20consulta%20sobre%20seguros.`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chatear por WhatsApp"
        className="fixed bottom-5 right-5 z-50 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>

    </div>
  );
}