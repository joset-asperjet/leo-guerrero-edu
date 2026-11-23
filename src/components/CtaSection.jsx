import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import lottie from 'lottie-web/build/player/lottie_light';
import { getWhatsAppUrl } from '../data/studioData';

gsap.registerPlugin(ScrollTrigger);

function WhatsAppIcon({ className = 'h-5 w-5' }) {
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

export default function CtaSection({ onNavigate }) {
  const ctaRef = useRef(null);
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    let anim = null;
    let timer = null;

    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/looties/lootie-cta.json',
      });

      // Se reproduce cada 8 segundos
      timer = setInterval(() => {
        if (anim) {
          anim.goToAndPlay(0, true);
        }
      }, 8000);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (anim) anim.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      className="relative overflow-hidden bg-[#1b1b1b] py-28 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="cta-reveal relative overflow-hidden border border-[#7bf9ba]/60 border-t-[#7bf9ba]/90 bg-gradient-to-br from-[#161616] via-[#141414] to-[#101010] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(123,249,186,0.18)] px-6 py-14 sm:p-12 lg:p-16">
          {/* Subtle textural backdrop */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url("/assets/TEXTURA_PUNTOS_GRIS.png")' }}
          />

          <div className="relative z-10 max-w-3xl">
            <h2 className="font-display text-3xl font-medium leading-[1.06] text-[#c3c1b6] sm:text-5xl lg:text-[3.5rem]">
              Envía tu pre-mix para una{' '}
              <span className="text-[#7bf9ba]">escucha diagnóstica sin costo.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#c3c1b6]/80 sm:text-base">
              Conversemos sobre tu producción, el sello al que apuntas y cómo podemos potenciar su
              pegada, profundidad e identidad sonora antes del lanzamiento.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppUrl(
                  'Hola Leo, tengo un track de música electrónica listo para mezcla/mastering y me gustaría agendar una escucha diagnóstica.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 border border-[#7bf9ba] bg-[#7bf9ba] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#141414] transition-all duration-300 shadow-[0_5px_0_0_#47b983,0_12px_28px_rgba(123,249,186,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_0_0_#47b983,0_20px_38px_rgba(123,249,186,0.55)] active:translate-y-1 active:shadow-[0_2px_0_0_#47b983,0_6px_14px_rgba(123,249,186,0.25)] overflow-hidden"
              >
                {/* Seductive glass reflection bar across top edge */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                {/* Seductive light shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="animate-cta-shimmer absolute top-0 -bottom-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg]" />
                </span>

                <WhatsAppIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10 font-black tracking-[0.2em]">Escribir por WhatsApp</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* Lottie: In mobile at the bottom with breathing room; in desktop (md+) preserved on the right */}
          <div className="relative z-10 mt-10 flex justify-center md:mt-0 md:block md:absolute md:right-6 lg:right-12 md:top-1/2 md:-translate-y-1/2 md:pointer-events-none">
            <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center opacity-85 md:opacity-90">
              <div ref={lottieContainerRef} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
