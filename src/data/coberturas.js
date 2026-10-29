export const COBERTURAS_POR_RAMO = {
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
