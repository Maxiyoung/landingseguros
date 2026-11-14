import { useId, useMemo, useRef } from 'react';
import SearchableSelect from '../ui/SearchableSelect';

export default function SelectorVehiculo({
  catalogoMarcas,
  datos,
  onChange,
  marcaSelectRef,
  labelMarca,
  placeholderMarca,
  placeholderOtraMarca,
  placeholderModeloDirecto,
  errors = {}
}) {
  const idPrefix = useId();
  const otraMarcaInputRef = useRef(null);
  const otroModeloInputRef = useRef(null);

  const marcasOptions = useMemo(
    () => catalogoMarcas.map((m) => m.nombre),
    [catalogoMarcas]
  );

  const modelosDeMarca = useMemo(
    () => catalogoMarcas.find((m) => m.nombre === datos.marca)?.modelos || [],
    [catalogoMarcas, datos.marca]
  );

  const marcaId = `${idPrefix}-marca`;
  const otraMarcaId = `${idPrefix}-otra-marca`;
  const modeloId = `${idPrefix}-modelo`;
  const otroModeloId = `${idPrefix}-otro-modelo`;

  return (
    <>
      <div>
        <label
          htmlFor={marcaId}
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 ml-1"
        >
          {labelMarca}
        </label>
        <SearchableSelect
          id={marcaId}
          triggerRef={marcaSelectRef}
          ariaLabel={labelMarca}
          value={datos.marca}
          options={marcasOptions}
          extraOption={{ value: 'OTRA', label: 'Otra marca (escribir manualmente)...' }}
          placeholder={placeholderMarca}
          searchPlaceholder="Buscar marca..."
          invalid={Boolean(errors.marca)}
          onChange={(val) => {
            onChange({
              ...datos,
              marca: val,
              otraMarca: val === 'OTRA' ? datos.otraMarca : '',
              modelo: '',
              otroModelo: ''
            });
            if (val === 'OTRA') {
              setTimeout(() => otraMarcaInputRef.current?.focus(), 60);
            }
          }}
        />
      </div>

      {datos.marca === 'OTRA' && (
        <div className="animate-field-in">
          <input
            id={otraMarcaId}
            ref={otraMarcaInputRef}
            type="text"
            aria-label="Escribir otra marca"
            placeholder={placeholderOtraMarca}
            value={datos.otraMarca}
            onChange={(e) => onChange({ ...datos, otraMarca: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition-all text-base sm:text-sm text-slate-900 placeholder:text-slate-400 ${
              errors.otraMarca ? 'border-rose-400 ring-3 ring-rose-400/15' : 'border-[#21699B]'
            }`}
          />
        </div>
      )}

      <div>
        <label
          htmlFor={datos.marca === 'OTRA' ? otroModeloId : modeloId}
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 ml-1"
        >
          Modelo
        </label>
        {datos.marca === 'OTRA' ? (
          <input
            id={otroModeloId}
            type="text"
            aria-label="Escribir modelo"
            placeholder={placeholderModeloDirecto}
            value={datos.otroModelo}
            onChange={(e) => onChange({ ...datos, otroModelo: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border bg-[#FAF9F6] hover:bg-white focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition-all text-base sm:text-sm text-slate-900 placeholder:text-slate-500 animate-field-in ${
              errors.modelo ? 'border-rose-400 ring-3 ring-rose-400/15' : 'border-slate-300/90'
            }`}
          />
        ) : (
          <div className="space-y-2.5">
            <SearchableSelect
              id={modeloId}
              disabled={!datos.marca}
              ariaLabel="Modelo"
              value={datos.modelo}
              options={modelosDeMarca}
              extraOption={
                datos.marca
                  ? { value: 'OTRO', label: 'Otro modelo (escribir manualmente)...' }
                  : null
              }
              placeholder={
                datos.marca
                  ? `Seleccioná el modelo de ${datos.marca}...`
                  : 'Primero seleccioná la marca...'
              }
              searchPlaceholder="Buscar modelo..."
              invalid={Boolean(errors.modelo)}
              onChange={(val) => {
                onChange({
                  ...datos,
                  modelo: val,
                  otroModelo: val === 'OTRO' ? datos.otroModelo : ''
                });
                if (val === 'OTRO') {
                  setTimeout(() => otroModeloInputRef.current?.focus(), 60);
                }
              }}
            />

            {datos.modelo === 'OTRO' && (
              <input
                id={otroModeloId}
                ref={otroModeloInputRef}
                type="text"
                aria-label="Escribir otro modelo"
                placeholder={`Escribí qué modelo de ${datos.marca} tenés...`}
                value={datos.otroModelo}
                onChange={(e) => onChange({ ...datos, otroModelo: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition-all text-base sm:text-sm text-slate-900 placeholder:text-slate-400 animate-field-in ${
                  errors.otroModelo ? 'border-rose-400 ring-3 ring-rose-400/15' : 'border-[#21699B]'
                }`}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
