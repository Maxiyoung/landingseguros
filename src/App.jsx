import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, PhoneCall, MessageCircle, Car, Bike, Wrench, 
  CheckCircle2, AlertTriangle, FileText, 
  Sparkles, UserCheck, Clock, ChevronRight, ChevronDown,
  Home, Store, HeartHandshake, Camera, BadgePercent
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

const MARCAS_AUTOS_AR = [
  {
    nombre: 'Volkswagen',
    modelos: [
      'Amarok',
      'Bora',
      'Fox / CrossFox',
      'Gol Power / Gol',
      'Gol Trend',
      'Golf',
      'Nivus',
      'Passat',
      'Polo / Polo Track',
      'Saveiro',
      'Scirocco',
      'Sharan',
      'Suran / Suran Cross',
      'T-Cross',
      'Taos',
      'The Beetle',
      'Tiguan Allspace',
      'Up!',
      'Vento',
      'Virtus',
      'Voyage'
    ]
  },
  {
    nombre: 'Toyota',
    modelos: [
      '86 / GR Yaris',
      'Camry',
      'Corolla',
      'Corolla Cross',
      'Etios (Hatch / Sedán)',
      'Hiace',
      'Hilux',
      'Innova',
      'Prius',
      'RAV4',
      'SW4',
      'Yaris (Hatch / Sedán)'
    ]
  },
  {
    nombre: 'Fiat',
    modelos: [
      '500 / Cinquecento',
      'Argo',
      'Bravo',
      'Cronos',
      'Cubo / Qubo',
      'Doblò',
      'Ducato',
      'Fastback',
      'Fiorino',
      'Idea',
      'Linea',
      'Mobi',
      'Palio / Nuevo Palio',
      'Palio Weekend / Adventure',
      'Pulse',
      'Punto',
      'Siena / Grand Siena',
      'Strada',
      'Toro',
      'Uno (Way / Novo / Fire)'
    ]
  },
  {
    nombre: 'Ford',
    modelos: [
      'Bronco Sport',
      'EcoSport',
      'Escort',
      'F-150 / F-100',
      'Fiesta Kinetic',
      'Fiesta Max / One',
      'Focus (II / III)',
      'Ka / Nuevo Ka / Ka+',
      'Kuga',
      'Maverick',
      'Mondeo',
      'Ranger',
      'S-Max',
      'Territory',
      'Transit'
    ]
  },
  {
    nombre: 'Renault',
    modelos: [
      'Alaskan',
      'Captur',
      'Clio / Clio Mio',
      'Duster',
      'Fluence',
      'Kangoo / Kangoo Stepway',
      'Kardian',
      'Koleos',
      'Kwid',
      'Logan',
      'Master',
      'Mégane (II / III)',
      'Oroch / Duster Oroch',
      'Sandero',
      'Scénic',
      'Stepway',
      'Symbol',
      'Twingo'
    ]
  },
  {
    nombre: 'Chevrolet',
    modelos: [
      'Agile',
      'Astra',
      'Aveo',
      'Captiva',
      'Celta / Fun',
      'Classic / Corsa',
      'Cobalt',
      'Cruze (5p / Sedán)',
      'Equinox',
      'Meriva',
      'Montana',
      'Onix / Onix Joy',
      'Onix Plus / Prisma',
      'S10',
      'Sonic',
      'Spin / Spin Activ',
      'Tracker',
      'Trailblazer',
      'Vectra',
      'Zafira'
    ]
  },
  {
    nombre: 'Peugeot',
    modelos: [
      '206',
      '207 Compact',
      '208',
      '2008',
      '301',
      '307',
      '308',
      '3008',
      '408',
      '5008',
      'Boxer',
      'Expert',
      'Hoggar',
      'Partner (Furgón / Patagónica)'
    ]
  },
  {
    nombre: 'Citroën',
    modelos: [
      'Basalt',
      'Berlingo (Furgón / Multispace)',
      'C-Elysée',
      'C3 / Nuevo C3',
      'C3 Aircross / Picasso',
      'C4 Cactus',
      'C4 Lounge / C4',
      'C4 Picasso / Grand C4',
      'DS3 / DS4',
      'Jumper',
      'Jumpy',
      'Xsara Picasso'
    ]
  },
  {
    nombre: 'Jeep',
    modelos: [
      'Cherokee',
      'Commander',
      'Compass',
      'Grand Cherokee',
      'Patriot',
      'Renegade',
      'Wrangler'
    ]
  },
  {
    nombre: 'Nissan',
    modelos: [
      'Frontier',
      'Kicks',
      'March',
      'Murano',
      'Note',
      'NP300',
      'Sentra',
      'Tiida',
      'Versa / V-Drive',
      'X-Trail'
    ]
  },
  {
    nombre: 'Honda',
    modelos: [
      'Accord',
      'City',
      'Civic',
      'CR-V',
      'Fit',
      'HR-V',
      'Pilot',
      'WR-V',
      'ZR-V'
    ]
  },
  {
    nombre: 'Hyundai',
    modelos: [
      'Creta',
      'H1',
      'i10 / Grand i10',
      'i30',
      'Kona',
      'Santa Fe',
      'Tucson',
      'Veloster'
    ]
  },
  {
    nombre: 'Kia',
    modelos: [
      'Carnival',
      'Cerato',
      'K2500',
      'Picanto',
      'Rio',
      'Seltos',
      'Sorento',
      'Soul',
      'Sportage'
    ]
  },
  {
    nombre: 'Chery',
    modelos: [
      'Arrizo 5',
      'Face',
      'Fulwin',
      'QQ',
      'Tiggo 2 / Tiggo 2 Pro',
      'Tiggo 3',
      'Tiggo 4 / Tiggo 4 Pro',
      'Tiggo 5',
      'Tiggo 7 / Tiggo 8'
    ]
  },
  {
    nombre: 'RAM / Dodge',
    modelos: [
      'Dodge Journey',
      'RAM 1500 (Laramie / Rebel)',
      'RAM 2500',
      'Rampage'
    ]
  },
  {
    nombre: 'Suzuki',
    modelos: [
      'Baleno',
      'Fun',
      'Grand Vitara / Vitara',
      'Jimny',
      'Swift'
    ]
  },
  {
    nombre: 'Mercedes-Benz',
    modelos: [
      'Clase A (A200 / A250)',
      'Clase B',
      'Clase C (C200 / C250 / C300)',
      'Clase E',
      'GLA',
      'GLC',
      'Sprinter',
      'Vito'
    ]
  },
  {
    nombre: 'BMW',
    modelos: [
      'Serie 1 (118i / 120i / 135i)',
      'Serie 2',
      'Serie 3 (320i / 328i / 330i)',
      'Serie 4',
      'X1',
      'X3',
      'X5',
      'X6'
    ]
  },
  {
    nombre: 'Audi',
    modelos: [
      'A1',
      'A3 (Sportback / Sedán)',
      'A4',
      'A5',
      'Q2',
      'Q3',
      'Q5'
    ]
  }
];

