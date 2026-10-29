import { Car, Bike, MessageCircle } from 'lucide-react';
import SelectorVehiculo from './SelectorVehiculo';
import {
  MARCAS_AUTOS_AR,
  MARCAS_MOTOS_AR,
  ANIO_ACTUAL,
  ANIO_MINIMO_LISTA,
  ANIOS_ANTERIORES
} from '../../data/vehiculos';
import { COBERTURAS_POR_RAMO } from '../../data/coberturas';
import { PRODUCTOR } from '../../config';
import { armarMensajeCotizacion, linkWhatsApp } from '../../utils/whatsapp';

export default function Cotizador({
  ramo,
  onRamoChange,
  formData,
  setFormData,
  marcaSelectRef
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje = armarMensajeCotizacion(ramo, formData);
    window.open(linkWhatsApp(mensaje), '_blank');
  };

  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.10)] border border-stone-200/80 relative">
      {/* PESTAÑAS DE RAMO: AUTOMOTORES / MOTOS */}
      <div
        className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#F5F2EB] rounded-2xl border border-stone-200/90 mb-6"
        role="tablist"
        aria-label="Seleccionar tipo de vehículo"
      >
        <button
          type="button"
          role="tab"
          aria-selected={ramo === 'auto'}
          onClick={() => onRamoChange('auto')}
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
          onClick={() => onRamoChange('moto')}
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

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {ramo === 'auto' ? (
          <SelectorVehiculo
            catalogoMarcas={MARCAS_AUTOS_AR}
            datos={formData.auto}
            onChange={(nuevoAuto) => setFormData({ ...formData, auto: nuevoAuto })}
            marcaSelectRef={marcaSelectRef}
            labelMarca="Marca del vehículo"
            placeholderMarca="Seleccioná la marca del auto..."
            placeholderOtraMarca="Escribí la marca (Ej: Mitsubishi, Subaru, Volvo...)"
            placeholderModeloDirecto="Escribí el modelo (Ej: Lancer, Forester, XC60...)"
          />
        ) : (
          <SelectorVehiculo
            catalogoMarcas={MARCAS_MOTOS_AR}
            datos={formData.moto}
            onChange={(nuevaMoto) => setFormData({ ...formData, moto: nuevaMoto })}
            marcaSelectRef={marcaSelectRef}
            labelMarca="Marca de la moto"
            placeholderMarca="Seleccioná la marca de la moto..."
            placeholderOtraMarca="Escribí la marca (Ej: KTM, Suzuki, Beta, TVS...)"
            placeholderModeloDirecto="Escribí el modelo (Ej: Duke 200, AX 100, RTR 200...)"
          />
        )}

        {/* Fila compacta en 2 columnas: Año + Localidad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
              Año
            </label>
            <select
              required
              aria-label="Año del vehículo"
              value={formData.anio}
              onChange={(e) => setFormData({ ...formData, anio: e.target.value })}
              className={`w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm ${
                formData.anio ? 'text-slate-900 font-medium' : 'text-slate-500'
              }`}
            >
              <option value="" disabled>
                Elegí el año...
              </option>
              <option value={`${ANIO_ACTUAL} / 0km`} className="text-slate-900 font-semibold">
                {ANIO_ACTUAL} (0km)
              </option>
              {ANIOS_ANTERIORES.map((a) => (
                <option key={a} value={a} className="text-slate-900 font-normal">
                  {a}
                </option>
              ))}
              <option value="OTRO" className="text-[#21699B] font-bold">
                ➕ Anterior a {ANIO_MINIMO_LISTA}...
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
              Tu localidad
            </label>
            <input
              type="text"
              required
              aria-label="Localidad"
              placeholder="Ej: Córdoba Capital"
              value={formData.localidad}
              onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-500"
            />
          </div>
        </div>

        {formData.anio === 'OTRO' && (
          <div>
            <input
              type="number"
              required
              min="1960"
              max={ANIO_MINIMO_LISTA - 1}
              aria-label={`Escribir año anterior a ${ANIO_MINIMO_LISTA}`}
              placeholder="Escribí el año del vehículo (Ej: 1992)"
              value={formData.otroAnio}
              onChange={(e) => setFormData({ ...formData, otroAnio: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#21699B] bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>
        )}

        {/* Condicional según pestaña: ¿Tiene GNC? para Auto / Cilindrada para Moto */}
        {ramo === 'auto' ? (
          <div className="flex items-center justify-between py-1 px-1">
            <span className="text-sm font-semibold text-slate-800">¿Tiene equipo de GNC?</span>
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
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
            Cobertura preferida
          </label>
          <select
            aria-label="Cobertura"
            value={formData.cobertura}
            onChange={(e) => setFormData({ ...formData, cobertura: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-800 font-medium"
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

        <p className="text-[11px] text-center text-slate-400 pt-0.5">
          Sin compromiso · Respuesta directa de {PRODUCTOR.nombreCorto} (MP {PRODUCTOR.matricula})
        </p>
      </form>
    </div>
  );
}
