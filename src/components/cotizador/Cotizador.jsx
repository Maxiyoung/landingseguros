import { useId, useMemo, useRef, useState } from 'react';
import { Car, Bike, MessageCircle, FileText, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import SelectorVehiculo from './SelectorVehiculo';
import SearchableSelect from '../ui/SearchableSelect';
import SegmentedControl from '../ui/SegmentedControl';
import ExternalLink from '../ui/ExternalLink';
import { getFieldInputClass } from '../ui/formStyles';
import { LIMITES_FORMULARIO, MENSAJES_WHATSAPP } from '../../config';
import {
  MARCAS_AUTOS_AR,
  MARCAS_MOTOS_AR,
  ANIO_ACTUAL,
  ANIO_MINIMO_LISTA,
  ANIOS_ANTERIORES,
  LOCALIDADES_CORDOBA
} from '../../data/vehiculos';
import { COBERTURAS_POR_RAMO } from '../../data/coberturas';
import {
  abrirWhatsAppEnNuevaPestana,
  armarMensajeCotizacion,
  linkWhatsApp
} from '../../utils/whatsapp';

const RAMO_OPTIONS = [
  { value: 'auto', label: 'Cotizar Auto', icon: Car },
  { value: 'moto', label: 'Cotizar Moto', icon: Bike }
];

const RAMO_SELECTOR_CONFIG = {
  auto: {
    catalogoMarcas: MARCAS_AUTOS_AR,
    labelMarca: 'Marca del auto',
    placeholderMarca: 'Seleccioná la marca...',
    placeholderOtraMarca: 'Escribí la marca (Ej: Mitsubishi, Subaru, Volvo...)',
    placeholderModeloDirecto: 'Escribí el modelo (Ej: Lancer, Forester, XC60...)'
  },
  moto: {
    catalogoMarcas: MARCAS_MOTOS_AR,
    labelMarca: 'Marca de la moto',
    placeholderMarca: 'Seleccioná la marca...',
    placeholderOtraMarca: 'Escribí la marca (Ej: Benelli, Royal Enfield, KTM...)',
    placeholderModeloDirecto: 'Escribí el modelo (Ej: TNT 15, Classic 350, Duke 200...)'
  }
};

const GNC_OPTIONS = [
  { value: 'si', label: 'Sí' },
  { value: 'no', label: 'No' }
];

const CILINDRADA_OPTIONS = [
  { value: 'Hasta 250cc', label: 'Hasta 250cc' },
  { value: 'Más de 250cc', label: 'Más de 250cc' }
];

const PROGRESO_WIDTH_CLASS = {
  1: 'w-1/3',
  2: 'w-2/3',
  3: 'w-full'
};

function esOtroAnioValido(valor) {
  const anioStr = (valor || '').trim();
  if (!anioStr) return false;
  const anioNum = Number(anioStr);
  return (
    Number.isInteger(anioNum) &&
    anioNum >= LIMITES_FORMULARIO.anioMinimo &&
    anioNum < ANIO_MINIMO_LISTA
  );
}

export default function Cotizador({
  ramo,
  onRamoChange,
  formData,
  setFormData,
  marcaSelectRef,
  highlighted = false
}) {
  const idPrefix = useId();
  const [errors, setErrors] = useState({});
  const anioSelectRef = useRef(null);
  const localidadSelectRef = useRef(null);
  const otraLocalidadInputRef = useRef(null);
  const otroAnioInputRef = useRef(null);

  const anioId = `${idPrefix}-anio`;
  const anioLabelId = `${idPrefix}-anio-label`;
  const localidadId = `${idPrefix}-localidad`;
  const localidadLabelId = `${idPrefix}-localidad-label`;
  const coberturaId = `${idPrefix}-cobertura`;
  const coberturaLabelId = `${idPrefix}-cobertura-label`;

  const aniosOptions = useMemo(
    () => [
      { value: `${ANIO_ACTUAL} / 0km`, label: `${ANIO_ACTUAL} (0km)` },
      ...ANIOS_ANTERIORES.map((a) => ({ value: a, label: a }))
    ],
    []
  );

  const coberturaOptions = useMemo(
    () => [
      ...COBERTURAS_POR_RAMO[ramo].map((plan) => ({
        value: plan.valor,
        label: plan.labelSelect
      })),
      { value: 'Quiero asesoramiento', label: 'No sé cuál elegir, asesórenme' }
    ],
    [ramo]
  );

  const coberturaActual =
    typeof formData.cobertura === 'object'
      ? formData.cobertura[ramo]
      : formData.cobertura;

  const datosRamo = formData[ramo];
  const anioSeleccionado = datosRamo.anio ?? '';
  const otroAnioValor = datosRamo.otroAnio ?? '';

  const marcaVal =
    datosRamo.marca === 'OTRA' ? datosRamo.otraMarca.trim() : datosRamo.marca;
  const modeloVal =
    datosRamo.marca === 'OTRA' || datosRamo.modelo === 'OTRO'
      ? datosRamo.otroModelo.trim()
      : datosRamo.modelo;
  const anioVal =
    anioSeleccionado === 'OTRO'
      ? esOtroAnioValido(otroAnioValor)
        ? otroAnioValor.trim()
        : ''
      : anioSeleccionado;
  const localidadVal =
    formData.localidad === 'OTRA'
      ? (formData.otraLocalidad || '').trim()
      : formData.localidad.trim();

  const pasoVehiculoListo = Boolean(marcaVal && modeloVal);
  const pasoAnioYZonaListo = Boolean(anioVal && localidadVal);
  const pasosCompletos = (pasoVehiculoListo ? 1 : 0) + (pasoAnioYZonaListo ? 1 : 0) + 1;
  const isFormReady = pasoVehiculoListo && pasoAnioYZonaListo;

  const clearError = (key) => {
    setErrors((prev) => (prev[key] ? { ...prev, [key]: false } : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!datosRamo.marca) nextErrors.marca = true;
    if (datosRamo.marca === 'OTRA' && !datosRamo.otraMarca.trim()) nextErrors.otraMarca = true;
    if (datosRamo.marca === 'OTRA' && !datosRamo.otroModelo.trim()) nextErrors.modelo = true;
    if (datosRamo.marca && datosRamo.marca !== 'OTRA' && !datosRamo.modelo) nextErrors.modelo = true;
    if (datosRamo.modelo === 'OTRO' && !datosRamo.otroModelo.trim()) nextErrors.otroModelo = true;
    if (!anioSeleccionado) nextErrors.anio = true;
    if (anioSeleccionado === 'OTRO' && !esOtroAnioValido(otroAnioValor)) {
      nextErrors.otroAnio = true;
    }
    if (!formData.localidad) nextErrors.localidad = true;
    if (formData.localidad === 'OTRA' && !(formData.otraLocalidad || '').trim()) {
      nextErrors.otraLocalidad = true;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.marca) {
        marcaSelectRef.current?.focus({ preventScroll: true });
      } else if (nextErrors.anio) {
        anioSelectRef.current?.focus({ preventScroll: true });
      } else if (nextErrors.otroAnio) {
        otroAnioInputRef.current?.focus({ preventScroll: true });
      } else if (nextErrors.localidad) {
        localidadSelectRef.current?.focus({ preventScroll: true });
      } else if (nextErrors.otraLocalidad) {
        otraLocalidadInputRef.current?.focus({ preventScroll: true });
      }
      return;
    }

    setErrors({});
    abrirWhatsAppEnNuevaPestana(armarMensajeCotizacion(ramo, formData));
  };

  const hasValidationErrors = Object.values(errors).some(Boolean);
  const mensajeError =
    errors.otroAnio &&
    !errors.marca &&
    !errors.otraMarca &&
    !errors.modelo &&
    !errors.otroModelo &&
    !errors.localidad &&
    !errors.otraLocalidad
      ? `Ingresá un año válido entre ${LIMITES_FORMULARIO.anioMinimo} y ${ANIO_MINIMO_LISTA - 1}.`
      : 'Completá los campos marcados para armar tu cotización exacta.';
  const selectorConfig = RAMO_SELECTOR_CONFIG[ramo];

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-2 rounded-[34px] bg-gradient-to-br from-[#6DA6C9]/22 via-transparent to-[#21699B]/18 blur-xl opacity-75 pointer-events-none"
      />

      <div
        className={`relative bg-white/95 backdrop-blur-md rounded-[28px] border transition-all duration-500 ${
          highlighted
            ? 'border-[#6DA6C9] ring-4 ring-[#6DA6C9]/30 shadow-[0_28px_70px_-14px_rgba(33,105,155,0.28)]'
            : 'border-stone-200/90 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.14),0_4px_16px_-4px_rgba(15,23,42,0.05)]'
        }`}
      >
        <div className="overflow-hidden rounded-t-[27px]">
          <div
            aria-hidden="true"
            className="h-1 w-full bg-gradient-to-r from-[#0F172A] via-[#21699B] to-[#6DA6C9]"
          />
        </div>

        <div className="p-5 sm:p-7">
          <SegmentedControl
            options={RAMO_OPTIONS}
            value={ramo}
            onChange={(nuevoRamo) => {
              setErrors({});
              onRamoChange(nuevoRamo);
            }}
            variant="card"
            mode="radiogroup"
            ariaLabel="Seleccionar tipo de vehículo"
            className="grid w-full mb-4"
          />

          {/* Barra de progreso compacta */}
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <div className="flex items-center gap-2 text-slate-600">
                <span className={pasoVehiculoListo ? 'text-[#0F172A]' : ''}>1. Vehículo</span>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span className={pasoAnioYZonaListo ? 'text-[#0F172A]' : ''}>2. Año y zona</span>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span className="text-[#0F172A]">3. Plan</span>
              </div>
              <span
                className={`inline-flex items-center gap-1 transition-colors ${
                  isFormReady ? 'text-emerald-700 font-bold' : 'text-slate-600'
                }`}
              >
                {isFormReady ? (
                  <>
                    <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Listo</span>
                  </>
                ) : (
                  <span>{pasosCompletos}/3</span>
                )}
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-stone-200/80 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  PROGRESO_WIDTH_CLASS[pasosCompletos] || 'w-1/3'
                } ${
                  isFormReady
                    ? 'bg-gradient-to-r from-[#21699B] to-emerald-500'
                    : 'bg-gradient-to-r from-[#21699B] to-[#6DA6C9]'
                }`}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            <div key={ramo} className="relative z-30 space-y-3.5 animate-panel-in">
              <SelectorVehiculo
                catalogoMarcas={selectorConfig.catalogoMarcas}
                datos={datosRamo}
                errors={errors}
                onChange={(nuevoVehiculo) => {
                  setFormData({ ...formData, [ramo]: nuevoVehiculo });
                  setErrors((prev) => ({
                    ...prev,
                    marca: false,
                    otraMarca: false,
                    modelo: false,
                    otroModelo: false
                  }));
                }}
                marcaSelectRef={marcaSelectRef}
                labelMarca={selectorConfig.labelMarca}
                placeholderMarca={selectorConfig.placeholderMarca}
                placeholderOtraMarca={selectorConfig.placeholderOtraMarca}
                placeholderModeloDirecto={selectorConfig.placeholderModeloDirecto}
              />
            </div>

            {/* Fila compacta: Año (5 col) + Localidad (7 col) */}
            <div className="relative z-20 grid grid-cols-12 gap-2.5 sm:gap-3">
              <div className="col-span-5">
                <label
                  id={anioLabelId}
                  htmlFor={anioId}
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 ml-1"
                >
                  Año
                </label>
                <SearchableSelect
                  id={anioId}
                  labelId={anioLabelId}
                  triggerRef={anioSelectRef}
                  compact
                  ariaLabel="Año del vehículo"
                  value={anioSeleccionado}
                  options={aniosOptions}
                  extraOption={{ value: 'OTRO', label: `Ant. a ${ANIO_MINIMO_LISTA}` }}
                  placeholder="Año..."
                  searchPlaceholder="Buscar año..."
                  invalid={Boolean(errors.anio)}
                  onChange={(val) => {
                    clearError('anio');
                    clearError('otroAnio');
                    setFormData({
                      ...formData,
                      [ramo]: {
                        ...datosRamo,
                        anio: val,
                        otroAnio: val === 'OTRO' ? otroAnioValor : ''
                      }
                    });
                    if (val === 'OTRO') {
                      setTimeout(() => otroAnioInputRef.current?.focus(), 60);
                    }
                  }}
                />
              </div>

              <div className="col-span-7">
                <label
                  id={localidadLabelId}
                  htmlFor={localidadId}
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 ml-1"
                >
                  Localidad
                </label>
                <SearchableSelect
                  id={localidadId}
                  labelId={localidadLabelId}
                  triggerRef={localidadSelectRef}
                  compact
                  align="right"
                  ariaLabel="Localidad"
                  value={formData.localidad}
                  options={LOCALIDADES_CORDOBA}
                  extraOption={{ value: 'OTRA', label: 'Otra localidad...' }}
                  placeholder="Elegí localidad..."
                  searchPlaceholder="Buscar localidad..."
                  invalid={Boolean(errors.localidad)}
                  onChange={(val) => {
                    clearError('localidad');
                    clearError('otraLocalidad');
                    setFormData({
                      ...formData,
                      localidad: val,
                      otraLocalidad: val === 'OTRA' ? formData.otraLocalidad : ''
                    });
                    if (val === 'OTRA') {
                      setTimeout(() => otraLocalidadInputRef.current?.focus(), 60);
                    }
                  }}
                />
              </div>
            </div>

            {anioSeleccionado === 'OTRO' && (
              <div className="animate-field-in">
                <input
                  ref={otroAnioInputRef}
                  type="number"
                  min={LIMITES_FORMULARIO.anioMinimo}
                  max={ANIO_MINIMO_LISTA - 1}
                  aria-label={`Escribir año anterior a ${ANIO_MINIMO_LISTA}`}
                  aria-invalid={Boolean(errors.otroAnio) || undefined}
                  placeholder="Escribí el año del vehículo (Ej: 1992)"
                  value={otroAnioValor}
                  onChange={(e) => {
                    clearError('otroAnio');
                    setFormData({
                      ...formData,
                      [ramo]: {
                        ...datosRamo,
                        otroAnio: e.target.value.slice(0, 4)
                      }
                    });
                  }}
                  className={getFieldInputClass({
                    invalid: Boolean(errors.otroAnio),
                    accentFocus: true
                  })}
                />
              </div>
            )}

            {formData.localidad === 'OTRA' && (
              <div className="animate-field-in">
                <input
                  ref={otraLocalidadInputRef}
                  type="text"
                  maxLength={LIMITES_FORMULARIO.localidadMaxLength}
                  aria-label="Escribir otra localidad"
                  aria-invalid={Boolean(errors.otraLocalidad) || undefined}
                  placeholder="Escribí tu ciudad o localidad (Ej: Oncativo, Laboulaye...)"
                  value={formData.otraLocalidad || ''}
                  onChange={(e) => {
                    clearError('otraLocalidad');
                    setFormData({ ...formData, otraLocalidad: e.target.value });
                  }}
                  className={getFieldInputClass({
                    invalid: Boolean(errors.otraLocalidad),
                    accentFocus: true
                  })}
                />
              </div>
            )}

            {ramo === 'auto' ? (
              <div className="flex flex-wrap items-center justify-between gap-2 py-1 px-1">
                <span id={`${idPrefix}-gnc-label`} className="text-sm font-semibold text-slate-800">
                  ¿Tiene GNC?
                </span>
                <SegmentedControl
                  options={GNC_OPTIONS}
                  value={formData.gnc ? 'si' : 'no'}
                  onChange={(val) => setFormData({ ...formData, gnc: val === 'si' })}
                  variant="mini"
                  mode="radiogroup"
                  ariaLabelledBy={`${idPrefix}-gnc-label`}
                  buttonClassName="px-5"
                />
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-2 py-1 px-1">
                <span
                  id={`${idPrefix}-cil-label`}
                  className="text-sm font-semibold text-slate-800 shrink-0"
                >
                  Cilindrada
                </span>
                <SegmentedControl
                  options={CILINDRADA_OPTIONS}
                  value={formData.cilindrada}
                  onChange={(val) => setFormData({ ...formData, cilindrada: val })}
                  variant="mini"
                  mode="radiogroup"
                  ariaLabelledBy={`${idPrefix}-cil-label`}
                  buttonClassName="px-2.5 sm:px-3.5 text-[11px] sm:text-xs"
                />
              </div>
            )}

            <div className="relative z-10">
              <label
                id={coberturaLabelId}
                htmlFor={coberturaId}
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 ml-1"
              >
                Cobertura
              </label>
              <SearchableSelect
                id={coberturaId}
                labelId={coberturaLabelId}
                ariaLabel="Cobertura"
                searchable={false}
                value={coberturaActual}
                options={coberturaOptions}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    cobertura:
                      typeof formData.cobertura === 'object'
                        ? { ...formData.cobertura, [ramo]: val }
                        : val
                  })
                }
              />
            </div>

            {hasValidationErrors && (
              <div
                role="alert"
                className="animate-field-in flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium"
              >
                <AlertCircle aria-hidden="true" className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{mensajeError}</span>
              </div>
            )}

            {marcaVal && (modeloVal || anioVal) && (
              <div
                className={`animate-field-in flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs transition-colors ${
                  isFormReady
                    ? 'bg-emerald-50/70 border-emerald-200/80 text-slate-800'
                    : 'bg-[#F5F2EB]/85 border-stone-200/80 text-slate-700'
                }`}
              >
                <span className="truncate">
                  <span className="text-slate-600">
                    {isFormReady ? 'Listo para cotizar: ' : 'Tu consulta: '}
                  </span>
                  <strong className="text-[#0F172A]">
                    {[marcaVal, modeloVal, anioVal, localidadVal].filter(Boolean).join(' · ')}
                  </strong>
                </span>
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isFormReady ? 'bg-emerald-500' : 'bg-[#6DA6C9]'
                  }`}
                  aria-hidden="true"
                />
              </div>
            )}

            <button
              type="submit"
              className={`btn-shimmer w-full bg-gradient-to-r from-[#21699B] via-[#1B5B87] to-[#21699B] hover:from-[#1A5883] hover:to-[#164A6F] text-white font-semibold py-4 px-6 rounded-full active:scale-[0.985] transition-all duration-300 flex items-center justify-center gap-2.5 text-base cursor-pointer mt-1 ${
                isFormReady
                  ? 'shadow-[0_14px_32px_-6px_rgba(33,105,155,0.65)] ring-2 ring-[#6DA6C9]/40'
                  : 'shadow-[0_12px_28px_-8px_rgba(33,105,155,0.5)] hover:shadow-[0_16px_32px_-6px_rgba(33,105,155,0.65)]'
              }`}
            >
              <MessageCircle aria-hidden="true" className="w-5 h-5" />
              <span>
                {ramo === 'auto' ? 'Cotizar Auto por WhatsApp' : 'Cotizar Moto por WhatsApp'}
              </span>
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 text-center">
              <Lock aria-hidden="true" className="w-3 h-3 text-[#21699B] shrink-0" />
              <span>Sin compromiso ni spam · Atención directa con tu productor</span>
            </p>

            <div className="pt-0.5 text-center lg:hidden">
              <ExternalLink
                href={linkWhatsApp(MENSAJES_WHATSAPP.revisarPoliza)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#21699B] hover:underline"
              >
                <FileText aria-hidden="true" className="w-3.5 h-3.5" />
                <span>¿Ya tenés seguro? Mandá foto de tu póliza y mejoramos el costo</span>
              </ExternalLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
