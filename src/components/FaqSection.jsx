import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { getWhatsAppUrl } from '../data/studioData';

gsap.registerPlugin(ScrollTrigger);

function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const FAQ_ITEMS = [
  {
    id: '01',
    category: 'PREPARACIÓN DE ARCHIVOS',
    question: '¿Cómo debo preparar y exportar mi pre-mix o stems antes de enviarlos?',
    answer:
      'Exporta tus pistas en formato WAV o AIFF a 24 bits (o 32 bits float) a la frecuencia de muestreo nativa de tu sesión (44.1 kHz, 48 kHz o 96 kHz). Desactiva cualquier limitador, maximizador o procesamiento agresivo en el master bus y asegúrate de dejar un headroom real de entre -6 dB y -3 dBTP. Si envías stems, nombra cada canal claramente (ej: 01_KICK, 02_SUB, 03_PERC, 04_LEAD, 05_PADS, 06_FX) con todos los tracks comenzando exactamente en el compás 1.1.1.',
  },
  {
    id: '02',
    category: 'SERVICIOS & ALCANCE',
    question: '¿Cuál es la diferencia entre Mastering Estéreo, Stem Mastering y Mezcla?',
    answer:
      'En el Mastering Estéreo calibramos el archivo final de dos canales (L/R) optimizando balance espectral, peso subgrave, coherencia dinámica y volumen competitivo para club. En Stem Mastering trabajamos sobre 4 a 8 subgrupos separados, lo que permite resolver choques de fase entre kick/sub o enmascaramientos medios con mayor precisión. En la Mezcla completa partimos desde los stems individuales para esculpir el espacio, profundidad y pegada desde la raíz.',
  },
  {
    id: '03',
    category: 'ESTÁNDARES DE CLUB',
    question: '¿A qué nivel de volumen (LUFS) entregan los masters y qué archivos recibo?',
    answer:
      'Calibramos los masters para máxima pegada en sistemas de sonido de club y festivales sin fatiga ni distorsión digital (típicamente entre -6.5 y -8.0 LUFS integrado con crest factor dinámico para Techno, Tech House, Melodic o Breaks). Recibes: Club Master (WAV 24-bit/48kHz sin compresión), Streaming Master optimizado para distribución digital (WAV 16-bit/44.1kHz con dither profesional), y versiones instrumental o radio edit si tu lanzamiento lo requiere.',
  },
  {
    id: '04',
    category: 'TIEMPOS & REVISIONES',
    question: '¿Cuáles son los tiempos de entrega y cuántas revisiones se incluyen?',
    answer:
      'Para Mastering Estéreo entregamos la primera versión en 48 a 72 horas hábiles. Para Mezcla completa o Stem Mastering, el plazo habitual es de 4 a 6 días hábiles. Cada proyecto incluye rondas de revisión enfocadas para calibrar matices de acuerdo con tu criterio y las referencias sonoras del sello al que apuntas.',
  },
  {
    id: '05',
    category: 'DIAGNÓSTICO GRATUITO',
    question: '¿En qué consiste la escucha diagnóstica sin costo?',
    answer:
      'Nos compartes tu pre-mix o demo por WhatsApp mediante un enlace privado (Dropbox, Google Drive o WeTransfer). Analizamos la pista en nuestro entorno acústico calibrado, evaluamos la correlación de fase en subgraves, el rango dinámico y el balance de planos, y te enviamos un reporte técnico conciso con sugerencias concretas antes de que comprometas presupuesto.',
  },
  {
    id: '06',
    category: 'SESIONES REMOTAS',
    question: '¿Puedo asistir a la sesión de mezcla o mastering en vivo a distancia?',
    answer:
      'Sí. Trabajamos regularmente con artistas en Latinoamérica, Europa y Estados Unidos mediante streaming de audio lossless a 24-bit/48kHz con bajísima latencia. Puedes conectarte desde tu propio estudio o auriculares para escuchar ajustes de EQ, compresión y planos espaciales en tiempo real mientras conversamos.',
  },
];

const ROTATING_WORDS = ['release', 'proyecto', 'EP', 'album', 'track', 'lanzamiento'];

