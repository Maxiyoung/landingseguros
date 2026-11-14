import { WHATSAPP_NUMBER } from '../config';

export function linkWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

export function armarMensajeCotizacion(ramo, formData) {
  const esMoto = ramo === 'moto';
  const iconoRamo = esMoto ? '🏍️' : '🚗';
  const nombreRamo = esMoto ? 'moto' : 'auto';
  const datosVehiculo = formData[ramo];

  const marcaFinal =
    datosVehiculo.marca === 'OTRA' ? datosVehiculo.otraMarca.trim() : datosVehiculo.marca;
  const modeloFinal =
    datosVehiculo.marca === 'OTRA' || datosVehiculo.modelo === 'OTRO'
      ? datosVehiculo.otroModelo.trim()
      : datosVehiculo.modelo;

  const vehiculoTexto = `${marcaFinal} ${modeloFinal}`.trim() || 'A confirmar';
  const anioFinal =
    formData.anio === 'OTRO' ? formData.otroAnio.trim() : formData.anio;
  const localidadFinal =
    (formData.localidad === 'OTRA'
      ? formData.otraLocalidad?.trim()
      : formData.localidad?.trim()) || 'A confirmar';
  const coberturaFinal =
    typeof formData.cobertura === 'object'
      ? formData.cobertura[ramo]
      : formData.cobertura;

  const detalleExtra = esMoto
    ? `⚙️ *Cilindrada:* ${formData.cilindrada}\n`
    : `⛽ *¿Tiene GNC?:* ${formData.gnc ? 'Sí (con GNC)' : 'No'}\n`;

  return (
    `¡Hola! Estuve viendo la web de *SOMOSMAS Seguros* y quiero cotizar mi ${nombreRamo}:\n\n` +
    `${iconoRamo} *${esMoto ? 'Moto' : 'Vehículo'}:* ${vehiculoTexto}\n` +
    `📅 *Año:* ${anioFinal || 'A confirmar'}\n` +
    detalleExtra +
    `📍 *Localidad:* ${localidadFinal}\n` +
    `🛡️ *Cobertura:* ${coberturaFinal}\n\n` +
    `¿Me podrás pasar opciones? ¡Gracias!`
  );
}