const MARCAS_MOTOS_AR = [
  {
    nombre: 'Honda',
    modelos: [
      'CB 125F Twister',
      'CB 250 Twister',
      'CB 300F Twister',
      'CG 150 Titan',
      'GLH 150 Gaucha',
      'Navi 110',
      'PCX 160',
      'Tornado XR 250',
      'Wave 110S',
      'XR 150L',
      'XR 190L',
      'XRE 300'
    ]
  },
  {
    nombre: 'Yamaha',
    modelos: [
      'Crypton 110',
      'FZ-S FI 150 / FZ16',
      'FZ25 250',
      'MT-03',
      'NMAX 155',
      'XTZ 125',
      'XTZ 250',
      'YBR 125 (ED / Z)'
    ]
  },
  {
    nombre: 'Motomel',
    modelos: [
      'Blitz 110 (Base / Full / Tunning)',
      'CG 150 Serie 2',
      'DLX 110',
      'Sirius 190',
      'Skua 150 (V6 / Silver)',
      'Skua 250',
      'Strato Euro 150',
      'XMM 250'
    ]
  },
  {
    nombre: 'Corven',
    modelos: [
      'Energy 110 (Base / Full)',
      'Hunter 150',
      'Mirage 110',
      'Triax 150',
      'Triax 200 / 250',
      'Touring 250'
    ]
  },
  {
    nombre: 'Zanella',
    modelos: [
      'Ceccato 150',
      'Hot 90',
      'Patagonian Eagle 150 / 250',
      'RX 150',
      'Sapucai 150',
      'Sol 110',
      'Styler 150 Cruiser',
      'ZB 110 (LT / RT)',
      'ZR 150 / ZR 250'
    ]
  },
  {
    nombre: 'Gilera',
    modelos: [
      'AC1 / AC4',
      'Piccola 150',
      'Sahel 150',
      'Smash 110 (Full / Tunning / X)',
      'SMX 200 / 250',
      'VC 150'
    ]
  },
  {
    nombre: 'Bajaj (Rouser)',
    modelos: [
      'Boxer 150',
      'Dominar 250',
      'Dominar 400',
      'Rouser NS 125',
      'Rouser NS 160',
      'Rouser NS 200 (FI / ABS)',
      'Rouser RS 200'
    ]
  },
  {
    nombre: 'Keller',
    modelos: [
      'Crono Classic 110',
      'Miracle 150',
      'Miracle 200',
      'Stratus 150'
    ]
  },
  {
    nombre: 'Guerrero',
    modelos: [
      'Econo G90',
      'G110 Trip (Base / Full)',
      'GXR 200 / 250',
      'Urban 150'
    ]
  },
  {
    nombre: 'Benelli',
    modelos: [
      '180S',
      '251S',
      '302S / TNT 300',
      'Imperiale 400',
      'Leoncino 250 / 500',
      'TNT 15',
      'TRK 251',
      'TRK 502 / 502X'
    ]
  },
  {
    nombre: 'Royal Enfield',
    modelos: [
      'Classic 350',
      'Himalayan 411 / 450',
      'Hunter 350',
      'Interceptor 650',
      'Meteor 350',
      'Super Meteor 650'
    ]
  },
  {
    nombre: 'CFMoto',
    modelos: [
      '300 NK',
      '400 NK / 650 NK',
      '450 MT',
      '650 MT / 800 MT',
      'CL-X 700'
    ]
  },
  {
    nombre: 'Kawasaki',
    modelos: [
      'KLX 150 / 300',
      'KLR 650',
      'Ninja 300 / 400',
      'Versys 300 / 650',
      'Z400 / Z650 / Z900'
    ]
  },
  {
    nombre: 'BMW Motorrad',
    modelos: [
      'F 750 GS / F 850 GS',
      'G 310 GS / G 310 R',
      'R 1200 GS / R 1250 GS'
    ]
  }
];

