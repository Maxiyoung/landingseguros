import { LIMITES_FORMULARIO, WHATSAPP_NUMBER } from '../config.js';

/**
 * Limpia un texto ingresado por el usuario para evitar saltos de línea,
 * caracteres de control o símbolos de formato que alteren el mensaje de WhatsApp.
 */
export function sanitizarCampoTexto(valor, maxLength = 60) {
  if (typeof valor !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  const sinControl = valor.replace(/[\u0000-\u001F\u007F]/g, ' ');
  return sinControl
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function linkWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

/**
 * Abre una URL externa en una nueva pestaña protegiendo window.opener sin depender
 * del valor de retorno de window.open (que devuelve null cuando se usa noopener).
 */
export function abrirWhatsAppEnNuevaPestana(texto) {
  const url = linkWhatsApp(texto);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.target = '_blank';
  enlace.rel = 'noopener noreferrer';
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
}

export function armarMensajeCotizacion(ramo, formData) {
  const esMoto = ramo === 'moto';
  const iconoRamo = esMoto ? '🏍️' : '🚗';
  const nombreRamo = esMoto ? 'moto' : 'auto';
  const datosVehiculo = formData[ramo];

  const marcaFinal =
    datosVehiculo.marca === 'OTRA'
      ? sanitizarCampoTexto(datosVehiculo.otraMarca, LIMITES_FORMULARIO.marcaMaxLength)
      : sanitizarCampoTexto(datosVehiculo.marca, LIMITES_FORMULARIO.marcaMaxLength);

  const modeloFinal =
    datosVehiculo.marca === 'OTRA' || datosVehiculo.modelo === 'OTRO'
      ? sanitizarCampoTexto(datosVehiculo.otroModelo, LIMITES_FORMULARIO.modeloMaxLength)
      : sanitizarCampoTexto(datosVehiculo.modelo, LIMITES_FORMULARIO.modeloMaxLength);

  const vehiculoTexto = `${marcaFinal} ${modeloFinal}`.trim() || 'A confirmar';
  const anioFinal =
    formData.anio === 'OTRO'
      ? sanitizarCampoTexto(formData.otroAnio, 4)
      : sanitizarCampoTexto(formData.anio, 20);
  const localidadFinal =
    (formData.localidad === 'OTRA'
      ? sanitizarCampoTexto(formData.otraLocalidad, LIMITES_FORMULARIO.localidadMaxLength)
      : sanitizarCampoTexto(formData.localidad, LIMITES_FORMULARIO.localidadMaxLength)) ||
    'A confirmar';
  const coberturaRaw =
    typeof formData.cobertura === 'object'
      ? formData.cobertura[ramo]
      : formData.cobertura;
  const coberturaFinal = sanitizarCampoTexto(coberturaRaw, 80);

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
