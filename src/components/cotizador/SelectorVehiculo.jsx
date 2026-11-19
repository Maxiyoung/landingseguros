import { useId, useMemo, useRef } from 'react';
import { LIMITES_FORMULARIO } from '../../config';
import SearchableSelect from '../ui/SearchableSelect';
import { getFieldInputClass } from '../ui/formStyles';

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
  const marcaLabelId = `${idPrefix}-marca-label`;
  const otraMarcaId = `${idPrefix}-otra-marca`;
  const modeloId = `${idPrefix}-modelo`;
  const modeloLabelId = `${idPrefix}-modelo-label`;
  const otroModeloId = `${idPrefix}-otro-modelo`;

  return (
    <>
      <div>
        <label
          id={marcaLabelId}
          htmlFor={marcaId}
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 ml-1"
        >
          {labelMarca}
        </label>
        <SearchableSelect
          id={marcaId}
          labelId={marcaLabelId}
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
            maxLength={LIMITES_FORMULARIO.marcaMaxLength}
            aria-label="Escribir otra marca"
            aria-invalid={Boolean(errors.otraMarca) || undefined}
            placeholder={placeholderOtraMarca}
            value={datos.otraMarca}
            onChange={(e) => onChange({ ...datos, otraMarca: e.target.value })}
            className={getFieldInputClass({
              invalid: Boolean(errors.otraMarca),
              accentFocus: true
            })}
          />
        </div>
      )}

      <div>
        <label
          id={modeloLabelId}
          htmlFor={datos.marca === 'OTRA' ? otroModeloId : modeloId}
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 ml-1"
        >
          Modelo
        </label>
        {datos.marca === 'OTRA' ? (
          <input
            id={otroModeloId}
            type="text"
            maxLength={LIMITES_FORMULARIO.modeloMaxLength}
            aria-label="Escribir modelo"
            aria-invalid={Boolean(errors.modelo) || undefined}
            placeholder={placeholderModeloDirecto}
            value={datos.otroModelo}
            onChange={(e) => onChange({ ...datos, otroModelo: e.target.value })}
            className={`${getFieldInputClass({ invalid: Boolean(errors.modelo) })} animate-field-in`}
          />
        ) : (
          <div className="space-y-2.5">
            <SearchableSelect
              id={modeloId}
              labelId={modeloLabelId}
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
                maxLength={LIMITES_FORMULARIO.modeloMaxLength}
                aria-label="Escribir otro modelo"
                aria-invalid={Boolean(errors.otroModelo) || undefined}
                placeholder={`Escribí qué modelo de ${datos.marca} tenés...`}
                value={datos.otroModelo}
                onChange={(e) => onChange({ ...datos, otroModelo: e.target.value })}
                className={`${getFieldInputClass({
                  invalid: Boolean(errors.otroModelo),
                  accentFocus: true
                })} animate-field-in`}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
