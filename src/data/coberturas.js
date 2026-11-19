export const COBERTURAS_POR_RAMO = {
  auto: [
    {
      valor: 'Terceros Completo Full (Granizo + Cristales)',
      labelSelect: 'Terceros Completo Full (Granizo + Cristales)',
      badge: 'Recomendado',
      titulo: 'Terceros Completo Full',
      idealPara: 'Ideal para autos de uso diario',
      nivel: 2,
      destacado: true,
      ordenDesktop: 2,
      tagDestacado: 'El más elegido',
      botonTexto: 'Cotizar Terceros Full',
      items: [
        { texto: 'Robo, Hurto e Incendio Total y Parcial' },
        { texto: 'Destrucción Total por accidente (80%)' },
        { texto: 'Granizo, Cristales, Parabrisas y Ruedas', negrita: true }
      ]
    },
    {
      valor: 'Responsabilidad Civil',
      labelSelect: 'Responsabilidad Civil (Básico)',
      badge: 'Obligatorio',
      titulo: 'Responsabilidad Civil',
      idealPara: 'Ideal para circular al día',
      nivel: 1,
      destacado: false,
      ordenDesktop: 1,
      botonTexto: 'Cotizar Básico',
      items: [
        { texto: 'Daños a terceros y Mercosur' },
        { texto: 'Certificado digital en el día' },
        { texto: 'Auxilio mecánico y grúa' }
      ]
    },
    {
      valor: 'Todo Riesgo con Franquicia',
      labelSelect: 'Todo Riesgo con Franquicia',
      badge: 'Máxima cobertura',
      titulo: 'Todo Riesgo',
      idealPara: 'Ideal para 0km y modelos recientes',
      nivel: 3,
      destacado: false,
      ordenDesktop: 3,
      botonTexto: 'Cotizar Todo Riesgo',
      items: [
        { texto: 'Todo lo incluido en Terceros Full' },
        { texto: 'Daños parciales por choque propio', negrita: true },
        { texto: 'Franquicia fija o variable a elección' }
      ]
    }
  ],
  moto: [
    {
      valor: 'Robo + Incendio Total + Responsabilidad Civil',
      labelSelect: 'Robo e Incendio Total + RC',
      badge: 'Recomendado',
      titulo: 'Robo e Incendio Premium',
      idealPara: 'Ideal para uso urbano y calle',
      nivel: 2,
      destacado: true,
      ordenDesktop: 2,
      tagDestacado: 'El más elegido',
      botonTexto: 'Cotizar Robo Moto',
      items: [
        { texto: 'Robo y Hurto Total de la moto', negrita: true },
        { texto: 'Incendio Total y Destrucción Total' },
        { texto: 'Responsabilidad Civil + Grúa 24 hs' }
      ]
    },
    {
      valor: 'Responsabilidad Civil Moto',
      labelSelect: 'Responsabilidad Civil (Básico)',
      badge: 'Obligatorio',
      titulo: 'Responsabilidad Civil',
      idealPara: 'Ideal para circular al día',
      nivel: 1,
      destacado: false,
      ordenDesktop: 1,
      botonTexto: 'Cotizar Básico',
      items: [
        { texto: 'Daños a terceros y acompañante' },
        { texto: 'Certificado digital en el acto' },
        { texto: 'Cobertura nacional y Mercosur' }
      ]
    },
    {
      valor: 'Moto Full (Robo + Destrucción Total + Granizo)',
      labelSelect: 'Moto Full (Alta Gama)',
      badge: 'Máxima cobertura',
      titulo: 'Moto Full / Alta Gama',
      idealPara: 'Ideal para 0km y alta cilindrada',
      nivel: 3,
      destacado: false,
      ordenDesktop: 3,
      botonTexto: 'Cotizar Moto Full',
      items: [
        { texto: 'Todo el plan Robo e Incendio Premium' },
        { texto: 'Reposición de unidad 0km (1° año)', negrita: true },
        { texto: 'Adicional Granizo y Grúa ampliada' }
      ]
    }
  ]
};