export default function FaqSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  // QWERTY headline word rotator
  const [wordIdx, setWordIdx] = useState(0);
  const [displayedWord, setDisplayedWord] = useState(ROTATING_WORDS[0]);
  const [typingPhase, setTypingPhase] = useState('waiting'); // 'typing' | 'waiting' | 'deleting'

  const currentWord = ROTATING_WORDS[wordIdx];

  // QWERTY mechanical typing emulation for the rotating target word
  useEffect(() => {
    let timer = null;

    if (typingPhase === 'typing') {
      if (displayedWord.length < currentWord.length) {
        // Natural keystroke cadence with organic micro-delays (60ms - 110ms)
        const delay = Math.floor(Math.random() * 50) + 65;
        timer = setTimeout(() => {
          setDisplayedWord(currentWord.slice(0, displayedWord.length + 1));
        }, delay);
      } else {
        // Word typed out completely, hold text for reading
        timer = setTimeout(() => {
          setTypingPhase('waiting');
        }, 300);
      }
    } else if (typingPhase === 'waiting') {
      // Hold reading pause for 2.4 seconds
      timer = setTimeout(() => {
        setTypingPhase('deleting');
      }, 2400);
    } else if (typingPhase === 'deleting') {
      if (displayedWord.length > 0) {
        // Smooth quick backspacing per character (45ms)
        timer = setTimeout(() => {
          setDisplayedWord((prev) => prev.slice(0, -1));
        }, 45);
      } else {
        // Completely cleared, pause briefly and switch to next word
        timer = setTimeout(() => {
          setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
          setTypingPhase('typing');
        }, 220);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedWord, typingPhase, wordIdx, currentWord]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="border-b border-[#4b4b4b]/60 bg-[#1b1b1b] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT COLUMN: Editorial Header & Contact Trigger */}
          <div className="faq-reveal lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-3xl font-medium leading-[1.08] text-[#c3c1b6] sm:text-4xl lg:text-[2.75rem]">
                Criterio técnico y claridad para tu próximo{' '}
                <span className="inline-block text-[#7bf9ba]">
                  {displayedWord}
                  <span
                    className="inline-block text-[#7bf9ba] font-mono font-light ml-0.5 select-none animate-qwerty-cursor"
                    aria-hidden="true"
                  >
                    |
                  </span>
                </span>
                .
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-[#c3c1b6]/80 sm:text-base">
                Todo lo que necesitas saber sobre preparación de stems, niveles de entrega para club,
                tiempos de trabajo y cómo abordamos cada producción para que compita en cualquier sistema de sonido.
              </p>
            </div>

            {/* Direct WhatsApp Prompt Box */}
            <div className="mt-8 lg:mt-12 border border-[#4b4b4b] bg-[#151515] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 text-[#7bf9ba]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7bf9ba]">
                  ¿Tienes una duda específica?
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#c3c1b6]/75 sm:text-sm">
                Envía tus stems o pre-mix para una escucha diagnóstica sin costo y hablemos directamente
                sobre las necesidades técnicas de tu track.
              </p>

              <a
                href={getWhatsAppUrl(
                  'Hola Leo, tengo una consulta específica sobre la preparación de mi pre-mix para mezcla/mastering.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2.5 border border-[#7bf9ba] bg-[#7bf9ba] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1b1b1b] transition-all hover:bg-transparent hover:text-[#7bf9ba] cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Accordion Questions */}
          <div className="faq-reveal lg:col-span-7">
            <div className="divide-y divide-[#4b4b4b] border border-[#4b4b4b] bg-[#151515]">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={item.id}
                    className={`transition-colors duration-200 ${
                      isOpen ? 'bg-[#181818]' : 'bg-[#151515] hover:bg-[#171717]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                    >
                      <div className="flex flex-col gap-1.5 pr-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#7bf9ba]">
                          {item.id} // {item.category}
                        </span>
                        <span
                          className={`font-display text-base font-medium transition-colors sm:text-lg ${
                            isOpen ? 'text-[#7bf9ba]' : 'text-[#c3c1b6]'
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? 'border-[#7bf9ba] bg-[#7bf9ba] text-[#1b1b1b] rotate-180'
                            : 'border-[#4b4b4b] bg-[#1b1b1b] text-[#c3c1b6]'
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7">
                        <div className="border-t border-[#4b4b4b]/60 pt-4">
                          <p className="text-sm leading-relaxed text-[#c3c1b6]/85 sm:text-[15px]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
