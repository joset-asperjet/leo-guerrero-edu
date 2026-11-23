import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ChevronDown, MessageCircle, Sliders } from 'lucide-react';
import { getWhatsAppUrl, STUDIO_FAQS, STUDIO_ROOMS } from '../data/studioData';
import { StudioPhotoPlaceholder } from './PlaceholderVisual';

export default function StudioView({ onNavigate }) {
  const viewRef = useRef(null);
  const [selectedRoom, setSelectedRoom] = useState(STUDIO_ROOMS[0]);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.studio-stagger', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, viewRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={viewRef} className="min-h-screen bg-[#1b1b1b] pt-24 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Breadcrumb / Back to Home */}
        <div className="studio-stagger mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#4b4b4b]/60 pb-5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 hover:text-[#7bf9ba] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </button>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
            SECCIÓN // ESTUDIO
          </span>
        </div>

        {/* Studio Editorial Header */}
        <div className="studio-stagger max-w-4xl">
          <h1 className="font-display text-4xl font-medium leading-[1.02] text-[#c3c1b6] sm:text-6xl">
            Un entorno acústico calibrado para decisiones{' '}
            <span className="text-[#7bf9ba]">críticas de club.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#c3c1b6]/75 sm:text-base">
            Explora nuestras salas, la arquitectura de monitoreo y la cadena híbrida de mezcla y
            mastering. Cada frame está estructurado para reemplazar fácilmente con fotografías reales
            del estudio.
          </p>
        </div>

        {/* Featured Active Room Spotlight */}
        <div className="studio-stagger mt-12 grid grid-cols-1 gap-8 border border-[#4b4b4b] bg-[#151515] p-5 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StudioPhotoPlaceholder
              visualType={selectedRoom.visualType}
              code={selectedRoom.placeholderCode}
              index={selectedRoom.index}
              title={selectedRoom.title}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7bf9ba]">
                SALA {selectedRoom.index} // DETALLE TÉCNICO
              </span>
              <h2 className="mt-2 font-display text-2xl font-medium text-[#c3c1b6] sm:text-3xl">
                {selectedRoom.title}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[#c3c1b6]/55">
                {selectedRoom.dimensions}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#c3c1b6]/80">
                {selectedRoom.description}
              </p>

              <div className="mt-6 space-y-2 border-t border-[#4b4b4b] pt-5">
                {selectedRoom.specs.map((sp) => (
                  <div
                    key={sp}
                    className="flex items-center gap-2.5 text-xs text-[#c3c1b6]/85"
                  >
                    <span className="h-1.5 w-1.5 bg-[#7bf9ba]" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={getWhatsAppUrl(`Hola Leo, quiero agendar una sesión en el estudio (${selectedRoom.title}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#7bf9ba] bg-[#7bf9ba] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1b1b1b] hover:bg-transparent hover:text-[#7bf9ba] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Agendar Visita o Sesión Remota
            </a>
          </div>
        </div>

        {/* Studio Photo Gallery Grid (All 4 Rooms) */}
        <div className="studio-stagger mt-12">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c3c1b6]/75">
              GALERÍA DEL ESTUDIO (CLICK PARA INSPECCIONAR)
            </p>
            <Sliders className="h-4 w-4 text-[#7bf9ba]" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {STUDIO_ROOMS.map((room) => {
              const isCurrent = selectedRoom.id === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className={`text-left border p-4 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-[#7bf9ba] bg-[#161616]'
                      : 'border-[#4b4b4b] bg-[#151515] hover:border-[#c3c1b6]'
                  }`}
                >
                  <StudioPhotoPlaceholder
                    visualType={room.visualType}
                    code={room.placeholderCode}
                    index={room.index}
                    title={room.title}
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-xl text-[#c3c1b6]">{room.title}</p>
                      <p className="mt-1 text-xs text-[#c3c1b6]/65">{room.subtitle}</p>
                    </div>
                    <span
                      className={`shrink-0 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                        isCurrent
                          ? 'border-[#7bf9ba] bg-[#7bf9ba] text-[#1b1b1b]'
                          : 'border-[#4b4b4b] text-[#7bf9ba]'
                      }`}
                    >
                      {room.index}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion inspired by reference design */}
        <div className="studio-stagger mt-16 border-t border-[#4b4b4b] pt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
                PROTOCOLO DE SESIÓN
              </p>
              <h2 className="mt-2 font-display text-3xl text-[#c3c1b6]">
                Preguntas frecuentes del estudio.
              </h2>
            </div>

            <div className="lg:col-span-8 border-t border-[#4b4b4b]">
              {STUDIO_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="border-b border-[#4b4b4b]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer"
                    >
                      <span className="font-display text-lg text-[#c3c1b6]">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#7bf9ba] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-5 text-sm leading-relaxed text-[#c3c1b6]/75">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