const ANIOS_DISPONIBLES = Array.from({ length: 2027 - 1995 + 1 }, (_, i) => String(2027 - i));

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: '¿Tengo que llevar el auto o la moto a algún lado para la inspección?',
    respuesta: 'No, es 100% digital y sin moverte de tu casa. Te indicamos por WhatsApp cómo sacar 4 fotos simples con tu celular y con eso damos de alta la cobertura en el día.'
  },
  {
    pregunta: '¿En cuánto tiempo tengo el certificado para poder circular?',
    respuesta: 'En el mismo día. Apenas emitimos la póliza te enviamos la credencial digital en PDF a tu WhatsApp lista para circular y también se vincula automáticamente en la app Mi Argentina.'
  },
  {
    pregunta: '¿Cómo hago para dar de baja mi seguro actual o el del banco?',
    respuesta: 'Nosotros te guiamos paso a paso. Primero cotizamos y dejamos lista tu nueva póliza para que nunca quedes descubierto ni un solo día, y te indicamos cómo pedir la baja en tu compañía o banco actual.'
  },
  {
    pregunta: '¿Qué formas de pago aceptan y hay descuentos?',
    respuesta: 'Podés abonar con tarjeta de crédito, débito automático por CBU o mediante cupón de pago (Rapipago / Pago Fácil / Mercado Pago). Adhiriendo a débito automático o tarjeta accedés a importantes bonificaciones comerciales.'
  }
];

