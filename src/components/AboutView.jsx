import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
import { ABOUT_DATA, getWhatsAppUrl } from '../data/studioData';
import { PortraitPlaceholder } from './PlaceholderVisual';

export default function AboutView({ onNavigate }) {
  const viewRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-stagger', {
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
        {/* Top Bar */}
        <div className="about-stagger mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#4b4b4b]/60 pb-5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c3c1b6]/75 hover:text-[#7bf9ba] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al Inicio
          </button>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
            SECCIÓN // {ABOUT_DATA.eyebrow}
          </span>
        </div>

        {/* Hero Split */}
        <div className="about-stagger grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <PortraitPlaceholder />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
                INGENIERO DE MEZCLA & MASTERING
              </p>
              <h1 className="mt-3 font-display text-3xl font-medium leading-[1.06] text-[#c3c1b6] sm:text-5xl">
                {ABOUT_DATA.headline}
              </h1>
              <p className="mt-6 text-sm leading-relaxed text-[#c3c1b6]/80 sm:text-base">
                {ABOUT_DATA.intro}
              </p>
            </div>

            {/* Philosophy Pillars (Natural Editorial Expression of Mission & Vision) */}
            <div className="border-t border-[#4b4b4b] pt-8">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
                CRITERIO & FILOSOFÍA DE TRABAJO
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {ABOUT_DATA.pillars.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="border border-[#4b4b4b] bg-[#151515] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold tracking-[0.18em] text-[#7bf9ba]">
                        {pillar.index}
                      </span>
                      <h2 className="mt-2 font-display text-lg font-medium text-[#c3c1b6]">
                        {pillar.title}
                      </h2>
                      <p className="mt-3 text-xs leading-relaxed text-[#c3c1b6]/75">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={getWhatsAppUrl('Hola Leo, leí tu historia y me gustaría conversar sobre mi próximo lanzamiento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#7bf9ba] bg-[#7bf9ba] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#1b1b1b] hover:bg-transparent hover:text-[#7bf9ba] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Hablar con Leo por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => onNavigate('talks')}
                className="inline-flex items-center gap-2 border border-[#4b4b4b] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#c3c1b6] hover:border-[#c3c1b6] hover:text-[#7bf9ba] transition-colors cursor-pointer"
              >
                Explorar LG Talks
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Trajectory Timeline */}
        <div className="about-stagger mt-16 border-t border-[#4b4b4b] pt-12">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7bf9ba]">
            LÍNEA DE TIEMPO // 15 AÑOS EN LA ESCENA ELECTRÓNICA
          </p>
          <div className="grid grid-cols-1 gap-px bg-[#4b4b4b] border border-[#4b4b4b] sm:grid-cols-2 lg:grid-cols-5">
            {ABOUT_DATA.timeline.map((step) => (
              <div key={step.year} className="bg-[#161616] p-5">
                <p className="font-display text-2xl font-bold text-[#7bf9ba]">{step.year}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#c3c1b6]/80">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
