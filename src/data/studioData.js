export const WHATSAPP_NUMBER = '573000000000';
export const WHATSAPP_DEFAULT_MSG =
  'Hola Leo, quiero consultar sobre servicios de mezcla y mastering para mi track.';

export const getWhatsAppUrl = (customMessage = WHATSAPP_DEFAULT_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;

export const NAV_ITEMS = [
  { id: 'home', label: 'Inicio' },
  { id: 'estudio', label: 'Estudio' },
  { id: 'acerca', label: 'Acerca de mí' },
  { id: 'talks', label: 'LG Talks' },
];

export const HERO_DATA = {
  headline: 'Mezcla y mastering profesional para tus tracks',
  subcopy:
    'Más de 10 años aportando profundidad, claridad y fuerza a la escena electrónica en LATAM.',
};

export const TRAJECTORY_DATA = {
  metricYears: 15,
  metricProjects: 200,
  statementLead: 'Aportando a más de 200 proyectos durante 15 años de trayectoria',
  editorialText:
    'Más que aplicar procesos en serie, abrimos un diálogo con cada proyecto para aportar técnica y profesionalismo a la visión creativa.',
};

// Editable logo placeholders ready to swap for real label PNG/SVG files
export const PROJECT_LOGOS = [
  { id: 'logo-1', name: 'SOLAR WAVE', tag: 'Melodic Techno', code: 'SW-REC' },
  { id: 'logo-2', name: 'KINETIC LAB', tag: 'Tech House', code: 'KNT-UK' },
  { id: 'logo-3', name: 'SUBTERRÁNEA', tag: 'Club Collective', code: 'SBT-01' },
  { id: 'logo-4', name: 'ANALOGA REC', tag: 'Indie Dance', code: 'ANL-DE' },
  { id: 'logo-5', name: 'PULSO LATAM', tag: 'House & Breaks', code: 'PLS-CO' },
  { id: 'logo-6', name: 'MIDNIGHT CTRL', tag: 'Minimal / Deep', code: 'MNC-ES' },
  { id: 'logo-7', name: 'TIERRA SONORA', tag: 'Afro House', code: 'TSN-AR' },
  { id: 'logo-8', name: 'MODULAR DEPT', tag: 'Electro / Acid', code: 'MDP-NL' },
];

export const CLIENT_FEEDBACK = [
  {
    id: 'fb-1',
    index: '01',
    artist: 'Matías Valdivia',
    role: 'Productor & Live Act · Buenos Aires / Berlín',
    service: 'Mezcla & Mastering Estéreo',
    label: 'Solar Wave Records',
    quote:
      'Leo no solo limpió el rango subgrave para que pateara brutal en club; entendió exactamente la atmósfera oscura que buscábamos desde el primer demo. Cuando probé el master en un sistema Funktion-One, cada transient estaba en su lugar.',
  },
  {
    id: 'fb-2',
    index: '02',
    artist: 'Valeria Montoya (V/M)',
    role: 'DJ & Productora · Bogotá',
    service: 'Stem Mastering',
    label: 'Kinetic Groove UK',
    quote:
      'La diferencia en la profundidad del groove y la separación entre kick, bassline y percusiones fue inmediata. El diálogo durante las revisiones fue súper cercano y nos ayudó a cerrar nuestra firma con el sello en Londres.',
  },
  {
    id: 'fb-3',
    index: '03',
    artist: 'Daro & Solís',
    role: 'Dúo de Música Electrónica · Ciudad de México',
    service: 'Mezcla Completa + Club Master',
    label: 'Tierra Sonora',
    quote:
      'Llevábamos años luchando para que nuestros tracks compitieran en volumen sin perder dinámica ni calidez analógica. Trabajar con Leo transformó por completo la identidad de nuestro último EP.',
  },
  {
    id: 'fb-4',
    index: '04',
    artist: 'Sebastián Mora',
    role: 'A&R · Subterránea Recordings',
    service: 'Mastering de Catálogo',
    label: 'Subterránea Recordings',
    quote:
      'Cuando enviamos lanzamientos de distintos artistas a Leo, logra dar cohesión a todo el catálogo manteniendo la personalidad intacta de cada productor. Criterio técnico y musical impecable.',
  },
];

export const WORK_TRACKS = [
  {
    id: 'subterranean-pulse',
    index: '01',
    title: 'Still Awake',
    artist: 'Joset',
    genre: 'Italo Body Music / Italo Disco',
    bpm: 126,
    musicalKey: 'E Major',
    duration: '06:53',
    format: '24-Bit / 96 kHz WAV',
    year: '2025',
    signedLabel: 'Discos Eterna',
    catalogNo: 'DET-001',
    coverPattern: 'real-artwork',
    supportedBy: [
      'Pavel Petrov',
      'Cormac',
      'Joe Lewandowski',
      'Lavion',
    ],
    synthPreset: 'melodic-techno',
    stages: {
      premix: {
        label: 'Pre-Mix',
        shortLabel: 'Antes de Mezcla',
        badge: 'RAW STEMS · SIN PROCESO',
        lufs: '-18.4 LUFS',
        truePeak: '-4.2 dBTP',
        dynamicRange: '12.8 DR',
        stereoWidth: '42%',
        headroom: 'Sub-bass descontrolado',
        summary:
          'Stems recibidos directamente del DAW del artista. Se detecta acumulación de energía en 220–300 Hz, choque de fase entre kick y sub, y sintetizadores principales compitiendo en el mismo plano medio.',
        chain: [
          'Stems sin ecualización correctiva ni control de fase',
          'Exceso de energía en low-mids (+4.5 dB @ 240 Hz)',
          'Transientes de percusión sin definición espacial',
        ],
        eqCurve: [0.68, 0.85, 0.92, 0.56, 0.44, 0.35, 0.25],
      },
      mix: {
        label: 'Mezclado',
        shortLabel: 'Mezcla Final',
        badge: 'HYBRID MIXDOWN · -6 DB HEADROOM',
        lufs: '-11.6 LUFS',
        truePeak: '-3.1 dBTP',
        dynamicRange: '9.4 DR',
        stereoWidth: '78%',
        headroom: 'Pocket Kick/Sub alineado',
        summary:
          'Balance quirúrgico de planos, alineación de fase en subgraves, sidechain multibanda transparente y diseño de profundidad con envíos paralelos analógicos conservando headroom óptimo.',
        chain: [
          'Limpieza de resonancias y alineación sub 45–90 Hz',
          'Compresión paralela en batería para pegada de club',
          'Escena estéreo 3D para arpegios, pads y reverbs',
        ],
        eqCurve: [0.82, 0.78, 0.52, 0.68, 0.74, 0.71, 0.64],
      },
      master: {
        label: 'Masterizado',
        shortLabel: 'Master Final',
        badge: 'CLUB & STREAMING MASTER · READY',
        lufs: '-7.2 LUFS',
        truePeak: '-0.3 dBTP',
        dynamicRange: '6.8 DR',
        stereoWidth: '94%',
        headroom: 'Traducción garantizada en PA',
        summary:
          'Cadena híbrida de mastering con saturación armónica sutil, compresión VCA de pegamento, expansión Mid/Side y limitación transparente para máxima presión sonora sin fatiga auditiva.',
        chain: [
          'Ecualización Mid/Side analógica y peso en 55 Hz',
          'Saturación armónica de cinta para presencia en medios',
          'Limitación multi-etapa calibrada a -0.3 dBTP club ready',
        ],
        eqCurve: [0.94, 0.88, 0.58, 0.76, 0.84, 0.89, 0.86],
      },
    },
  },
  {
    id: 'calle-94',
    index: '02',
    title: 'Calle 94 (Extended Club Mix)',
    artist: 'Valeria & Daro',
    genre: 'Tech House',
    bpm: 129,
    musicalKey: 'A Minor',
    duration: '05:54',
    format: '24-Bit / 48 kHz WAV',
    year: '2026',
    signedLabel: 'Kinetic Groove UK',
    catalogNo: 'KGU-142',
    coverPattern: 'grid-stabs',
    supportedBy: [
      'Marco Carola',
      'PAWSA',
      'Dennis Cruz',
      'Loco Dice',
      'Wade',
    ],
    synthPreset: 'tech-house',
    stages: {
      premix: {
        label: 'Pre-Mix',
        shortLabel: 'Antes de Mezcla',
        badge: 'RAW STEMS · DEMO EXPORT',
        lufs: '-17.8 LUFS',
        truePeak: '-3.8 dBTP',
        dynamicRange: '11.9 DR',
        stereoWidth: '48%',
        headroom: 'Groove opaco en medios',
        summary:
          'Producción con gran idea rítmica pero con la línea de bajo enmascarando el punch del bombo y hats algo filosos sin cuerpo en el rango medio-alto.',
        chain: [
          'Bajo con colas largas invadiendo el groove del kick',
          'Vocals y stabs sin automatización de planos',
          'Imagen estéreo estrecha y falta de cohesión',
        ],
        eqCurve: [0.72, 0.88, 0.86, 0.54, 0.62, 0.45, 0.3],
      },
      mix: {
        label: 'Mezclado',
        shortLabel: 'Mezcla Final',
        badge: 'HYBRID MIXDOWN · GROOVE LOCKED',
        lufs: '-10.9 LUFS',
        truePeak: '-2.8 dBTP',
        dynamicRange: '8.7 DR',
        stereoWidth: '82%',
        headroom: 'Impacto rítmico definido',
        summary:
          'Escultura dinámica del kick & bassline para maximizar el rebote del groove, control de sibilancias en hi-hats y tratamiento paralelo en claps y vocal chops.',
        chain: [
          'Enfoque en pegada de 65 Hz y articulación de bajo en 140 Hz',
          'Automatización de tensión en breaks y drops',
          'Paneo quirúrgico de percusión menor y shufflers',
        ],
        eqCurve: [0.88, 0.82, 0.56, 0.72, 0.76, 0.78, 0.68],
      },
      master: {
        label: 'Masterizado',
        shortLabel: 'Master Final',
        badge: 'CLUB & BEATPORT #1 READY',
        lufs: '-6.8 LUFS',
        truePeak: '-0.2 dBTP',
        dynamicRange: '6.3 DR',
        stereoWidth: '96%',
        headroom: 'Pegada frontal inmediata',
        summary:
          'Masterización enfocada en sistemas club y festivales: subgrave sólido y firme, medios frontales con carácter analógico y techo dinámico limpio sin bombeo indeseado.',
        chain: [
          'Bus compression de pegamento rápido para swing de club',
          'Realce armónico en medios-altos para corte en sistemas grandes',
          'Clipper + limitador de precisión para competitividad comercial',
        ],
        eqCurve: [0.96, 0.91, 0.61, 0.8, 0.86, 0.9, 0.85],
      },
    },
  },
  {
    id: 'selva-electrica',
    index: '03',
    title: 'Selva Eléctrica',
    artist: 'Nómade Collective',
    genre: 'Afro House / Indie Dance',
    bpm: 122,
    musicalKey: 'D Minor',
    duration: '07:10',
    format: '24-Bit / 96 kHz WAV',
    year: '2025',
    signedLabel: 'Tierra Sonora Berlin',
    catalogNo: 'TSB-031',
    coverPattern: 'diagonal-waves',
    supportedBy: [
      'Black Coffee',
      'Keinemusik',
      'Shimza',
      'Caiiro',
      'Themba',
    ],
    synthPreset: 'afro-house',
    stages: {
      premix: {
        label: 'Pre-Mix',
        shortLabel: 'Antes de Mezcla',
        badge: 'RAW STEMS · MULTI-PERC',
        lufs: '-19.1 LUFS',
        truePeak: '-5.0 dBTP',
        dynamicRange: '13.4 DR',
        stereoWidth: '50%',
        headroom: 'Acumulación en percusiones',
        summary:
          'Más de 45 canales de percusión orgánica y sintetizadores modulares que pierden claridad al sumarse, ocultando la voz líder y la calidez del bajo.',
        chain: [
          'Congas, shakers y bongos compitiendo en 400–800 Hz',
          'Reverbs acumulativas restando definición frontal',
          'Subgrave tímido sin soporte armónico en medios-bajos',
        ],
        eqCurve: [0.58, 0.74, 0.9, 0.78, 0.52, 0.41, 0.28],
      },
      mix: {
        label: 'Mezclado',
        shortLabel: 'Mezcla Final',
        badge: 'HYBRID MIXDOWN · WARM DEPTH',
        lufs: '-12.0 LUFS',
        truePeak: '-3.4 dBTP',
        dynamicRange: '9.8 DR',
        stereoWidth: '86%',
        headroom: 'Espacio orgánico tridimensional',
        summary:
          'Clasificación por planos de profundidad para cada elemento percusivo, texturización analógica en sintetizadores y balance sedoso entre calidez acústica y peso electrónico.',
        chain: [
          'Separación de capas rítmicas con diseño espacial Mid/Side',
          'Armónicos pares en el bajo para traducción en altavoces chicos',
          'Control de transientes con calidez orgánica sin dureza digital',
        ],
        eqCurve: [0.8, 0.79, 0.55, 0.74, 0.79, 0.75, 0.69],
      },
      master: {
        label: 'Masterizado',
        shortLabel: 'Master Final',
        badge: 'VINYL & DIGITAL MASTER READY',
        lufs: '-7.8 LUFS',
        truePeak: '-0.4 dBTP',
        dynamicRange: '7.4 DR',
        stereoWidth: '95%',
        headroom: 'Dinámica y brillo sedoso',
        summary:
          'Mastering musical de alto respeto dinámico: conserva la respiración de las percusiones orgánicas mientras entrega un subgrave profundo y envolvente para pistas open-air.',
        chain: [
          'Ecualización Pultec-style para aire natural sobre 12 kHz',
          'Control de fase mono por debajo de 110 Hz',
          'Entrega calibrada tanto para edición digital como corte en vinilo',
        ],
        eqCurve: [0.91, 0.87, 0.59, 0.79, 0.86, 0.88, 0.9],
      },
    },
  },
  {
    id: 'neon-geometry',
    index: '04',
    title: 'Neon Geometry',
    artist: 'K-Lector',
    genre: 'Electro / Breakbeat',
    bpm: 134,
    musicalKey: 'C Minor',
    duration: '05:18',
    format: '24-Bit / 96 kHz WAV',
    year: '2026',
    signedLabel: 'Analog Circuit',
    catalogNo: 'ANC-019',
    coverPattern: 'prism-blocks',
    supportedBy: [
      'Helena Hauff',
      'Bicep',
      'Jensen Interceptor',
      'DJ Stingray 313',
    ],
    synthPreset: 'electro-breaks',
    stages: {
      premix: {
        label: 'Pre-Mix',
        shortLabel: 'Antes de Mezcla',
        badge: 'RAW STEMS · HARDWARE SYNTHS',
        lufs: '-16.9 LUFS',
        truePeak: '-2.9 dBTP',
        dynamicRange: '11.1 DR',
        stereoWidth: '55%',
        headroom: 'Picos agresivos en 3–5 kHz',
        summary:
          'Grabación directa desde cajas de ritmo y sintetizadores analógicos con gran carácter crudo, pero con resonancias ácidas agresivas y breaks que pierden cuerpo frente al 808.',
        chain: [
          'Resonancias de filtro 303 generando picos molestos a alto volumen',
          'Sub 808 irregular entre notas bajas y medias',
          'Snares sin cuerpo suficiente bajo los leads distorsionados',
        ],
        eqCurve: [0.78, 0.72, 0.65, 0.61, 0.89, 0.76, 0.42],
      },
      mix: {
        label: 'Mezclado',
        shortLabel: 'Mezcla Final',
        badge: 'HYBRID MIXDOWN · PUNCH & SNAP',
        lufs: '-10.8 LUFS',
        truePeak: '-2.6 dBTP',
        dynamicRange: '8.4 DR',
        stereoWidth: '84%',
        headroom: '808 nivelado y breaks filosos',
        summary:
          'Control dinámico en frecuencias ácidas sin apagar la actitud cruda del hardware, saturación controlada en el snare y equilibrio de sustain en el 808.',
        chain: [
          'Ecualización dinámica quirúrgica sobre picos de filtro analógico',
          'Procesamiento paralelo en breaks para máxima velocidad y snap',
          'Nivelación armónica del sub 808 en todo el registro',
        ],
        eqCurve: [0.89, 0.83, 0.54, 0.75, 0.78, 0.81, 0.74],
      },
      master: {
        label: 'Masterizado',
        shortLabel: 'Master Final',
        badge: 'WAREHOUSE & CLUB MASTER',
        lufs: '-7.0 LUFS',
        truePeak: '-0.3 dBTP',
        dynamicRange: '6.5 DR',
        stereoWidth: '94%',
        headroom: 'Impacto warehouse controlado',
        summary:
          'Masterización de alto voltaje: subgraves elásticos, transientes intactos en la caja de ritmos y amplitud estéreo inmersiva que responde con violencia limpia en bodegas y clubs.',
        chain: [
          'Conversión AD/DA de alta precisión para mantener el filo del transient',
          'Compresión paralela de master bus enfocada en el impacto rítmico',
          'Estabilidad tonal verificada a niveles de presión sonora de club',
        ],
        eqCurve: [0.95, 0.9, 0.58, 0.82, 0.85, 0.89, 0.87],
      },
    },
  },
];

export const STUDIO_ROOMS = [
  {
    id: 'room-01',
    index: '01',
    title: 'Control Room & Tratamiento Acústico',
    subtitle: 'Respuesta plana calibrada para decisiones críticas de low-end',
    dimensions: '6.4m × 4.8m × 3.1m · Trampas de graves sintonizadas a 38 Hz',
    description:
      'Sala diseñada específicamente para lectura precisa de subgraves en música electrónica y dance. Absorción de banda ancha, difusión trasera QRD y calibración acústica DSP por punto de escucha.',
    specs: ['RT60: 0.22s controlado', 'Monitoreo Principal 3-Vías + Sub Calibrado', 'Aislamiento flotante STC-62'],
    placeholderCode: 'FRAME // CAM-01 · CONTROL ROOM',
    visualType: 'control-room',
  },
  {
    id: 'room-02',
    index: '02',
    title: 'Rack Híbrido de Mezcla & Mastering',
    subtitle: 'Conversión de referencia y coloración analógica selectiva',
    dimensions: 'Cadena balanceada clase A · Patchbay de inserción directa',
    description:
      'Integración precisa entre procesamiento digital quirúrgico y hardware analógico de mastering: sumadores discretos, ecualización pasiva tipo Pultec, compresión VCA/Vari-Mu y clipping de precisión.',
    specs: ['Conversión 24-bit / 192 kHz', 'Compresor Bus VCA & Vari-Mu', 'Ecualizador Mid/Side Analógico'],
    placeholderCode: 'FRAME // CAM-02 · ANALOG RACK',
    visualType: 'analog-rack',
  },
  {
    id: 'room-03',
    index: '03',
    title: 'Estación de Referencia & Traducción Club',
    subtitle: 'Verificación multi-sistema: PA de club, estudio y auriculares',
    dimensions: '3 pares de monitores + emulación de respuesta de sala nocturna',
    description:
      'Cada mezcla y master atraviesa pruebas cruzadas entre monitores de campo cercano, campo medio de rango completo y sistemas de referencia portátiles para garantizar traducción impecable.',
    specs: ['Campo Cercano Coaxial', 'Sistema Rango Completo + Sub', 'Medición LUFS / Correlación / Fase'],
    placeholderCode: 'FRAME // CAM-03 · MONITORING',
    visualType: 'monitoring',
  },
  {
    id: 'room-04',
    index: '04',
    title: 'Listening Lounge & Sesiones Presenciales',
    subtitle: 'Espacio diseñado para escuchar, dialogar y afinar detalles juntos',
    dimensions: 'Zona creativa de escucha crítica · Conexión directa con sala de control',
    description:
      'Un entorno sobrio y libre de distracciones donde productores y artistas se sientan junto al ingeniero para tomar decisiones estéticas finales sobre sus EPs y álbumes.',
    specs: ['Sesiones presenciales y remotas HD', 'Streaming lossless en tiempo real', 'Archivo y respaldo multi-formato'],
    placeholderCode: 'FRAME // CAM-04 · ARTIST LOUNGE',
    visualType: 'lounge',
  },
];

export const STUDIO_FAQS = [
  {
    q: '¿Cómo debo preparar mis stems o pre-mix antes de enviarlos?',
    a: 'Exporta todos tus archivos en WAV o AIFF a 24-bit (en la frecuencia de muestreo original de tu proyecto, 44.1 / 48 / 96 kHz). Deja al menos entre -6 dB y -3 dB de headroom en el master bus y desactiva cualquier limitador o maximizador final antes de exportar.',
  },
  {
    q: '¿Cuál es el tiempo de entrega habitual para mezcla o mastering?',
    a: 'Para Mastering Estéreo entregamos la primera versión en 48 a 72 horas hábiles. Para Mezcla + Mastering completo o Stem Mastering, el tiempo habitual es de 4 a 6 días hábiles, incluyendo rondas de revisión enfocadas en tu feedback.',
  },
  {
    q: '¿Puedo asistir de forma remota en vivo durante la sesión?',
    a: 'Sí. Trabajamos con artistas y sellos en Latinoamérica, Europa y Norteamérica mediante streaming de audio lossless en baja latencia para escuchar ajustes de mezcla y mastering en tiempo real.',
  },
  {
    q: '¿Qué formatos finales se entregan con el servicio?',
    a: 'Recibes Club Master (24-bit WAV), Streaming Master optimizado, Radio Edit / Instrumental (si aplica según el paquete), versión a 16-bit/44.1kHz para distribución y archivos con metadatos verificados.',
  },
];

export const ABOUT_DATA = {
  eyebrow: 'ACERCA DE MÍ · LEO GUERRERO',
  headline: 'Quince años traduciendo la intención del productor en peso, claridad y emoción para la pista.',
  intro:
    'Soy Leo Guerrero, ingeniero de sonido especializado en mezcla y mastering para música electrónica y dance. Durante más de 15 años y más de 200 producciones, he acompañado a artistas independientes, live acts y sellos discográficos en el proceso clave donde un buen demo se convierte en una obra lista para competir a nivel internacional.',
  pillars: [
    {
      index: '01',
      title: 'Diálogo y Respeto por la Obra',
      text: 'Cada producción nace de una idea artística particular. Antes de mover un fader escucho con atención tu visión, tus referencias y el contexto del sello o pista donde el track va a vivir.',
    },
    {
      index: '02',
      title: 'Escucha Crítica + Sensibilidad',
      text: 'La ingeniería sin sensibilidad musical vuelve fríos los tracks; la intuición sin criterio técnico limita su alcance. Mi enfoque integra precisión acústica, lectura quirúrgica del low-end y gusto artístico.',
    },
    {
      index: '03',
      title: 'Estándar Internacional desde LatAm',
      text: 'Construimos desde Latinoamérica un referente de calidad sonora reconocido por sellos y DJs globales, demostrando que el diseño sonoro de primer nivel nace de la disciplina, la experiencia y el criterio propio.',
    },
  ],
  timeline: [
    { year: '2011', label: 'Inicios en síntesis, diseño sonoro y cabinas de club en vivo' },
    { year: '2015', label: 'Especialización en acústica de sala y mezcla híbrida para música dance' },
    { year: '2019', label: 'Supera los 100 lanzamientos firmados con sellos de Europa y América' },
    { year: '2022', label: 'Lanzamiento de LG Talks & Audio Training para productores electrónicos' },
    { year: '2026', label: '+200 proyectos mezclados y masterizados · Leo Guerrero Sound Studio' },
  ],
};

export const LG_TALKS_DATA = [
  {
    id: 'talk-01',
    category: 'Mezcla',
    date: 'MASTERCLASS · 90 MIN',
    title: 'Anatomía del Low-End: Kick & Sub-Bass que traducen en cualquier club',
    description:
      'Cómo diagnosticar conflictos de fase, elegir la longitud del tail del bombo y esculpir el rango entre 35 Hz y 120 Hz sin destruir la energía del track.',
    topics: ['Alineación de fase', 'Sidechain multibanda', 'Monitoreo en sala'],
    status: 'Disponible bajo demanda',
  },
  {
    id: 'talk-02',
    category: 'Mastering',
    date: 'SESIÓN TÉCNICA · 75 MIN',
    title: 'Loudness inteligente: De -12 LUFS a -6.5 LUFS conservando punch y transientes',
    description:
      'Desmontamos el mito del volumen a costa de la música. Flujo híbrido de saturación, clipping selectivo y limitación transparente para House, Techno y Breaks.',
    topics: ['Crest Factor', 'Mid/Side EQ', 'Clipper vs Limiter'],
    status: 'Próxima edición en vivo',
  },
  {
    id: 'talk-03',
    category: 'Audio Training',
    date: 'WORKSHOP PRÁCTICO · 120 MIN',
    title: 'Preparación profesional de stems y criterio artístico para firmar con sellos',
    description:
      'Qué escuchan realmente los A&Rs en los primeros 30 segundos de un promo, cómo organizar tus ganancias y cómo comunicar tus intenciones al ingeniero de mezcla.',
    topics: ['Gain staging', 'Feedback A&R', 'Exportación pro'],
    status: 'Inscripciones abiertas',
  },
  {
    id: 'talk-04',
    category: 'Mezcla',
    date: 'DECONSTRUCCIÓN · 60 MIN',
    title: 'Profundidad estéreo sin perder pegada mono en sistemas de sonido grandes',
    description:
      'Uso estratégico de delays Haas cortos, reverbs filtradas y automatización de planos para crear atmósferas inmersivas que no colapsan en mono.',
    topics: ['Correlación de fase', 'Envíos paralelos', 'Diseño de planos'],
    status: 'Disponible bajo demanda',
  },
];
