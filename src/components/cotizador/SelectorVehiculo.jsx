import { useRef } from 'react';

export default function SelectorVehiculo({
  catalogoMarcas,
  datos,
  onChange,
  marcaSelectRef,
  labelMarca,
  placeholderMarca,
  placeholderOtraMarca,
  placeholderModeloDirecto
}) {
  const otraMarcaInputRef = useRef(null);
  const otroModeloInputRef = useRef(null);

  const modelosDeMarca =
    catalogoMarcas.find((m) => m.nombre === datos.marca)?.modelos || [];

  return (
    <>
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
          {labelMarca}
        </label>
        <select
          ref={marcaSelectRef}
          required
          aria-label={labelMarca}
          value={datos.marca}
          onChange={(e) => {
            const val = e.target.value;
            onChange({
              ...datos,
              marca: val,
              modelo: '',
              otroModelo: ''
            });
            if (val === 'OTRA') {
              setTimeout(() => otraMarcaInputRef.current?.focus(), 50);
            }
          }}
          className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm ${
            datos.marca ? 'text-slate-900 font-medium' : 'text-slate-500'
          }`}
        >
          <option value="" disabled>
            {placeholderMarca}
          </option>
          {catalogoMarcas.map((m) => (
            <option key={m.nombre} value={m.nombre} className="text-slate-900 font-normal">
              {m.nombre}
            </option>
          ))}
          <option value="OTRA" className="text-[#21699B] font-bold">
            ➕ Otra marca (escribir manualmente)...
          </option>
        </select>
      </div>

      {datos.marca === 'OTRA' && (
        <div>
          <input
            ref={otraMarcaInputRef}
            type="text"
            required
            aria-label="Escribir otra marca"
            placeholder={placeholderOtraMarca}
            value={datos.otraMarca}
            onChange={(e) => onChange({ ...datos, otraMarca: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#21699B] bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>
      )}

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
          Modelo
        </label>
        {datos.marca === 'OTRA' ? (
          <input
            type="text"
            required
            aria-label="Escribir modelo"
            placeholder={placeholderModeloDirecto}
            value={datos.otroModelo}
            onChange={(e) => onChange({ ...datos, otroModelo: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-500"
          />
        ) : (
          <div className="space-y-2.5">
            <select
              required
              disabled={!datos.marca}
              aria-label="Modelo"
              value={datos.modelo}
              onChange={(e) => {
                const val = e.target.value;
                onChange({ ...datos, modelo: val });
                if (val === 'OTRO') {
                  setTimeout(() => otroModeloInputRef.current?.focus(), 50);
                }
              }}
              className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed ${
                datos.modelo ? 'text-slate-900 font-medium' : 'text-slate-500'
              }`}
            >
              <option value="" disabled>
                {datos.marca
                  ? `Seleccioná el modelo de ${datos.marca}...`
                  : 'Primero seleccioná la marca...'}
              </option>
              {modelosDeMarca.map((modelo) => (
                <option key={modelo} value={modelo} className="text-slate-900 font-normal">
                  {modelo}
                </option>
              ))}
              {datos.marca && (
                <option value="OTRO" className="text-[#21699B] font-bold">
                  ➕ Otro modelo (escribir manualmente)...
                </option>
              )}
            </select>

            {datos.modelo === 'OTRO' && (
              <input
                ref={otroModeloInputRef}
                type="text"
                required
                aria-label="Escribir otro modelo"
                placeholder={`Escribí qué modelo de ${datos.marca} tenés...`}
                value={datos.otroModelo}
                onChange={(e) => onChange({ ...datos, otroModelo: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#21699B] bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