const OTROS_RAMOS = [
  {
    nombre: 'Combinado Familiar (Hogar)',
    descripcion: 'Incendio, robo, electrodomésticos, cristales y responsabilidad civil.',
    icono: Home,
    mensaje: 'Hola Marcelo! Quiero cotizar un seguro de Hogar (Combinado Familiar).'
  },
  {
    nombre: 'Integral de Comercio',
    descripcion: 'Protección completa para tu local, mercadería, cristales y RC comprensiva.',
    icono: Store,
    mensaje: 'Hola Marcelo! Quiero cotizar un seguro Integral de Comercio para mi negocio.'
  },
  {
    nombre: 'Accidentes Personales / ART',
    descripcion: 'Cobertura para trabajadores independientes, oficios y personal en obra.',
    icono: HeartHandshake,
    mensaje: 'Hola Marcelo! Quiero consultar por un seguro de Accidentes Personales / ART.'
  }
];

export default function App() {
  const [ramo, setRamo] = useState('auto'); // 'auto' | 'moto'
  const [formData, setFormData] = useState({
    marcaAuto: '',
    otraMarcaAuto: '',
    modeloAuto: '',
    otroModeloAuto: '',
    marcaMoto: '',
    otraMarcaMoto: '',
    modeloMoto: '',
    otroModeloMoto: '',
    anio: '',
    otroAnio: '',
    gnc: false,
    cilindrada: 'Hasta 250cc',
    localidad: 'Córdoba Capital',
    cobertura: COBERTURAS_POR_RAMO.auto[0].valor
  });

  const [activeTab, setActiveTab] = useState('choque');
  const [openFaq, setOpenFaq] = useState(0);
  const vehiculoInputRef = useRef(null);
  const otraMarcaInputRef = useRef(null);
  const otroModeloInputRef = useRef(null);

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

    const marcaFinalAuto = formData.marcaAuto === 'OTRA' ? formData.otraMarcaAuto.trim() : formData.marcaAuto;
    const modeloFinalAuto =
      formData.marcaAuto === 'OTRA' || formData.modeloAuto === 'OTRO'
        ? formData.otroModeloAuto.trim()
        : formData.modeloAuto;

    const marcaFinalMoto = formData.marcaMoto === 'OTRA' ? formData.otraMarcaMoto.trim() : formData.marcaMoto;
    const modeloFinalMoto =
      formData.marcaMoto === 'OTRA' || formData.modeloMoto === 'OTRO'
        ? formData.otroModeloMoto.trim()
        : formData.modeloMoto;

    const vehiculoTexto = esMoto
      ? (`${marcaFinalMoto} ${modeloFinalMoto}`.trim() || 'A confirmar')
      : (`${marcaFinalAuto} ${modeloFinalAuto}`.trim() || 'A confirmar');

    const anioFinal = formData.anio === 'OTRO' ? formData.otroAnio.trim() : formData.anio;

    const mensaje = `¡Hola! Estuve viendo la web de *SOMOSMAS Seguros* y quiero cotizar mi ${nombreRamo}:%0A%0A` +
      `${iconoRamo} *${esMoto ? 'Moto' : 'Vehículo'}:* ${vehiculoTexto}%0A` +
      `📅 *Año:* ${anioFinal || 'A confirmar'}%0A` +
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
      grua: '0800-888-0200',
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
            <span>
              <strong className="text-white">Victor Marcelo Young</strong> · Productor Asesor de Seguros (Matrícula SSN 68835)
            </span>
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

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#coberturas" className="hover:text-[#21699B] transition">Coberturas</a>
            <a href="#diferencial" className="hover:text-[#21699B] transition">Por qué elegirnos</a>
            <a href="#faq" className="hover:text-[#21699B] transition">Preguntas frecuentes</a>
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
                    Trato directo con Marcelo Young (MP 68835)
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

                <form onSubmit={handleCotizar} className="space-y-3.5">
                  {ramo === 'auto' ? (
                    <>
                      {/* Selector de Marca de Auto */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
                          Marca del vehículo
                        </label>
                        <select
                          ref={vehiculoInputRef}
                          required
                          aria-label="Marca del auto"
                          value={formData.marcaAuto}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({
                              ...formData,
                              marcaAuto: val,
                              modeloAuto: '',
                              otroModeloAuto: ''
                            });
                            if (val === 'OTRA') {
                              setTimeout(() => otraMarcaInputRef.current?.focus(), 50);
                            }
                          }}
                          className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm ${
                            formData.marcaAuto ? 'text-slate-900 font-medium' : 'text-slate-500'
                          }`}
                        >
                          <option value="" disabled>
                            Seleccioná la marca del auto...
                          </option>
                          {MARCAS_AUTOS_AR.map((m) => (
                            <option key={m.nombre} value={m.nombre} className="text-slate-900 font-normal">
                              {m.nombre}
                            </option>
                          ))}
                          <option value="OTRA" className="text-[#21699B] font-bold">
                            ➕ Otra marca (escribir manualmente)...
                          </option>
                        </select>
                      </div>

                      {/* Campo extra si elige "Otra marca" */}
                      {formData.marcaAuto === 'OTRA' && (
                        <div>
                          <input
                            ref={otraMarcaInputRef}
                            type="text"
                            required
                            aria-label="Escribir otra marca"
                            placeholder="Escribí la marca (Ej: Mitsubishi, Subaru, Volvo...)"
                            value={formData.otraMarcaAuto}
                            onChange={(e) => setFormData({ ...formData, otraMarcaAuto: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#21699B] bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      )}

                      {/* Selector de Modelo dependiente de la Marca (o Input directo si eligió Otra Marca) */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
                          Modelo
                        </label>
                        {formData.marcaAuto === 'OTRA' ? (
                          <input
                            type="text"
                            required
                            aria-label="Escribir modelo del auto"
                            placeholder="Escribí el modelo (Ej: Lancer, Forester, XC60...)"
                            value={formData.otroModeloAuto}
                            onChange={(e) => setFormData({ ...formData, otroModeloAuto: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-500"
                          />
                        ) : (
                          <div className="space-y-2.5">
                            <select
                              required
                              disabled={!formData.marcaAuto}
                              aria-label="Modelo del auto"
                              value={formData.modeloAuto}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData({ ...formData, modeloAuto: val });
                                if (val === 'OTRO') {
                                  setTimeout(() => otroModeloInputRef.current?.focus(), 50);
                                }
                              }}
                              className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed ${
                                formData.modeloAuto ? 'text-slate-900 font-medium' : 'text-slate-500'
                              }`}
                            >
                              <option value="" disabled>
                                {formData.marcaAuto
                                  ? `Seleccioná el modelo de ${formData.marcaAuto}...`
                                  : 'Primero seleccioná la marca...'}
                              </option>
                              {(MARCAS_AUTOS_AR.find((m) => m.nombre === formData.marcaAuto)?.modelos || []).map(
                                (modelo) => (
                                  <option key={modelo} value={modelo} className="text-slate-900 font-normal">
                                    {modelo}
                                  </option>
                                )
                              )}
                              {formData.marcaAuto && (
                                <option value="OTRO" className="text-[#21699B] font-bold">
                                  ➕ Otro modelo (escribir manualmente)...
                                </option>
                              )}
                            </select>

                            {formData.modeloAuto === 'OTRO' && (
                              <input
                                ref={otroModeloInputRef}
                                type="text"
                                required
                                aria-label="Escribir otro modelo"
                                placeholder={`Escribí qué modelo de ${formData.marcaAuto} tenés...`}
                                value={formData.otroModeloAuto}
                                onChange={(e) => setFormData({ ...formData, otroModeloAuto: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#21699B] bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Selector de Marca de Moto */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
                          Marca de la moto
                        </label>
                        <select
                          ref={vehiculoInputRef}
                          required
                          aria-label="Marca de la moto"
                          value={formData.marcaMoto}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({
                              ...formData,
                              marcaMoto: val,
                              modeloMoto: '',
                              otroModeloMoto: ''
                            });
                            if (val === 'OTRA') {
                              setTimeout(() => otraMarcaInputRef.current?.focus(), 50);
                            }
                          }}
                          className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm ${
                            formData.marcaMoto ? 'text-slate-900 font-medium' : 'text-slate-500'
                          }`}
                        >
                          <option value="" disabled>
                            Seleccioná la marca de la moto...
                          </option>
                          {MARCAS_MOTOS_AR.map((m) => (
                            <option key={m.nombre} value={m.nombre} className="text-slate-900 font-normal">
                              {m.nombre}
                            </option>
                          ))}
                          <option value="OTRA" className="text-[#21699B] font-bold">
                            ➕ Otra marca (escribir manualmente)...
                          </option>
                        </select>
                      </div>

                      {formData.marcaMoto === 'OTRA' && (
                        <div>
                          <input
                            ref={otraMarcaInputRef}
                            type="text"
                            required
                            aria-label="Escribir otra marca de moto"
                            placeholder="Escribí la marca (Ej: KTM, Suzuki, Beta, TVS...)"
                            value={formData.otraMarcaMoto}
                            onChange={(e) => setFormData({ ...formData, otraMarcaMoto: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#21699B] bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
                          Modelo
                        </label>
                        {formData.marcaMoto === 'OTRA' ? (
                          <input
                            type="text"
                            required
                            aria-label="Escribir modelo de la moto"
                            placeholder="Escribí el modelo (Ej: Duke 200, AX 100, RTR 200...)"
                            value={formData.otroModeloMoto}
                            onChange={(e) => setFormData({ ...formData, otroModeloMoto: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-500"
                          />
                        ) : (
                          <div className="space-y-2.5">
                            <select
                              required
                              disabled={!formData.marcaMoto}
                              aria-label="Modelo de la moto"
                              value={formData.modeloMoto}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData({ ...formData, modeloMoto: val });
                                if (val === 'OTRO') {
                                  setTimeout(() => otroModeloInputRef.current?.focus(), 50);
                                }
                              }}
                              className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#21699B] focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed ${
                                formData.modeloMoto ? 'text-slate-900 font-medium' : 'text-slate-500'
                              }`}
                            >
                              <option value="" disabled>
                                {formData.marcaMoto
                                  ? `Seleccioná el modelo de ${formData.marcaMoto}...`
                                  : 'Primero seleccioná la marca...'}
                              </option>
                              {(MARCAS_MOTOS_AR.find((m) => m.nombre === formData.marcaMoto)?.modelos || []).map(
                                (modelo) => (
                                  <option key={modelo} value={modelo} className="text-slate-900 font-normal">
                                    {modelo}
                                  </option>
                                )
                              )}
                              {formData.marcaMoto && (
                                <option value="OTRO" className="text-[#21699B] font-bold">
                                  ➕ Otro modelo (escribir manualmente)...
                                </option>
                              )}
                            </select>

                            {formData.modeloMoto === 'OTRO' && (
                              <input
                                ref={otroModeloInputRef}
                                type="text"
                                required
                                aria-label="Escribir otro modelo de moto"
                                placeholder={`Escribí qué modelo de ${formData.marcaMoto} tenés...`}
                                value={formData.otroModeloMoto}
                                onChange={(e) => setFormData({ ...formData, otroModeloMoto: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#21699B] bg-white focus:ring-3 focus:ring-[#21699B]/15 outline-none transition text-sm text-slate-900 placeholder:text-slate-400"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </>
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
                        <option value="2026 / 0km" className="text-slate-900 font-semibold">
                          2026 (0km)
                        </option>
                        {ANIOS_DISPONIBLES.filter((a) => a !== '2027' && a !== '2026').map((a) => (
                          <option key={a} value={a} className="text-slate-900 font-normal">
                            {a}
                          </option>
                        ))}
                        <option value="OTRO" className="text-[#21699B] font-bold">
                          ➕ Anterior a 1995...
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
                        max="1994"
                        aria-label="Escribir año anterior a 1995"
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
                    Sin compromiso · Respuesta directa de Marcelo Young (MP 68835)
                  </p>
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
              {companias.map((comp, idx) => (
                <div
                  key={comp.nombre}
                  className={`bg-[#FAF8F5] rounded-2xl p-5 h-28 flex flex-col items-center justify-center border border-stone-200/80 hover:border-[#6DA6C9] hover:bg-white hover:shadow-md transition-all group ${
                    idx === companias.length - 1 ? 'col-span-2 lg:col-span-1' : ''
                  }`}
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
        <section id="diferencial" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
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

        {/* OTROS SEGUROS (CROSS-SELL: HOGAR, COMERCIO, ACCIDENTES PERSONALES) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">Protección integral</span>
                <h3 className="text-2xl sm:text-3xl font-serif-brand font-bold text-[#0F172A] mt-1">
                  También protegemos tu casa, tu negocio y tu trabajo
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                Consultá descuentos especiales por asegurar más de un riesgo con nosotros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {OTROS_RAMOS.map((item) => {
                const IconComponent = item.icono;
                return (
                  <div
                    key={item.nombre}
                    className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200/80 flex flex-col justify-between gap-4 hover:border-[#6DA6C9] transition"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#21699B]/10 text-[#21699B] flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif-brand font-bold text-lg text-[#0F172A]">{item.nombre}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.descripcion}</p>
                    </div>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.mensaje)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#21699B] hover:text-[#0F172A] transition"
                    >
                      <span>Consultar por WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CÓMO CONTRATAR EN 3 PASOS + PREGUNTAS FRECUENTES */}
        <section id="faq" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Columna izquierda: 3 pasos simples */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">100% digital y sin vueltas</span>
              <h2 className="text-3xl font-serif-brand font-bold text-[#0F172A] leading-tight">
                Asegurá hoy desde tu celular en 3 pasos
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Olvidate de trámites presenciales o perder una mañana entera. Nosotros nos ocupamos de todo el alta.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-[#6DA6C9] flex items-center justify-center shrink-0 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Comparás precios reales</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Te pasamos por WhatsApp las mejores opciones entre nuestras 5 aseguradoras líderes.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-[#6DA6C9] flex items-center justify-center shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>Inspección por 4 fotos</span>
                      <Camera className="w-3.5 h-3.5 text-[#21699B]" />
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Sin llevar el vehículo a ningún lado: nos mandás fotos desde tu casa y emitimos en el acto.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-[#6DA6C9] flex items-center justify-center shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>Póliza en el día y descuentos</span>
                      <BadgePercent className="w-3.5 h-3.5 text-[#21699B]" />
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Recibís tu certificado para circular al instante y accedés a bonificaciones con débito o tarjeta.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: Acordeón FAQ */}
            <div className="lg:col-span-7 space-y-3">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#21699B]">Dudas frecuentes</span>
                <h3 className="text-2xl font-serif-brand font-bold text-[#0F172A] mt-1">
                  Todo lo que necesitás saber antes de contratar
                </h3>
              </div>

              {PREGUNTAS_FRECUENTES.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.pregunta}
                    className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-[#21699B] transition cursor-pointer"
                    >
                      <span>{faq.pregunta}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#21699B] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 pt-3">
                        {faq.respuesta}
                      </div>
                    )}
                  </div>
                );
              })}
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
                {companias.map((c, idx) => (
                  <div
                    key={c.nombre}
                    className={`bg-[#F5F2EB] p-6 rounded-2xl border border-stone-200 flex flex-col justify-between items-center text-center gap-4 ${
                      idx === companias.length - 1 ? 'sm:col-span-2 md:col-span-1' : ''
                    }`}
                  >
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
            <p className="mt-2 text-slate-300 font-medium">
              Victor Marcelo Young — Productor Asesor de Seguros
            </p>
            <p className="text-slate-400">
              Atención personalizada y gestión integral de siniestros.
            </p>
          </div>
          <div className="text-center sm:text-right space-y-1.5">
            <p className="text-slate-200 font-semibold text-sm">Matrícula SSN N° 68835</p>
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