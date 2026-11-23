import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { getWhatsAppUrl } from '../data/studioData';

const SECTIONS_CONFIG = {
  estudio: {
    name: 'Estudio',
    tag: 'SECCIÓN // ESTUDIO',
    description:
      'Estamos preparando este espacio con el detalle técnico de nuestras salas de monitoreo acústicamente calibradas, arquitectura de escucha crítica y la cadena híbrida de mezcla y mastering para club.',
  },
  acerca: {
    name: 'Acerca de mí',
    tag: 'SECCIÓN // ACERCA DE MÍ',
    description:
      'Estamos preparando esta sección con la trayectoria detallada, filosofía sonora, experiencia en cabinas de club y el recorrido de más de 15 años y 200 producciones de Leo Guerrero.',
  },
  talks: {
    name: 'LG Talks',
    tag: 'SECCIÓN // LG TALKS',
    description:
      'Estamos preparando esta sección con la programación de masterclasses, workshops de diseño sonoro, anatomía del low-end y formación técnica para productores de música electrónica.',
  },
};

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

export default function UnderDevelopmentView({ sectionId, onNavigate }) {
  const containerRef = useRef(null);
  const data = SECTIONS_CONFIG[sectionId] || {
    name: 'Sección',
    tag: 'SECCIÓN // EN PROCESO',
    description: 'Estamos trabajando en el contenido y la experiencia de esta sección.',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dev-stagger', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [sectionId]);

  return (
    <div ref={containerRef} className="min-h-[80vh] bg-[#1b1b1b] pt-28 pb-20 flex flex-col justify-center">
      <div className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-12">
        {/* Top Breadcrumb / Back Button */}
        <div className="dev-stagger mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#4b4b4b]/60 pb-5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 hover:text-[#7bf9ba] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver al Inicio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 bg-[#7bf9ba] shadow-[0_0_8px_#7bf9ba] animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
              {data.tag}
            </span>
          </div>
        </div>

        {/* Central Brutalist Notice Box */}
        <div className="dev-stagger relative overflow-hidden border border-[#4b4b4b] bg-[#161616] p-8 sm:p-12 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: 'url("/assets/TEXTURA_PUNTOS_GRIS.png")' }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[#4b4b4b] bg-[#141414] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7bf9ba]">
              <span>STATUS // EN CONSTRUCCIÓN</span>
            </div>

            <h1 className="mt-6 font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.04] text-[#c3c1b6]">
              Sección en desarrollo.
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#c3c1b6]/80 max-w-2xl">
              {data.description}
            </p>

            {/* Navigation & Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-2.5 border border-[#4b4b4b] bg-[#1b1b1b] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#c3c1b6] transition-all hover:border-[#7bf9ba] hover:text-[#7bf9ba] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver al Inicio</span>
              </button>

              <a
                href={getWhatsAppUrl(`Hola Leo, quería consultar sobre ${data.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#7bf9ba] bg-[#7bf9ba] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1b1b1b] transition-all hover:bg-transparent hover:text-[#7bf9ba] cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
